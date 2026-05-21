'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface FormData { name: string; email: string; phone: string; subject: string; message: string }
interface FormErrors { name?: string; email?: string; subject?: string; message?: string }

const SUBJECTS = ['Allgemeine Anfrage', 'Catering & Events', 'Reservierungsänderung', 'Feedback', 'Beschwerden', 'Business Anfrage', 'Sonstiges'];

function AnimIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const inputStyle = (hasErr?: string): React.CSSProperties => ({
    width: '100%', background: '#141414',
    border: `0.5px solid ${hasErr ? '#D62828' : 'rgba(255,255,255,0.14)'}`,
    borderRadius: 12, padding: '13px 16px', color: '#F5F5F5',
    fontSize: 14, outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  });
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 11, fontWeight: 600, color: '#888',
    textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8,
  };

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Bitte geben Sie Ihren Namen ein';
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(form.email)) e.email = 'Ungültige E-Mail-Adresse';
    if (!form.subject) e.subject = 'Bitte wählen Sie einen Betreff';
    if (form.message.trim().length < 10) e.message = 'Nachricht muss mindestens 10 Zeichen lang sein';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <main style={{ background: '#050505', minHeight: '100vh', color: '#F5F5F5', fontFamily: "'Inter',sans-serif" }}>

      {/* Hero */}
      <section style={{ padding: 'clamp(80px,10vw,120px) 60px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: 500, height: 300, background: 'radial-gradient(ellipse,rgba(109,165,68,0.12),transparent 70%)', pointerEvents: 'none' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6DA544', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Kontakt</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(34px,6vw,60px)', fontWeight: 900, color: '#F5F5F5', marginBottom: 16, lineHeight: 1.1 }}>
            Wir sind für<br /><em style={{ color: '#6DA544' }}>Sie da</em>
          </h1>
          <p style={{ fontSize: 16, color: '#888', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            Schreiben Sie uns, rufen Sie an oder besuchen Sie uns persönlich. Wir antworten schnellstmöglich.
          </p>
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section style={{ padding: '0 60px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, maxWidth: 900, margin: '0 auto' }}>
          {[
            { icon: '📞', label: 'Anrufen',           value: '0203 · 45 65 284\n0203 · 45 65 287', href: 'tel:+4920345652844',   color: '#6DA544' },
            { icon: '📍', label: 'Besuchen',           value: 'Spichernstr. 64\n47137 Duisburg',    href: 'https://maps.google.com/?q=Spichernstr+64+Duisburg', color: '#c9a84c' },
            { icon: '🛵', label: 'Jetzt online bestellen', value: 'Direkt bestellen', href: 'https://milanopizzeria-duisburg.de/', color: '#ff6400' },
          ].map((item, i) => (
            <AnimIn key={item.label} delay={i * 0.1}>
              <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                style={{ display: 'block', background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '20px 16px', textAlign: 'center', textDecoration: 'none', transition: 'all 0.3s', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = item.color + '66'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
              >
                <span style={{ fontSize: 32, display: 'block', marginBottom: 8 }}>{item.icon}</span>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#F5F5F5', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: item.color, whiteSpace: 'pre-line', lineHeight: 1.7 }}>{item.value}</div>
              </a>
            </AnimIn>
          ))}
        </div>
      </section>

      {/* Map + Form */}
      <section style={{ padding: '0 60px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 40, maxWidth: 1100, margin: '0 auto' }}>

          {/* Left: Info + Map */}
          <AnimIn>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 700, color: '#F5F5F5', marginBottom: 32 }}>
                Besuchen Sie uns
              </h2>

              {/* Info Cards */}
              {[
                { icon: '📍', title: 'Adresse',       content: 'Spichernstr. 64\n47137 Duisburg' },
                { icon: '🕐', title: 'Öffnungszeiten', content: 'Mo–Fr: 12:00 – 22:45 Uhr\nSa–So: 13:00 – 22:45 Uhr' },
                { icon: '🛵', title: 'Liefergebiet',   content: 'Gesamtes Duisburg\nLieferkosten 1,00 € · ~30 Min.' },
                { icon: '🚗', title: 'Parken',         content: 'Kostenlose Parkplätze\ndirekt vor dem Restaurant' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: 14, padding: '16px', background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: 14, marginBottom: 12, transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(109,165,68,0.1)', border: '0.5px solid rgba(109,165,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 14, color: '#ccc', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{item.content}</div>
                  </div>
                </div>
              ))}

              {/* Map Placeholder */}
              <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 16, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20, cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'all 0.3s' }}
                onClick={() => window.open('https://maps.google.com/?q=Spichernstr+64+47137+Duisburg', '_blank')}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(109,165,68,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(109,165,68,0.06), transparent 70%)' }} />
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>📍</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#F5F5F5', marginBottom: 4 }}>Milano Pizzeria</div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>Spichernstr. 64, 47137 Duisburg</div>
                  <div style={{ fontSize: 12, color: '#6DA544', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    In Google Maps öffnen →
                  </div>
                </div>
              </div>
            </div>
          </AnimIn>

          {/* Right: Contact Form */}
          <AnimIn delay={0.2}>
            <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 36 }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: '#F5F5F5', marginBottom: 6 }}>Nachricht senden</h2>
              <p style={{ fontSize: 14, color: '#888', marginBottom: 28 }}>Wir antworten innerhalb von 24 Stunden.</p>

              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: '#F5F5F5', marginBottom: 8 }}>Nachricht gesendet!</h3>
                  <p style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>Vielen Dank! Wir melden uns bald bei Ihnen.</p>
                  <button onClick={() => setStatus('idle')} style={{ background: '#6DA544', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    Neue Nachricht
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>Name *</label>
                      <input style={inputStyle(errors.name)} placeholder="Max Mustermann" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#6DA544'} onBlur={e => (e.target as HTMLInputElement).style.borderColor = errors.name ? '#D62828' : 'rgba(255,255,255,0.14)'} />
                      {errors.name && <p style={{ fontSize: 11, color: '#D62828', marginTop: 5 }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Telefon (optional)</label>
                      <input style={inputStyle()} placeholder="+49 203 …" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#6DA544'} onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.14)'} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>E-Mail *</label>
                    <input style={inputStyle(errors.email)} placeholder="max@example.de" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#6DA544'} onBlur={e => (e.target as HTMLInputElement).style.borderColor = errors.email ? '#D62828' : 'rgba(255,255,255,0.14)'} />
                    {errors.email && <p style={{ fontSize: 11, color: '#D62828', marginTop: 5 }}>{errors.email}</p>}
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Betreff *</label>
                    <select style={{ ...inputStyle(errors.subject), appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 36, cursor: 'pointer' }}
                      value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    >
                      {SUBJECTS.map(s => <option key={s} value={s} style={{ background: '#141414' }}>{s}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>Nachricht *</label>
                    <textarea style={{ ...inputStyle(errors.message), resize: 'vertical', minHeight: 120, lineHeight: 1.6 }}
                      placeholder="Wie können wir Ihnen helfen?" value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = '#6DA544'}
                      onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = errors.message ? '#D62828' : 'rgba(255,255,255,0.14)'}
                    />
                    {errors.message && <p style={{ fontSize: 11, color: '#D62828', marginTop: 5 }}>{errors.message}</p>}
                  </div>
                  {status === 'error' && (
                    <div style={{ background: 'rgba(214,40,40,0.1)', border: '0.5px solid rgba(214,40,40,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#f87171' }}>
                      ✗ Fehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie uns an.
                    </div>
                  )}
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
                    whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                    style={{ width: '100%', background: status === 'sending' ? '#1c1c1c' : '#6DA544', color: status === 'sending' ? '#555' : '#fff', border: 'none', padding: '16px', borderRadius: 100, fontSize: 16, fontWeight: 600, cursor: status === 'sending' ? 'not-allowed' : 'pointer', fontFamily: "'Playfair Display',serif", transition: 'all 0.25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                  >
                    {status === 'sending' ? '⏳ Wird gesendet…' : '📧 Nachricht senden'}
                  </motion.button>
                </form>
              )}
            </div>
          </AnimIn>
        </div>
      </section>

      {/* WhatsApp Float */}
      <a href="https://wa.me/4920345652844" target="_blank" rel="noopener noreferrer"
        style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 500, width: 56, height: 56, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: '0 8px 32px rgba(37,211,102,0.4)', textDecoration: 'none', transition: 'all 0.3s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
      >
        💬
      </a>
    </main>
  );
}
