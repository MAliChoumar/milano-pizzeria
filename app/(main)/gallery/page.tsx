'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type CategoryId = 'all' | 'food' | 'interior' | 'delivery' | 'team' | 'bts' | 'menu';

interface GalleryItem {
  id: string;
  category: Exclude<CategoryId, 'all' | 'menu'>;
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  span?: 'normal' | 'wide' | 'tall';
  personRole?: string;
}

interface MenuPage {
  id: string;
  src: string;
  label: string;
  pageNumber: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// DATA — Replace src: '' with real image paths when uploading
// ═══════════════════════════════════════════════════════════════════════════════

const GALLERY_ITEMS: GalleryItem[] = [
  // Gerichte — echte Fotos
  { id:'food-01', category:'food', src:'/gallery/food/food-01.png', alt:'Foto-Shooting Milano Gerichte',          title:'Unsere Gerichte',           caption:'Frisch zubereitet — täglich für Sie', span:'wide' },
  { id:'food-02', category:'food', src:'/gallery/food/food-02.png', alt:'Viele Pizzasorten frisch aus dem Ofen',  title:'Frisch aus dem Ofen',       caption:'Auswahl an Pizzen — alle handgemacht', span:'wide' },
  { id:'food-03', category:'food', src:'/gallery/food/food-03.png', alt:'Große Pizzableche in der Vorbereitung', title:'Pizzableche für Gruppen',    caption:'Für Feiern & Veranstaltungen', span:'wide' },
  { id:'food-04', category:'food', src:'/gallery/food/food-04.png', alt:'Pizzableche Meeresfrüchte und Oliven',   title:'Frutti di Mare & Napoli',   caption:'Meeresfrüchte · Oliven · frische Zutaten' },
  { id:'food-05', category:'food', src:'/gallery/food/food-05.png', alt:'Bunter frischer Salat Platte',           title:'Insalata Mista',            caption:'Frische Zutaten täglich', span:'tall' },
  { id:'food-06', category:'food', src:'/gallery/food/food-06.png', alt:'Schnitzel Pizza Pasta Salatplatte',      title:'Unsere Klassiker',          caption:'Schnitzel · Pizza · Pasta · Salat', span:'wide' },
  { id:'food-07', category:'food', src:'/gallery/food/food-07.png', alt:'Rigatoni Polo al Forno Blech',           title:'Rigatoni al Forno',         caption:'Hähnchen · Tomatensauce · frisch überbacken', span:'tall' },
  { id:'food-08', category:'food', src:'/gallery/food/food-08.png', alt:'Pizza Spinaci aus dem Ofen',             title:'Pizza Romantica',           caption:'Spinat · Frisch belegt · Steinofen' },
  { id:'food-09', category:'food', src:'/gallery/food/food-09.png', alt:'Insalata Mozzarella Tomaten',            title:'Insalata Mozzarella',       caption:'Tomaten · Mozzarella · Basilikum · Artischocken', span:'tall' },
  { id:'food-10', category:'food', src:'/gallery/food/food-10.png', alt:'Spaghetti Carbonara',                    title:'Spaghetti Carbonara',       caption:'Schinken · Parmesankäse · Sahne' },
  { id:'food-11', category:'food', src:'/gallery/food/food-11.png', alt:'Pizzabrötchen mit Kräutercreme',         title:'Pizzabrötchen',             caption:'Mit Kräutercreme und Aioli', span:'tall' },
  { id:'food-12', category:'food', src:'/gallery/food/food-12.png', alt:'Spaghetti Bolognese mit Basilikum',      title:'Spaghetti Bolognese',       caption:'Fleischsauce · Basilikum · Parmesankäse' },
  { id:'food-13', category:'food', src:'/gallery/food/food-13.png', alt:'Penne Pasta mit Gemüse und Käse',        title:'Penne Vegetale',            caption:'Frisches Gemüse · Parmesankäse', span:'wide' },
  { id:'food-14', category:'food', src:'/gallery/food/food-14.png', alt:'Überbackene Pizzabrötchen Bleche',       title:'Gefüllte Pizzabrötchen',    caption:'Frisch überbacken · Hausgemacht' },

  // Restaurant & Ambiente — echte Innenaufnahmen
  { id:'int-01', category:'interior', src:'/gallery/interior/int-01.png', alt:'Professionelle Pizzaöfen Milano', title:'Unsere Profi-Öfen',        caption:'Zwei Durchlauföfen für perfekte Pizza', span:'wide' },
  { id:'int-02', category:'interior', src:'/gallery/interior/int-02.png', alt:'Küche mit Theke und Vitrinen',    title:'Die Küche',                caption:'Alles frisch — täglich für Sie', span:'tall' },
  { id:'int-03', category:'interior', src:'/gallery/interior/int-03.png', alt:'Thekenbereich mit Speisekarte',   title:'Unser Thekenbereich',      caption:'Spichernstr. 64 · Duisburg-Meiderich', span:'wide' },
  { id:'int-04', category:'interior', src:'/gallery/interior/int-04.png', alt:'Gastraum mit Sitzplätzen',        title:'Unser Gastraum',           caption:'Gemütliche Atmosphäre für Ihre Familie' },
  { id:'int-05', category:'interior', src:'/gallery/interior/int-05.png', alt:'Weihnachtsdekoration Gastraum',   title:'Festliche Stimmung',       caption:'Weihnachtlich dekoriert & einladend', span:'wide' },
  { id:'int-06', category:'interior', src:'/gallery/interior/int-06.png', alt:'Kamin und Weihnachtsbaum',        title:'Gemütlichkeit pur',        caption:'Wärme & Atmosphäre bei Milano', span:'tall' },
  { id:'int-07', category:'interior', src:'/gallery/interior/int-07.png', alt:'Weihnachtsbäume mit Kamin',       title:'Einladende Atmosphäre',    caption:'Jeden Abend ein besonderes Erlebnis' },
  { id:'int-08', category:'interior', src:'/gallery/interior/int-08.png', alt:'Wohnliche Weihnachtsdekoration',  title:'Bei uns ist es schön',     caption:'Kommen Sie herein — wir freuen uns auf Sie' },

  // Lieferservice
  // Lieferservice — echte Fahrzeugfotos
  { id:'del-01', category:'delivery', src:'/gallery/delivery/del-01.jpg', alt:'Pizzeria Milano Lieferfahrzeug Design', title:'Unser Pizza-Taxi',         caption:'Pizzeria Milano Meiderich · 0203 45 65 284', span:'wide' },
  { id:'del-02', category:'delivery', src:'/gallery/delivery/del-02.png', alt:'VW Polo Lieferfahrzeug weiß',          title:'Immer für Sie unterwegs',   caption:'Schnell · Zuverlässig · Heiß' },
  { id:'del-03', category:'delivery', src:'/gallery/delivery/del-03.png', alt:'Zwei Milano Lieferautos',              title:'Unser Fuhrpark',            caption:'Mehrere Fahrzeuge für schnelle Lieferung', span:'wide' },
  { id:'del-04', category:'delivery', src:'/gallery/delivery/del-04.png', alt:'VW Lieferfahrzeug grau Front',         title:'Pizza-Taxi Duisburg',       caption:'0203 45 65 284' },
  { id:'del-05', category:'delivery', src:'/gallery/delivery/del-05.png', alt:'VW Lieferfahrzeug grau Seite',         title:'Pizzeria Milano Meiderich',  caption:'In ganz Duisburg unterwegs', span:'tall' },
  { id:'del-06', category:'delivery', src:'/gallery/delivery/del-06.png', alt:'VW Golf schwarz Lieferfahrzeug',       title:'Direkt zu Ihnen',           caption:'Lieferkosten nur 1,00 €' },
  { id:'del-07', category:'delivery', src:'/gallery/delivery/del-07.png', alt:'Lieferflotte vor dem Restaurant',      title:'Unser Team in Bereitschaft', caption:'Vier Fahrzeuge · Schnellster Service', span:'wide' },
  { id:'del-08', category:'delivery', src:'/gallery/delivery/del-08.png', alt:'Zwei Lieferfahrzeuge von hinten',      title:'Frisch & Heiß geliefert',   caption:'Täglich ab 12:00 Uhr' },

  // Unser Team — echte Namen, keine Fotos
  { id:'team-01', category:'team', src:'', alt:'Mahmoud Alloul — Inhaber & Pizza Chef',  title:'Mahmoud Alloul',  personRole:'Inhaber & Pizza Chef',  span:'tall' },
  { id:'team-02', category:'team', src:'', alt:'Mahmoud Raad — Inhaber & Pizza Chef',    title:'Mahmoud Raad',    personRole:'Inhaber & Pizza Chef' },
  { id:'team-03', category:'team', src:'', alt:'Mostafa Harbi — Pizza Spezialist',       title:'Mostafa Harbi',   personRole:'Pizza Spezialist' },
  { id:'team-04', category:'team', src:'', alt:'Gihad Nemr — Pizza Spezialist',          title:'Gihad Nemr',      personRole:'Pizza Spezialist' },
  { id:'team-05', category:'team', src:'', alt:'Fadel — Küchen-Team',                    title:'Fadel',           personRole:'Küchen-Team',           span:'wide' },
  { id:'team-06', category:'team', src:'', alt:'Youssef — Küchen-Team',                  title:'Youssef',         personRole:'Küchen-Team' },

  // Behind The Scenes — echte Fotos (erscheinen auch in Alle Fotos)
  { id:'bts-01', category:'bts', src:'/gallery/bts/bts-photo-01.png', alt:'Pizzableche in der Vorbereitung',      title:'Handgemachter Teig',  caption:'Täglich frisch — nach Original-Rezept', span:'wide' },
  { id:'bts-02', category:'bts', src:'/gallery/bts/bts-photo-02.png', alt:'Pizzableche Kühlstation',               title:'Unsere Küche',        caption:'Vorbereitung für den großen Andrang' },
  { id:'bts-03', category:'bts', src:'/gallery/bts/bts-photo-03.png', alt:'Pizza mit Garnelen und Broccoli belegt', title:'Frische Zutaten',     caption:'Jede Pizza frisch belegt — mit Liebe', span:'tall' },
];

const MENU_PAGES: MenuPage[] = [
  { id:'menu-01', src:'/menu/menu-01.png', label:'Deckblatt & Angebote',                pageNumber:1  },
  { id:'menu-08', src:'/menu/menu-08.png', label:'Pizzen Nr. 01–24',                    pageNumber:2  },
  { id:'menu-07', src:'/menu/menu-07.png', label:'Pizzen Nr. 25–50 & Vegetarisch',      pageNumber:3  },
  { id:'menu-05', src:'/menu/menu-05.png', label:'Vorspeisen & Spaghetti (51–65)',       pageNumber:4  },
  { id:'menu-04', src:'/menu/menu-04.png', label:'Nudeln — Rigatoni bis Gnocchi (66–88)', pageNumber:5 },
  { id:'menu-03', src:'/menu/menu-03.png', label:'Al Forno & Hähnchen (89–106)',         pageNumber:6  },
  { id:'menu-02', src:'/menu/menu-02.png', label:'Schnitzel & Spezialitäten (107–133)',  pageNumber:7  },
  { id:'menu-11', src:'/menu/menu-11.png', label:'Fingerfoods & Aufläufe (121–162)',     pageNumber:8  },
  { id:'menu-10', src:'/menu/menu-10.png', label:'Fisch, Reis & Getränke (126–138)',     pageNumber:9  },
  { id:'menu-06', src:'/menu/menu-06.png', label:'Salate & Pizzabrötchen (198–223)',     pageNumber:10 },
  { id:'menu-09', src:'/menu/menu-09.png', label:'Top-Angebote & Bleche',                pageNumber:11 },
];

// ─── Behind The Scenes Videos ────────────────────────────────────────────────
interface BtsVideo {
  id: string;
  src: string;
  title: string;
  caption: string;
  featured?: boolean;
}

const BTS_VIDEOS: BtsVideo[] = [
  { id:'btsv-01', src:'/gallery/bts/bts-video-01.mp4', title:'Pizza Vorbereitung',         caption:'Täglich frische Pizzen — Teig & Belag', featured:true },
  { id:'btsv-02', src:'/gallery/bts/bts-video-02.mp4', title:'Pizzableche belegen',         caption:'Handarbeit in der Küche' },
  { id:'btsv-03', src:'/gallery/bts/bts-video-03.mp4', title:'Blick in unsere Küche',       caption:'Hier entsteht Ihr Essen', featured:true },
  { id:'btsv-04', src:'/gallery/bts/bts-video-04.mp4', title:'Großbestellung Vorbereitung', caption:'Bleche für Feiern & Events', featured:true },
  { id:'btsv-05', src:'/gallery/bts/bts-video-05.mp4', title:'Zutaten & Frische',           caption:'Frische Zutaten täglich' },
  { id:'btsv-06', src:'/gallery/bts/bts-video-06.mp4', title:'Die Küche bei der Arbeit',    caption:'Echte Handwerkskunst' },
];
// ═══════════════════════════════════════════════════════════════════════════════

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id:'all',      label:'Alle Fotos' },
  { id:'food',     label:'Gerichte' },
  { id:'interior', label:'Restaurant & Ambiente' },
  { id:'delivery', label:'Lieferservice' },
  { id:'team',     label:'Unser Team' },
  { id:'bts',      label:'Behind The Scenes' },
  { id:'menu',     label:'Speisekarte' },
];

const catLabel = (id: string) => CATEGORIES.find(c => c.id === id)?.label ?? '';

// ═══════════════════════════════════════════════════════════════════════════════
// UPLOAD PLACEHOLDER — no fake names
// ═══════════════════════════════════════════════════════════════════════════════

function UploadPlaceholder({ item }: { item: GalleryItem }) {
  const isTeam = item.category === 'team';
  const aspect = item.span === 'wide' ? '16/9' : item.span === 'tall' ? '3/4' : '4/3';

  if (isTeam) {
    return (
      <div style={{ width:'100%', aspectRatio:aspect, background:'linear-gradient(160deg,#0e0c09,#181410)', border:'0.5px solid rgba(201,168,76,0.12)', borderRadius:14, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, padding:24, position:'relative', overflow:'hidden' }}>
        {/* Subtle warm glow */}
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.05), transparent 65%)', pointerEvents:'none' }} />
        {/* Avatar circle */}
        <div style={{ width:56, height:56, borderRadius:'50%', background:'rgba(201,168,76,0.07)', border:'0.5px solid rgba(201,168,76,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, position:'relative' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="1.5" strokeLinecap="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        {/* Name + Role */}
        <div style={{ textAlign:'center', position:'relative' }}>
          {item.title && (
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:700, color:'rgba(245,240,232,0.75)', marginBottom:5, letterSpacing:'0.01em' }}>{item.title}</div>
          )}
          {item.personRole && (
            <div style={{ fontSize:10, fontWeight:600, color:'rgba(201,168,76,0.6)', letterSpacing:'0.14em', textTransform:'uppercase' }}>{item.personRole}</div>
          )}
        </div>
        {/* Bottom divider line */}
        <div style={{ position:'absolute', bottom:0, left:'20%', right:'20%', height:'0.5px', background:'linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)' }} />
      </div>
    );
  }

  return (
    <div style={{ width:'100%', aspectRatio:aspect, background:'linear-gradient(135deg,#0e0c09,#181410)', border:'0.5px solid rgba(255,248,235,0.07)', borderRadius:14, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10, padding:20, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 35%, rgba(255,248,235,0.02), transparent 55%)', pointerEvents:'none' }} />
      <div style={{ width:40, height:40, borderRadius:'50%', background:'rgba(255,248,235,0.03)', border:'0.5px solid rgba(255,248,235,0.09)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,248,235,0.2)" strokeWidth="1.5" strokeLinecap="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>
      <div style={{ textAlign:'center' }}>
        {item.title && <div style={{ fontSize:11, color:'rgba(245,240,232,0.22)', fontWeight:300 }}>{item.title}</div>}
      </div>
      <div style={{ position:'absolute', bottom:10, right:12, fontSize:9, color:'rgba(255,248,235,0.14)', letterSpacing:'0.08em', textTransform:'uppercase' }}>
        {catLabel(item.category)}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GALLERY CARD — no fake names on team cards
// ═══════════════════════════════════════════════════════════════════════════════

function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const [loaded,  setLoaded]  = useState(false);
  const [hovered, setHovered] = useState(false);
  const hasImage = !!item.src;

  return (
    <div
      onClick={hasImage ? onClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display:'block', breakInside:'avoid', marginBottom:14, cursor:hasImage?'pointer':'default', borderRadius:14, overflow:'hidden', transition:'transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.38s', transform:hovered&&hasImage?'scale(1.02)':'scale(1)', boxShadow:hovered&&hasImage?'0 18px 44px rgba(0,0,0,0.65)':'0 3px 16px rgba(0,0,0,0.25)' }}>

      {hasImage ? (
        <div style={{ position:'relative', overflow:'hidden' }}>
          {!loaded && <div style={{ width:'100%', aspectRatio:'4/3', background:'linear-gradient(135deg,#0e0c09,#181410)', animation:'shimPulse 1.8s ease-in-out infinite' }} />}
          <img src={item.src} alt={item.alt} loading="lazy" onLoad={() => setLoaded(true)}
            style={{ width:'100%', display:'block', objectFit:'cover', transition:'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)', transform:hovered?'scale(1.07)':'scale(1)', opacity:loaded?1:0 }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(8,5,0,0.88) 0%, rgba(8,5,0,0.15) 50%, transparent 100%)', opacity:hovered?1:0.65, transition:'opacity 0.35s' }} />
          <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'14px', transform:hovered?'translateY(0)':'translateY(4px)', opacity:hovered?1:0.75, transition:'all 0.35s' }}>
            {/* Only show role for team, no fake names */}
            {item.category==='team' && item.personRole && (
              <div style={{ fontSize:10, color:'#c9a84c', fontWeight:600, letterSpacing:'0.06em', marginBottom:2, textTransform:'uppercase' }}>{item.personRole}</div>
            )}
            {item.title && <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:700, color:'#F5F0E8', marginBottom:2, lineHeight:1.2 }}>{item.title}</div>}
            {item.caption && <div style={{ fontSize:10, color:'rgba(245,240,232,0.5)', fontWeight:300 }}>{item.caption}</div>}
          </div>
          <div style={{ position:'absolute', top:10, right:10, width:28, height:28, borderRadius:'50%', background:'rgba(8,5,0,0.6)', backdropFilter:'blur(6px)', border:'0.5px solid rgba(255,248,235,0.14)', display:'flex', alignItems:'center', justifyContent:'center', opacity:hovered?1:0, transition:'opacity 0.3s' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,232,0.8)" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
          </div>
        </div>
      ) : (
        <UploadPlaceholder item={item} />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LIGHTBOX
// ═══════════════════════════════════════════════════════════════════════════════

function Lightbox({ item, items, onClose, onNext, onPrev }: {
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const idx = items.findIndex(i => i.id === item.id);

  useEffect(() => { setZoomed(false); setLoaded(false); }, [item.id]);

  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={zoomed ? () => setZoomed(false) : onClose}
      style={{ position:'fixed', inset:0, zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.96)', backdropFilter:'blur(14px)', padding:24 }}>

      <button onClick={e=>{e.stopPropagation();onClose();}}
        style={{ position:'absolute', top:18, right:18, zIndex:10, width:40, height:40, borderRadius:'50%', background:'rgba(255,248,235,0.07)', border:'0.5px solid rgba(255,248,235,0.14)', color:'rgba(245,240,232,0.75)', fontSize:17, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>

      <button onClick={e=>{e.stopPropagation();setZoomed(z=>!z);}}
        style={{ position:'absolute', top:18, right:66, zIndex:10, width:40, height:40, borderRadius:'50%', background:'rgba(255,248,235,0.07)', border:'0.5px solid rgba(255,248,235,0.14)', color:'rgba(245,240,232,0.75)', fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {zoomed ? '−' : '+'}
      </button>

      {idx > 0 && (
        <button onClick={e=>{e.stopPropagation();onPrev();}}
          style={{ position:'absolute', left:16, zIndex:10, width:44, height:44, borderRadius:'50%', background:'rgba(255,248,235,0.07)', border:'0.5px solid rgba(255,248,235,0.14)', color:'rgba(245,240,232,0.75)', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>←</button>
      )}
      {idx < items.length - 1 && (
        <button onClick={e=>{e.stopPropagation();onNext();}}
          style={{ position:'absolute', right:16, zIndex:10, width:44, height:44, borderRadius:'50%', background:'rgba(255,248,235,0.07)', border:'0.5px solid rgba(255,248,235,0.14)', color:'rgba(245,240,232,0.75)', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>→</button>
      )}

      <motion.div
        key={item.id}
        initial={{ scale:0.88, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.88, opacity:0 }}
        transition={{ duration:0.3, ease:[0.25,0.46,0.45,0.94] }}
        onClick={e => e.stopPropagation()}
        style={{ position:'relative', maxWidth:zoomed?'95vw':'72vw', maxHeight:zoomed?'95vh':'82vh', width:'100%', borderRadius:16, overflow:zoomed?'auto':'hidden', boxShadow:'0 40px 80px rgba(0,0,0,0.95)', background:'#0e0c09', cursor:zoomed?'zoom-out':'zoom-in', transition:'max-width 0.4s, max-height 0.4s' }}>

        {item.src ? (
          <>
            {!loaded && <div style={{ width:'100%', aspectRatio:'4/3', background:'linear-gradient(135deg,#0e0c09,#181410)', animation:'shimPulse 1.8s ease-in-out infinite' }} />}
            <img src={item.src} alt={item.alt} onLoad={() => setLoaded(true)}
              style={{ width:zoomed?'auto':'100%', maxWidth:zoomed?'none':'100%', height:zoomed?'auto':'100%', maxHeight:zoomed?'none':'82vh', objectFit:zoomed?'none':'contain', display:'block', opacity:loaded?1:0, transition:'opacity 0.3s' }} />
          </>
        ) : (
          <div style={{ width:'100%', aspectRatio:'4/3', background:'#0e0c09', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:12, color:'rgba(245,240,232,0.2)' }}>Bild folgt</span>
          </div>
        )}

        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'18px 20px 14px', background:'linear-gradient(to top, rgba(8,5,0,0.95), transparent)', pointerEvents:'none' }}>
          {item.category==='team' && item.personRole && (
            <div style={{ fontSize:10, color:'#c9a84c', fontWeight:600, letterSpacing:'0.1em', marginBottom:3, textTransform:'uppercase' }}>{item.personRole}</div>
          )}
          {item.title && <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(15px,2.5vw,20px)', fontWeight:700, color:'#F5F0E8', marginBottom:3 }}>{item.title}</div>}
          {item.caption && <div style={{ fontSize:11, color:'rgba(245,240,232,0.45)', fontWeight:300 }}>{item.caption}</div>}
        </div>
      </motion.div>

      <div style={{ position:'absolute', bottom:16, left:'50%', transform:'translateX(-50%)', display:'flex', alignItems:'center', gap:14 }}>
        <span style={{ fontSize:11, color:'rgba(245,240,232,0.28)' }}>{idx+1} / {items.length}</span>
        <span style={{ fontSize:10, color:'rgba(245,240,232,0.16)' }}>← → Navigate · + − Zoom · Esc Close</span>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MENU PAGE CONTENT — extracted as top-level component (not inline inside MenuViewer)
// ═══════════════════════════════════════════════════════════════════════════════

function MenuPageContent({ page, imgLoaded, onLoad }: {
  page: MenuPage;
  imgLoaded: boolean;
  onLoad: () => void;
}) {
  if (page.src) {
    return (
      <div style={{ position:'relative', lineHeight:0 }}>
        {!imgLoaded && (
          <div style={{ width:'100%', aspectRatio:'3/4', background:'#0e0c09', display:'flex', alignItems:'center', justifyContent:'center', animation:'shimPulse 1.8s ease-in-out infinite' }}>
            <span style={{ fontSize:11, color:'rgba(245,240,232,0.18)' }}>Wird geladen…</span>
          </div>
        )}
        <img
          src={page.src}
          alt={page.label}
          loading="eager"
          onLoad={onLoad}
          style={{ width:'100%', display:'block', opacity:imgLoaded?1:0, transition:'opacity 0.35s ease' }}
        />
      </div>
    );
  }
  return (
    <div style={{ width:'100%', aspectRatio:'3/4', background:'linear-gradient(160deg,#0e0c09,#141008)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16 }}>
      <div style={{ width:48, height:48, borderRadius:'50%', background:'rgba(201,168,76,0.05)', border:'0.5px solid rgba(201,168,76,0.13)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.28)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      </div>
      <div style={{ textAlign:'center', padding:'0 24px' }}>
        <div style={{ fontSize:13, color:'rgba(245,240,232,0.3)', fontWeight:500, marginBottom:4 }}>{page.label}</div>
        <div style={{ fontSize:10, color:'rgba(245,240,232,0.16)', fontWeight:300, letterSpacing:'0.04em' }}>Bild wird hochgeladen</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MENU FULLSCREEN — extracted as top-level component (not inline inside MenuViewer)
// ═══════════════════════════════════════════════════════════════════════════════

function MenuFullscreen({ page, activePage, total, onClose, onPrev, onNext, onGoTo,
  onTouchStart, onTouchEnd }: {
  page: MenuPage;
  activePage: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}) {
  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      transition={{ duration:0.25 }}
      onClick={onClose}
      style={{ position:'fixed', inset:0, zIndex:600, background:'rgba(0,0,0,0.97)', backdropFilter:'blur(14px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}>

      <button onClick={e=>{e.stopPropagation();onClose();}}
        style={{ position:'absolute', top:18, right:18, zIndex:10, width:40, height:40, borderRadius:'50%', background:'rgba(255,248,235,0.08)', border:'0.5px solid rgba(255,248,235,0.14)', color:'rgba(245,240,232,0.75)', fontSize:17, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>

      {activePage > 0 && (
        <button onClick={e=>{e.stopPropagation();onPrev();}}
          style={{ position:'absolute', left:16, zIndex:10, width:44, height:44, borderRadius:'50%', background:'rgba(255,248,235,0.07)', border:'0.5px solid rgba(255,248,235,0.13)', color:'rgba(245,240,232,0.7)', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
          onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,248,235,0.14)')} onMouseLeave={e=>(e.currentTarget.style.background='rgba(255,248,235,0.07)')}>←</button>
      )}

      {activePage < total - 1 && (
        <button onClick={e=>{e.stopPropagation();onNext();}}
          style={{ position:'absolute', right:16, zIndex:10, width:44, height:44, borderRadius:'50%', background:'rgba(255,248,235,0.07)', border:'0.5px solid rgba(255,248,235,0.13)', color:'rgba(245,240,232,0.7)', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
          onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,248,235,0.14)')} onMouseLeave={e=>(e.currentTarget.style.background='rgba(255,248,235,0.07)')}>→</button>
      )}

      <motion.div
        key={page.id}
        initial={{ scale:0.95, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.95, opacity:0 }}
        transition={{ duration:0.28, ease:[0.25,0.46,0.45,0.94] }}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth:'90vw', maxHeight:'92vh', width:'auto', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:12, overflow:'hidden', boxShadow:'0 40px 80px rgba(0,0,0,0.9)' }}>
        {page.src ? (
          <img src={page.src} alt={page.label}
            style={{ maxWidth:'90vw', maxHeight:'92vh', width:'auto', height:'auto', display:'block', objectFit:'contain' }} />
        ) : (
          <div style={{ width:'60vw', maxWidth:480, aspectRatio:'3/4', background:'#0e0c09', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:12, color:'rgba(245,240,232,0.22)' }}>{page.label}</span>
          </div>
        )}
      </motion.div>

      <div style={{ position:'absolute', bottom:20, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
        <span style={{ fontSize:12, color:'rgba(245,240,232,0.4)' }}>{page.label}</span>
        <div style={{ display:'flex', gap:6 }}>
          {MENU_PAGES.map((_, i) => (
            <div key={i} onClick={e=>{e.stopPropagation();onGoTo(i);}}
              style={{ width:i===activePage?20:6, height:6, borderRadius:3, background:i===activePage?'#c9a84c':'rgba(255,248,235,0.18)', transition:'all 0.35s ease', cursor:'pointer' }} />
          ))}
        </div>
        <span style={{ fontSize:10, color:'rgba(245,240,232,0.18)' }}>← → Navigate · Esc Close · Swipe on mobile</span>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MENU VIEWER — clean, no nested component definitions
// ═══════════════════════════════════════════════════════════════════════════════

function MenuViewer() {
  const [activePage,  setActivePage]  = useState(0);
  const [fullscreen,  setFullscreen]  = useState(false);
  const [imgLoaded,   setImgLoaded]   = useState<Record<string,boolean>>({});
  const [slideDir,    setSlideDir]    = useState<'left'|'right'|'idle'>('idle');

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const total = MENU_PAGES.length;
  const p     = MENU_PAGES[activePage];

  const goTo = useCallback((idx: number, dir: 'left'|'right') => {
    if (idx < 0 || idx >= total) return;
    setSlideDir(dir);
    setActivePage(idx);
    setTimeout(() => setSlideDir('idle'), 300);
  }, [total]);

  const prev = useCallback(() => { if (activePage > 0)        goTo(activePage - 1, 'right'); }, [activePage, goTo]);
  const next = useCallback(() => { if (activePage < total - 1) goTo(activePage + 1, 'left');  }, [activePage, total, goTo]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(dx) > 50 && dy < 60) { if (dx < 0) next(); else prev(); }
    touchStartX.current = null;
    touchStartY.current = null;
  }, [next, prev]);

  // Keyboard — only when fullscreen
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (!fullscreen) return;
      if (e.key === 'Escape')     setFullscreen(false);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [fullscreen, next, prev]);

  useEffect(() => {
    document.body.style.overflow = fullscreen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [fullscreen]);

  const markLoaded = useCallback((id: string) => {
    setImgLoaded(prev => ({ ...prev, [id]: true }));
  }, []);

  return (
    <section style={{ padding:'clamp(52px,7vw,80px) clamp(20px,5vw,60px)', background:'#060400' }}>
      <div style={{ maxWidth:760, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <span style={{ fontSize:11, fontWeight:600, color:'#c9a84c', letterSpacing:'0.22em', textTransform:'uppercase', display:'block', marginBottom:10 }}>Unsere Speisekarte</span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(20px,3.5vw,34px)', fontWeight:700, color:'#F5F0E8', marginBottom:6 }}>Speisekarte ansehen</h2>
          <p style={{ fontSize:12, color:'rgba(245,240,232,0.34)', fontWeight:300 }}>Tippen zum Vergrößern · Wischen zum Blättern</p>
        </div>

        {/* Page Tabs */}
        <div style={{ display:'flex', gap:6, justifyContent:'center', flexWrap:'wrap', marginBottom:18 }}>
          {MENU_PAGES.map((mp, i) => (
            <button key={mp.id}
              onClick={() => goTo(i, i > activePage ? 'left' : 'right')}
              style={{ padding:'6px 13px', borderRadius:100, fontSize:11, fontWeight:500, cursor:'pointer', border:'none', fontFamily:'inherit', transition:'all 0.22s', background:activePage===i?'#c9a84c':'rgba(255,248,235,0.06)', color:activePage===i?'#060400':'rgba(245,240,232,0.48)', boxShadow:activePage===i?'0 3px 10px rgba(201,168,76,0.2)':'none' }}>
              {mp.label}
            </button>
          ))}
        </div>

        {/* Viewer */}
        <div
          style={{ position:'relative', borderRadius:16, overflow:'hidden', border:'0.5px solid rgba(255,248,235,0.09)', background:'#0e0c09', boxShadow:'0 16px 48px rgba(0,0,0,0.6)' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}>

          {/* Fullscreen button */}
          <div style={{ position:'absolute', top:10, right:10, zIndex:10 }}>
            <button
              onClick={() => setFullscreen(true)}
              title="Vollbild"
              style={{ width:32, height:32, borderRadius:'50%', background:'rgba(8,5,0,0.72)', backdropFilter:'blur(8px)', border:'0.5px solid rgba(255,248,235,0.14)', color:'rgba(245,240,232,0.65)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}
              onMouseEnter={e=>(e.currentTarget.style.background='rgba(201,168,76,0.18)')} onMouseLeave={e=>(e.currentTarget.style.background='rgba(8,5,0,0.72)')}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
            </button>
          </div>

          {/* Animated page */}
          <motion.div
            key={p.id}
            initial={{ opacity:0, x:slideDir==='left'?18:slideDir==='right'?-18:0 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.3, ease:[0.25,0.46,0.45,0.94] }}
            onClick={() => p.src && setFullscreen(true)}
            style={{ cursor:p.src?'zoom-in':'default' }}>
            <MenuPageContent
              page={p}
              imgLoaded={!!imgLoaded[p.id]}
              onLoad={() => markLoaded(p.id)}
            />
          </motion.div>

          {/* Nav bar */}
          <div style={{ padding:'10px 16px', borderTop:'0.5px solid rgba(255,248,235,0.07)', display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(6,4,0,0.85)', backdropFilter:'blur(8px)' }}>
            <span style={{ fontSize:11, color:'rgba(245,240,232,0.36)' }}>{p.label}</span>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <button onClick={prev} disabled={activePage===0}
                style={{ width:28, height:28, borderRadius:'50%', background:'rgba(255,248,235,0.05)', border:'0.5px solid rgba(255,248,235,0.1)', color:'rgba(245,240,232,0.55)', fontSize:12, cursor:activePage===0?'not-allowed':'pointer', opacity:activePage===0?0.28:1, display:'flex', alignItems:'center', justifyContent:'center' }}>←</button>
              <div style={{ display:'flex', gap:5, alignItems:'center' }}>
                {MENU_PAGES.map((_, i) => (
                  <div key={i}
                    onClick={() => goTo(i, i > activePage ? 'left' : 'right')}
                    style={{ width:i===activePage?16:5, height:5, borderRadius:3, background:i===activePage?'#c9a84c':'rgba(255,248,235,0.16)', transition:'all 0.35s ease', cursor:'pointer' }} />
                ))}
              </div>
              <button onClick={next} disabled={activePage===total-1}
                style={{ width:28, height:28, borderRadius:'50%', background:'rgba(255,248,235,0.05)', border:'0.5px solid rgba(255,248,235,0.1)', color:'rgba(245,240,232,0.55)', fontSize:12, cursor:activePage===total-1?'not-allowed':'pointer', opacity:activePage===total-1?0.28:1, display:'flex', alignItems:'center', justifyContent:'center' }}>→</button>
            </div>
          </div>
        </div>

        {/* Mobile swipe hint */}
        <p style={{ textAlign:'center', fontSize:11, color:'rgba(245,240,232,0.2)', marginTop:12, fontWeight:300 }}>
          Wischen zum Blättern · Tippen für Vollbild
        </p>
      </div>

      {/* Fullscreen — now a proper top-level component, no re-mount issues */}
      <AnimatePresence>
        {fullscreen && (
          <MenuFullscreen
            page={p}
            activePage={activePage}
            total={total}
            onClose={() => setFullscreen(false)}
            onPrev={prev}
            onNext={next}
            onGoTo={(i) => goTo(i, i > activePage ? 'left' : 'right')}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BTS VIDEO CARD
// ═══════════════════════════════════════════════════════════════════════════════

function BtsVideoCard({ video, onPlay }: { video: BtsVideo; onPlay: (v: BtsVideo) => void }) {
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying]  = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (hovered) { el.play().catch(() => {}); setPlaying(true); }
    else          { el.pause(); el.currentTime = 0; setPlaying(false); }
  }, [hovered]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(video)}
      style={{ position:'relative', borderRadius:16, overflow:'hidden', cursor:'pointer', background:'#0e0c09', border:`0.5px solid ${hovered?'rgba(201,168,76,0.25)':'rgba(255,248,235,0.07)'}`, transition:'all 0.38s cubic-bezier(0.25,0.46,0.45,0.94)', transform:hovered?'scale(1.02)':'scale(1)', boxShadow:hovered?'0 20px 48px rgba(0,0,0,0.7)':'0 4px 18px rgba(0,0,0,0.3)', aspectRatio:'16/9' }}>

      {/* Video element — preview on hover, muted */}
      <video
        ref={videoRef}
        src={video.src}
        muted
        loop
        playsInline
        preload="metadata"
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'opacity 0.4s', opacity:playing?1:0.7 }}
      />

      {/* Dark overlay */}
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(to top, rgba(6,4,0,0.92) 0%, rgba(6,4,0,0.3) 45%, rgba(6,4,0,${hovered?'0.1':'0.4'}) 100%)`, transition:'all 0.38s' }} />

      {/* Play button */}
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity:hovered?0.95:0.75, transition:'opacity 0.3s' }}>
        <div style={{ width:52, height:52, borderRadius:'50%', background:'rgba(201,168,76,0.15)', backdropFilter:'blur(8px)', border:`1.5px solid rgba(201,168,76,${hovered?'0.6':'0.3'})`, display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.3s', transform:hovered?'scale(1.12)':'scale(1)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(201,168,76,0.95)" style={{ marginLeft:3 }}>
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>
      </div>

      {/* Info */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'12px 14px', transform:hovered?'translateY(0)':'translateY(2px)', opacity:hovered?1:0.8, transition:'all 0.35s' }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:700, color:'#F5F0E8', marginBottom:2, lineHeight:1.2 }}>{video.title}</div>
        <div style={{ fontSize:10, color:'rgba(245,240,232,0.5)', fontWeight:300 }}>{video.caption}</div>
      </div>

      {/* "Video" badge */}
      <div style={{ position:'absolute', top:10, left:10, background:'rgba(6,4,0,0.7)', backdropFilter:'blur(6px)', border:'0.5px solid rgba(201,168,76,0.3)', color:'#c9a84c', fontSize:9, fontWeight:700, padding:'3px 8px', borderRadius:100, letterSpacing:'0.1em', textTransform:'uppercase' }}>
        ▶ Video
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BTS VIDEO FULLSCREEN PLAYER
// ═══════════════════════════════════════════════════════════════════════════════

function BtsVideoPlayer({ video, onClose, onPrev, onNext, hasPrev, hasNext }: {
  video: BtsVideo; onClose: () => void;
  onPrev: () => void; onNext: () => void;
  hasPrev: boolean; hasNext: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);

  // Play only when the browser has buffered enough — fixes black screen on slow-loading videos
  const handleCanPlay = useCallback(() => {
    setLoading(false);
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {
      // If autoplay is blocked, the controls will let user start manually
    });
  }, []);

  // Reset loading state when video src changes
  useEffect(() => {
    setLoading(true);
  }, [video.src]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft')  onPrev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose}
      style={{ position:'fixed', inset:0, zIndex:600, background:'rgba(0,0,0,0.97)', backdropFilter:'blur(14px)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>

      <button onClick={e=>{e.stopPropagation();onClose();}} style={{ position:'absolute', top:18, right:18, zIndex:10, width:40, height:40, borderRadius:'50%', background:'rgba(255,248,235,0.08)', border:'0.5px solid rgba(255,248,235,0.14)', color:'rgba(245,240,232,0.75)', fontSize:17, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
      {hasPrev && <button onClick={e=>{e.stopPropagation();onPrev();}} style={{ position:'absolute', left:16, zIndex:10, width:44, height:44, borderRadius:'50%', background:'rgba(255,248,235,0.07)', border:'0.5px solid rgba(255,248,235,0.13)', color:'rgba(245,240,232,0.7)', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>←</button>}
      {hasNext && <button onClick={e=>{e.stopPropagation();onNext();}} style={{ position:'absolute', right:16, zIndex:10, width:44, height:44, borderRadius:'50%', background:'rgba(255,248,235,0.07)', border:'0.5px solid rgba(255,248,235,0.13)', color:'rgba(245,240,232,0.7)', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>→</button>}

      <motion.div
        key={video.id}
        initial={{ scale:0.92, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.92, opacity:0 }}
        transition={{ duration:0.28, ease:[0.25,0.46,0.45,0.94] }}
        onClick={e => e.stopPropagation()}
        style={{ width:'min(90vw, 900px)', borderRadius:16, overflow:'hidden', boxShadow:'0 40px 80px rgba(0,0,0,0.95)', background:'#0e0c09', border:'0.5px solid rgba(255,248,235,0.08)', position:'relative' }}>

        {/* Loading spinner — shown while video buffers */}
        {loading && (
          <div style={{ position:'absolute', inset:0, zIndex:5, background:'#0e0c09', display:'flex', alignItems:'center', justifyContent:'center', minHeight:200 }}>
            <div style={{ width:44, height:44, borderRadius:'50%', border:'2px solid rgba(201,168,76,0.15)', borderTopColor:'#c9a84c', animation:'spinLoader 0.8s linear infinite' }} />
          </div>
        )}

        {/* Video — no autoPlay attribute, play() called via onCanPlay */}
        <video
          ref={videoRef}
          src={video.src}
          controls
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          onWaiting={() => setLoading(true)}
          onPlaying={() => setLoading(false)}
          style={{ width:'100%', display:'block', maxHeight:'78vh', background:'#0e0c09' }}
        />

        <div style={{ padding:'12px 16px', background:'rgba(6,4,0,0.9)' }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, color:'#F5F0E8', marginBottom:3 }}>{video.title}</div>
          <div style={{ fontSize:11, color:'rgba(245,240,232,0.4)', fontWeight:300 }}>{video.caption}</div>
        </div>
      </motion.div>

      <div style={{ position:'absolute', bottom:16, left:'50%', transform:'translateX(-50%)', fontSize:10, color:'rgba(255,248,235,0.18)' }}>
        ← → Navigate · Esc Close
      </div>

      <style>{`@keyframes spinLoader { to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BTS FULL SECTION — videos first, photos below
// ═══════════════════════════════════════════════════════════════════════════════

function BtsSection({ onPhotoClick }: { onPhotoClick: (item: GalleryItem) => void }) {
  const [activeVideo, setActiveVideo] = useState<BtsVideo | null>(null);
  const btsPhotos = GALLERY_ITEMS.filter(i => i.category === 'bts');

  const openVideo  = useCallback((v: BtsVideo) => { setActiveVideo(v); document.body.style.overflow = 'hidden'; }, []);
  const closeVideo = useCallback(() => { setActiveVideo(null); document.body.style.overflow = ''; }, []);
  const prevVideo  = useCallback(() => {
    if (!activeVideo) return;
    const idx = BTS_VIDEOS.findIndex(v => v.id === activeVideo.id);
    if (idx > 0) setActiveVideo(BTS_VIDEOS[idx - 1]);
  }, [activeVideo]);
  const nextVideo  = useCallback(() => {
    if (!activeVideo) return;
    const idx = BTS_VIDEOS.findIndex(v => v.id === activeVideo.id);
    if (idx < BTS_VIDEOS.length - 1) setActiveVideo(BTS_VIDEOS[idx + 1]);
  }, [activeVideo]);

  const videoIdx = activeVideo ? BTS_VIDEOS.findIndex(v => v.id === activeVideo.id) : -1;

  return (
    <div style={{ paddingTop:28 }}>
      {/* ── Part 1: Videos ── */}
      <div style={{ padding:'0 clamp(20px,5vw,60px) 40px', maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:22 }}>
          <div style={{ width:3, height:22, background:'#c9a84c', borderRadius:2 }} />
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:'#F5F0E8', margin:0 }}>Küchen-Momente</h3>
          <div style={{ fontSize:11, color:'rgba(201,168,76,0.6)', background:'rgba(201,168,76,0.08)', border:'0.5px solid rgba(201,168,76,0.18)', padding:'3px 10px', borderRadius:100, letterSpacing:'0.1em', textTransform:'uppercase' }}>
            {BTS_VIDEOS.length} Videos
          </div>
        </div>

        {/* Featured video large + 2 smaller */}
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:14, marginBottom:14 }}>
          {BTS_VIDEOS[0] && <BtsVideoCard key={BTS_VIDEOS[0].id} video={BTS_VIDEOS[0]} onPlay={openVideo} />}
          <div style={{ display:'grid', gridTemplateRows:'1fr 1fr', gap:14 }}>
            {BTS_VIDEOS[1] && <BtsVideoCard key={BTS_VIDEOS[1].id} video={BTS_VIDEOS[1]} onPlay={openVideo} />}
            {BTS_VIDEOS[2] && <BtsVideoCard key={BTS_VIDEOS[2].id} video={BTS_VIDEOS[2]} onPlay={openVideo} />}
          </div>
        </div>

        {/* Remaining 3 videos equal width */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
          {BTS_VIDEOS.slice(3).map(v => <BtsVideoCard key={v.id} video={v} onPlay={openVideo} />)}
        </div>
      </div>

      {/* ── Part 2: Photos ── */}
      {btsPhotos.length > 0 && (
        <div style={{ padding:'0 clamp(20px,5vw,60px) 60px', maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:22 }}>
            <div style={{ width:3, height:22, background:'rgba(255,248,235,0.25)', borderRadius:2 }} />
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:'#F5F0E8', margin:0 }}>Hinter den Kulissen</h3>
            <div style={{ fontSize:11, color:'rgba(245,240,232,0.3)', background:'rgba(255,248,235,0.04)', border:'0.5px solid rgba(255,248,235,0.1)', padding:'3px 10px', borderRadius:100, letterSpacing:'0.1em', textTransform:'uppercase' }}>
              {btsPhotos.length} Fotos
            </div>
          </div>
          <div style={{ columns:'3 200px', columnGap:14 }}>
            {btsPhotos.map(item => <GalleryCard key={item.id} item={item} onClick={() => onPhotoClick(item)} />)}
          </div>
        </div>
      )}

      {/* Video Player */}
      <AnimatePresence>
        {activeVideo && (
          <BtsVideoPlayer
            video={activeVideo}
            onClose={closeVideo}
            onPrev={prevVideo}
            onNext={nextVideo}
            hasPrev={videoIdx > 0}
            hasNext={videoIdx < BTS_VIDEOS.length - 1}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURED VIDEO SECTION — "Ein Moment bei Milano"
// ═══════════════════════════════════════════════════════════════════════════════

function FeaturedVideoSection() {
  const ref          = useRef<HTMLElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const inView       = useInView(ref, { once: true, margin: '-80px' });
  const [playing,    setPlaying]    = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [hovered,    setHovered]    = useState(false);

  // Muted preview on hover
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (hovered && !playing) {
      el.muted = true;
      el.play().catch(() => {});
    } else if (!hovered && !playing) {
      el.pause();
      el.currentTime = 0;
    }
  }, [hovered, playing]);

  function handlePlayClick(e: React.MouseEvent) {
    e.stopPropagation();
    setFullscreen(true);
    setPlaying(true);
  }

  function closeFullscreen() {
    setFullscreen(false);
    setPlaying(false);
    const el = videoRef.current;
    if (el) { el.muted = true; el.pause(); el.currentTime = 0; }
  }

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') closeFullscreen(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = fullscreen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [fullscreen]);

  return (
    <section ref={ref} style={{ padding: 'clamp(60px,8vw,90px) clamp(20px,5vw,60px)', background: '#050300', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient glow */}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:500, height:500, background:'radial-gradient(ellipse, rgba(201,168,76,0.06), transparent 65%)', pointerEvents:'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>

        {/* Left — Text */}
        <motion.div
          initial={{ opacity:0, x:-28 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.9, ease:[0.25,0.46,0.45,0.94] }}>
          <span style={{ fontSize:11, fontWeight:600, color:'#c9a84c', letterSpacing:'0.22em', textTransform:'uppercase', display:'block', marginBottom:16 }}>Hinter der Kamera</span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(26px,3.8vw,42px)', fontWeight:900, color:'#F5F0E8', lineHeight:1.15, marginBottom:18 }}>
            Ein Moment<br />
            <em style={{ color:'#c9a84c' }}>bei Milano</em>
          </h2>
          <p style={{ fontSize:15, color:'rgba(245,240,232,0.5)', lineHeight:1.85, fontWeight:300, marginBottom:32, maxWidth:380 }}>
            Frische Zutaten, echte Handarbeit und italienische Leidenschaft. So entsteht Ihre Pizza — jeden Tag.
          </p>
          {/* Play CTA */}
          <button
            onClick={handlePlayClick}
            style={{ display:'inline-flex', alignItems:'center', gap:14, background:'transparent', border:'none', cursor:'pointer', padding:0, fontFamily:'inherit', transition:'all 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity='0.8')} onMouseLeave={e => (e.currentTarget.style.opacity='1')}>
            <div style={{ width:52, height:52, borderRadius:'50%', background:'rgba(201,168,76,0.12)', border:'1.5px solid rgba(201,168,76,0.4)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.3s', flexShrink:0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#c9a84c" style={{ marginLeft:3 }}>
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:'#F5F0E8', marginBottom:2 }}>Video abspielen</div>
              <div style={{ fontSize:11, color:'rgba(245,240,232,0.35)', fontWeight:300 }}>19 Sekunden · Mit Ton</div>
            </div>
          </button>

          {/* Decorative stats */}
          <div style={{ display:'flex', gap:24, marginTop:40, paddingTop:28, borderTop:'0.5px solid rgba(255,248,235,0.07)' }}>
            {[
              { num:'Seit 2009', label:'Ihr Vertrauen' },
              { num:'Täglich', label:'Frisch zubereitet' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, color:'#c9a84c', marginBottom:3 }}>{s.num}</div>
                <div style={{ fontSize:11, color:'rgba(245,240,232,0.35)', fontWeight:300 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Vertical Video Frame */}
        <motion.div
          initial={{ opacity:0, x:28 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.9, delay:0.12, ease:[0.25,0.46,0.45,0.94] }}
          style={{ display:'flex', justifyContent:'center', position:'relative' }}>

          {/* Outer glow */}
          <div style={{ position:'absolute', inset:-14, borderRadius:32, background:'radial-gradient(ellipse, rgba(201,168,76,0.1), transparent 65%)', animation:'ftGlow 4s ease-in-out infinite', pointerEvents:'none' }} />

          {/* Spinning gold border */}
          <div style={{ position:'absolute', inset:-3, borderRadius:28, background:'conic-gradient(from 0deg, rgba(201,168,76,0.7), rgba(255,248,235,0.15), rgba(201,168,76,0.2), rgba(201,168,76,0.7))', animation:'ftSpin 8s linear infinite', zIndex:0, filter:'blur(0.5px)' }} />

          {/* Video container */}
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handlePlayClick}
            style={{ position:'relative', width:'min(280px, 65%)', borderRadius:24, overflow:'hidden', border:'0.5px solid rgba(201,168,76,0.3)', boxShadow:'0 24px 56px rgba(0,0,0,0.8)', zIndex:1, cursor:'pointer', aspectRatio:'9/16' }}>

            <video
              ref={videoRef}
              src="/gallery/featured-video.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)', transform: hovered?'scale(1.04)':'scale(1)' }}
            />

            {/* Cinematic overlay */}
            <div style={{ position:'absolute', inset:0, background:`linear-gradient(to top, rgba(6,4,0,0.85) 0%, rgba(6,4,0,0.15) 40%, rgba(6,4,0,${hovered?'0.05':'0.25'}) 100%)`, transition:'all 0.4s' }} />

            {/* Play button */}
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:56, height:56, borderRadius:'50%', background:'rgba(6,4,0,0.55)', backdropFilter:'blur(8px)', border:`1.5px solid rgba(201,168,76,${hovered?'0.7':'0.4'})`, display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.35s', transform:hovered?'scale(1.1)':'scale(1)', boxShadow:hovered?'0 0 28px rgba(201,168,76,0.25)':'none' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(201,168,76,0.95)" style={{ marginLeft:3 }}>
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
            </div>

            {/* Duration badge */}
            <div style={{ position:'absolute', bottom:14, left:0, right:0, display:'flex', justifyContent:'center' }}>
              <div style={{ background:'rgba(6,4,0,0.72)', backdropFilter:'blur(6px)', border:'0.5px solid rgba(201,168,76,0.25)', color:'rgba(245,240,232,0.7)', fontSize:10, fontWeight:500, padding:'4px 12px', borderRadius:100, letterSpacing:'0.08em' }}>
                ▶ 0:19
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen player */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={closeFullscreen}
            style={{ position:'fixed', inset:0, zIndex:700, background:'rgba(0,0,0,0.97)', backdropFilter:'blur(14px)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
            <button onClick={e=>{e.stopPropagation();closeFullscreen();}} style={{ position:'absolute', top:18, right:18, zIndex:10, width:40, height:40, borderRadius:'50%', background:'rgba(255,248,235,0.08)', border:'0.5px solid rgba(255,248,235,0.14)', color:'rgba(245,240,232,0.75)', fontSize:17, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
            <motion.div
              initial={{ scale:0.92, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.92, opacity:0 }}
              transition={{ duration:0.28, ease:[0.25,0.46,0.45,0.94] }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth:'min(380px,90vw)', width:'100%', borderRadius:20, overflow:'hidden', boxShadow:'0 40px 80px rgba(0,0,0,0.95)', border:'0.5px solid rgba(201,168,76,0.2)' }}>
              <video
                key="featured-fullscreen"
                src="/gallery/featured-video.mp4"
                controls
                autoPlay
                playsInline
                preload="auto"
                style={{ width:'100%', display:'block', maxHeight:'88vh', background:'#0e0c09' }}
              />
            </motion.div>
            <div style={{ position:'absolute', bottom:18, left:'50%', transform:'translateX(-50%)', fontSize:10, color:'rgba(255,248,235,0.2)' }}>Esc · Schließen</div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes ftGlow { 0%,100%{opacity:0.6;transform:translate(-50%,-50%) scale(1)} 50%{opacity:1;transform:translate(-50%,-50%) scale(1.05)} }
        @keyframes ftSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LIEFERANDO CTA SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function LieferandoCTA() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <section ref={ref} style={{ padding:'clamp(60px,8vw,90px) clamp(20px,5vw,60px)', background:'#060300', borderTop:'0.5px solid rgba(255,248,235,0.05)', position:'relative', overflow:'hidden' }}>

      {/* Subtle background glow */}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:300, background:'radial-gradient(ellipse, rgba(255,100,0,0.04), transparent 65%)', pointerEvents:'none' }} />

      <motion.div
        initial={{ opacity:0, y:28 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.85, ease:[0.25,0.46,0.45,0.94] }}
        style={{ maxWidth:640, margin:'0 auto', textAlign:'center', position:'relative' }}>

        {/* Pizza emoji — small, elegant */}
        <div style={{ fontSize:40, marginBottom:20, filter:'drop-shadow(0 4px 12px rgba(201,168,76,0.2))' }}>🍕</div>

        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(26px,4vw,44px)', fontWeight:900, color:'#F5F0E8', marginBottom:14, lineHeight:1.2 }}>
          Hungrig geworden?
        </h2>

        <p style={{ fontSize:'clamp(14px,1.8vw,17px)', color:'rgba(245,240,232,0.5)', lineHeight:1.8, marginBottom:36, fontWeight:300, maxWidth:420, margin:'0 auto 36px' }}>
          Bestellen Sie bequem online direkt über unsere Webseite — frisch zubereitet, direkt zu Ihnen nach Hause.
        </p>

        {/* Lieferando Button */}
        <motion.a
          href="https://milanopizzeria-duisburg.de/order"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            background: hovered ? 'rgba(255,100,0,0.18)' : 'rgba(255,100,0,0.1)',
            color: '#F5F0E8',
            border: `1px solid ${hovered ? 'rgba(255,100,0,0.55)' : 'rgba(255,100,0,0.28)'}`,
            padding: '16px 36px',
            borderRadius: 100,
            fontSize: 15,
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
            fontFamily: 'inherit',
            letterSpacing: '0.2px',
            boxShadow: hovered ? '0 8px 32px rgba(255,100,0,0.18)' : 'none',
            transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          }}>
          {/* Lieferando-orange dot */}
          <span style={{ width:10, height:10, borderRadius:'50%', background:'#ff6400', flexShrink:0, boxShadow:'0 0 10px rgba(255,100,0,0.5)' }} />
          Jetzt online bestellen
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,232,0.5)" strokeWidth="2" strokeLinecap="round">
            <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
          </svg>
        </motion.a>

        {/* Subtle trust line */}
        <div style={{ display:'flex', gap:20, justifyContent:'center', alignItems:'center', marginTop:28, flexWrap:'wrap' }}>
          {['🛵 Lieferkosten nur 1,00 €', '⏱ ca. 30 Minuten', '📞 0203 · 45 65 284'].map(t => (
            <span key={t} style={{ fontSize:12, color:'rgba(245,240,232,0.28)', fontWeight:300 }}>{t}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CATEGORY TABS
// ═══════════════════════════════════════════════════════════════════════════════

function CategoryTabs({ active, onChange }: { active: CategoryId; onChange: (id: CategoryId) => void }) {
  const counts: Record<string,number> = {
    all:      GALLERY_ITEMS.length,
    food:     GALLERY_ITEMS.filter(i => i.category==='food').length,
    interior: GALLERY_ITEMS.filter(i => i.category==='interior').length,
    delivery: GALLERY_ITEMS.filter(i => i.category==='delivery').length,
    team:     GALLERY_ITEMS.filter(i => i.category==='team').length,
    bts:      GALLERY_ITEMS.filter(i => i.category==='bts').length,
    menu:     MENU_PAGES.length,
  };
  return (
    <div style={{ position:'sticky', top:72, zIndex:50, background:'rgba(6,4,0,0.96)', backdropFilter:'blur(12px)', borderBottom:'0.5px solid rgba(255,248,235,0.07)', padding:'12px clamp(20px,5vw,60px)', display:'flex', gap:6, flexWrap:'wrap', alignItems:'center' }}>
      {CATEGORIES.map(cat => {
        const on = active === cat.id;
        return (
          <button key={cat.id} onClick={() => onChange(cat.id)}
            style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'7px 15px', borderRadius:100, fontSize:12, fontWeight:500, cursor:'pointer', border:'none', fontFamily:'inherit', transition:'all 0.22s', background:on?'#c9a84c':'rgba(255,248,235,0.05)', color:on?'#060400':'rgba(245,240,232,0.52)', boxShadow:on?'0 4px 14px rgba(201,168,76,0.22)':'none' }}
            onMouseEnter={e=>{ if(!on)(e.currentTarget.style.background='rgba(255,248,235,0.09)'); }}
            onMouseLeave={e=>{ if(!on)(e.currentTarget.style.background='rgba(255,248,235,0.05)'); }}>
            <span>{cat.label}</span>
            <span style={{ fontSize:10, background:on?'rgba(6,4,0,0.2)':'rgba(255,248,235,0.07)', padding:'1px 7px', borderRadius:10, color:on?'#060400':'rgba(245,240,232,0.32)' }}>{counts[cat.id]}</span>
          </button>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [lightboxItem,   setLightboxItem]   = useState<GalleryItem | null>(null);

  const filtered = activeCategory === 'all' || activeCategory === 'menu'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(i => i.category === activeCategory);

  const openLightbox  = useCallback((item: GalleryItem) => { setLightboxItem(item); document.body.style.overflow = 'hidden'; }, []);
  const closeLightbox = useCallback(() => { setLightboxItem(null); document.body.style.overflow = ''; }, []);
  const goNext = useCallback(() => {
    if (!lightboxItem) return;
    const idx = filtered.findIndex(i => i.id === lightboxItem.id);
    if (idx < filtered.length - 1) setLightboxItem(filtered[idx + 1]);
  }, [lightboxItem, filtered]);
  const goPrev = useCallback(() => {
    if (!lightboxItem) return;
    const idx = filtered.findIndex(i => i.id === lightboxItem.id);
    if (idx > 0) setLightboxItem(filtered[idx - 1]);
  }, [lightboxItem, filtered]);

  useEffect(() => {
    if (!lightboxItem) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft')  goPrev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [lightboxItem, closeLightbox, goNext, goPrev]);

  return (
    <main style={{ background:'#060400', minHeight:'100vh', color:'#F5F0E8', fontFamily:"'Inter',sans-serif" }}>

      {/* Hero */}
      <section style={{ padding:'clamp(80px,10vw,110px) clamp(20px,5vw,60px) 48px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, left:'50%', transform:'translateX(-50%)', width:500, height:280, background:'radial-gradient(ellipse, rgba(201,168,76,0.07), transparent 70%)', pointerEvents:'none' }} />
        <motion.div initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
          <span style={{ display:'block', fontSize:11, fontWeight:600, color:'#c9a84c', letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:14 }}>Galerie</span>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(32px,6vw,58px)', fontWeight:900, color:'#F5F0E8', marginBottom:14, lineHeight:1.1 }}>
            Bilder sagen<br /><em style={{ color:'#c9a84c' }}>mehr als Worte</em>
          </h1>
          <p style={{ fontSize:14, color:'rgba(245,240,232,0.42)', maxWidth:420, margin:'0 auto', lineHeight:1.75, fontWeight:300 }}>
            Entdecken Sie Milano Pizzeria — unsere Gerichte, unser Ambiente und unsere Leidenschaft.
          </p>
        </motion.div>
      </section>

      {/* Category Tabs */}
      <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeCategory === 'menu' ? (
          <motion.div key="menu" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}>
            <MenuViewer />
          </motion.div>
        ) : activeCategory === 'bts' ? (
          <motion.div key="bts" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}>
            <BtsSection onPhotoClick={openLightbox} />
          </motion.div>
        ) : (
          <motion.div key="gallery" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }} style={{ paddingTop:28 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign:'center', padding:'80px 24px' }}>
                <p style={{ fontSize:13, color:'rgba(245,240,232,0.25)' }}>Keine Fotos in dieser Kategorie</p>
              </div>
            ) : (
              <div className="masonry-grid" style={{ columns:'4 200px', columnGap:14, padding:'0 clamp(20px,5vw,60px) 60px', maxWidth:1280, margin:'0 auto' }}>
                {filtered.map(item => (
                  <GalleryCard key={item.id} item={item} onClick={() => openLightbox(item)} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            item={lightboxItem}
            items={filtered}
            onClose={closeLightbox}
            onNext={goNext}
            onPrev={goPrev}
          />
        )}
      </AnimatePresence>

      {/* Featured Video — always visible */}
      <FeaturedVideoSection />

      {/* Lieferando CTA — always visible */}
      <LieferandoCTA />

      <style>{`
        @media(max-width:1024px){ .masonry-grid{ columns:3 180px !important } }
        @media(max-width:640px) { .masonry-grid{ columns:2 140px !important } }
        @media(max-width:400px) { .masonry-grid{ columns:1 !important } }
        @keyframes shimPulse { 0%,100%{opacity:1} 50%{opacity:0.55} }
      `}</style>
    </main>
  );
}
