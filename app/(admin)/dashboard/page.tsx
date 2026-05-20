'use client';

import React, { useState, useEffect, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
type AdminPage = 'dashboard' | 'orders' | 'reservations' | 'menu' | 'customers' | 'analytics' | 'notifications' | 'settings';

interface Admin { name: string; email: string; role: string }

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (admin: Admin, token: string) => void }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res  = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (data.success) onLogin(data.data.admin, data.data.token);
      else setError(data.error || 'Ungültige Anmeldedaten');
    } catch { setError('Verbindungsfehler'); }
    finally { setLoading(false); }
  }

  const iS: React.CSSProperties = { width: '100%', background: '#141414', border: '0.5px solid rgba(255,255,255,0.14)', borderRadius: 12, padding: '13px 16px', color: '#F5F5F5', fontSize: 14, outline: 'none', fontFamily: 'inherit' };

  return (
    <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, background: 'linear-gradient(135deg,#c9a84c,#e8c97e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 4 }}>
            Milano<span style={{ WebkitTextFillColor: '#D62828' }}>·</span>Admin
          </div>
          <p style={{ fontSize: 14, color: '#555' }}>Restaurant Management System</p>
        </div>
        <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32 }}>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 8 }}>E-Mail</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@milano-pizzeria.de" required style={iS} onFocus={e => (e.target.style.borderColor = '#6DA544')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.14)')} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 8 }}>Passwort</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={iS} onFocus={e => (e.target.style.borderColor = '#6DA544')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.14)')} />
            </div>
            {error && <div style={{ background: 'rgba(214,40,40,0.1)', border: '0.5px solid rgba(214,40,40,0.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#f87171' }}>❌ {error}</div>}
            <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#1c1c1c' : '#6DA544', color: loading ? '#555' : '#fff', border: 'none', padding: '15px', borderRadius: 100, fontSize: 15, fontWeight: 600, cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit', transition: 'all 0.25s' }}>
              {loading ? '⏳ Anmelden…' : '🔐 Anmelden'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({ icon, label, value, change, up }: { icon: string; label: string; value: string; change: string; up: boolean }) {
  return (
    <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 20, position: 'relative', overflow: 'hidden', transition: 'transform 0.2s, border-color 0.2s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}>
      <span style={{ fontSize: 24, display: 'block', marginBottom: 10 }}>{icon}</span>
      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: '#F5F5F5', display: 'block', marginBottom: 4 }}>{value}</span>
      <div style={{ fontSize: 12, color: '#555', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: up ? '#6DA544' : '#D62828', display: 'flex', alignItems: 'center', gap: 4 }}>
        {up ? '↑' : '↓'} {change}
      </div>
    </div>
  );
}

// ─── Bar Chart (Pure CSS) ─────────────────────────────────────────────────────
function BarChart({ data, labels }: { data: number[]; labels: string[] }) {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 180, paddingBottom: 24, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: '0 0 24px 0', background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 25%)', pointerEvents: 'none' }} />
      {data.map((v, i) => {
        const pct = Math.round((v / max) * 100);
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%' }}>
            <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
              <div style={{ width: '100%', height: `${pct}%`, background: i === data.length - 1 ? 'rgba(109,165,68,0.35)' : '#6DA544', borderRadius: '6px 6px 0 0', minHeight: 4, position: 'relative', transition: 'height 0.6s ease' }}>
                <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: 9, color: '#555', whiteSpace: 'nowrap' }}>{v > 0 ? v.toFixed(0) + ' €' : ''}</div>
              </div>
            </div>
            <span style={{ fontSize: 10, color: '#555' }}>{labels[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Status Pill ─────────────────────────────────────────────────────────────
function Pill({ status }: { status: string }) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    new:       { label: 'Neu', bg: 'rgba(37,99,235,0.15)', color: '#60a5fa' },
    prep:      { label: 'Zubereitung', bg: 'rgba(249,115,22,0.15)', color: '#fb923c' },
    ready:     { label: 'Fertig', bg: 'rgba(109,165,68,0.15)', color: '#6DA544' },
    delivered: { label: 'Geliefert', bg: 'rgba(255,255,255,0.06)', color: '#888' },
    cancelled: { label: 'Storniert', bg: 'rgba(214,40,40,0.12)', color: '#f87171' },
    confirmed: { label: 'Bestätigt', bg: 'rgba(109,165,68,0.15)', color: '#6DA544' },
    pending:   { label: 'Ausstehend', bg: 'rgba(201,168,76,0.15)', color: '#c9a84c' },
  };
  const s = map[status] || { label: status, bg: 'rgba(255,255,255,0.05)', color: '#888' };
  return <span style={{ background: s.bg, color: s.color, padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' as const }}>{s.label}</span>;
}

// ─── Dashboard Content ────────────────────────────────────────────────────────
function DashboardContent() {
  const WEEKLY = [1240, 1580, 1120, 1890, 2340, 2780, 1960];
  const DAYS   = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const ORDERS = [
    { id: '#ORD-1421', customer: 'Ahmed Müller', items: 'Margherita ×2', total: '26.80', status: 'new',  type: '🛵', time: 'vor 2 Min' },
    { id: '#ORD-1420', customer: 'Sarah Weber',  items: 'Carbonara ×1',  total: '17.80', status: 'prep', type: '🛵', time: 'vor 8 Min' },
    { id: '#ORD-1419', customer: 'Tisch 4',       items: 'Diavola ×1',   total: '19.40', status: 'ready', type: '🏪', time: 'vor 15 Min' },
    { id: '#ORD-1418', customer: 'Thomas B.',     items: 'Family Bundle', total: '39.90', status: 'delivered', type: '🛵', time: 'vor 35 Min' },
  ];
  const RES = [
    { id: '#RES-284', name: 'Familie Özdemir', guests: 6, time: 'Heute 19:00', status: 'confirmed' },
    { id: '#RES-283', name: 'Max M.',          guests: 2, time: 'Heute 20:30', status: 'confirmed' },
    { id: '#RES-282', name: 'Business GmbH',   guests: 8, time: 'Morgen 12:00', status: 'pending' },
  ];
  const TOP = [
    { emoji: '🍕', name: 'Margherita Classica', sales: 248, pct: 85 },
    { emoji: '🍝', name: 'Spaghetti Carbonara', sales: 195, pct: 67 },
    { emoji: '🍕', name: 'Diavola',             sales: 167, pct: 57 },
    { emoji: '🥩', name: 'Wiener Schnitzel',    sales: 134, pct: 46 },
    { emoji: '🍰', name: 'Tiramisù',            sales: 112, pct: 38 },
  ];

  const card = (title: string, sub: string, children: React.ReactNode, action?: React.ReactNode) => (
    <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#F5F5F5' }}>{title}</div>
          <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>{sub}</div>
        </div>
        {action}
      </div>
      {children}
    </div>
  );

  return (
    <>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        <KpiCard icon="💶" label="Umsatz heute"     value="847 €"  change="+12.4% vs gestern" up />
        <KpiCard icon="📋" label="Bestellungen"      value="47"     change="+8 vs gestern"      up />
        <KpiCard icon="📅" label="Reservierungen"   value="12"     change="3 noch heute"        up />
        <KpiCard icon="⭐" label="Ø Bewertung"       value="4.9"    change="+0.1 diese Woche"   up />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, marginBottom: 20 }}>
        {card('📈 Umsatz diese Woche', `Gesamt: ${WEEKLY.reduce((s, v) => s + v, 0).toLocaleString('de-DE')} €`,
          <BarChart data={WEEKLY} labels={DAYS} />
        )}
        {card('🏆 Top Gerichte', 'Diese Woche',
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {TOP.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18, width: 28, textAlign: 'center' }}>{d.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#ccc', marginBottom: 3 }}>{d.name}</div>
                  <div style={{ height: 4, background: '#1c1c1c', borderRadius: 2 }}>
                    <div style={{ height: '100%', width: `${d.pct}%`, background: '#6DA544', borderRadius: 2, transition: 'width 0.8s ease' }} />
                  </div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#c9a84c', minWidth: 28, textAlign: 'right' }}>{d.sales}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Orders + Reservations */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginBottom: 20 }}>
        {card('🔴 Live Bestellungen', '4 aktiv',
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead><tr>{['ID','Kunde','Betrag','Status','Aktion'].map(h => <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontSize: 11, color: '#555', borderBottom: '0.5px solid rgba(255,255,255,0.07)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>)}</tr></thead>
              <tbody>
                {ORDERS.map(o => (
                  <tr key={o.id}>
                    <td style={{ padding: '10px', color: '#c9a84c', fontFamily: 'monospace', fontSize: 12 }}>{o.id}</td>
                    <td style={{ padding: '10px', color: '#ccc' }}>{o.type} {o.customer}</td>
                    <td style={{ padding: '10px', fontWeight: 700, color: '#F5F5F5' }}>{o.total} €</td>
                    <td style={{ padding: '10px' }}><Pill status={o.status} /></td>
                    <td style={{ padding: '10px' }}>
                      {o.status === 'new'  && <button style={{ background: 'rgba(109,165,68,0.15)', border: '0.5px solid rgba(109,165,68,0.3)', color: '#6DA544', padding: '4px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>✓ Annehmen</button>}
                      {o.status === 'prep' && <button style={{ background: 'rgba(109,165,68,0.15)', border: '0.5px solid rgba(109,165,68,0.3)', color: '#6DA544', padding: '4px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>Fertig</button>}
                      {['ready','delivered'].includes(o.status) && <span style={{ fontSize: 11, color: '#555' }}>{o.time}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(214,40,40,0.12)', border: '0.5px solid rgba(214,40,40,0.2)', color: '#f87171', padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D62828', animation: 'blink 1.5s infinite', display: 'inline-block' }} />LIVE
          </span>
        )}

        {card('📅 Reservierungen heute', `${RES.length} Reservierungen`,
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {RES.map(r => (
              <div key={r.id} style={{ background: '#141414', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#F5F5F5' }}>{r.name}</div>
                  <Pill status={r.status} />
                </div>
                <div style={{ fontSize: 12, color: '#555' }}>👥 {r.guests} Personen · 🕐 {r.time}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {[
          { icon: '🛵', label: 'Lieferungen', val: '34', sub: 'Ø 28 Min.', color: '#6DA544' },
          { icon: '🏪', label: 'Abholungen',  val: '13', sub: 'Ø 15 Min.', color: '#c9a84c' },
          { icon: '💳', label: 'Online Zahlung', val: '82%', sub: '38 von 47 Bestellungen', color: '#60a5fa' },
        ].map(s => (
          <div key={s.label} style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: '#F5F5F5' }}>{s.val}</div>
            <div style={{ fontSize: 13, color: '#555', marginTop: 2 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: s.color, marginTop: 6 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </>
  );
}

// ─── Sidebar Item ─────────────────────────────────────────────────────────────
function SbItem({ icon, label, active, badge, onClick }: any) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', margin: '2px 8px', borderRadius: 10, cursor: 'pointer', background: active ? 'rgba(109,165,68,0.1)' : 'transparent', border: active ? '0.5px solid rgba(109,165,68,0.2)' : '0.5px solid transparent', color: active ? '#6DA544' : '#888', fontSize: 13, fontWeight: active ? 600 : 400, transition: 'all 0.2s' }}
      onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = '#141414'; (e.currentTarget as HTMLElement).style.color = '#F5F5F5'; } }}
      onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#888'; } }}>
      <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>{icon}</span>
      {label}
      {badge && <span style={{ marginLeft: 'auto', background: badge === 'new' ? '#D62828' : '#6DA544', color: '#fff', width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{badge}</span>}
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const [admin, setAdmin]       = useState<Admin | null>(null);
  const [token, setToken]       = useState('');
  const [page, setPage]         = useState<AdminPage>('dashboard');
  const [loading, setLoading]   = useState(true);

  // Try to restore session
  useEffect(() => {
    const savedToken = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    if (savedToken) {
      fetch('/api/auth', { headers: { Authorization: `Bearer ${savedToken}` } })
        .then(r => r.json())
        .then(d => { if (d.success) { setAdmin(d.data); setToken(savedToken); } })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else { setLoading(false); }
  }, []);

  const handleLogin = useCallback((adminData: Admin, adminToken: string) => {
    setAdmin(adminData); setToken(adminToken);
    if (typeof window !== 'undefined') localStorage.setItem('admin_token', adminToken);
  }, []);

  const handleLogout = useCallback(async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    if (typeof window !== 'undefined') localStorage.removeItem('admin_token');
    setAdmin(null); setToken('');
  }, []);

  if (loading) return <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontFamily: 'Inter,sans-serif' }}>⏳ Laden…</div>;
  if (!admin)  return <LoginScreen onLogin={handleLogin} />;

  const titles: Record<AdminPage, string> = { dashboard: 'Dashboard', orders: 'Bestellungen', reservations: 'Reservierungen', menu: 'Speisekarte', customers: 'Kunden', analytics: 'Analytics', notifications: 'Benachrichtigungen', settings: 'Einstellungen' };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#050505', color: '#F5F5F5', fontFamily: 'Inter,sans-serif', overflow: 'hidden' }}>

      {/* Sidebar */}
      <aside style={{ width: 220, flexShrink: 0, background: '#0d0d0d', borderRight: '0.5px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '24px 20px', borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, background: 'linear-gradient(135deg,#c9a84c,#e8c97e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Milano Admin</div>
          <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>Restaurant Management</div>
        </div>

        <div style={{ padding: '12px 0 4px', fontSize: 10, color: '#444', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', paddingLeft: 20 }}>Übersicht</div>
        <SbItem icon="📊" label="Dashboard"     active={page === 'dashboard'}     onClick={() => setPage('dashboard')} />
        <SbItem icon="🔴" label="Live Bestellungen" active={page === 'orders'}   onClick={() => setPage('orders')} badge={4} />

        <div style={{ padding: '12px 0 4px', fontSize: 10, color: '#444', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', paddingLeft: 20, marginTop: 4 }}>Verwaltung</div>
        <SbItem icon="📋" label="Bestellungen"      active={page === 'orders'}        onClick={() => setPage('orders')} />
        <SbItem icon="📅" label="Reservierungen"    active={page === 'reservations'}  onClick={() => setPage('reservations')} badge={3} />
        <SbItem icon="🍕" label="Speisekarte"        active={page === 'menu'}          onClick={() => setPage('menu')} />
        <SbItem icon="👥" label="Kunden"             active={page === 'customers'}     onClick={() => setPage('customers')} />

        <div style={{ padding: '12px 0 4px', fontSize: 10, color: '#444', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', paddingLeft: 20, marginTop: 4 }}>System</div>
        <SbItem icon="📈" label="Analytics"         active={page === 'analytics'}      onClick={() => setPage('analytics')} />
        <SbItem icon="🔔" label="Benachrichtigungen" active={page === 'notifications'} onClick={() => setPage('notifications')} badge={'new'} />
        <SbItem icon="⚙️" label="Einstellungen"      active={page === 'settings'}      onClick={() => setPage('settings')} />

        <div style={{ marginTop: 'auto', padding: '16px 12px', borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 8px', borderRadius: 10, cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#141414'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#6DA544,#c9a84c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
              {admin.name[0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#F5F5F5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{admin.name}</div>
              <div style={{ fontSize: 10, color: '#555' }}>{admin.role}</div>
            </div>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 14, padding: 4, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#D62828')} onMouseLeave={e => (e.currentTarget.style.color = '#555')} title="Abmelden">
              🚪
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <div style={{ padding: '0 28px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(10px)', borderBottom: '0.5px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: '#F5F5F5' }}>{titles[page]}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: '#555' }}>🔍</span>
              <input placeholder="Suchen…" style={{ background: '#141414', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '8px 16px 8px 34px', color: '#F5F5F5', fontSize: 13, outline: 'none', fontFamily: 'inherit', width: 200 }} onFocus={e => (e.target.style.borderColor = '#6DA544')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>
            <button onClick={() => setPage('notifications')} style={{ position: 'relative', background: '#141414', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: '#888' }}>
              🔔
              <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: '#D62828', border: '2px solid #050505' }} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          {page === 'dashboard' && <DashboardContent />}
          {page !== 'dashboard' && (
            <div style={{ textAlign: 'center', padding: '100px 24px', color: '#555' }}>
              <div style={{ fontSize: 56, marginBottom: 16, opacity: 0.3 }}>🔧</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: '#F5F5F5', marginBottom: 8 }}>{titles[page]}</h3>
              <p>Diese Seite ist in Entwicklung — vollständig implementiert in der Produktionsversion.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
