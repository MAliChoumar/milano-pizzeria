'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Occasion = 'romantic' | 'family' | 'birthday' | 'business' | 'friends' | 'anniversary' | 'other';
type Step = 1 | 2 | 3 | 4 | 5;

const OCCASIONS = [
  { id: 'romantic',    icon: '💑',  label: 'Romantisch',   desc: 'Candlelight Dinner' },
  { id: 'family',      icon: '👨‍👩‍👧', label: 'Familie',      desc: 'Familienfeier' },
  { id: 'birthday',    icon: '🎂',  label: 'Geburtstag',   desc: 'Geburtstagsfeier' },
  { id: 'business',    icon: '💼',  label: 'Business',     desc: 'Geschäftsessen' },
  { id: 'friends',     icon: '🥂',  label: 'Freunde',      desc: 'Freundesabend' },
  { id: 'anniversary', icon: '💍',  label: 'Jahrestag',    desc: 'Besonderer Tag' },
  { id: 'other',       icon: '🍽️', label: 'Sonstiges',    desc: 'Restaurantbesuch' },
];

const LUNCH_SLOTS  = ['11:30','12:00','12:30','13:00','13:30','14:00','14:30'];
const DINNER_SLOTS = ['17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'];
const FULL_SLOTS   = ['12:00','19:00','20:00'];

const MONTH_NAMES = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
const DAY_NAMES   = ['Mo','Di','Mi','Do','Fr','Sa','So'];

// ─── Input Style ────────────────────────────────────────────────────────────
const inputStyle = (err?: boolean): React.CSSProperties => ({
  width: '100%',
  background: '#141414',
  border: `0.5px solid ${err ? '#D62828' : 'rgba(255,255,255,0.14)'}`,
  borderRadius: 12,
  padding: '13px 16px',
  color: '#F5F5F5',
  fontSize: 14,
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
});

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 600,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 8,
};

export default function ReservationPage() {
  const [step,       setStep]       = useState<Step>(1);
  const [occasion,   setOccasion]   = useState<Occasion | null>(null);
  const [calYear,    setCalYear]    = useState(new Date().getFullYear());
  const [calMonth,   setCalMonth]   = useState(new Date().getMonth());
  const [selDate,    setSelDate]    = useState('');
  const [selTime,    setSelTime]    = useState('');
  const [guests,     setGuests]     = useState(2);
  const [name,       setName]       = useState('');
  const [phone,      setPhone]      = useState('');
  const [notes,      setNotes]      = useState('');
  const [errors,     setErrors]     = useState<Record<string,boolean>>({});
  const [loading,    setLoading]    = useState(false);
  const [submitErr,  setSubmitErr]  = useState('');

  // Calendar
  const today       = new Date(); today.setHours(0,0,0,0);
  const firstDay    = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  const offset      = (firstDay + 6) % 7;

  const dateStr = (d: number) =>
    `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

  function isPast(d: number) {
    return new Date(dateStr(d)) < today;
  }
  function isClosed(d: number) {
    return new Date(dateStr(d) + 'T12:00:00').getDay() === 0; // Sonntag
  }

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y-1); }
    else setCalMonth(m => m-1);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y+1); }
    else setCalMonth(m => m+1);
  }

  function validateStep3() {
    const e: Record<string,boolean> = {};
    if (!name.trim())   e.name  = true;
    if (!phone.trim())  e.phone = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {
    setLoading(true);
    setSubmitErr('');

    const dateFormatted = selDate
      ? new Date(selDate + 'T12:00:00').toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })
      : '';

    const message =
`🍕 Neue Tischreservierung – Milano Pizzeria Duisburg

👤 Name: ${name}
📞 Telefon: ${phone}
📅 Datum: ${dateFormatted}
🕐 Uhrzeit: ${selTime} Uhr
👥 Personen: ${guests}
🎉 Anlass: ${occ?.label || 'Sonstiges'}
📝 Hinweise: ${notes || '–'}

Vielen Dank.
Ich möchte diesen Tisch verbindlich reservieren.
Bitte bestätigen Sie meine Reservierung.`;

    const whatsappUrl = `https://wa.me/491739135988?text=${encodeURIComponent(message)}`;
    const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setLoading(false);

    if (!win) {
      setSubmitErr('WhatsApp konnte nicht automatisch geöffnet werden. Bitte erlauben Sie Pop-ups für diese Seite und versuchen Sie es erneut. Ihre Angaben bleiben erhalten.');
      return;
    }

    setStep(5);
  }

  function reset() {
    setStep(1); setOccasion(null); setSelDate(''); setSelTime('');
    setGuests(2); setName(''); setPhone('');
    setNotes(''); setErrors({}); setSubmitErr('');
  }

  const occ = OCCASIONS.find(o => o.id === occasion);

  const card: React.CSSProperties = {
    background: '#0d0d0d',
    border: '0.5px solid rgba(255,255,255,0.09)',
    borderRadius: 22,
    padding: 32,
    maxWidth: 620,
    margin: '0 auto',
  };

  const btnPrimary: React.CSSProperties = {
    width: '100%',
    background: '#6DA544',
    color: '#fff',
    border: 'none',
    padding: '15px',
    borderRadius: 100,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    marginTop: 24,
    transition: 'all 0.2s',
  };

  const btnBack: React.CSSProperties = {
    background: 'transparent',
    color: '#888',
    border: '0.5px solid rgba(255,255,255,0.14)',
    padding: '13px 24px',
    borderRadius: 100,
    fontSize: 14,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
  };

  // Step Indicator
  const STEPS = [
    { n:1, label:'Anlass',   icon:'🎉' },
    { n:2, label:'Datum',    icon:'📅' },
    { n:3, label:'Details',  icon:'👤' },
    { n:4, label:'Prüfen',   icon:'✅' },
  ];

  return (
    <main style={{ background:'#050505', minHeight:'100vh', color:'#F5F5F5', fontFamily:"'Inter',sans-serif" }}>

      {/* Hero */}
      <section style={{ padding:'clamp(60px,8vw,80px) 24px 32px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-60, left:'50%', transform:'translateX(-50%)', width:500, height:300, background:'radial-gradient(ellipse,rgba(109,165,68,0.1),transparent 70%)', pointerEvents:'none' }} />
        <span style={{ fontSize:11, fontWeight:600, color:'#6DA544', letterSpacing:'0.2em', textTransform:'uppercase', display:'block', marginBottom:12 }}>Tisch reservieren</span>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(28px,5vw,50px)', fontWeight:900, color:'#F5F5F5', marginBottom:12 }}>
          Reservieren Sie Ihren Tisch
        </h1>
        <p style={{ fontSize:15, color:'#888', maxWidth:420, margin:'0 auto' }}>
          Spichernstr. 64 · 47137 Duisburg · Mo–Fr 12:00–22:30 · Sa–So 13:00–22:30
        </p>
      </section>

      {/* Steps */}
      {step < 5 && (
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', padding:'0 24px 32px', gap:0 }}>
          {STEPS.map((s, i) => {
            const done   = step > s.n;
            const active = step === s.n;
            return (
              <React.Fragment key={s.n}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                  <div style={{ width:38, height:38, borderRadius:'50%', border:`2px solid ${active?'#6DA544':done?'#6DA544':'rgba(255,255,255,0.1)'}`, background:active?'#6DA544':done?'rgba(109,165,68,0.2)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, color:active?'#fff':done?'#6DA544':'#555', transition:'all 0.3s' }}>
                    {done ? '✓' : s.icon}
                  </div>
                  <span style={{ fontSize:11, color:active?'#6DA544':done?'#6DA544':'#555', fontWeight:active?600:400, whiteSpace:'nowrap' }}>{s.label}</span>
                </div>
                {i < STEPS.length-1 && (
                  <div style={{ height:2, flex:1, maxWidth:70, background:done?'#6DA544':'rgba(255,255,255,0.08)', margin:'0 4px', marginBottom:22, transition:'background 0.3s' }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Content */}
      <div style={{ padding:'0 24px 80px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration:0.28 }}>

            {/* STEP 1 — Anlass */}
            {step === 1 && (
              <div style={card}>
                <div style={{ fontSize:11, color:'#6DA544', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:8 }}>Schritt 1 von 4</div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:'#F5F5F5', marginBottom:6 }}>Was feiern Sie?</h2>
                <p style={{ fontSize:14, color:'#888', marginBottom:24 }}>Wählen Sie den Anlass für Ihren Besuch</p>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))', gap:12 }}>
                  {OCCASIONS.map(o => (
                    <div key={o.id} onClick={() => setOccasion(o.id as Occasion)}
                      style={{ background:occasion===o.id?'rgba(109,165,68,0.12)':'rgba(255,255,255,0.02)', border:`0.5px solid ${occasion===o.id?'#6DA544':'rgba(255,255,255,0.09)'}`, borderRadius:14, padding:'16px 12px', cursor:'pointer', textAlign:'center', transition:'all 0.2s' }}>
                      <div style={{ fontSize:28, marginBottom:7 }}>{o.icon}</div>
                      <div style={{ fontSize:13, fontWeight:600, color:occasion===o.id?'#6DA544':'#F5F5F5' }}>{o.label}</div>
                      <div style={{ fontSize:11, color:'#555', marginTop:3 }}>{o.desc}</div>
                    </div>
                  ))}
                </div>
                <button style={{ ...btnPrimary, background:occasion?'#6DA544':'#1c1c1c', color:occasion?'#fff':'#555', cursor:occasion?'pointer':'not-allowed' }}
                  onClick={() => occasion && setStep(2)}
                  onMouseEnter={e => occasion && ((e.currentTarget.style.background='#8bc34a'))}
                  onMouseLeave={e => occasion && ((e.currentTarget.style.background='#6DA544'))}>
                  Weiter → Datum wählen
                </button>
              </div>
            )}

            {/* STEP 2 — Datum & Zeit */}
            {step === 2 && (
              <div style={card}>
                <div style={{ fontSize:11, color:'#6DA544', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:8 }}>Schritt 2 von 4</div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:'#F5F5F5', marginBottom:20 }}>Wann möchten Sie kommen?</h2>

                {/* Kalender */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                  <button onClick={prevMonth} style={{ background:'#141414', border:'0.5px solid rgba(255,255,255,0.12)', borderRadius:'50%', width:34, height:34, cursor:'pointer', color:'#F5F5F5', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center' }}>◀</button>
                  <span style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:'#F5F5F5' }}>{MONTH_NAMES[calMonth]} {calYear}</span>
                  <button onClick={nextMonth} style={{ background:'#141414', border:'0.5px solid rgba(255,255,255,0.12)', borderRadius:'50%', width:34, height:34, cursor:'pointer', color:'#F5F5F5', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center' }}>▶</button>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', marginBottom:8 }}>
                  {DAY_NAMES.map(d => <div key={d} style={{ textAlign:'center', fontSize:11, color:'#555', fontWeight:600, padding:'6px 0', textTransform:'uppercase' }}>{d}</div>)}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4 }}>
                  {Array.from({ length: offset }).map((_,i) => <div key={`e${i}`} />)}
                  {Array.from({ length: daysInMonth }).map((_,i) => {
                    const d    = i+1;
                    const ds   = dateStr(d);
                    const past = isPast(d);
                    const closed = isClosed(d);
                    const sel  = selDate === ds;
                    const isToday = new Date(ds+'T12:00:00').toDateString() === today.toDateString();
                    return (
                      <div key={d} onClick={() => !past && !closed && (setSelDate(ds), setSelTime(''))}
                        style={{ aspectRatio:'1', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:500, cursor:past||closed?'not-allowed':'pointer', opacity:past||closed?0.3:1, background:sel?'#6DA544':'transparent', color:sel?'#fff':'#F5F5F5', border:isToday&&!sel?'1px solid rgba(201,168,76,0.5)':'none', transition:'all 0.15s' }}
                        onMouseEnter={e => !past && !closed && !sel && ((e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.08)')}
                        onMouseLeave={e => !past && !closed && !sel && ((e.currentTarget as HTMLElement).style.background='transparent')}
                      >{d}</div>
                    );
                  })}
                </div>

                {/* Zeitslots */}
                {selDate && (
                  <div style={{ marginTop:24 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:'#F5F5F5', marginBottom:12 }}>🕐 Mittagszeit</div>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(72px,1fr))', gap:8, marginBottom:16 }}>
                      {LUNCH_SLOTS.map(t => {
                        const full = FULL_SLOTS.includes(t);
                        return (
                          <div key={t} onClick={() => !full && setSelTime(t)}
                            style={{ padding:'9px 4px', borderRadius:10, border:`0.5px solid ${selTime===t?'#6DA544':full?'rgba(255,255,255,0.05)':'rgba(255,255,255,0.1)'}`, background:selTime===t?'rgba(109,165,68,0.12)':'transparent', cursor:full?'not-allowed':'pointer', textAlign:'center', opacity:full?0.4:1, transition:'all 0.15s' }}>
                            <div style={{ fontSize:13, fontWeight:600, color:selTime===t?'#6DA544':'#F5F5F5' }}>{t}</div>
                            <div style={{ fontSize:10, color:'#555', marginTop:2 }}>{full?'Voll':'Frei'}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ fontSize:13, fontWeight:600, color:'#F5F5F5', marginBottom:12 }}>🌙 Abendessen</div>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(72px,1fr))', gap:8 }}>
                      {DINNER_SLOTS.map(t => {
                        const full = FULL_SLOTS.includes(t);
                        return (
                          <div key={t} onClick={() => !full && setSelTime(t)}
                            style={{ padding:'9px 4px', borderRadius:10, border:`0.5px solid ${selTime===t?'#6DA544':full?'rgba(255,255,255,0.05)':'rgba(255,255,255,0.1)'}`, background:selTime===t?'rgba(109,165,68,0.12)':'transparent', cursor:full?'not-allowed':'pointer', textAlign:'center', opacity:full?0.4:1, transition:'all 0.15s' }}>
                            <div style={{ fontSize:13, fontWeight:600, color:selTime===t?'#6DA544':'#F5F5F5' }}>{t}</div>
                            <div style={{ fontSize:10, color:'#555', marginTop:2 }}>{full?'Voll':'Frei'}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Personen */}
                <div style={{ display:'flex', alignItems:'center', gap:16, background:'#141414', border:'0.5px solid rgba(255,255,255,0.08)', borderRadius:14, padding:'14px 18px', marginTop:20 }}>
                  <span style={{ fontSize:24 }}>👥</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:600, color:'#F5F5F5' }}>{guests} Person{guests!==1?'en':''}</div>
                    <div style={{ fontSize:11, color:'#555' }}>{guests<=2?'Kleiner Tisch':guests<=4?'Standard Tisch':guests<=6?'Großer Tisch':'Gruppenbereich'}</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center' }}>
                    <button onClick={() => setGuests(g => Math.max(1,g-1))} style={{ background:'#222', border:'0.5px solid rgba(255,255,255,0.1)', color:'#F5F5F5', width:32, height:32, borderRadius:'8px 0 0 8px', cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
                    <div style={{ background:'#222', borderTop:'0.5px solid rgba(255,255,255,0.1)', borderBottom:'0.5px solid rgba(255,255,255,0.1)', width:40, height:32, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, fontWeight:700, color:'#F5F5F5' }}>{guests}</div>
                    <button onClick={() => setGuests(g => Math.min(12,g+1))} style={{ background:'#222', border:'0.5px solid rgba(255,255,255,0.1)', color:'#F5F5F5', width:32, height:32, borderRadius:'0 8px 8px 0', cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
                  </div>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:10, marginTop:24 }}>
                  <button onClick={() => setStep(1)} style={btnBack}>← Zurück</button>
                  <button onClick={() => selDate && selTime && setStep(3)}
                    style={{ ...btnPrimary, marginTop:0, background:selDate&&selTime?'#6DA544':'#1c1c1c', color:selDate&&selTime?'#fff':'#555', cursor:selDate&&selTime?'pointer':'not-allowed' }}
                    onMouseEnter={e => selDate&&selTime&&((e.currentTarget.style.background='#8bc34a'))} onMouseLeave={e => selDate&&selTime&&((e.currentTarget.style.background='#6DA544'))}>
                    Weiter → Ihre Daten
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 — Kontakt */}
            {step === 3 && (
              <div style={card}>
                <div style={{ fontSize:11, color:'#6DA544', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:8 }}>Schritt 3 von 4</div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:'#F5F5F5', marginBottom:20 }}>Ihre Kontaktdaten</h2>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input style={inputStyle(errors.name)} placeholder="Ihr Name" value={name} onChange={e => setName(e.target.value)}
                      onFocus={e => (e.target.style.borderColor='#6DA544')} onBlur={e => (e.target.style.borderColor=errors.name?'#D62828':'rgba(255,255,255,0.14)')} />
                    {errors.name && <p style={{ fontSize:11, color:'#D62828', marginTop:4 }}>Pflichtfeld</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Telefon *</label>
                    <input style={inputStyle(errors.phone)} placeholder="0203 …" type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                      onFocus={e => (e.target.style.borderColor='#6DA544')} onBlur={e => (e.target.style.borderColor=errors.phone?'#D62828':'rgba(255,255,255,0.14)')} />
                    {errors.phone && <p style={{ fontSize:11, color:'#D62828', marginTop:4 }}>Pflichtfeld</p>}
                  </div>
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={labelStyle}>Besondere Wünsche (optional)</label>
                  <textarea style={{ ...inputStyle(), resize:'vertical', minHeight:90, lineHeight:1.6 }} placeholder="Allergien, Dekoration, Kinderstuhl…" value={notes} onChange={e => setNotes(e.target.value)}
                    onFocus={e => (e.target.style.borderColor='#6DA544')} onBlur={e => (e.target.style.borderColor='rgba(255,255,255,0.14)')} />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:10, marginTop:24 }}>
                  <button onClick={() => setStep(2)} style={btnBack}>← Zurück</button>
                  <button onClick={() => validateStep3() && setStep(4)} style={{ ...btnPrimary, marginTop:0 }}
                    onMouseEnter={e => (e.currentTarget.style.background='#8bc34a')} onMouseLeave={e => (e.currentTarget.style.background='#6DA544')}>
                    Weiter → Bestätigung
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4 — Prüfen */}
            {step === 4 && (
              <div style={card}>
                <div style={{ fontSize:11, color:'#6DA544', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:8 }}>Schritt 4 von 4</div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:'#F5F5F5', marginBottom:20 }}>Reservierung bestätigen</h2>
                <div style={{ background:'#141414', border:'0.5px solid rgba(255,255,255,0.08)', borderRadius:16, padding:'18px', marginBottom:16 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                    <span style={{ fontSize:28 }}>{occ?.icon}</span>
                    <div>
                      <div style={{ fontSize:15, fontWeight:600, color:'#F5F5F5' }}>{occ?.label}</div>
                      <div style={{ fontSize:12, color:'#555' }}>{occ?.desc}</div>
                    </div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                    {[
                      { icon:'📅', label:'Datum', val: selDate ? new Date(selDate+'T12:00:00').toLocaleDateString('de-DE',{weekday:'short',day:'2-digit',month:'2-digit',year:'numeric'}) : '' },
                      { icon:'🕐', label:'Uhrzeit', val: selTime+' Uhr' },
                      { icon:'👥', label:'Personen', val: guests+' Person'+(guests!==1?'en':'') },
                      { icon:'👤', label:'Name', val: name },
                    ].map(r => (
                      <div key={r.label} style={{ background:'#1c1c1c', borderRadius:10, padding:'10px 12px' }}>
                        <div style={{ fontSize:10, color:'#555', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:3 }}>{r.icon} {r.label}</div>
                        <div style={{ fontSize:13, fontWeight:600, color:'#F5F5F5' }}>{r.val}</div>
                      </div>
                    ))}
                  </div>
                  {notes && (
                    <div style={{ background:'#1c1c1c', borderRadius:10, padding:'10px 12px', marginTop:10 }}>
                      <div style={{ fontSize:10, color:'#555', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:3 }}>📝 Notizen</div>
                      <div style={{ fontSize:13, color:'#888' }}>{notes}</div>
                    </div>
                  )}
                </div>
                <div style={{ background:'rgba(109,165,68,0.06)', border:'0.5px solid rgba(109,165,68,0.18)', borderRadius:12, padding:'12px 14px', fontSize:13, color:'#888', marginBottom:16 }}>
                  📞 Wir melden uns bei Ihnen unter <strong style={{ color:'#F5F5F5' }}>{phone}</strong> zur Bestätigung.
                </div>
                {submitErr && (
                  <div style={{ background:'rgba(214,40,40,0.08)', border:'0.5px solid rgba(214,40,40,0.3)', borderRadius:12, padding:'11px 14px', fontSize:13, color:'#ff6b6b', marginBottom:14 }}>
                    ⚠️ {submitErr}
                  </div>
                )}
                <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:10 }}>
                  <button onClick={() => setStep(3)} style={btnBack} disabled={loading}>← Zurück</button>
                  <button onClick={submit} disabled={loading}
                    style={{ ...btnPrimary, marginTop:0, background:loading?'#1c1c1c':'#6DA544', color:loading?'#555':'#fff', cursor:loading?'wait':'pointer' }}
                    onMouseEnter={e => !loading&&(e.currentTarget.style.background='#8bc34a')} onMouseLeave={e => !loading&&(e.currentTarget.style.background='#6DA544')}>
                    {loading ? '⏳ Reservierung wird gespeichert…' : '🎉 Jetzt verbindlich reservieren'}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5 — Erfolg */}
            {step === 5 && (
              <div style={{ ...card, textAlign:'center', padding:'48px 32px' }}>
                <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', duration:0.6 }}
                  style={{ width:96, height:96, borderRadius:'50%', background:'rgba(109,165,68,0.15)', border:'2px solid #6DA544', display:'flex', alignItems:'center', justifyContent:'center', fontSize:44, margin:'0 auto 24px' }}>
                  ✅
                </motion.div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:700, color:'#F5F5F5', marginBottom:10 }}>WhatsApp wurde geöffnet</h2>
                <p style={{ fontSize:15, color:'#888', marginBottom:24, lineHeight:1.7 }}>
                  Vielen Dank, <strong style={{ color:'#F5F5F5' }}>{name}</strong>!<br />
                  Bitte senden Sie die vorausgefüllte Nachricht in WhatsApp ab,<br />
                  damit wir Ihre Reservierung bestätigen können.
                </p>
                <div style={{ background:'#0d0d0d', border:'0.5px solid #6DA544', borderRadius:14, display:'inline-block', padding:'12px 28px', marginBottom:24 }}>
                  <div style={{ fontSize:11, color:'#555', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4 }}>Nächster Schritt</div>
                  <div style={{ fontSize:14, fontWeight:600, color:'#6DA544' }}>Nachricht in WhatsApp absenden</div>
                </div>
                <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
                  <button onClick={reset} style={{ background:'#6DA544', color:'#fff', border:'none', padding:'12px 28px', borderRadius:100, fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                    Neue Reservierung
                  </button>
                  <a href="/menu" style={{ background:'transparent', color:'#888', border:'0.5px solid rgba(255,255,255,0.15)', padding:'12px 28px', borderRadius:100, fontSize:14, textDecoration:'none', display:'inline-block' }}>
                    🍕 Zur Speisekarte
                  </a>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
