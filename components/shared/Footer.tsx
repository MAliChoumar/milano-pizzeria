'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// ─── Data ─────────────────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  restaurant: [
    { label: 'Speisekarte',       href: '/menu'        },
    { label: 'Online bestellen',  href: '/order'       },
    { label: 'Tisch reservieren', href: '/reservation' },
    { label: 'Galerie',           href: '/gallery'     },
    { label: 'Über uns',          href: '/about'       },
    { label: 'Kontakt',           href: '/contact'     },
  ],
  info: [
    { label: 'Unsere Geschichte', href: '/about'          },
    { label: 'Team',              href: '/about#team'     },
    { label: 'Galerie',           href: '/gallery'        },
    { label: 'Kontakt',           href: '/contact'        },
    { label: 'Online bestellen',  href: 'https://milanopizzeria-duisburg.de/order' },
    { label: 'Tisch reservieren', href: '/reservation'   },
  ],
  legal: [
    { label: 'Impressum',  href: '/impressum'  },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
};

const SOCIAL_LINKS = [
  { icon: '⭐', label: 'Google',    href: 'https://maps.google.com/?q=Spichernstr+64+Duisburg', color: '#FBBC05' },
];

const PAYMENT_ICONS = ['💳', '🏦', '📱', '💶'];

// ─── Footer ───────────────────────────────────────────────────────────────────
// ─── Premium Call Float ────────────────────────────────────────────────────────
function CallFloat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div onClick={() => setOpen(false)}
          style={{ position:'fixed', inset:0, zIndex:498, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(5px)' }} />
      )}

      {/* Popup */}
      {open && (
        <div style={{ position:'fixed', bottom:98, right:24, zIndex:499, background:'#0d0d0d', border:'0.5px solid rgba(109,165,68,0.25)', borderRadius:20, padding:'22px 20px 18px', width:284, boxShadow:'0 24px 64px rgba(0,0,0,0.85), 0 0 0 1px rgba(109,165,68,0.06)', animation:'callPopIn 0.22s cubic-bezier(0.34,1.56,0.64,1)' }}>

          {/* Close */}
          <button onClick={() => setOpen(false)}
            style={{ position:'absolute', top:12, right:12, background:'rgba(255,255,255,0.06)', border:'none', borderRadius:'50%', width:28, height:28, cursor:'pointer', color:'rgba(245,240,232,0.5)', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>

          {/* Header */}
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            <div style={{ width:38, height:38, borderRadius:'50%', background:'rgba(109,165,68,0.12)', border:'1px solid rgba(109,165,68,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>📞</div>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:'#F5F0E8', fontFamily:"'Playfair Display',serif" }}>Jetzt anrufen</div>
              <div style={{ fontSize:11, color:'rgba(245,240,232,0.4)', marginTop:1 }}>Direkt bei Milano Pizzeria bestellen</div>
            </div>
          </div>

          {/* Phone numbers */}
          {[
            { display:'0203 · 45 65 284', tel:'tel:02034565284' },
            { display:'0203 · 45 65 287', tel:'tel:02034565287' },
          ].map(n => (
            <a key={n.tel} href={n.tel}
              style={{ display:'flex', alignItems:'center', gap:10, background:'rgba(109,165,68,0.08)', border:'0.5px solid rgba(109,165,68,0.2)', borderRadius:12, padding:'11px 14px', marginBottom:8, textDecoration:'none', transition:'all 0.2s', cursor:'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(109,165,68,0.16)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(109,165,68,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(109,165,68,0.08)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(109,165,68,0.2)'; }}>
              <span style={{ fontSize:15 }}>📞</span>
              <span style={{ fontSize:14, fontWeight:600, color:'#6DA544', letterSpacing:'0.04em' }}>{n.display}</span>
            </a>
          ))}

          {/* Info */}
          <div style={{ borderTop:'0.5px solid rgba(255,255,255,0.06)', marginTop:12, paddingTop:12, display:'flex', flexDirection:'column', gap:5 }}>
            {[
              { icon:'🕒', text:'Mo–Fr: 12:00 – 22:45 Uhr' },
              { icon:'🕒', text:'Sa–So: 13:00 – 22:45 Uhr' },
              { icon:'🚚', text:'Lieferkosten nur 1,00 €' },
              { icon:'📍', text:'Spichernstr. 64, 47137 Duisburg' },
            ].map(row => (
              <div key={row.text} style={{ display:'flex', alignItems:'center', gap:7, fontSize:11, color:'rgba(245,240,232,0.35)' }}>
                <span style={{ fontSize:11 }}>{row.icon}</span>
                <span>{row.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Float Button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Milano Pizzeria anrufen"
        style={{ position:'fixed', bottom:30, right:30, zIndex:500, width:56, height:56, borderRadius:'50%', background:'#6DA544', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 32px rgba(109,165,68,0.45)', transition:'all 0.3s', animation:'callPulse 3s ease-in-out infinite' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='scale(1.12)'; (e.currentTarget as HTMLElement).style.boxShadow='0 12px 44px rgba(109,165,68,0.6)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='scale(1)';    (e.currentTarget as HTMLElement).style.boxShadow='0 8px 32px rgba(109,165,68,0.45)'; }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </button>
    </>
  );
}

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ background: '#050505', borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>

      {/* ─── Ticker ─── */}
      <div style={{ background: '#0d0d0d', borderBottom: '0.5px solid rgba(255,255,255,0.06)', padding: '14px 0', overflow: 'hidden', position: 'relative' }}>
        <div style={{ display: 'flex', animation: 'ticker 30s linear infinite', whiteSpace: 'nowrap', gap: 60 }}>
          {[...Array(3)].map((_, i) => (
            <span key={i} style={{ display: 'inline-flex', gap: 60, flexShrink: 0 }}>
              {['🍕 Frische Pizza täglich', '🍝 Original Italienische Küche', '⭐ 4.9 Google Rating', '🛵 Lieferkosten nur 1,00 €', '📅 Tisch online reservieren', '📞 0203 · 45 65 284'].map(text => (
                <span key={text} style={{ fontSize: 13, color: '#555', fontWeight: 500 }}>{text}</span>
              ))}
            </span>
          ))}
        </div>
        <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
      </div>

      {/* ─── Main Footer ─── */}
      <div style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,60px)', maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'clamp(200px,28%,340px) repeat(3,1fr)', gap: 'clamp(32px,4vw,60px)', marginBottom: 60 }}>

          {/* Brand Column */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, background: 'linear-gradient(135deg,#c9a84c,#e8c97e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Milano<span style={{ WebkitTextFillColor: '#D62828' }}>·</span>Pizzeria
              </span>
            </Link>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8, marginBottom: 20 }}>
              Authentische Italienische Küche seit 2009. Frische Zutaten, traditionelle Rezepte, unvergessliche Momente.
            </p>

            {/* Opening Hours */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Öffnungszeiten</div>
              {[
                { days: 'Mo – Fr', time: '12:00 – 22:45' },
                { days: 'Sa – So', time: '13:00 – 22:45' },
              ].map(h => (
                <div key={h.days} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#666', padding: '5px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
                  <span>{h.days}</span>
                  <span style={{ color: '#888' }}>{h.time}</span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: '📞', value: '0203 · 45 65 284', href: 'tel:+4920345652844' },
                { icon: '📞', value: '0203 · 45 65 287', href: 'tel:+4920345652877' },
                { icon: '📍', value: 'Spichernstr. 64, 47137 Duisburg', href: 'https://maps.google.com/?q=Spichernstr+64+Duisburg' },
              ].map(c => (
                <a key={c.value} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#666', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#888'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#666'}
                >
                  <span>{c.icon}</span>
                  <span>{c.value}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {[
            { title: 'Restaurant', links: FOOTER_LINKS.restaurant },
            { title: 'Informationen', links: FOOTER_LINKS.info },
            { title: 'Rechtliches', links: FOOTER_LINKS.legal },
          ].map(col => (
            <div key={col.title}>
              <h3 style={{ fontSize: 12, fontWeight: 600, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
                {col.title}
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.links.map(link => (
                  <li key={link.href}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: 14, color: '#555', textDecoration: 'none', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5F5F5'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#555'}
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        style={{ fontSize: 14, color: '#555', textDecoration: 'none', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5F5F5'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#555'}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <p style={{ fontSize: 13, color: '#444' }} suppressHydrationWarning>
            © {new Date().getFullYear()} Milano Pizzeria Duisburg. Alle Rechte vorbehalten.
          </p>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: 10 }}>
            {SOCIAL_LINKS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, textDecoration: 'none', transition: 'all 0.25s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = s.color + '22'; (e.currentTarget as HTMLElement).style.borderColor = s.color + '44'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Payment Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#444', marginRight: 4 }}>Zahlung:</span>
            {PAYMENT_ICONS.map((icon, i) => (
              <span key={i} style={{ fontSize: 20, opacity: 0.5 }}>{icon}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Call Float Button */}
      <CallFloat />
      <style>{`
        @keyframes callPulse {
          0%, 100% { box-shadow: 0 8px 32px rgba(109,165,68,0.45), 0 0 0 0 rgba(109,165,68,0.3); }
          50%       { box-shadow: 0 8px 32px rgba(109,165,68,0.45), 0 0 0 12px rgba(109,165,68,0); }
        }
        @keyframes callPopIn {
          from { opacity: 0; transform: scale(0.85) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }
        @media (max-width: 768px) {
          footer [style*="grid-template-columns"] { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          footer [style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
