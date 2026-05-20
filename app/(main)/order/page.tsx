'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';

// ─── Types ────────────────────────────────────────────────────────────────────
type Step = 'cart' | 'customer' | 'confirm' | 'success';
interface Address  { street: string; houseNumber: string; zip: string; city: string; notes?: string }
interface Customer { name: string; phone: string }

// ─── Steps (no payment) ───────────────────────────────────────────────────────
const STEPS: { id: Step; label: string; icon: string }[] = [
  { id: 'cart',     label: 'Warenkorb', icon: '🛒' },
  { id: 'customer', label: 'Kontakt',   icon: '👤' },
  { id: 'confirm',  label: 'Prüfen',    icon: '✅' },
];
const STEP_ORDER: Step[] = ['cart', 'customer', 'confirm'];

// ─── Shared Styles ────────────────────────────────────────────────────────────
const S = {
  card:      { background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 28 } as React.CSSProperties,
  label:     { display: 'block', fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 8 },
  input:     (err?: boolean): React.CSSProperties => ({ width: '100%', background: '#141414', border: `0.5px solid ${err ? '#D62828' : 'rgba(255,255,255,0.14)'}`, borderRadius: 12, padding: '13px 16px', color: '#F5F5F5', fontSize: 14, outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s' }),
  btnPrimary:{ width: '100%', background: '#6DA544', color: '#fff', border: 'none', padding: '16px', borderRadius: 100, fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 } as React.CSSProperties,
  btnBack:   { width: '100%', background: 'transparent', color: '#888', border: '0.5px solid rgba(255,255,255,0.14)', padding: '14px', borderRadius: 100, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', marginTop: 10 } as React.CSSProperties,
};

// ─── Min-Order Warning ────────────────────────────────────────────────────────
function MinOrderWarning({ total, onSwitch, onContinue }: { total: number; onSwitch: () => void; onContinue: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(0,0,0,0.87)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <motion.div initial={{ scale: 0.88, y: 24 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', duration: 0.5 }}
        style={{ background: '#0d0d0d', border: '0.5px solid rgba(201,168,76,0.25)', borderRadius: 24, padding: 36, maxWidth: 460, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 52, marginBottom: 20 }}>🛵</div>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: '#F5F5F5', marginBottom: 12 }}>
          Mindestbestellwert nicht erreicht
        </h3>
        <div style={{ background: 'rgba(201,168,76,0.08)', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: 12, padding: '14px 20px', marginBottom: 16 }}>
          <div style={{ fontSize: 14, color: 'rgba(245,240,232,0.6)', marginBottom: 4 }}>Ihr aktueller Bestellwert</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: '#c9a84c' }}>{total.toFixed(2)} €</div>
          <div style={{ fontSize: 13, color: 'rgba(245,240,232,0.4)', marginTop: 4 }}>
            Mindestbestellwert für Lieferung: <strong style={{ color: '#F5F5F5' }}>10,00 €</strong>
          </div>
        </div>
        <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7, marginBottom: 28 }}>
          Bitte fügen Sie weitere Artikel hinzu oder wählen Sie Abholung im Restaurant.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={onContinue} style={{ ...S.btnPrimary }}>🍕 Weiter bestellen</button>
          <button onClick={onSwitch}   style={{ ...S.btnBack, marginTop: 0 }}>🏪 Zu Abholung wechseln</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Cart Step ────────────────────────────────────────────────────────────────
function CartStep({ onNext }: { onNext: () => void }) {
  const { items, removeItem, updateQuantity, deliveryMode, setDeliveryMode, subtotal, deliveryFee, total } = useCartStore();
  const [showWarning, setShowWarning] = useState(false);

  function handleNext() {
    if (deliveryMode === 'delivery' && subtotal() < 10) { setShowWarning(true); return; }
    onNext();
  }

  if (!items.length) return (
    <div style={{ textAlign: 'center', padding: '80px 24px' }}>
      <div style={{ fontSize: 72, marginBottom: 20, opacity: 0.3 }}>🛒</div>
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: '#F5F5F5', marginBottom: 10 }}>Ihr Warenkorb ist leer</h3>
      <p style={{ color: '#555', marginBottom: 28, fontSize: 15 }}>Fügen Sie leckere Gerichte aus unserer Speisekarte hinzu</p>
      <a href="/menu" style={{ background: '#6DA544', color: '#fff', padding: '14px 32px', borderRadius: 100, textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>🍕 Zur Speisekarte</a>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {showWarning && (
          <MinOrderWarning
            total={subtotal()}
            onSwitch={() => { setDeliveryMode('pickup'); setShowWarning(false); }}
            onContinue={() => setShowWarning(false)}
          />
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
        <div>
          {/* Delivery Toggle */}
          <div style={{ ...S.card, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#F5F5F5', marginBottom: 14 }}>Lieferart wählen</div>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { id: 'delivery', icon: '🛵', label: 'Lieferung',  sub: '~30 Min · kostenlos ab 10,00 €' },
                { id: 'pickup',   icon: '🏪', label: 'Abholung',   sub: '~15 Min · kostenlos'             },
              ].map(m => (
                <div key={m.id} onClick={() => setDeliveryMode(m.id as any)}
                  style={{ flex: 1, padding: '14px', borderRadius: 14, border: `0.5px solid ${deliveryMode === m.id ? '#6DA544' : 'rgba(255,255,255,0.1)'}`, background: deliveryMode === m.id ? 'rgba(109,165,68,0.08)' : 'transparent', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: 26, marginBottom: 6 }}>{m.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: deliveryMode === m.id ? '#6DA544' : '#F5F5F5' }}>{m.label}</div>
                  <div style={{ fontSize: 11, color: '#555', marginTop: 3 }}>{m.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Items */}
          <div style={S.card}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#F5F5F5', marginBottom: 16 }}>Bestellung ({items.length} Artikel)</div>
            {items.map(item => (
              <div key={item.key} style={{ display: 'flex', gap: 14, padding: '16px 0', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: 54, height: 54, background: '#141414', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#F5F5F5', marginBottom: 2 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: '#555', marginBottom: 8 }}>{item.sizeName}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button onClick={() => updateQuantity(item.key, item.quantity - 1)} style={{ background: '#1c1c1c', border: '0.5px solid rgba(255,255,255,0.1)', color: '#F5F5F5', width: 28, height: 28, borderRadius: '8px 0 0 8px', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                      <div style={{ background: '#1c1c1c', borderTop: '0.5px solid rgba(255,255,255,0.1)', borderBottom: '0.5px solid rgba(255,255,255,0.1)', width: 36, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: '#F5F5F5' }}>{item.quantity}</div>
                      <button onClick={() => updateQuantity(item.key, item.quantity + 1)} style={{ background: '#1c1c1c', border: '0.5px solid rgba(255,255,255,0.1)', color: '#F5F5F5', width: 28, height: 28, borderRadius: '0 8px 8px 0', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: '#c9a84c' }}>{item.totalPrice.toFixed(2)} €</span>
                      <button onClick={() => removeItem(item.key)} style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: 16, padding: 4, transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#D62828')} onMouseLeave={e => (e.currentTarget.style.color = '#444')}>🗑️</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary sidebar */}
        <div style={{ position: 'sticky', top: 90 }}>
          <div style={S.card}>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#F5F5F5', marginBottom: 20, fontFamily: "'Playfair Display',serif" }}>Zusammenfassung</div>
            <div style={{ padding: '16px 0', borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
              {[
                { label: 'Zwischensumme', val: `${subtotal().toFixed(2)} €` },
                ...(deliveryMode === 'delivery' ? [{ label: 'Lieferung', val: deliveryFee() === 0 ? '✅ Kostenlos' : `${deliveryFee().toFixed(2)} €` }] : []),
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#666', padding: '5px 0' }}>
                  <span>{row.label}</span><span>{row.val}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 700, color: '#F5F5F5', borderTop: '0.5px solid rgba(255,255,255,0.1)', marginTop: 12, paddingTop: 14 }}>
                <span>Gesamt</span>
                <span style={{ color: '#c9a84c', fontFamily: "'Playfair Display',serif" }}>{total().toFixed(2)} €</span>
              </div>
            </div>

            {deliveryMode === 'delivery' && subtotal() < 10 && (
              <div style={{ background: 'rgba(201,168,76,0.08)', border: '0.5px solid rgba(201,168,76,0.2)', borderRadius: 10, padding: '10px 14px', marginBottom: 14, fontSize: 12, color: 'rgba(201,168,76,0.8)', lineHeight: 1.6 }}>
                ⚠️ Lieferung ab <strong>10,00 €</strong> Mindestbestellwert<br />
                <span style={{ color: '#666' }}>Noch {(10 - subtotal()).toFixed(2)} € bis zur kostenlosen Lieferung.</span>
              </div>
            )}

            <button onClick={handleNext} style={S.btnPrimary}
              onMouseEnter={e => (e.currentTarget.style.background = '#8bc34a')} onMouseLeave={e => (e.currentTarget.style.background = '#6DA544')}>
              Weiter zu Kontaktdaten →
            </button>
            <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: '#444' }}>
              🔒 Zahlung bei {deliveryMode === 'delivery' ? 'Lieferung' : 'Abholung'} · Lieferung kostenlos
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Field — top-level so React never remounts it on parent re-render ─────────
function Field({ label, placeholder, value, onChange, type = 'text', err }: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string; err?: string;
}) {
  return (
    <div>
      <label style={S.label}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={ev => onChange(ev.target.value)}
        style={S.input(!!err)}
        onFocus={ev => (ev.target.style.borderColor = '#6DA544')}
        onBlur={ev  => (ev.target.style.borderColor = err ? '#D62828' : 'rgba(255,255,255,0.14)')}
      />
      {err && <p style={{ fontSize: 11, color: '#D62828', marginTop: 4 }}>{err}</p>}
    </div>
  );
}

// ─── Customer Step ────────────────────────────────────────────────────────────
function CustomerStep({ customer, setCustomer, address, setAddress, deliveryMode, onNext, onBack }: any) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!customer.name.trim())  e.name  = 'Name erforderlich';
    if (!customer.phone.trim()) e.phone = 'Telefonnummer erforderlich';
    if (deliveryMode === 'delivery') {
      if (!address.street.trim())      e.street      = 'Straße erforderlich';
      if (!address.houseNumber.trim()) e.houseNumber = 'Hausnummer erforderlich';
      if (!address.zip.trim())         e.zip         = 'PLZ erforderlich';
    }
    setErrors(e);
    return !Object.keys(e).length;
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      {/* Contact — Name + Phone only, no email */}
      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#F5F5F5', marginBottom: 6, fontFamily: "'Playfair Display',serif" }}>👤 Ihre Kontaktdaten</div>
        <p style={{ fontSize: 13, color: '#555', marginBottom: 20 }}>Wir rufen Sie zur Bestätigung Ihrer Bestellung an.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label="Name *"     placeholder="Ihr Name"  value={customer.name}  onChange={(v: string) => setCustomer({ ...customer, name: v })}  err={errors.name} />
          <Field label="Telefon *"  placeholder="0203 …"    value={customer.phone} onChange={(v: string) => setCustomer({ ...customer, phone: v })} err={errors.phone} type="tel" />
        </div>
      </div>

      {/* Address — only for delivery */}
      {deliveryMode === 'delivery' && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          style={{ ...S.card, marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#F5F5F5', marginBottom: 20, fontFamily: "'Playfair Display',serif" }}>📍 Lieferadresse</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: 14, marginBottom: 14 }}>
            <Field label="Straße *"    placeholder="Straßenname"  value={address.street}      onChange={(v: string) => setAddress({ ...address, street: v })}      err={errors.street} />
            <Field label="Nr. *"       placeholder="Nr."          value={address.houseNumber} onChange={(v: string) => setAddress({ ...address, houseNumber: v })} err={errors.houseNumber} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 14, marginBottom: 14 }}>
            <Field label="PLZ *"       placeholder="47137"        value={address.zip}  onChange={(v: string) => setAddress({ ...address, zip: v })}  err={errors.zip} />
            <Field label="Stadt"       placeholder="Duisburg"     value={address.city} onChange={(v: string) => setAddress({ ...address, city: v })} />
          </div>
          <Field   label="Hinweise"    placeholder="Etage, Klingel, Sonstiges …"
            value={address.notes || ''} onChange={(v: string) => setAddress({ ...address, notes: v })} />
        </motion.div>
      )}

      {/* Abholung info — only for pickup */}
      {deliveryMode === 'pickup' && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          style={{ ...S.card, marginBottom: 20, border: '0.5px solid rgba(109,165,68,0.2)', background: 'rgba(109,165,68,0.04)' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ fontSize: 36 }}>🏪</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#F5F5F5', marginBottom: 4 }}>Abholung im Restaurant</div>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 1.7 }}>
                Spichernstr. 64 · 47137 Duisburg<br />
                Bereit in ca. 15 Minuten · Barzahlung vor Ort
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <button onClick={() => validate() && onNext()} style={S.btnPrimary}
        onMouseEnter={e => (e.currentTarget.style.background = '#8bc34a')} onMouseLeave={e => (e.currentTarget.style.background = '#6DA544')}>
        Weiter zur Überprüfung →
      </button>
      <button onClick={onBack} style={S.btnBack}>← Zurück zum Warenkorb</button>
    </div>
  );
}

// ─── Confirm Step ─────────────────────────────────────────────────────────────
function ConfirmStep({ customer, address, deliveryMode, items, total, onSubmit, onBack, loading }: any) {
  return (
    <div style={{ maxWidth: 620, margin: '0 auto' }}>
      {/* Items summary */}
      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#F5F5F5', marginBottom: 20, fontFamily: "'Playfair Display',serif" }}>🍕 Bestellübersicht</div>
        {items.map((item: any) => (
          <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: 22 }}>{item.emoji}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#F5F5F5' }}>{item.name}</div>
                <div style={{ fontSize: 11, color: '#555' }}>{item.sizeName} · {item.quantity}×</div>
              </div>
            </div>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: '#c9a84c' }}>{item.totalPrice.toFixed(2)} €</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 700, color: '#F5F5F5', marginTop: 16, paddingTop: 14, borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>
          <span>Gesamt</span>
          <span style={{ color: '#c9a84c', fontFamily: "'Playfair Display',serif" }}>{total.toFixed(2)} €</span>
        </div>
      </div>

      {/* Customer info */}
      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#F5F5F5', marginBottom: 16, fontFamily: "'Playfair Display',serif" }}>📋 Ihre Angaben</div>
        {[
          { label: 'Name',       val: customer.name },
          { label: 'Telefon',    val: customer.phone },
          { label: 'Bestellart', val: deliveryMode === 'delivery' ? '🛵 Lieferung — ca. 30 Min.' : '🏪 Abholung im Restaurant — ca. 15 Min.' },
          ...(deliveryMode === 'delivery' ? [{ label: 'Adresse', val: `${address.street} ${address.houseNumber}, ${address.zip} ${address.city}${address.notes ? ` · ${address.notes}` : ''}` }] : []),
          { label: 'Zahlung',    val: `💶 Barzahlung bei ${deliveryMode === 'delivery' ? 'Lieferung' : 'Abholung'}` },
        ].map(r => (
          <div key={r.label} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)', fontSize: 13 }}>
            <span style={{ color: '#555', minWidth: 100 }}>{r.label}</span>
            <span style={{ color: '#F5F5F5' }}>{r.val}</span>
          </div>
        ))}
      </div>

      {/* Confirmation note */}
      <div style={{ background: 'rgba(201,168,76,0.06)', border: '0.5px solid rgba(201,168,76,0.18)', borderRadius: 14, padding: '14px 18px', marginBottom: 20, fontSize: 13, color: 'rgba(245,240,232,0.55)', lineHeight: 1.7 }}>
        📞 Wir rufen Sie nach der Bestellung unter <strong style={{ color: '#c9a84c' }}>{customer.phone}</strong> an, um Ihre Bestellung zu bestätigen.
      </div>

      <button onClick={onSubmit} disabled={loading} style={{ ...S.btnPrimary, opacity: loading ? 0.7 : 1 }}
        onMouseEnter={e => { if (!loading) (e.currentTarget.style.background = '#8bc34a'); }}
        onMouseLeave={e => { if (!loading) (e.currentTarget.style.background = '#6DA544'); }}>
        {loading ? '⏳ Wird vorbereitet …' : '🍕 Jetzt verbindlich bestellen'}
      </button>
      <button onClick={onBack} style={S.btnBack}>← Zurück</button>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────
function SuccessScreen({ customer, address, deliveryMode, items, orderTotal }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '20px 0 60px' }}>

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1, duration: 0.7 }}
        style={{ width: 96, height: 96, borderRadius: '50%', background: 'rgba(109,165,68,0.15)', border: '2px solid #6DA544', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, margin: '0 auto 28px' }}>
        🍕
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(24px,5vw,34px)', fontWeight: 700, color: '#F5F5F5', marginBottom: 10 }}>
          Bestellung vorbereitet
        </h2>
        <p style={{ fontSize: 15, color: '#888', lineHeight: 1.8, marginBottom: 6 }}>
          Vielen Dank, <strong style={{ color: '#F5F5F5' }}>{customer.name}</strong>!
        </p>
        <p style={{ fontSize: 15, color: '#888', lineHeight: 1.8, marginBottom: 32 }}>
          Ihre Bestellung wurde vorbereitet.<br />
          Bitte bestätigen Sie Ihre Bestellung telefonisch.
        </p>

        {/* Phone buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
          {[
            { display: '0203 · 45 65 284', tel: '+4920345652844' },
            { display: '0203 · 45 65 287', tel: '+4920345652877' },
          ].map(n => (
            <a key={n.tel} href={`tel:${n.tel}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#6DA544', color: '#fff', padding: '14px 24px', borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none', transition: 'all 0.25s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#8bc34a')} onMouseLeave={e => (e.currentTarget.style.background = '#6DA544')}>
              📞 {n.display}
            </a>
          ))}
        </div>

        {/* Order summary */}
        <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 24, marginBottom: 24, textAlign: 'left' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Bestellübersicht</div>
          {items.map((item: any) => (
            <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)', fontSize: 13 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span>{item.emoji}</span>
                <span style={{ color: '#F5F5F5' }}>{item.quantity}× {item.name}</span>
                {item.sizeName && <span style={{ color: '#555', fontSize: 11 }}>{item.sizeName}</span>}
              </div>
              <span style={{ color: '#c9a84c', fontWeight: 600 }}>{item.totalPrice.toFixed(2)} €</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, paddingTop: 14, marginTop: 8, borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
            <span style={{ color: '#F5F5F5' }}>Gesamt</span>
            <span style={{ color: '#c9a84c', fontFamily: "'Playfair Display',serif" }}>{orderTotal.toFixed(2)} €</span>
          </div>

          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '0.5px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 5 }}>
            {deliveryMode === 'delivery' ? (
              <>
                <div style={{ fontSize: 13, color: '#666' }}>🛵 Lieferung · ca. 30 Minuten</div>
                <div style={{ fontSize: 13, color: '#888' }}>📍 {address.street} {address.houseNumber}, {address.zip} {address.city}{address.notes ? ` · ${address.notes}` : ''}</div>
              </>
            ) : (
              <div style={{ fontSize: 13, color: '#666' }}>🏪 Abholung · Spichernstr. 64, 47137 Duisburg · ca. 15 Minuten</div>
            )}
            <div style={{ fontSize: 13, color: '#666' }}>💶 Barzahlung bei {deliveryMode === 'delivery' ? 'Lieferung' : 'Abholung'}</div>
          </div>
        </div>

        <a href="/menu"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#888', border: '0.5px solid rgba(255,255,255,0.15)', padding: '13px 28px', borderRadius: 100, fontSize: 14, textDecoration: 'none', transition: 'all 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}>
          ← Zurück zur Speisekarte
        </a>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OrderPage() {
  const [step,     setStep]     = useState<Step>('cart');
  const [loading,  setLoading]  = useState(false);
  const [customer, setCustomer] = useState<Customer>({ name: '', phone: '' });
  const [address,  setAddress]  = useState<Address>({ street: '', houseNumber: '', zip: '47', city: 'Duisburg' });
  const [snapshot, setSnapshot] = useState<{ items: any[]; total: number } | null>(null);

  const { items, deliveryMode, total, clearCart } = useCartStore();
  const currentIdx = STEP_ORDER.indexOf(step);

  function handleSubmit() {
    setLoading(true);
    const snap = { items: [...items], total: total() };
    setTimeout(() => {
      setSnapshot(snap);
      clearCart();
      setLoading(false);
      setStep('success');
    }, 1200);
  }

  return (
    <main style={{ background: '#050505', minHeight: '100vh', color: '#F5F5F5', fontFamily: "'Inter',sans-serif" }}>
      <section style={{ padding: 'clamp(60px,8vw,80px) 60px 40px', textAlign: 'center', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#6DA544', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
          Bestellung aufgeben
        </span>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,5vw,48px)', fontWeight: 700, color: '#F5F5F5' }}>
          {step === 'success' ? 'Bestellung vorbereitet 🍕' : 'Ihr Warenkorb'}
        </h1>
      </section>

      {step !== 'success' && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 24px 0', gap: 0 }}>
          {STEPS.map((s, i) => {
            const done   = STEP_ORDER.indexOf(s.id) < currentIdx;
            const active = s.id === step;
            return (
              <React.Fragment key={s.id}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', border: `2px solid ${active ? '#6DA544' : done ? '#6DA544' : 'rgba(255,255,255,0.1)'}`, background: active ? '#6DA544' : done ? 'rgba(109,165,68,0.2)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: active ? '#fff' : done ? '#6DA544' : '#555', transition: 'all 0.3s' }}>
                    {done ? '✓' : s.icon}
                  </div>
                  <span style={{ fontSize: 11, color: active ? '#6DA544' : done ? '#6DA544' : '#555', fontWeight: active ? 600 : 400, whiteSpace: 'nowrap' }}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && <div style={{ height: 2, flex: 1, background: done ? '#6DA544' : 'rgba(255,255,255,0.08)', margin: '19px 4px 0', maxWidth: 80, transition: 'background 0.3s' }} />}
              </React.Fragment>
            );
          })}
        </div>
      )}

      <section style={{ padding: '32px clamp(16px,5vw,60px) 80px', maxWidth: 1100, margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {step === 'cart'     && <CartStep onNext={() => setStep('customer')} />}
            {step === 'customer' && <CustomerStep customer={customer} setCustomer={setCustomer} address={address} setAddress={setAddress} deliveryMode={deliveryMode} onNext={() => setStep('confirm')} onBack={() => setStep('cart')} />}
            {step === 'confirm'  && <ConfirmStep  customer={customer} address={address} deliveryMode={deliveryMode} items={items} total={total()} onSubmit={handleSubmit} onBack={() => setStep('customer')} loading={loading} />}
            {step === 'success'  && snapshot && <SuccessScreen customer={customer} address={address} deliveryMode={deliveryMode} items={snapshot.items} orderTotal={snapshot.total} />}
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
}
