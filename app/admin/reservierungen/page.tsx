'use client';

import React, { useState, useEffect, useCallback } from 'react';

type Status = 'Neu' | 'Bestätigt' | 'Storniert';
type Filter = 'today' | 'tomorrow' | 'week' | 'all' | 'past';

interface Reservation {
  id: string;
  reservation_code: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  persons: number;
  occasion: string;
  notes: string | null;
  status: Status;
  created_at: string;
}

const SESSION_KEY = 'milano_admin_token';

const OCCASION_MAP: Record<string, string> = {
  romantic: '💑 Romantisch', family: '👨‍👩‍👧 Familie', birthday: '🎂 Geburtstag',
  business: '💼 Business',   friends: '🥂 Freunde',   anniversary: '💍 Jahrestag', other: '🍽️ Sonstiges',
};

const STATUS_CONFIG: Record<Status, { bg: string; color: string; border: string }> = {
  'Neu':       { bg: 'rgba(201,168,76,0.1)',  color: '#c9a84c', border: 'rgba(201,168,76,0.3)' },
  'Bestätigt': { bg: 'rgba(109,165,68,0.1)',  color: '#6DA544', border: 'rgba(109,165,68,0.3)' },
  'Storniert': { bg: 'rgba(214,40,40,0.1)',   color: '#D62828', border: 'rgba(214,40,40,0.3)'  },
};

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'today',    label: 'Heute'       },
  { id: 'tomorrow', label: 'Morgen'      },
  { id: 'week',     label: 'Diese Woche' },
  { id: 'all',      label: 'Kommende'    },
  { id: 'past',     label: 'Vergangene'  },
];

function formatDate(d: string): string {
  try {
    return new Date(d + 'T12:00:00').toLocaleDateString('de-DE', {
      weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric',
    });
  } catch { return d; }
}

export default function AdminReservierungen() {
  const [authed,      setAuthed]      = useState(false);
  const [token,       setToken]       = useState('');
  const [password,    setPassword]    = useState('');
  const [authError,   setAuthError]   = useState('');

  const [filter,      setFilter]      = useState<Filter>('today');
  const [rows,        setRows]        = useState<Reservation[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError,   setDataError]   = useState('');
  const [actionBusy,  setActionBusy]  = useState('');

  // Restore session
  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) { setToken(saved); setAuthed(true); }
  }, []);

  // ── CLIENT-SIDE LOGIN (no API call needed) ──────────────────────────────────
  function login() {
    if (!password.trim()) { setAuthError('Bitte Passwort eingeben.'); return; }

    // Check against NEXT_PUBLIC_ADMIN_PASSWORD (baked into client bundle by Next.js)
    const correct = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'milano2024';

    if (password === correct) {
      const tok = btoa(password);
      sessionStorage.setItem(SESSION_KEY, tok);
      setToken(tok);
      setAuthed(true);
      setAuthError('');
    } else {
      setAuthError('Falsches Passwort.');
      setPassword('');
    }
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setToken(''); setAuthed(false); setPassword(''); setRows([]);
  }

  // ── FETCH RESERVATIONS ──────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    if (!token) return;
    setDataLoading(true);
    setDataError('');
    try {
      const res  = await fetch(`/api/reservations?filter=${filter}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { logout(); return; }
      const json = await res.json();
      if (res.ok) setRows(json.data || []);
      else        setDataError(json.error || 'Fehler beim Laden.');
    } catch {
      setDataError('Netzwerkfehler. Ist Supabase konfiguriert?');
    } finally {
      setDataLoading(false);
    }
  }, [token, filter]);

  useEffect(() => { if (authed && token) fetchData(); }, [authed, token, fetchData]);

  // ── UPDATE STATUS ───────────────────────────────────────────────────────────
  async function updateStatus(id: string, status: Status) {
    setActionBusy(id + status);
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body:    JSON.stringify({ status }),
      });
      if (res.ok) setRows(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    } finally { setActionBusy(''); }
  }

  // ─── Stats ─────────────────────────────────────────────────────────────────
  const todayStr = new Date().toISOString().split('T')[0];
  const countNew = rows.filter(r => r.status === 'Neu').length;
  const countGuests = rows.filter(r => r.status !== 'Storniert').reduce((s, r) => s + r.persons, 0);

  const card: React.CSSProperties = {
    background: '#0d0d0d',
    border: '0.5px solid rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: '16px 20px',
  };

  // ══════════════════ LOGIN SCREEN ══════════════════
  if (!authed) return (
    <main style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter',sans-serif", padding: 24 }}>
      <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 40, width: '100%', maxWidth: 380, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🔐</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: '#F5F0E8', marginBottom: 4 }}>Admin Login</h1>
        <p style={{ fontSize: 13, color: '#555', marginBottom: 32 }}>Milano Pizzeria · Reservierungen</p>

        <input
          type="password"
          placeholder="Passwort eingeben"
          value={password}
          onChange={e => { setPassword(e.target.value); setAuthError(''); }}
          onKeyDown={e => e.key === 'Enter' && login()}
          autoFocus
          style={{
            width: '100%', background: '#141414',
            border: `0.5px solid ${authError ? '#D62828' : 'rgba(255,255,255,0.14)'}`,
            borderRadius: 12, padding: '13px 16px', color: '#F5F5F5',
            fontSize: 15, outline: 'none', fontFamily: 'inherit',
            marginBottom: 12, boxSizing: 'border-box',
          }}
          onFocus={e => (e.target.style.borderColor = '#6DA544')}
          onBlur={e  => (e.target.style.borderColor = authError ? '#D62828' : 'rgba(255,255,255,0.14)')}
        />

        {authError && (
          <div style={{ background: 'rgba(214,40,40,0.1)', border: '0.5px solid rgba(214,40,40,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#ff6b6b', marginBottom: 12, textAlign: 'left' }}>
            ⚠️ {authError}
          </div>
        )}

        <button
          onClick={login}
          style={{ width: '100%', background: '#6DA544', color: '#fff', border: 'none', padding: '14px', borderRadius: 100, fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#8bc34a')}
          onMouseLeave={e => (e.currentTarget.style.background = '#6DA544')}
        >
          Anmelden
        </button>
      </div>
    </main>
  );

  // ══════════════════ DASHBOARD ══════════════════
  return (
    <main style={{ background: '#050505', minHeight: '100vh', color: '#F5F0E8', fontFamily: "'Inter',sans-serif" }}>

      <header style={{ background: '#0d0d0d', borderBottom: '0.5px solid rgba(255,255,255,0.07)', padding: '14px clamp(16px,3vw,40px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, background: 'linear-gradient(135deg,#c9a84c,#e8c97e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Milano</span>
          <span style={{ fontSize: 13, color: '#444' }}>· Reservierungen</span>
        </div>
        <button onClick={logout} style={{ background: 'transparent', border: '0.5px solid rgba(255,255,255,0.1)', color: '#555', padding: '7px 16px', borderRadius: 100, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Abmelden</button>
      </header>

      <div style={{ padding: 'clamp(20px,3vw,40px)', maxWidth: 1200, margin: '0 auto' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { label: 'Heute',          val: String(rows.filter(r => r.date === todayStr).length), color: '#c9a84c' },
            { label: 'Neu / Offen',    val: String(countNew),                                     color: '#c9a84c' },
            { label: 'Gäste erwartet', val: `${countGuests} P.`,                                  color: '#6DA544' },
          ].map(s => (
            <div key={s.label} style={{ ...card, padding: '16px 18px' }}>
              <div style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
          {FILTERS.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              style={{ padding: '7px 16px', borderRadius: 100, border: 'none', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', background: filter === f.id ? '#6DA544' : 'rgba(255,255,255,0.05)', color: filter === f.id ? '#fff' : '#666' }}>
              {f.label}
            </button>
          ))}
          <button onClick={fetchData} style={{ marginLeft: 'auto', padding: '7px 14px', borderRadius: 100, border: '0.5px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#555', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
            🔄 Aktualisieren
          </button>
        </div>

        {/* Error */}
        {dataError && (
          <div style={{ background: 'rgba(214,40,40,0.08)', border: '0.5px solid rgba(214,40,40,0.25)', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#ff6b6b', marginBottom: 16 }}>
            ⚠️ {dataError}
          </div>
        )}

        {/* Table */}
        {dataLoading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#444' }}>Lädt…</div>
        ) : rows.length === 0 && !dataError ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#444' }}>Keine Reservierungen in diesem Zeitraum.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {rows.map(r => {
              const sc   = STATUS_CONFIG[r.status] ?? STATUS_CONFIG['Neu'];
              const busy = actionBusy.startsWith(r.id);
              return (
                <div key={r.id} style={card}>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto auto', gap: 14, alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#F5F0E8' }}>{r.time} Uhr</div>
                      <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>{formatDate(r.date)}</div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#F5F0E8' }}>{r.name}</span>
                        <a href={`tel:${r.phone.replace(/[\s\-]/g,'')}`} style={{ fontSize: 13, color: '#6DA544', textDecoration: 'none' }}>{r.phone}</a>
                        <span style={{ fontSize: 11, color: '#666', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: 6 }}>{r.persons} P.</span>
                        <span style={{ fontSize: 11, color: '#555' }}>{OCCASION_MAP[r.occasion] ?? r.occasion}</span>
                      </div>
                      {r.notes && <div style={{ fontSize: 12, color: '#666', marginTop: 3 }}>📝 {r.notes}</div>}
                      <div style={{ fontSize: 10, color: '#333', marginTop: 3, fontFamily: 'monospace' }}>{r.reservation_code}</div>
                    </div>
                    <div style={{ background: sc.bg, border: `0.5px solid ${sc.border}`, borderRadius: 100, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: sc.color }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: sc.color }}>{r.status}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {r.status !== 'Bestätigt' && (
                        <button onClick={() => updateStatus(r.id, 'Bestätigt')} disabled={busy}
                          style={{ background: 'rgba(109,165,68,0.12)', border: '0.5px solid rgba(109,165,68,0.3)', color: '#6DA544', padding: '5px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', opacity: busy ? 0.6 : 1 }}>✓</button>
                      )}
                      {r.status !== 'Storniert' && (
                        <button onClick={() => updateStatus(r.id, 'Storniert')} disabled={busy}
                          style={{ background: 'rgba(214,40,40,0.08)', border: '0.5px solid rgba(214,40,40,0.3)', color: '#D62828', padding: '5px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', opacity: busy ? 0.6 : 1 }}>✕</button>
                      )}
                      <a href={`tel:${r.phone.replace(/[\s\-]/g,'')}`}
                        style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', color: '#666', padding: '5px 10px', borderRadius: 8, fontSize: 11, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>📞</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
