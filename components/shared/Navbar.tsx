'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavLink {
  href:  string;
  label: string;
  icon:  string;
  badge?: string;
}

const NAV_LINKS: NavLink[] = [
  { href: '/',            label: 'Home',          icon: '🏠' },
  { href: '/menu',        label: 'Speisekarte',    icon: '🍕' },
  { href: '/reservation', label: 'Reservieren',    icon: '📅' },
  { href: '/order',       label: 'Bestellen',      icon: '🛵', badge: 'Online' },
  { href: '/gallery',     label: 'Galerie',        icon: '🖼️' },
  { href: '/about',       label: 'Über uns',       icon: '🍴' },
  { href: '/contact',     label: 'Kontakt',        icon: '📞' },
];

// ─── Cart Store (simple zustand-free version) ─────────────────────────────────
let cartItemCount = 0;
const cartListeners: Array<(count: number) => void> = [];
export function updateCartCount(n: number) {
  cartItemCount = n;
  cartListeners.forEach(fn => fn(n));
}
function useCartCount() {
  const [count, setCount] = useState(cartItemCount);
  useEffect(() => {
    cartListeners.push(setCount);
    return () => { const i = cartListeners.indexOf(setCount); if (i > -1) cartListeners.splice(i, 1); };
  }, []);
  return count;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname      = usePathname();
  const cartCount     = useCartCount();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Focus search input
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100);
  }, [searchOpen]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/menu?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  }, [searchQuery]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav
        aria-label="Hauptnavigation"
        style={{
          position:   'fixed',
          top: 0, left: 0, right: 0,
          zIndex:     100,
          height:     72,
          display:    'flex',
          alignItems: 'center',
          padding:    '0 clamp(20px, 4vw, 60px)',
          background: scrolled
            ? 'rgba(5,5,5,0.97)'
            : 'rgba(5,5,5,0.7)',
          backdropFilter:         'blur(20px)',
          WebkitBackdropFilter:   'blur(20px)',
          borderBottom:           `0.5px solid ${scrolled ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)'}`,
          transition:             'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Milano Pizzeria — Startseite"
          style={{ textDecoration: 'none', flexShrink: 0, marginRight: 'clamp(20px,3vw,48px)' }}
        >
          <span style={{
            fontFamily:           'var(--font-playfair, "Playfair Display", serif)',
            fontSize:             22,
            fontWeight:           700,
            background:           'linear-gradient(135deg,#c9a84c,#e8c97e,#c9a84c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            backgroundClip:       'text',
            letterSpacing:        '1px',
            lineHeight:           1,
          }}>
            Milano<span style={{ WebkitTextFillColor: '#D62828' }}>·</span>Pizzeria
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div
          role="list"
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        4,
            flex:       1,
            overflow:   'hidden',
          }}
          className="hide-mobile"
        >
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              role="listitem"
              aria-current={isActive(link.href) ? 'page' : undefined}
              style={{
                display:        'flex',
                alignItems:     'center',
                gap:            6,
                padding:        '8px 14px',
                borderRadius:   10,
                fontSize:       14,
                fontWeight:     isActive(link.href) ? 600 : 400,
                color:          isActive(link.href) ? '#6DA544' : '#888',
                textDecoration: 'none',
                transition:     'all 0.2s',
                whiteSpace:     'nowrap',
                background:     isActive(link.href) ? 'rgba(109,165,68,0.1)' : 'transparent',
                border:         isActive(link.href) ? '0.5px solid rgba(109,165,68,0.2)' : '0.5px solid transparent',
                position:       'relative',
              }}
              onMouseEnter={e => {
                if (!isActive(link.href)) {
                  (e.currentTarget as HTMLElement).style.color = '#F5F5F5';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={e => {
                if (!isActive(link.href)) {
                  (e.currentTarget as HTMLElement).style.color = '#888';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }
              }}
            >
              <span aria-hidden="true">{link.icon}</span>
              {link.label}
              {link.badge && (
                <span style={{
                  background:    '#6DA544',
                  color:         '#fff',
                  fontSize:      9,
                  fontWeight:    700,
                  padding:       '1px 6px',
                  borderRadius:  100,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  lineHeight:    1.6,
                }}>
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 0 }}>

          {/* Search Toggle */}
          <button
            onClick={() => setSearchOpen(s => !s)}
            aria-label="Suche öffnen"
            aria-expanded={searchOpen}
            style={{
              background:  'rgba(255,255,255,0.05)',
              border:      '0.5px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              width:       38,
              height:      38,
              display:     'flex',
              alignItems:  'center',
              justifyContent: 'center',
              cursor:      'pointer',
              color:       '#888',
              fontSize:    16,
              transition:  'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F5F5F5'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#888'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
          >
            {searchOpen ? '✕' : '🔍'}
          </button>

          {/* Cart Button */}
          <Link
            href="/order"
            aria-label={`Warenkorb — ${cartCount} Artikel`}
            style={{
              display:        'flex',
              alignItems:     'center',
              gap:            8,
              background:     '#6DA544',
              border:         'none',
              borderRadius:   100,
              padding:        '9px 18px',
              fontSize:       13,
              fontWeight:     600,
              color:          '#fff',
              textDecoration: 'none',
              cursor:         'pointer',
              transition:     'all 0.25s',
              position:       'relative',
              flexShrink:     0,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#8bc34a'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#6DA544'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            <span aria-hidden="true">🛒</span>
            <span className="hide-small">Warenkorb</span>
            {cartCount > 0 && (
              <span style={{
                background:    '#D62828',
                color:         '#fff',
                fontSize:      10,
                fontWeight:    700,
                minWidth:      18,
                height:        18,
                borderRadius:  50,
                display:       'flex',
                alignItems:    'center',
                justifyContent: 'center',
                padding:       '0 5px',
              }}>
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(s => !s)}
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="show-mobile"
            style={{
              background:     'rgba(255,255,255,0.05)',
              border:         '0.5px solid rgba(255,255,255,0.1)',
              borderRadius:   10,
              width:          38,
              height:         38,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              cursor:         'pointer',
              color:          '#888',
              fontSize:       18,
              transition:     'all 0.2s',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* ─── SEARCH BAR ─── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{
              position:           'fixed',
              top:                72,
              left:               0,
              right:              0,
              zIndex:             99,
              background:         'rgba(5,5,5,0.97)',
              backdropFilter:     'blur(20px)',
              borderBottom:       '0.5px solid rgba(255,255,255,0.1)',
              padding:            '16px clamp(20px,4vw,60px)',
            }}
          >
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: 12, maxWidth: 600 }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: '#555', pointerEvents: 'none' }}>🔍</span>
                <input
                  ref={searchRef}
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Pizza, Pasta, Schnitzel suchen…"
                  aria-label="Speisekarte durchsuchen"
                  style={{
                    width:        '100%',
                    background:   '#141414',
                    border:       '0.5px solid rgba(255,255,255,0.15)',
                    borderRadius: 100,
                    padding:      '12px 16px 12px 44px',
                    color:        '#F5F5F5',
                    fontSize:     15,
                    outline:      'none',
                    fontFamily:   'inherit',
                  }}
                />
              </div>
              <button type="submit" style={{ background: '#6DA544', color: '#fff', border: 'none', borderRadius: 100, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit' }}>
                Suchen
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MOBILE MENU ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation"
            aria-modal="true"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position:    'fixed',
              inset:       0,
              zIndex:      200,
              background:  '#050505',
              display:     'flex',
              flexDirection: 'column',
              overflowY:   'auto',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '0.5px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, background: 'linear-gradient(135deg,#c9a84c,#e8c97e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Milano<span style={{ WebkitTextFillColor: '#D62828' }}>·</span>Pizzeria
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Menü schließen"
                style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#888', fontSize: 18 }}
              >
                ✕
              </button>
            </div>

            {/* Links */}
            <nav style={{ padding: '16px', flex: 1 }}>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      gap:            14,
                      padding:        '16px',
                      borderRadius:   14,
                      fontSize:       16,
                      fontWeight:     isActive(link.href) ? 600 : 400,
                      color:          isActive(link.href) ? '#6DA544' : '#ccc',
                      textDecoration: 'none',
                      background:     isActive(link.href) ? 'rgba(109,165,68,0.08)' : 'transparent',
                      marginBottom:   4,
                      transition:     'all 0.2s',
                    }}
                  >
                    <span style={{ fontSize: 22, width: 32, textAlign: 'center' }}>{link.icon}</span>
                    <span>{link.label}</span>
                    {link.badge && (
                      <span style={{ background: '#6DA544', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>
                        {link.badge}
                      </span>
                    )}
                    <span style={{ marginLeft: 'auto', color: '#555', fontSize: 18 }}>›</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <div style={{ padding: '24px', borderTop: '0.5px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                <a href="tel:02034565284" style={{ background: '#6DA544', color: '#fff', borderRadius: 100, padding: '12px', textAlign: 'center', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>📞 0203 · 45 65 284</a>
                <a href="tel:02034565287" style={{ background: 'rgba(109,165,68,0.15)', color: '#6DA544', border: '0.5px solid rgba(109,165,68,0.3)', borderRadius: 100, padding: '12px', textAlign: 'center', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>📞 0203 · 45 65 287</a>
              </div>
              <p style={{ fontSize: 12, color: '#555', textAlign: 'center' }}>
                📍 Spichernstr. 64, 47137 Duisburg
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Inline Styles (responsive) ─── */}
      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .hide-small  { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
        @media (max-width: 480px) {
          .hide-small { display: none !important; }
        }
      `}</style>
    </>
  );
}
