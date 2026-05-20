import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { isValidAdminToken } from '@/lib/utils/adminAuth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '') || '';
  if (!isValidAdminToken(token))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { status } = await req.json();
    if (!['Neu', 'Bestätigt', 'Storniert'].includes(status))
      return NextResponse.json({ error: 'Ungültiger Status.' }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from('reservations')
      .update({ status })
      .eq('id', params.id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    console.log(`[reservations/${params.id}] status updated to:`, status);
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(`[reservations/${params.id}] PATCH error:`, err);
    return NextResponse.json({ error: 'Serverfehler.' }, { status: 500 });
  }
}
