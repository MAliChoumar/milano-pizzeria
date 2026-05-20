'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const S = {
  heading: { fontSize: 11, fontWeight: 600, color: '#c9a84c', letterSpacing: '0.18em', textTransform: 'uppercase' as const, marginBottom: 16, display: 'block' },
  h2:      { fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: '#F5F0E8', marginBottom: 14, marginTop: 0 },
  h3:      { fontSize: 15, fontWeight: 600, color: '#F5F0E8', marginBottom: 8, marginTop: 20 },
  p:       { fontSize: 15, color: '#888', lineHeight: 1.85, marginBottom: 12, fontWeight: 300 },
  li:      { fontSize: 15, color: '#888', lineHeight: 1.85, fontWeight: 300, paddingLeft: 12, marginBottom: 4 },
};

function Card({ tag, title, children }: { tag: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 'clamp(24px,4vw,40px)', marginBottom: 20 }}>
      <span style={S.heading}>{tag}</span>
      <h2 style={S.h2}>{title}</h2>
      {children}
    </div>
  );
}

export default function DatenschutzPage() {
  return (
    <main style={{ background: '#050505', minHeight: '100vh', color: '#F5F0E8', fontFamily: "'Inter',sans-serif" }}>

      {/* Hero */}
      <section style={{ padding: 'clamp(80px,10vw,110px) clamp(20px,5vw,60px) 52px', textAlign: 'center', borderBottom: '0.5px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: 400, height: 220, background: 'radial-gradient(ellipse, rgba(201,168,76,0.06), transparent 65%)', pointerEvents: 'none' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#c9a84c', letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>Rechtliches</span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,6vw,54px)', fontWeight: 900, color: '#F5F0E8', marginBottom: 14, lineHeight: 1.1 }}>Datenschutzerklärung</h1>
          <p style={{ fontSize: 15, color: 'rgba(245,240,232,0.4)', fontWeight: 300 }}>Informationen zum Datenschutz auf milanopizzeria-duisburg.de</p>
        </motion.div>
      </section>

      {/* Content */}
      <section style={{ padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,60px)', maxWidth: 860, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>

          {/* Verantwortlicher */}
          <Card tag="§ 1" title="Verantwortlicher">
            <p style={S.p}>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '16px 20px', marginTop: 8 }}>
              <p style={{ ...S.p, marginBottom: 4, color: '#F5F0E8' }}>Milano Pizzeria Duisburg</p>
              <p style={{ ...S.p, marginBottom: 4 }}>Inhaber: Mahmoud Alloul</p>
              <p style={{ ...S.p, marginBottom: 4 }}>Spichernstr. 64 · 47137 Duisburg</p>
              <a href="tel:02034565284" style={{ fontSize: 15, color: '#6DA544', textDecoration: 'none', fontWeight: 300 }}>0203 · 45 65 284</a>
            </div>
          </Card>

          {/* Welche Daten */}
          <Card tag="§ 2" title="Welche Daten wir erheben">
            <p style={S.p}>
              Diese Website ist eine Informationsseite für Milano Pizzeria Duisburg. Wir erheben nur die Daten, die Sie uns aktiv mitteilen — zum Beispiel bei einer Tischreservierung oder einer Bestellanfrage.
            </p>
            <h3 style={S.h3}>Reservierungsformular</h3>
            <p style={S.p}>
              Wenn Sie über unsere Website einen Tisch reservieren, erheben wir folgende Daten:
            </p>
            <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: 12 }}>
              {['Vor- und Nachname', 'Telefonnummer', 'Gewünschtes Datum und Uhrzeit', 'Anzahl der Personen', 'Optionale Hinweise'].map(i => (
                <li key={i} style={S.li}>· {i}</li>
              ))}
            </ul>
            <p style={S.p}>
              Diese Daten werden ausschließlich zur Bearbeitung Ihrer Reservierungsanfrage verwendet und nicht dauerhaft gespeichert.
            </p>
            <h3 style={S.h3}>Bestellanfragen</h3>
            <p style={S.p}>
              Für Bestellanfragen über unsere Website erheben wir Name, Telefonnummer und bei Lieferungen die Lieferadresse. Alle Bestellungen werden telefonisch bestätigt. Eine Online-Bezahlung findet nicht statt — alle Zahlungen erfolgen bar bei Lieferung oder Abholung.
            </p>
          </Card>

          {/* Kein Online-Payment */}
          <Card tag="§ 3" title="Keine Online-Zahlung">
            <p style={S.p}>
              Diese Website verarbeitet keine Zahlungsdaten. Es findet keine Verarbeitung von Kreditkarten-, Bankkonto- oder anderen Finanzdaten statt.
            </p>
            <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: 0 }}>
              {[
                '❌ Kein Online-Payment',
                '❌ Keine Kreditkarten-Verarbeitung',
                '❌ Keine Anbindung an Zahlungsdienstleister',
                '✅ Barzahlung bei Lieferung',
                '✅ Barzahlung bei Abholung im Restaurant',
              ].map(i => (
                <li key={i} style={{ ...S.li, color: i.startsWith('✅') ? '#6DA544' : '#666' }}>
                  {i.substring(2)}
                </li>
              ))}
            </ul>
          </Card>

          {/* Keine Benutzerkonten */}
          <Card tag="§ 4" title="Keine Benutzerkonten">
            <p style={S.p}>
              Auf dieser Website gibt es kein Registrierungs- oder Login-System. Es werden keine Benutzerkonten angelegt und keine Passwörter gespeichert.
            </p>
            <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
              {[
                'Kein Registrierungssystem',
                'Keine gespeicherten Benutzerprofile',
                'Kein Newsletter-System',
                'Keine E-Mail-Kommunikation über die Website',
              ].map(i => <li key={i} style={S.li}>· {i}</li>)}
            </ul>
          </Card>

          {/* Cookies */}
          <Card tag="§ 5" title="Cookies">
            <p style={S.p}>
              Unsere Website kann technisch notwendige Cookies verwenden, um die grundlegende Funktionalität der Seite sicherzustellen — beispielsweise zur Speicherung von Warenkorb-Inhalten während Ihrer Sitzung.
            </p>
            <p style={S.p}>
              Es werden keine Tracking-Cookies, Werbe-Cookies oder Cookies von Drittanbietern zu Analysezwecken eingesetzt. Für technisch notwendige Cookies ist nach § 25 Abs. 2 TTDSG keine Einwilligung erforderlich.
            </p>
          </Card>

          {/* Hosting */}
          <Card tag="§ 6" title="Hosting & Server-Logs">
            <p style={S.p}>
              Beim Aufruf unserer Website werden automatisch technische Daten übertragen (z. B. IP-Adresse, Browsertyp, Uhrzeit des Zugriffs). Diese Daten werden vom Hosting-Anbieter in Server-Logs gespeichert. Eine Zuordnung zu einer bestimmten Person ist uns nicht möglich. Die Daten werden nach spätestens 7 Tagen gelöscht.
            </p>
            <p style={S.p}>
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Sicherheit und dem technischen Betrieb der Website).
            </p>
          </Card>

          {/* Rechte */}
          <Card tag="§ 7" title="Ihre Rechte">
            <p style={S.p}>Sie haben jederzeit folgende Rechte gegenüber uns:</p>
            <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: 12 }}>
              {[
                'Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)',
                'Berichtigung unrichtiger Daten (Art. 16 DSGVO)',
                'Löschung Ihrer Daten (Art. 17 DSGVO)',
                'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
                'Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)',
              ].map(i => <li key={i} style={S.li}>· {i}</li>)}
            </ul>
            <p style={S.p}>
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte telefonisch an uns:{' '}
              <a href="tel:02034565284" style={{ color: '#6DA544', textDecoration: 'none' }}>0203 · 45 65 284</a>
            </p>
            <p style={S.p}>
              Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig für Nordrhein-Westfalen ist der:{' '}
              <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer"
                style={{ color: '#c9a84c', textDecoration: 'none' }}>
                Landesbeauftragte für Datenschutz und Informationsfreiheit NRW
              </a>
            </p>
          </Card>

          {/* Stand */}
          <div style={{ textAlign: 'center', paddingTop: 12 }}>
            <p style={{ fontSize: 12, color: '#444' }}>
              Stand: Mai 2026 · Milano Pizzeria Duisburg
            </p>
            <Link href="/impressum"
              style={{ fontSize: 13, color: '#c9a84c', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              Zum Impressum →
            </Link>
          </div>

        </motion.div>
      </section>
    </main>
  );
}
