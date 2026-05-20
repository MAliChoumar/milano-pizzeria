'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_ITEMS, CATEGORIES, type MenuItem } from '@/lib/data/menu';
import { useCartStore } from '@/store/cartStore';

// ─── Modal Artikel ────────────────────────────────────────────────────────────
function ItemModal({ item, onClose, onAdd }: { item: MenuItem; onClose: () => void; onAdd: (item: MenuItem, sizeIdx: number, qty: number) => void }) {
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty]         = useState(1);
  const price = item.sizes[sizeIdx].price * qty;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:300, display:'flex', alignItems:'center', justifyContent:'center', padding:24, backdropFilter:'blur(6px)' }}>
      <motion.div initial={{ scale:0.88, y:30 }} animate={{ scale:1, y:0 }} exit={{ scale:0.88, y:30 }}
        onClick={e => e.stopPropagation()}
        style={{ background:'#0d0d0d', border:'0.5px solid rgba(255,255,255,0.14)', borderRadius:24, width:'100%', maxWidth:520, maxHeight:'90vh', overflowY:'auto' }}>

        {/* Bild */}
        <div style={{ height:180, background:'linear-gradient(135deg,#0a1800,#1a2e00)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:88, borderRadius:'24px 24px 0 0', position:'relative', flexShrink:0 }}>
          {item.emoji}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%)', borderRadius:'24px 24px 0 0' }} />
          <div style={{ position:'absolute', top:14, left:14, fontSize:11, fontWeight:700, color:'#6DA544', letterSpacing:'0.12em', textTransform:'uppercase', background:'rgba(109,165,68,0.15)', border:'0.5px solid rgba(109,165,68,0.3)', padding:'4px 10px', borderRadius:100 }}>
            {CATEGORIES.find(c => c.id === item.category)?.label}
          </div>
          <button onClick={onClose} style={{ position:'absolute', top:12, right:12, background:'rgba(0,0,0,0.5)', border:'0.5px solid rgba(255,255,255,0.2)', borderRadius:'50%', width:34, height:34, cursor:'pointer', color:'#F5F5F5', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
        </div>

        <div style={{ padding:24 }}>
          {item.number !== '-' && <div style={{ fontSize:11, color:'#555', marginBottom:4 }}>Nr. {item.number}</div>}
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:'#F5F5F5', marginBottom:8 }}>{item.name}</h2>
          <p style={{ fontSize:14, color:'#888', lineHeight:1.7, marginBottom:16 }}>{item.description}</p>

          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:20 }}>
            {item.isVegetarian && <span style={{ fontSize:10, fontWeight:700, background:'rgba(45,122,45,0.2)', color:'#6da544', padding:'3px 8px', borderRadius:100, letterSpacing:'0.5px' }}>🌿 Vegetarisch</span>}
            {item.isSpicy      && <span style={{ fontSize:10, fontWeight:700, background:'rgba(214,40,40,0.15)', color:'#f87171', padding:'3px 8px', borderRadius:100, letterSpacing:'0.5px' }}>🌶️ Scharf</span>}
            {item.tags.map(t   => <span key={t} style={{ fontSize:10, color:'#555', background:'rgba(255,255,255,0.05)', border:'0.5px solid rgba(255,255,255,0.08)', padding:'3px 8px', borderRadius:100 }}>{t}</span>)}
          </div>

          {/* Größe */}
          {item.sizes.length > 1 && (
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:12, fontWeight:600, color:'#888', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}>Größe wählen</div>
              <div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(item.sizes.length,3)},1fr)`, gap:8 }}>
                {item.sizes.map((s, i) => (
                  <div key={i} onClick={() => setSizeIdx(i)}
                    style={{ padding:'12px 10px', borderRadius:12, border:`0.5px solid ${sizeIdx===i?'#6DA544':'rgba(255,255,255,0.1)'}`, background:sizeIdx===i?'rgba(109,165,68,0.1)':'transparent', cursor:'pointer', textAlign:'center', transition:'all 0.2s' }}>
                    <div style={{ fontSize:12, fontWeight:600, color:sizeIdx===i?'#6DA544':'#F5F5F5' }}>{s.name}</div>
                    <div style={{ fontSize:14, fontWeight:700, color:'#c9a84c', marginTop:3 }}>{s.price.toFixed(2)} €</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Menge */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <div style={{ fontSize:12, fontWeight:600, color:'#888', textTransform:'uppercase', letterSpacing:'0.08em' }}>Menge</div>
            <div style={{ display:'flex', alignItems:'center', gap:0 }}>
              <button onClick={() => setQty(q => Math.max(1,q-1))} style={{ background:'#1c1c1c', border:'0.5px solid rgba(255,255,255,0.1)', color:'#F5F5F5', width:36, height:36, borderRadius:'10px 0 0 10px', cursor:'pointer', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
              <div style={{ background:'#1c1c1c', borderTop:'0.5px solid rgba(255,255,255,0.1)', borderBottom:'0.5px solid rgba(255,255,255,0.1)', width:44, height:36, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:700, color:'#F5F5F5' }}>{qty}</div>
              <button onClick={() => setQty(q => q+1)} style={{ background:'#1c1c1c', border:'0.5px solid rgba(255,255,255,0.1)', color:'#F5F5F5', width:36, height:36, borderRadius:'0 10px 10px 0', cursor:'pointer', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
            </div>
          </div>

          {/* Footer */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:16, borderTop:'0.5px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, color:'#c9a84c' }}>{price.toFixed(2)} €</span>
            <button onClick={() => onAdd(item, sizeIdx, qty)}
              style={{ background:'#6DA544', color:'#fff', border:'none', padding:'14px 28px', borderRadius:100, fontSize:15, fontWeight:600, cursor:'pointer', fontFamily:'inherit', transition:'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background='#8bc34a')} onMouseLeave={e => (e.currentTarget.style.background='#6DA544')}>
              🛒 In den Warenkorb
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Item Card ────────────────────────────────────────────────────────────────
function ItemCard({ item, onClick }: { item: MenuItem; onClick: () => void }) {
  const minPrice = Math.min(...item.sizes.map(s => s.price));
  const maxPrice = Math.max(...item.sizes.map(s => s.price));
  const priceStr = item.sizes.length > 1 ? `ab ${minPrice.toFixed(2)} €` : `${minPrice.toFixed(2)} €`;

  return (
    <motion.div layout initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:20 }}
      onClick={onClick}
      style={{ background:'#0d0d0d', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:18, overflow:'hidden', cursor:'pointer', transition:'all 0.3s' }}
      whileHover={{ y:-4, borderColor:'rgba(255,255,255,0.15)', boxShadow:'0 16px 40px rgba(0,0,0,0.6)' }}>

      <div style={{ height:140, background:'linear-gradient(135deg,#0a1a00,#141414)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:64, position:'relative', overflow:'hidden' }}>
        <motion.span whileHover={{ scale:1.15 }} style={{ filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.6))', display:'block' }}>{item.emoji}</motion.span>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%)' }} />
        {item.number !== '-' && (
          <div style={{ position:'absolute', top:8, left:10, fontSize:10, color:'#555', fontWeight:600 }}>#{item.number}</div>
        )}
        <div style={{ position:'absolute', top:8, right:8, display:'flex', flexDirection:'column', gap:4 }}>
          {item.isVegetarian && <span style={{ fontSize:9, background:'rgba(45,122,45,0.8)', color:'#fff', padding:'2px 6px', borderRadius:100 }}>🌿</span>}
          {item.isSpicy      && <span style={{ fontSize:9, background:'rgba(214,40,40,0.8)', color:'#fff', padding:'2px 6px', borderRadius:100 }}>🌶️</span>}
        </div>
      </div>

      <div style={{ padding:'14px 16px' }}>
        <div style={{ fontSize:13, fontWeight:600, color:'#F5F5F5', marginBottom:4, lineHeight:1.3 }}>{item.name}</div>
        <div style={{ fontSize:11, color:'#666', lineHeight:1.5, marginBottom:12, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' as any }}>
          {item.description}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700, color:'#c9a84c' }}>{priceStr}</div>
          <div style={{ background:'#6DA544', width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, color:'#fff', flexShrink:0 }}>+</div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Toast ───────────────────────────────────────────────────────────────────
function Toast({ msg, visible }: { msg: string; visible: boolean }) {
  return (
    <motion.div initial={{ y:80, opacity:0 }} animate={visible?{ y:0, opacity:1 }:{ y:80, opacity:0 }}
      style={{ position:'fixed', bottom:28, left:'50%', transform:'translateX(-50%)', background:'#0d0d0d', border:'0.5px solid #6DA544', color:'#F5F5F5', padding:'12px 24px', borderRadius:100, fontSize:14, fontWeight:500, zIndex:900, whiteSpace:'nowrap', boxShadow:'0 8px 32px rgba(0,0,0,0.6)', display:'flex', alignItems:'center', gap:8 }}>
      ✅ {msg}
    </motion.div>
  );
}

// ─── Hauptseite ───────────────────────────────────────────────────────────────
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [selectedItem,   setSelectedItem]   = useState<MenuItem | null>(null);
  const [toast,          setToast]          = useState({ msg:'', visible:false });
  const { addItem, itemCount } = useCartStore();
  const searchRef = useRef<HTMLInputElement>(null);

  // Rehydrate Zustand persist store after client mount (prevents SSR hydration mismatch)
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  // Filtern
  const filtered = useMemo(() => {
    let items = MENU_ITEMS;
    if (activeCategory !== 'all') items = items.filter(i => i.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.tags.some(t => t.toLowerCase().includes(q)) ||
        i.number.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeCategory, searchQuery]);

  // Gruppiert
  const grouped = useMemo(() => {
    if (activeCategory !== 'all') return { [activeCategory]: filtered };
    return filtered.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, MenuItem[]>);
  }, [filtered, activeCategory]);

  function showToast(msg: string) {
    setToast({ msg, visible:true });
    setTimeout(() => setToast(t => ({ ...t, visible:false })), 2500);
  }

  function handleAdd(item: MenuItem, sizeIdx: number, qty: number) {
    const size  = item.sizes[sizeIdx];
    const key   = `${item.id}_${size.name}`;
    const extra = 0;
    for (let i = 0; i < qty; i++) {
      addItem({
        key,
        itemId:     item.id,
        name:       item.name,
        emoji:      item.emoji,
        sizeName:   size.name,
        sizePrice:  size.price,
        extras:     [],
        quantity:   1,
        totalPrice: size.price,
      });
    }
    setSelectedItem(null);
    showToast(`${item.name} zum Warenkorb hinzugefügt`);
  }

  const totalItems = MENU_ITEMS.length;

  return (
    <main style={{ background:'#050505', minHeight:'100vh', color:'#F5F5F5', fontFamily:"'Inter',sans-serif" }}>

      {/* Hero */}
      <section style={{ padding:'clamp(60px,8vw,80px) clamp(20px,5vw,60px) 32px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, left:'50%', transform:'translateX(-50%)', width:500, height:300, background:'radial-gradient(ellipse,rgba(109,165,68,0.1),transparent 70%)', pointerEvents:'none' }} />
        <span style={{ fontSize:11, fontWeight:600, color:'#6DA544', letterSpacing:'0.2em', textTransform:'uppercase', display:'block', marginBottom:12 }}>Speisekarte</span>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(28px,5vw,52px)', fontWeight:900, color:'#F5F5F5', marginBottom:12 }}>Pizzeria Milano — Duisburg</h1>
        <p style={{ fontSize:15, color:'#888', marginBottom:24 }}>Spichernstr. 64 · 47137 Duisburg · {totalItems} Gerichte</p>

        {/* Info Banner */}
        <div style={{ display:'inline-flex', gap:24, background:'rgba(109,165,68,0.08)', border:'0.5px solid rgba(109,165,68,0.2)', borderRadius:14, padding:'12px 24px', fontSize:13, color:'#888', flexWrap:'wrap', justifyContent:'center' }}>
          <span>🕐 Mo–Fr: 12:00–22:30</span>
          <span>🕐 Sa–So: 13:00–22:30</span>
          <span>🛵 Kostenlos ab 10 €</span>
          <span>💰 10% Rabatt ab 20 €</span>
        </div>
      </section>

      {/* Suche + Warenkorb */}
      <div style={{ padding:'0 clamp(20px,5vw,60px) 24px', display:'flex', gap:12, alignItems:'center', position:'sticky', top:72, zIndex:90, background:'rgba(5,5,5,0.95)', backdropFilter:'blur(12px)', paddingTop:16 }}>
        <div style={{ flex:1, position:'relative' }}>
          <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:16, color:'#555' }}>🔍</span>
          <input ref={searchRef} type="text" placeholder="Gericht oder Nummer suchen…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            style={{ width:'100%', background:'#141414', border:'0.5px solid rgba(255,255,255,0.14)', borderRadius:100, padding:'11px 16px 11px 42px', color:'#F5F5F5', fontSize:14, outline:'none', fontFamily:'inherit', transition:'border-color 0.2s' }}
            onFocus={e => (e.target.style.borderColor='#6DA544')} onBlur={e => (e.target.style.borderColor='rgba(255,255,255,0.14)')} />
          {searchQuery && <button onClick={() => setSearchQuery('')} style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'#555', cursor:'pointer', fontSize:16 }}>✕</button>}
        </div>
        <a href="/order" style={{ display:'flex', alignItems:'center', gap:8, background:'#6DA544', color:'#fff', padding:'11px 20px', borderRadius:100, fontSize:14, fontWeight:600, textDecoration:'none', whiteSpace:'nowrap', transition:'all 0.2s', flexShrink:0 }}
          onMouseEnter={e => (e.currentTarget.style.background='#8bc34a')} onMouseLeave={e => (e.currentTarget.style.background='#6DA544')}>
          🛒 Warenkorb {itemCount() > 0 && <span style={{ background:'#D62828', color:'#fff', fontSize:11, fontWeight:700, minWidth:20, height:20, borderRadius:50, display:'flex', alignItems:'center', justifyContent:'center', padding:'0 5px' }}>{itemCount()}</span>}
        </a>
      </div>

      {/* Kategorien */}
      <div style={{ padding:'0 clamp(20px,5vw,60px) 24px', overflowX:'auto', display:'flex', gap:8, scrollbarWidth:'none' }}>
        {CATEGORIES.map(cat => {
          const cnt = cat.id === 'all' ? MENU_ITEMS.length : MENU_ITEMS.filter(i => i.category === cat.id).length;
          if (cnt === 0) return null;
          return (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              style={{ display:'flex', alignItems:'center', gap:7, padding:'9px 18px', borderRadius:100, fontSize:13, fontWeight:500, cursor:'pointer', whiteSpace:'nowrap', border:'none', transition:'all 0.2s', flexShrink:0, background:activeCategory===cat.id?'#6DA544':'rgba(255,255,255,0.05)', color:activeCategory===cat.id?'#fff':'#888' }}
              onMouseEnter={e => { if(activeCategory!==cat.id)(e.currentTarget.style.color='#F5F5F5'); }} onMouseLeave={e => { if(activeCategory!==cat.id)(e.currentTarget.style.color='#888'); }}>
              {cat.emoji} {cat.label}
              <span style={{ fontSize:10, background:activeCategory===cat.id?'rgba(255,255,255,0.25)':'rgba(255,255,255,0.08)', padding:'1px 7px', borderRadius:100 }}>{cnt}</span>
            </button>
          );
        })}
      </div>

      {/* Ergebnis-Anzahl */}
      <div style={{ padding:'0 clamp(20px,5vw,60px) 16px', fontSize:13, color:'#555' }}>
        {searchQuery ? `${filtered.length} Ergebnis${filtered.length!==1?'se':''} für „${searchQuery}"` : `${filtered.length} Gerichte`}
      </div>

      {/* Grid */}
      <section style={{ padding:'0 clamp(20px,5vw,60px) 80px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 24px' }}>
            <div style={{ fontSize:64, marginBottom:16, opacity:0.3 }}>🔍</div>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:'#F5F5F5', marginBottom:8 }}>Keine Gerichte gefunden</h3>
            <p style={{ color:'#555' }}>Versuchen Sie eine andere Suche</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} style={{ background:'#6DA544', color:'#fff', border:'none', padding:'12px 28px', borderRadius:100, fontSize:14, cursor:'pointer', marginTop:20, fontFamily:'inherit' }}>
              Alle Gerichte anzeigen
            </button>
          </div>
        ) : activeCategory !== 'all' ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16 }}>
            <AnimatePresence>
              {filtered.map(item => <ItemCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />)}
            </AnimatePresence>
          </div>
        ) : (
          Object.entries(grouped).map(([catId, items]) => {
            const cat = CATEGORIES.find(c => c.id === catId);
            if (!cat || !items.length) return null;
            return (
              <div key={catId} style={{ marginBottom:48 }}>
                <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:20 }}>
                  <span style={{ fontSize:24 }}>{cat.emoji}</span>
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:'#F5F5F5' }}>{cat.label}</h2>
                  <div style={{ flex:1, height:'0.5px', background:'rgba(255,255,255,0.07)' }} />
                  <span style={{ fontSize:12, color:'#555' }}>{items.length} Gerichte</span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16 }}>
                  {items.map(item => <ItemCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />)}
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} onAdd={handleAdd} />}
      </AnimatePresence>

      {/* Toast */}
      <Toast msg={toast.msg} visible={toast.visible} />
    </main>
  );
}
