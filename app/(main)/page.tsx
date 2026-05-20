'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HEADLINES = [
  { line1: 'Frisch aus dem',   line2: 'Steinofen',     line3: '' },
  { line1: 'Originaler',       line2: 'Italienischer', line3: 'Geschmack' },
  { line1: 'Pizza wie',        line2: 'in Neapel',     line3: '' },
  { line1: 'Seit 2009',        line2: 'Duisburgs',     line3: 'Nr. 1' },
];

function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [headIdx, setHeadIdx] = useState(0);
  const [fadeIn,  setFadeIn]  = useState(true);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => { setHeadIdx(i => (i+1) % HEADLINES.length); setFadeIn(true); }, 550);
    }, 4200);
    return () => clearInterval(t);
  }, []);

  const h = HEADLINES[headIdx];

  return (
    <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', background:'#080400' }}>

      {/* Video */}
      <video autoPlay muted loop playsInline style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }}>
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{ position:'absolute', inset:0, background:'rgba(8,4,0,0.68)', zIndex:1 }} />
      {/* Warm oven glow — bottom */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'45%', background:'linear-gradient(to top, rgba(160,70,10,0.22), rgba(180,90,10,0.06), transparent)', zIndex:2, pointerEvents:'none' }} />
      {/* Warm amber centre */}
      <div style={{ position:'absolute', top:'55%', left:'50%', transform:'translate(-50%,-50%)', width:'70%', height:'60%', background:'radial-gradient(ellipse, rgba(180,100,20,0.1), transparent 65%)', zIndex:2, pointerEvents:'none', animation:'warmPulse 5s ease-in-out infinite' }} />
      {/* Top vignette */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'30%', background:'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)', zIndex:2, pointerEvents:'none' }} />

      {/* Content */}
      <div style={{ position:'relative', textAlign:'center', padding:'0 clamp(20px,5vw,60px)', maxWidth:820, zIndex:3 }}>

        {/* Badge */}
        <motion.div initial={{ opacity:0, y:16 }} animate={mounted?{opacity:1,y:0}:{}} transition={{ duration:0.9 }}
          style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(201,168,76,0.1)', border:'0.5px solid rgba(201,168,76,0.28)', borderRadius:100, padding:'7px 18px', fontSize:11, fontWeight:600, color:'#c9a84c', letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:32 }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#c9a84c', animation:'blink 2.5s ease-in-out infinite', display:'inline-block' }} />
          Seit 2009 in Duisburg &nbsp;·&nbsp; ⭐ 4.9 Google Rating
        </motion.div>

        {/* Rotating Headline */}
        <motion.div initial={{ opacity:0, y:28 }} animate={mounted?{opacity:1,y:0}:{}} transition={{ duration:1, delay:0.15 }}>
          <h1 style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:'clamp(44px,8.5vw,96px)',
            fontWeight:900,
            color:'#F5F0E8',
            lineHeight:1.05,
            marginBottom:28,
            letterSpacing:'-0.025em',
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? 'translateY(0)' : 'translateY(10px)',
            transition:'opacity 0.5s ease, transform 0.5s ease',
          }}>
            {h.line1}<br />
            <em style={{ background:'linear-gradient(135deg,#c9a84c,#e8c97e)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontStyle:'italic' }}>
              {h.line2}
            </em>
            {h.line3 && <><br />{h.line3}</>}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p initial={{ opacity:0 }} animate={mounted?{opacity:1}:{}} transition={{ duration:1, delay:0.38 }}
          style={{ fontSize:'clamp(14px,1.8vw,18px)', color:'rgba(245,240,232,0.6)', maxWidth:500, margin:'0 auto 44px', lineHeight:1.85, fontWeight:300, letterSpacing:'0.02em' }}>
          Authentische Rezepte · Frische Zutaten aus Italien · Steinofen-Qualität
        </motion.p>

        {/* CTA */}
        <motion.div initial={{ opacity:0, y:18 }} animate={mounted?{opacity:1,y:0}:{}} transition={{ duration:0.9, delay:0.52 }}
          style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/order" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#6DA544', color:'#fff', padding:'16px 38px', borderRadius:100, fontSize:15, fontWeight:600, textDecoration:'none', transition:'all 0.3s', boxShadow:'0 8px 32px rgba(109,165,68,0.28)', letterSpacing:'0.2px' }}
            onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background='#7ec44f'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; }}
            onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background='#6DA544'; (e.currentTarget as HTMLElement).style.transform='none'; }}>
            Jetzt bestellen
          </Link>
          <Link href="/reservation" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,248,235,0.07)', color:'rgba(245,240,232,0.9)', padding:'16px 38px', borderRadius:100, fontSize:15, fontWeight:400, textDecoration:'none', border:'0.5px solid rgba(255,248,235,0.22)', transition:'all 0.3s', letterSpacing:'0.2px' }}
            onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background='rgba(255,248,235,0.12)'; }}
            onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background='rgba(255,248,235,0.07)'; }}>
            Tisch reservieren
          </Link>
        </motion.div>

        {/* Dots */}
        <motion.div initial={{ opacity:0 }} animate={mounted?{opacity:1}:{}} transition={{ delay:0.8 }}
          style={{ display:'flex', gap:7, justifyContent:'center', marginTop:48 }}>
          {HEADLINES.map((_,i) => (
            <div key={i} style={{ width:i===headIdx?22:6, height:6, borderRadius:3, background:i===headIdx?'#c9a84c':'rgba(255,255,255,0.18)', transition:'all 0.4s ease' }} />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:'absolute', bottom:36, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:7, color:'rgba(255,248,235,0.3)', fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', zIndex:3 }}>
        <div style={{ width:1, height:38, background:'linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent)', animation:'scrollLine 2s ease-in-out infinite' }} />
        Scroll
      </div>

      <style>{`
        @keyframes warmPulse { 0%,100%{opacity:0.7;transform:translate(-50%,-50%) scale(1)} 50%{opacity:1;transform:translate(-50%,-50%) scale(1.06)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes scrollLine { 0%,100%{opacity:0.3;transform:scaleY(0.8)} 50%{opacity:1;transform:scaleY(1.2)} }
      `}</style>
    </section>
  );
}

// ─── Social Proof Strip ───────────────────────────────────────────────────────
function SocialProofStrip() {
  const reviews = [
    '"Beste Pizza in ganz Duisburg"',
    '"Wie frisch aus Neapel"',
    '"Schnelle Lieferung, immer heiß"',
    '"Meine Familie kommt seit Jahren"',
    '"Der Teig ist einfach perfekt"',
    '"Steinofen-Qualität — jeden Cent wert"',
    '"Bester Abend mit der Familie"',
    '"Carbonara wie in Rom"',
  ];
  const items = [...reviews, ...reviews];
  return (
    <div style={{ background:'rgba(201,168,76,0.05)', borderTop:'0.5px solid rgba(201,168,76,0.1)', borderBottom:'0.5px solid rgba(201,168,76,0.1)', padding:'13px 0', overflow:'hidden' }}>
      <div style={{ display:'flex', gap:56, animation:'socialScroll 35s linear infinite', whiteSpace:'nowrap' }}>
        {items.map((r,i) => (
          <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:10, flexShrink:0 }}>
            <span style={{ color:'#c9a84c', fontSize:11, letterSpacing:2 }}>★★★★★</span>
            <span style={{ fontSize:12, color:'rgba(245,240,232,0.5)', fontStyle:'italic', fontWeight:300 }}>{r}</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes socialScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  const stats = [
    { num:'15+',    label:'Jahre in Duisburg' },
    { num:'220+',   label:'Gerichte auf der Karte' },
    { num:'30 Min', label:'Ø Lieferzeit' },
    { num:'4.9 ★',  label:'Google Bewertung' },
  ];
  return (
    <section ref={ref} style={{ background:'#080500', borderBottom:'0.5px solid rgba(255,255,255,0.04)' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', maxWidth:1100, margin:'0 auto' }}>
        {stats.map((s,i) => (
          <motion.div key={s.label} initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:i*0.1, duration:0.7 }}
            style={{ padding:'32px 24px', textAlign:'center', borderRight:i<3?'0.5px solid rgba(255,255,255,0.04)':'none' }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:32, fontWeight:700, color:'#c9a84c', marginBottom:5 }}>{s.num}</div>
            <div style={{ fontSize:12, color:'rgba(245,240,232,0.35)', letterSpacing:'0.05em' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Featured Dishes ─────────────────────────────────────────────────────────
const DISHES = [
  { name:'Margherita Classica', sub:'San Marzano · Büffelmozzarella · Basilikum', price:'ab 5,50 €', tag:'Bestseller', img:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=85&auto=format&fit=crop' },
  { name:'Spaghetti Carbonara', sub:'Guanciale · Pecorino · Eigelb · Original',   price:'ab 9,00 €', tag:'Empfehlung', img:'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=85&auto=format&fit=crop' },
  { name:'Jägerschnitzel',      sub:'Champignons · Sahnesauce · Pommes · Salat',  price:'13,00 €',   tag:'Klassiker',  img:'https://images.unsplash.com/photo-1599921841143-819065a55cc6?w=600&q=85&auto=format&fit=crop' },
  { name:'Top-Angebot',         sub:'2 Pizzableche · 1 Nudelblech · 1 Lasagneblech · Salatplatte · Pizzabrötchen · 3 Getränke', price:'150,00 €', tag:'⭐ Angebot', img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=85&auto=format&fit=crop' },
];

function FeaturedDishes() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  return (
    <section ref={ref} style={{ padding:'clamp(70px,9vw,110px) clamp(20px,5vw,60px)', background:'#060300' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }} style={{ textAlign:'center', marginBottom:60 }}>
          <span style={{ fontSize:11, fontWeight:600, color:'#c9a84c', letterSpacing:'0.22em', textTransform:'uppercase', display:'block', marginBottom:14 }}>Unsere Klassiker</span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(28px,4vw,48px)', fontWeight:700, color:'#F5F0E8', marginBottom:12 }}>Highlights der Karte</h2>
          <p style={{ fontSize:14, color:'rgba(245,240,232,0.4)', maxWidth:420, margin:'0 auto', fontWeight:300 }}>Frisch zubereitet — jeden Tag, für Sie</p>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:20 }}>
          {DISHES.map((d,i) => (
            <motion.div key={d.name} initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:i*0.12, duration:0.7 }}
              style={{ background:'#0d0a06', border:'0.5px solid rgba(255,248,235,0.07)', borderRadius:20, overflow:'hidden', cursor:'pointer', transition:'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)' }}
              whileHover={{ y:-6, boxShadow:'0 24px 60px rgba(0,0,0,0.7)', borderColor:'rgba(201,168,76,0.18)' }}>
              <div style={{ height:200, overflow:'hidden', position:'relative' }}>
                <img src={d.img} alt={d.name} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)' }}
                  onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.07)')} onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(8,5,0,0.75) 0%, rgba(8,5,0,0.05) 50%, transparent 100%)' }} />
                <div style={{ position:'absolute', top:12, left:12, background:'rgba(8,5,0,0.72)', backdropFilter:'blur(8px)', border:'0.5px solid rgba(201,168,76,0.28)', color:'#c9a84c', fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:100, letterSpacing:'0.8px', textTransform:'uppercase' }}>{d.tag}</div>
              </div>
              <div style={{ padding:'18px 20px 22px' }}>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:'#F5F0E8', marginBottom:5 }}>{d.name}</h3>
                <p style={{ fontSize:12, color:'rgba(245,240,232,0.38)', lineHeight:1.6, marginBottom:14, fontWeight:300 }}>{d.sub}</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:700, color:'#c9a84c' }}>{d.price}</span>
                  <Link href="/menu" style={{ background:'rgba(109,165,68,0.14)', color:'#6DA544', border:'0.5px solid rgba(109,165,68,0.22)', padding:'8px 16px', borderRadius:100, fontSize:12, fontWeight:600, textDecoration:'none', transition:'all 0.25s' }}
                    onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='rgba(109,165,68,0.24)'} onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='rgba(109,165,68,0.14)'}>
                    Bestellen →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.6 }} style={{ textAlign:'center', marginTop:44 }}>
          <Link href="/menu" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'transparent', color:'rgba(201,168,76,0.8)', border:'0.5px solid rgba(201,168,76,0.28)', padding:'14px 32px', borderRadius:100, fontSize:14, fontWeight:400, textDecoration:'none', transition:'all 0.3s' }}
            onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background='rgba(201,168,76,0.07)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.45)'; }}
            onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.28)'; }}>
            Gesamte Speisekarte ansehen →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Promotions (Premium Flyer) ───────────────────────────────────────────────
function PromotionsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const [flyerIn, setFlyerIn] = useState(false);
  useEffect(() => { if(inView) setTimeout(()=>setFlyerIn(true), 200); }, [inView]);

  const promos = [
    { tag:'2 Personen',  title:'Angebot 1',                   desc:'2 gr. Pizzen + 2 Gerichte nach Wahl + 1 gem. Salat + 1 Fl. Getränk',                            price:'27,00 €',  clr:'rgba(201,168,76,0.12)', brd:'rgba(201,168,76,0.22)', txt:'#c9a84c' },
    { tag:'3 Personen',  title:'Angebot 2',                   desc:'3 gr. Pizzen oder Nudelgerichte + 3 Gerichte nach Wahl + 1 Salat + 1 Fl. Getränk',              price:'34,00 €',  clr:'rgba(109,165,68,0.1)',  brd:'rgba(109,165,68,0.22)', txt:'#6DA544' },
    { tag:'Einzel-Deal', title:'Angebot 3',                   desc:'1 Pizza 29 cm oder 1 Nudelgericht + 1 Dose Cola + 1 kl. Salat',                                  price:'15,00 €',  clr:'rgba(201,168,76,0.08)', brd:'rgba(201,168,76,0.18)', txt:'#c9a84c' },
    { tag:'Für Gruppen', title:'Top-Angebot — Komplettpaket', desc:'2 Pizzableche + 1 Nudelblech + 1 Lasagneblech + Salatplatte + 4× Brötchen + 3 Fl. Getränke',    price:'150,00 €', clr:'rgba(214,40,40,0.08)',  brd:'rgba(214,40,40,0.18)', txt:'#e06060' },
  ];

  return (
    <section ref={ref} style={{ padding:'clamp(70px,9vw,110px) clamp(20px,5vw,60px)', background:'#050300' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:64, alignItems:'center' }}>

        {/* Flyer image */}
        <motion.div initial={{ opacity:0, x:-28 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.9 }} style={{ position:'relative' }}>
          <div style={{ position:'absolute', inset:-18, borderRadius:28, background:'radial-gradient(ellipse, rgba(201,168,76,0.1), transparent 65%)', animation:'glowPulse 4s ease-in-out infinite' }} />
          <div style={{ position:'absolute', inset:-3, borderRadius:22, background:'conic-gradient(from 0deg, rgba(201,168,76,0.85), rgba(109,165,68,0.55), rgba(201,168,76,0.3), rgba(201,168,76,0.85))', animation:'spinSlow 7s linear infinite', zIndex:0, filter:'blur(1px)' }} />
          <div style={{ position:'relative', zIndex:1, borderRadius:20, overflow:'hidden', boxShadow:'0 24px 60px rgba(0,0,0,0.85)' }}>
            <img src="/flyer.png" alt="Milano Pizzeria — Angebote" style={{ width:'100%', display:'block', opacity:flyerIn?1:0, transform:flyerIn?'scale(1)':'scale(0.96)', transition:'all 0.9s cubic-bezier(0.25,0.46,0.45,0.94)' }} />
          </div>
          {[{top:-4,left:-4},{top:-4,right:-4},{bottom:-4,left:-4},{bottom:-4,right:-4}].map((pos,i)=>(
            <div key={i} style={{ position:'absolute', width:22, height:22, zIndex:2, borderTop:'top' in pos?'2px solid #c9a84c':'none', borderBottom:'bottom' in pos?'2px solid #c9a84c':'none', borderLeft:'left' in pos?'2px solid #c9a84c':'none', borderRight:'right' in pos?'2px solid #c9a84c':'none', ...pos }} />
          ))}
        </motion.div>

        {/* Promos */}
        <motion.div initial={{ opacity:0, x:28 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.9, delay:0.15 }}>
          <span style={{ fontSize:11, fontWeight:600, color:'#c9a84c', letterSpacing:'0.22em', textTransform:'uppercase', display:'block', marginBottom:14 }}>Unsere Angebote</span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(24px,3.5vw,40px)', fontWeight:700, color:'#F5F0E8', marginBottom:10, lineHeight:1.2 }}>
            Online bestellen —<br /><em style={{ color:'#c9a84c' }}>10% Rabatt</em>
          </h2>
          <p style={{ fontSize:14, color:'rgba(245,240,232,0.42)', marginBottom:36, lineHeight:1.75, fontWeight:300 }}>
            Über unsere Webseite bestellen und sofort 10% Rabatt erhalten. Lieferung frei Haus ab 10,00 €.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:32 }}>
            {promos.map((p,i) => (
              <motion.div key={p.title} initial={{ opacity:0, y:14 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.3+i*0.1, duration:0.6 }}
                style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:p.clr, border:`0.5px solid ${p.brd}`, borderRadius:14, padding:'15px 20px', transition:'transform 0.25s' }}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.transform='translateX(4px)'}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.transform='translateX(0)'}>
                <div>
                  <div style={{ fontSize:10, color:'rgba(245,240,232,0.35)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:3 }}>{p.tag}</div>
                  <div style={{ fontSize:15, fontWeight:600, color:'#F5F0E8', marginBottom:2 }}>{p.title}</div>
                  <div style={{ fontSize:12, color:'rgba(245,240,232,0.45)', fontWeight:300 }}>{p.desc}</div>
                </div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:p.txt, flexShrink:0, marginLeft:16 }}>{p.price}</div>
              </motion.div>
            ))}
          </div>
          <a href="tel:+492034565284" style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 18px', background:'rgba(255,248,235,0.03)', border:'0.5px solid rgba(255,248,235,0.09)', borderRadius:14, textDecoration:'none', marginBottom:12, transition:'all 0.25s' }}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='rgba(255,248,235,0.07)'} onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='rgba(255,248,235,0.03)'}>
            <span style={{ fontSize:20 }}>📞</span>
            <div>
              <div style={{ fontSize:10, color:'rgba(245,240,232,0.35)', textTransform:'uppercase', letterSpacing:'0.1em' }}>Pizza-Taxi Duisburg</div>
              <div style={{ fontSize:18, fontWeight:700, color:'#F5F0E8', letterSpacing:'0.5px' }}>0203 · 45 65 284</div>
            </div>
          </a>
          <div style={{ display:'flex', gap:10 }}>
            <Link href="/order" style={{ flex:1, textAlign:'center', background:'#6DA544', color:'#fff', padding:'14px', borderRadius:100, fontSize:14, fontWeight:600, textDecoration:'none', transition:'all 0.25s' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='#7ec44f'} onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='#6DA544'}>
              Online bestellen
            </Link>
            <Link href="/reservation" style={{ flex:1, textAlign:'center', background:'transparent', color:'rgba(245,240,232,0.65)', border:'0.5px solid rgba(255,248,235,0.16)', padding:'14px', borderRadius:100, fontSize:14, textDecoration:'none', transition:'all 0.25s' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='rgba(255,248,235,0.06)'} onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='transparent'}>
              Tisch reservieren
            </Link>
          </div>
        </motion.div>
      </div>
      <style>{`
        @keyframes glowPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </section>
  );
}

// ─── Reviews ─────────────────────────────────────────────────────────────────
function ReviewsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const reviews = [
    { name:'Klaus M.',  rating:5, text:'Die beste Pizza in ganz Duisburg! Frische Zutaten, perfekter Teig und super Service. Komme immer wieder gerne!', source:'Google', time:'vor 2 Tagen' },
    { name:'Sarah K.',  rating:5, text:'Wir haben hier unsere Hochzeit gefeiert — absolut unvergesslich. Das Team ist hervorragend und das Essen fantastisch.', source:'Google', time:'vor 1 Woche' },
    { name:'Ahmed B.',  rating:5, text:'Das Carbonara ist genau wie in Rom. Endlich ein Lokal das keine Sahne reinpackt! 5 Sterne ohne Zögern.', source:'Google', time:'vor 2 Wochen' },
    { name:'Petra W.',  rating:5, text:'Schnelle Lieferung, heiß angekommen und absolut lecker. Die Diavola ist scharf genug aber nicht zu scharf. Top!', source:'Google', time:'vor 3 Wochen' },
  ];
  return (
    <section ref={ref} style={{ padding:'clamp(70px,9vw,110px) clamp(20px,5vw,60px)', background:'#080500' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }} style={{ textAlign:'center', marginBottom:56 }}>
          <span style={{ fontSize:11, fontWeight:600, color:'#c9a84c', letterSpacing:'0.22em', textTransform:'uppercase', display:'block', marginBottom:14 }}>Was unsere Gäste sagen</span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(26px,4vw,44px)', fontWeight:700, color:'#F5F0E8', marginBottom:14 }}>Echt. Ehrlich. Begeistert.</h2>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
            <span style={{ color:'#c9a84c', fontSize:16, letterSpacing:3 }}>★★★★★</span>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:'#c9a84c' }}>4.9</span>
            <span style={{ fontSize:12, color:'rgba(245,240,232,0.32)' }}>/ 5 · 500+ Bewertungen auf Google</span>
          </div>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:18 }}>
          {reviews.map((r,i) => (
            <motion.div key={r.name} initial={{ opacity:0, y:28 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:i*0.1, duration:0.7 }}
              style={{ background:'#0d0a06', border:'0.5px solid rgba(255,248,235,0.07)', borderRadius:18, padding:'24px', transition:'border-color 0.3s' }}
              whileHover={{ borderColor:'rgba(201,168,76,0.18)' }}>
              <div style={{ color:'#c9a84c', fontSize:13, letterSpacing:2, marginBottom:14 }}>{'★'.repeat(r.rating)}</div>
              <p style={{ fontSize:14, color:'rgba(245,240,232,0.55)', lineHeight:1.8, marginBottom:18, fontStyle:'italic', fontWeight:300 }}>„{r.text}"</p>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg,rgba(109,165,68,0.5),rgba(201,168,76,0.5))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:'#fff' }}>{r.name[0]}</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:'#F5F0E8' }}>{r.name}</div>
                  <div style={{ fontSize:11, color:'rgba(245,240,232,0.28)' }}>{r.source} · {r.time}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Location ─────────────────────────────────────────────────────────────────
function LocationSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  return (
    <section ref={ref} style={{ padding:'clamp(70px,9vw,110px) clamp(20px,5vw,60px)', background:'#060300', borderTop:'0.5px solid rgba(255,248,235,0.04)' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
        <motion.div initial={{ opacity:0, x:-24 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.9 }}>
          <span style={{ fontSize:11, fontWeight:600, color:'#c9a84c', letterSpacing:'0.22em', textTransform:'uppercase', display:'block', marginBottom:14 }}>Besuchen Sie uns</span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(26px,4vw,42px)', fontWeight:700, color:'#F5F0E8', marginBottom:24, lineHeight:1.2 }}>Im Herzen<br />von Duisburg</h2>
          <p style={{ fontSize:15, color:'rgba(245,240,232,0.42)', lineHeight:1.85, marginBottom:32, fontWeight:300 }}>Spichernstr. 64 in Duisburg-Meiderich — kostenlose Parkplätze direkt vor dem Restaurant.</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:32 }}>
            {[
              { icon:'📍', title:'Adresse',        body:'Spichernstr. 64\n47137 Duisburg' },
              { icon:'🕐', title:'Öffnungszeiten', body:'Mo–Fr: 12:00–22:30\nSa–So: 13:00–22:30' },
              { icon:'📞', title:'Telefon',        body:'0203 · 45 65 284\n0203 · 45 65 287' },
              { icon:'🛵', title:'Lieferung',      body:'Ab 10,00 € kostenlos\nca. 30 Minuten' },
            ].map(item => (
              <div key={item.title} style={{ background:'rgba(255,248,235,0.03)', border:'0.5px solid rgba(255,248,235,0.06)', borderRadius:14, padding:'14px' }}>
                <div style={{ fontSize:18, marginBottom:6 }}>{item.icon}</div>
                <div style={{ fontSize:10, fontWeight:600, color:'rgba(245,240,232,0.3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4 }}>{item.title}</div>
                <div style={{ fontSize:13, color:'rgba(245,240,232,0.55)', whiteSpace:'pre-line', lineHeight:1.6, fontWeight:300 }}>{item.body}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <a href="https://maps.google.com/?q=Spichernstr+64+Duisburg" target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#6DA544', color:'#fff', padding:'13px 24px', borderRadius:100, fontSize:14, fontWeight:600, textDecoration:'none', transition:'all 0.25s' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='#7ec44f'} onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='#6DA544'}>
              Route planen
            </a>
            <a href="tel:+492034565284" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'transparent', color:'rgba(245,240,232,0.65)', padding:'13px 24px', borderRadius:100, fontSize:14, textDecoration:'none', border:'0.5px solid rgba(255,248,235,0.16)', transition:'all 0.25s' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='rgba(255,248,235,0.05)'} onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='transparent'}>
              0203 · 45 65 284
            </a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity:0, x:24 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.9, delay:0.15 }}
          style={{ borderRadius:22, overflow:'hidden', height:400, background:'linear-gradient(135deg,#0d0800,#141008)', border:'0.5px solid rgba(255,248,235,0.07)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', position:'relative', transition:'border-color 0.3s' }}
          onClick={()=>window.open('https://maps.google.com/?q=Spichernstr+64+Duisburg','_blank')}
          onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.22)'}
          onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(255,248,235,0.07)'}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50%, rgba(201,168,76,0.05), transparent 60%)' }} />
          <div style={{ textAlign:'center', position:'relative' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>📍</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700, color:'#F5F0E8', marginBottom:4 }}>Milano Pizzeria</div>
            <div style={{ fontSize:12, color:'rgba(245,240,232,0.32)', marginBottom:14 }}>Spichernstr. 64 · 47137 Duisburg</div>
            <div style={{ fontSize:12, color:'#c9a84c' }}>In Google Maps öffnen →</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SocialProofStrip />
      <StatsSection />
      <FeaturedDishes />
      <PromotionsSection />
      <ReviewsSection />
      <LocationSection />
    </>
  );
}
