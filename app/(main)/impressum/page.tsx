'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const S = {
  section: { marginBottom: 44 } as React.CSSProperties,
  heading: { fontSize: 11, fontWeight: 600, color: '#c9a84c', letterSpacing: '0.18em', textTransform: 'uppercase' as const, marginBottom: 16, display: 'block' },
  h2:      { fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: '#F5F0E8', marginBottom: 14, marginTop: 0 },
  p:       { fontSize: 15, color: '#888', lineHeight: 1.85, marginBottom: 10, fontWeight: 300 },
  row:     { display: 'grid', gridTemplateColumns: '160px 1fr', gap: 8, padding: '9px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)' } as React.CSSProperties,
  label:   { fontSize: 13, color: '#555', fontWeight: 500 },
  value:   { fontSize: 13, color: '#888' },
};

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 'clamp(24px,4vw,40px)', marginBottom: 20 }}>
      {children}
    </div>
  );
}

export default function ImpressumPage() {
  return (
    <main style={{ background: '#050505', minHeight: '100vh', color: '#F5F0E8', fontFamily: "'Inter',sans-serif" }}>

      {/* Hero */}
      <section style={{ padding: 'clamp(80px,10vw,110px) clamp(20px,5vw,60px) 52px', textAlign: 'center', borderBottom: '0.5px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: 400, height: 220, background: 'radial-gradient(ellipse, rgba(201,168,76,0.06), transparent 65%)', pointerEvents: 'none' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#c9a84c', letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>Rechtliches</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,6vw,54px)', fontWeight: 900, color: '#F5F0E8', marginBottom: 14, lineHeight: 1.1 }}>Impressum</h1>
          <p style={{ fontSize: 15, color: 'rgba(245,240,232,0.4)', fontWeight: 300 }}>Rechtliche Informationen zu Milano Pizzeria Duisburg</p>
        </motion.div>
      </section>

      {/* Content */}
      <section style={{ padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,60px)', maxWidth: 860, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>

          {/* Angaben */}
          <Card>
            <span style={S.heading}>Angaben gemäß § 5 TMG</span>
            <h2 style={S.h2}>Verantwortlich für diese Website</h2>
            {[
              { label: 'Betrieb',    value: 'Milano Pizzeria Duisburg' },
              { label: 'Inhaber',    value: 'Mahmoud Alloul' },
              { label: 'Adresse',    value: 'Spichernstr. 64, 47137 Duisburg' },
              { label: 'Bundesland', value: 'Nordrhein-Westfalen, Deutschland' },
            ].map(r => (
              <div key={r.label} style={S.row}>
                <span style={S.label}>{r.label}</span>
                <span style={S.value}>{r.value}</span>
              </div>
            ))}
          </Card>

          {/* Kontakt */}
          <Card>
            <span style={S.heading}>Kontakt</span>
            <h2 style={S.h2}>Erreichbarkeit</h2>
            {[
              { label: 'Telefon 1',     value: '0203 · 45 65 284', href: 'tel:02034565284' },
              { label: 'Telefon 2',     value: '0203 · 45 65 287', href: 'tel:02034565287' },
              { label: 'Liefergebiet',  value: 'Duisburg' },
              { label: 'Öffnungszeiten', value: 'Mo–Fr 12:00–22:45 · Sa–So 13:00–22:45' },
            ].map(r => (
              <div key={r.label} style={S.row}>
                <span style={S.label}>{r.label}</span>
                {(r as any).href
                  ? <a href={(r as any).href} style={{ ...S.value, textDecoration: 'none', color: '#6DA544' }}>{r.value}</a>
                  : <span style={S.value}>{r.value}</span>}
              </div>
            ))}
          </Card>

          {/* Umsatzsteuer */}
          <Card>
            <span style={S.heading}>Steuerliche Angaben</span>
            <h2 style={S.h2}>Umsatzsteuer</h2>
            <p style={S.p}>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
              Bitte wenden Sie sich bei steuerlichen Anfragen direkt an den Inhaber.
            </p>
          </Card>

          {/* Streitschlichtung */}
          <Card>
            <span style={S.heading}>Streitbeilegung</span>
            <h2 style={S.h2}>EU-Streitschlichtung</h2>
            <p style={S.p}>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer"
                style={{ color: '#c9a84c', textDecoration: 'none' }}>
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p style={S.p}>
              Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </Card>

          {/* Haftung */}
          <Card>
            <span style={S.heading}>Haftungsausschluss</span>
            <h2 style={S.h2}>Haftung für Inhalte</h2>
            <p style={S.p}>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p style={S.p}>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </Card>

          {/* Stand */}
          <div style={{ textAlign: 'center', paddingTop: 12 }}>
            <p style={{ fontSize: 12, color: '#444' }}>
              Stand: Mai 2026 · Milano Pizzeria Duisburg
            </p>
            <Link href="/datenschutz"
              style={{ fontSize: 13, color: '#c9a84c', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              Zur Datenschutzerklärung →
            </Link>
          </div>

        </motion.div>
      </section>
    </main>
  );
}
