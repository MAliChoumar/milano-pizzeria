'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
            Rufen Sie an oder besuchen Sie uns persönlich. Wir freuen uns auf Sie.
          </p>
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section style={{ padding: '0 60px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, maxWidth: 900, margin: '0 auto' }}>
          {[
            { icon: '📞', label: 'Anrufen',                value: '0203 · 45 65 284\n0203 · 45 65 287', href: 'tel:+4920345652844',                        color: '#6DA544'  },
            { icon: '📍', label: 'Besuchen',               value: 'Spichernstr. 64\n47137 Duisburg',    href: 'https://maps.google.com/?q=Spichernstr+64+Duisburg', color: '#c9a84c' },
            { icon: '🛵', label: 'Jetzt online bestellen', value: 'Direkt bestellen',                   href: 'https://milanopizzeria-duisburg.de/',            color: '#ff6400'  },
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

      {/* Info + Map — full width, centered */}
      <section style={{ padding: '0 60px 80px' }}>
        <AnimIn>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 700, color: '#F5F5F5', marginBottom: 32 }}>
              Besuchen Sie uns
            </h2>

            {/* Info Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 24 }}>
              {[
                { icon: '📍', title: 'Adresse',       content: 'Spichernstr. 64\n47137 Duisburg' },
                { icon: '🕒', title: 'Öffnungszeiten', content: 'Mo–Fr: 12:00–22:45\nSa–So: 13:00–22:45' },
                { icon: '🛵', title: 'Liefergebiet',   content: 'Gesamtes Duisburg\nLieferkosten 1,00 € · ~30 Min.' },
                { icon: '🚗', title: 'Parken',         content: 'Kostenlose Parkplätze\ndirekt vor dem Restaurant' },
              ].map(item => (
                <div key={item.title}
                  style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'flex-start', transition: 'border-color 0.2s' }}
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
            </div>

            {/* Map */}
            <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 16, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'all 0.3s' }}
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
      </section>
    </main>
  );
}
