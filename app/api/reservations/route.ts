import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { isValidAdminToken } from '@/lib/utils/adminAuth';

// ─── Reservation code generator ──────────────────────────────────────────────
function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `RES-MILANO-${code}`;
}

// ─── Opening hours validation ────────────────────────────────────────────────
function validateOpeningHours(date: string, time: string): { ok: boolean; msg: string } {
  const d      = new Date(date + 'T12:00:00');
  const dow    = d.getDay(); // 0=Sun, 6=Sat
  const [h, m] = time.split(':').map(Number);
  const mins   = h * 60 + m;
  const open   = (dow === 0 || dow === 6) ? 13 * 60 : 12 * 60; // Sa/So: 13:00, Mo-Fr: 12:00
  const close  = 22 * 60 + 45;
  if (mins < open)  return { ok: false, msg: `Öffnung erst ab ${dow===0||dow===6?'13:00':'12:00'} Uhr.` };
  if (mins > close) return { ok: false, msg: 'Keine Reservierungen nach 22:45 Uhr.' };
  return { ok: true, msg: '' };
}

// ─── POST /api/reservations ───────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  console.log('[reservations] POST received');
  try {
    const body = await req.json();
    const { name, phone, date, time, persons, occasion, notes } = body;

    console.log('[reservations] POST data:', { name, phone, date, time, persons, occasion });

    // Validation
    if (!name?.trim())  return NextResponse.json({ error: 'Name erforderlich.' }, { status: 400 });
    if (!phone?.trim()) return NextResponse.json({ error: 'Telefon erforderlich.' }, { status: 400 });
    if (!date)          return NextResponse.json({ error: 'Datum fehlt.' }, { status: 400 });
    if (!time)          return NextResponse.json({ error: 'Uhrzeit fehlt.' }, { status: 400 });
    if (!persons || Number(persons) < 1)
                        return NextResponse.json({ error: 'Personenanzahl ungültig.' }, { status: 400 });

    // Past date check
    const resDate = new Date(date + 'T00:00:00');
    const today   = new Date(); today.setHours(0, 0, 0, 0);
    if (resDate < today)
      return NextResponse.json({ error: 'Vergangene Daten sind nicht möglich.' }, { status: 400 });

    // Opening hours
    const hrs = validateOpeningHours(date, time);
    if (!hrs.ok) return NextResponse.json({ error: hrs.msg }, { status: 400 });

    // Generate unique code
    let reservation_code = generateCode();
    for (let attempt = 0; attempt < 5; attempt++) {
      const { data: existing } = await supabaseAdmin
        .from('reservations')
        .select('id')
        .eq('reservation_code', reservation_code)
        .maybeSingle();
      if (!existing) break;
      reservation_code = generateCode();
    }

    console.log('[reservations] inserting with code:', reservation_code);

    const { data, error } = await supabaseAdmin
      .from('reservations')
      .insert({
        reservation_code,
        name:     name.trim(),
        phone:    phone.trim(),
        date,
        time,
        persons:  Number(persons),
        occasion: occasion || 'other',
        notes:    notes?.trim() || null,
        status:   'Neu',
      })
      .select()
      .single();

    if (error) {
      console.error('[reservations] Supabase insert error:', error);
      return NextResponse.json({ error: 'Fehler beim Speichern. Bitte erneut versuchen.' }, { status: 500 });
    }

    console.log('[reservations] saved successfully:', data.reservation_code);
    return NextResponse.json({ success: true, reservation_code: data.reservation_code, id: data.id }, { status: 201 });

  } catch (err) {
    console.error('[reservations] POST error:', err);
    return NextResponse.json({ error: 'Serverfehler.' }, { status: 500 });
  }
}

// ─── GET /api/reservations (admin only) ──────────────────────────────────────
export async function GET(req: NextRequest) {
  console.log('[reservations] GET received');

  const token = req.headers.get('Authorization')?.replace('Bearer ', '') || '';
  if (!isValidAdminToken(token)) {
    console.log('[reservations] GET rejected: invalid token');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const filter = new URL(req.url).searchParams.get('filter') || 'all';
    const now    = new Date();
    const today  = now.toISOString().split('T')[0];

    let q = supabaseAdmin.from('reservations').select('*').order('date').order('time');

    const tom = new Date(now); tom.setDate(tom.getDate() + 1);
    const wkE = new Date(now); wkE.setDate(wkE.getDate() + 7);

    switch (filter) {
      case 'today':    q = q.eq('date', today); break;
      case 'tomorrow': q = q.eq('date', tom.toISOString().split('T')[0]); break;
      case 'week':     q = q.gte('date', today).lte('date', wkE.toISOString().split('T')[0]); break;
      case 'past':     q = q.lt('date', today); break;
      default:         q = q.gte('date', today); // 'all' = upcoming
    }

    const { data, error } = await q;
    if (error) {
      console.error('[reservations] GET Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`[reservations] GET success: ${data?.length ?? 0} records`);
    return NextResponse.json({ success: true, data: data || [] });

  } catch (err) {
    console.error('[reservations] GET error:', err);
    return NextResponse.json({ error: 'Serverfehler.' }, { status: 500 });
  }
}
