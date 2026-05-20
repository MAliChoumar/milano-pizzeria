'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// ─── Animated Section ─────────────────────────────────────────────────────────
function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

// ─── Value Card ───────────────────────────────────────────────────────────────
function ValueCard({ icon, title, text, delay }: { icon: string; title: string; text: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '32px 28px', textAlign: 'center', transition: 'border-color 0.3s' }}
      whileHover={{ borderColor: 'rgba(109,165,68,0.3)', y: -4 }}>
      <span style={{ fontSize: 40, display: 'block', marginBottom: 16 }}>{icon}</span>
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: '#F5F5F5', marginBottom: 10 }}>{title}</h3>
      <p style={{ fontSize: 14, color: '#888', lineHeight: 1.7 }}>{text}</p>
    </motion.div>
  );
}

// ─── Team Card — name only, no role/since ─────────────────────────────────────
function TeamCard({ name, delay }: { name: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden', textAlign: 'center' }}
      whileHover={{ borderColor: 'rgba(201,168,76,0.3)', y: -6 }}>
      {/* Avatar placeholder — premium gold initial */}
      <div style={{ height: 160, background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(109,165,68,0.06))', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 60%, rgba(201,168,76,0.06), transparent 60%)' }} />
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '1.5px solid rgba(201,168,76,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: 'rgba(201,168,76,0.7)' }}>{initials}</span>
        </div>
      </div>
      <div style={{ padding: '18px 16px 22px' }}>
        <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: '#F5F5F5', lineHeight: 1.3 }}>{name}</h4>
      </div>
    </motion.div>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { num: '17+', label: 'Jahre Erfahrung' },
  { num: '220+', label: 'Gerichte auf der Karte' },
  { num: '500+', label: 'Google Bewertungen' },
  { num: '4.9★', label: 'Durchschnittliche Bewertung' },
];

// ─── Timeline ─────────────────────────────────────────────────────────────────
const TIMELINE = [
  {
    year: '2009',
    title: 'Die Gründung',
    text: 'Mahmoud Alloul eröffnet die Pizzeria Milano in Duisburg-Meiderich, Spichernstr. 64. Die Idee war einfach: ehrliche Pizza, frische Zutaten und ein Ort, an dem sich die Nachbarschaft wohlfühlt.',
  },
  {
    year: '2013',
    title: 'Erweiterung der Karte',
    text: 'Die Gäste wollten mehr. Wir haben das Angebot um Nudelgerichte, Schnitzel und Salate erweitert — immer mit demselben Anspruch: alles frisch, alles hausgemacht.',
  },
  {
    year: '2017',
    title: 'Wachstum & Fuhrpark',
    text: 'Duisburg kennt Milano. Der Lieferservice wächst — mehrere Fahrzeuge sind täglich in der Stadt unterwegs. Die Telefonnummer 0203 45 65 284 kennt fast jeder in Meiderich.',
  },
  {
    year: '2020',
    title: 'Online-Bestellung',
    text: 'Auch in schwierigen Zeiten stehen wir für unsere Gäste ein. Wir bauen den Lieferservice aus und bieten Online-Bestellung über Lieferando an — der Geschmack kommt zu Ihnen nach Hause.',
  },
  {
    year: '2026',
    title: 'Heute',
    text: 'Über 500 Bewertungen, 4.9 Sterne auf Google und täglich viele zufriedene Gäste. Wir sind stolz auf das, was wir aufgebaut haben — und kochen weiterhin mit derselben Leidenschaft wie am ersten Tag.',
  },
];

// ─── Main About Page ──────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY  = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOp = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main style={{ background: '#050505', minHeight: '100vh', color: '#F5F5F5', fontFamily: "'Inter',sans-serif" }}>

      {/* ─── HERO ─── */}
      <section ref={heroRef} style={{ height: '90vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

        {/* Hero background image with parallax */}
        <motion.div style={{ y: heroY, position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="/about/logo-classic.png"
            alt="Pizzeria Milano Duisburg"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', opacity: 0.18, filter: 'blur(2px) saturate(0.8)' }}
          />
        </motion.div>

        {/* Layered dark overlays for premium feel */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,3,0,0.82)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(201,168,76,0.07), transparent 65%)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to bottom, rgba(5,3,0,0.6), transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to top, rgba(5,3,0,0.8), transparent)', zIndex: 2, pointerEvents: 'none' }} />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOp, position: 'relative', zIndex: 3, textAlign: 'center', padding: '0 24px', maxWidth: 720 }}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{ marginBottom: 28 }}>
            <img
              src="/about/logo-premium.png"
              alt="Pizzeria Milano Logo"
              style={{ width: 96, height: 96, objectFit: 'contain', filter: 'drop-shadow(0 4px 24px rgba(201,168,76,0.3))' }}
            />
          </motion.div>

          <span style={{ fontSize: 11, fontWeight: 600, color: '#c9a84c', letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: 20 }}>
            Unsere Geschichte
          </span>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(38px,7vw,72px)', fontWeight: 900, color: '#F5F0E8', lineHeight: 1.08, marginBottom: 22, letterSpacing: '-0.02em' }}>
            Mehr als ein<br />
            <em style={{ background: 'linear-gradient(135deg,#c9a84c,#e8c97e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic' }}>
              Restaurant
            </em>
          </h1>
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(245,240,232,0.6)', lineHeight: 1.85, maxWidth: 500, margin: '0 auto', fontWeight: 300 }}>
            Seit 2009 bringen wir echten Pizzageschmack nach Duisburg-Meiderich — täglich frisch, mit Leidenschaft und Respekt für das Handwerk.
          </p>

          {/* Decorative divider */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 36 }}>
            <div style={{ width: 60, height: '0.5px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4))' }} />
            <span style={{ fontSize: 14, color: 'rgba(201,168,76,0.5)' }}>✦</span>
            <div style={{ width: 60, height: '0.5px', background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.4))' }} />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div style={{ position: 'absolute', bottom: 38, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'rgba(255,248,235,0.3)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', zIndex: 3 }}>
          <div style={{ width: 1, height: 38, background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.35), transparent)' }} />
          Scrollen
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ padding: '80px 60px', background: 'linear-gradient(180deg, rgba(10,8,0,0.4), transparent)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
          {STATS.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1}>
              <div style={{ textAlign: 'center', padding: '24px 16px', background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 16 }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#c9a84c', marginBottom: 6 }}>{s.num}</div>
                <div style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>{s.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ─── STORY / PHILOSOPHY ─── */}
      <section style={{ padding: '80px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <AnimatedSection>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>Unsere Philosophie</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#F5F0E8', lineHeight: 1.2, marginBottom: 24 }}>
              Kochen mit<br />
              <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Herz und Seele</span>
            </h2>
            <p style={{ fontSize: 16, color: '#888', lineHeight: 1.85, marginBottom: 20, fontWeight: 300 }}>
              Bei uns wird nicht einfach eine Pizza gemacht — wir bereiten sie vor wie zu Hause. Der Teig wird täglich frisch angesetzt, die Soße nach eigenem Rezept gekocht, der Belag mit Sorgfalt ausgewählt.
            </p>
            <p style={{ fontSize: 16, color: '#888', lineHeight: 1.85, fontWeight: 300 }}>
              Wir sind kein Großbetrieb. Wir sind eine Pizzeria in Duisburg, die jeden Tag mit denselben Werten aufmacht: Qualität, Ehrlichkeit und der Wille, unseren Gästen etwas Gutes zu tun.
            </p>
          </AnimatedSection>

          {/* Logo image — premium framed presentation */}
          <AnimatedSection delay={0.2}>
            <div style={{ borderRadius: 24, overflow: 'hidden', background: 'linear-gradient(160deg, #0e0a04, #1a1208)', height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid rgba(201,168,76,0.2)', position: 'relative' }}>

              {/* Warm ambient glow layers */}
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 70% at 50% 52%, rgba(201,168,76,0.1), transparent 65%)', pointerEvents:'none' }} />
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,240,200,0.04), transparent 55%)', pointerEvents:'none' }} />

              {/* Logo wrapper — white background eliminates checkerboard */}
              <div style={{
                width: '86%',
                aspectRatio: '1/1',
                borderRadius: '50%',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 0 60px rgba(201,168,76,0.18), 0 0 120px rgba(201,168,76,0.08), 0 16px 48px rgba(0,0,0,0.5)',
              }}>
                <img
                  src="/about/logo-premium.png"
                  alt="Pizzeria Milano"
                  style={{
                    width: '96%',
                    height: '96%',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: '50%',
                  }}
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section style={{ padding: '80px 60px', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Unsere Reise</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#F5F0E8' }}>17 Jahre Leidenschaft</h2>
            </div>
          </AnimatedSection>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 64, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.35), transparent)' }} />
            {TIMELINE.map((item, i) => (
              <AnimatedSection key={item.year} delay={i * 0.12}>
                <div style={{ display: 'flex', gap: 32, marginBottom: 48, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: 80, textAlign: 'right' }}>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: '#c9a84c' }}>{item.year}</span>
                  </div>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', flexShrink: 0, marginTop: 5, background: '#6DA544', border: '3px solid #050505', boxShadow: '0 0 12px rgba(109,165,68,0.5)' }} />
                  <div style={{ flex: 1, paddingBottom: 8 }}>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: '#F5F0E8', marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: '#888', lineHeight: 1.75, fontWeight: 300 }}>{item.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section style={{ padding: '80px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Was uns ausmacht</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#F5F0E8' }}>Unsere Werte</h2>
          </div>
        </AnimatedSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {[
            { icon: '🌿', title: 'Frische Zutaten',  text: 'Täglich frisch vorbereitet. Kein aufgewärmtes, kein industriell Verarbeitetes — nur echte Zutaten, die man schmeckt.', delay: 0 },
            { icon: '🔥', title: 'Handwerk',          text: 'Jede Pizza wird von Hand belegt. Jeder Teig täglich frisch. Das ist kein Marketing — das ist einfach unser Alltag.', delay: 0.1 },
            { icon: '💚', title: 'Ehrlichkeit',       text: 'Faire Preise, ehrliche Portionen, kein Schnickschnack. Was auf der Karte steht, das kommt auch auf den Teller.', delay: 0.2 },
            { icon: '⭐', title: 'Qualität',           text: 'Seit 17 Jahren halten wir denselben Standard. Nicht weil wir müssen — sondern weil wir es wollen.', delay: 0.3 },
            { icon: '❤️', title: 'Gastfreundschaft',  text: 'Wir kennen viele unserer Stammgäste beim Namen. Bei uns sind Sie willkommen — ob zum ersten oder zum hundertsten Mal.', delay: 0.4 },
            { icon: '🍕', title: 'Leidenschaft',      text: 'Pizza ist unser Beruf und unsere Leidenschaft. Jeder im Team steht dahinter — das merkt man am Ergebnis.', delay: 0.5 },
          ].map(v => <ValueCard key={v.title} {...v} />)}
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section style={{ padding: '80px 60px', background: 'rgba(255,255,255,0.015)', maxWidth: '100%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Die Menschen hinter dem Geschmack</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#F5F0E8' }}>Unser Team</h2>
            </div>
          </AnimatedSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { name: 'Mahmoud Alloul', delay: 0 },
              { name: 'Mahmoud Raad',   delay: 0.08 },
              { name: 'Gihad Nemr',     delay: 0.16 },
              { name: 'Youssef',        delay: 0.24 },
              { name: 'Mostafa Harbi',  delay: 0.32 },
              { name: 'Fadel',          delay: 0.40 },
            ].map(m => <TeamCard key={m.name} name={m.name} delay={m.delay} />)}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: '100px 60px', textAlign: 'center', background: 'linear-gradient(135deg, #050300, #0a0800, #050300)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(circle, rgba(201,168,76,0.07), transparent 60%)', pointerEvents: 'none' }} />
        <AnimatedSection>
          <span style={{ fontSize: 52, display: 'block', marginBottom: 24 }}>🍷</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>Erleben Sie es selbst</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#F5F0E8', marginBottom: 16 }}>
            Wir freuen uns auf Sie
          </h2>
          <p style={{ fontSize: 16, color: '#888', maxWidth: 420, margin: '0 auto 36px', lineHeight: 1.75, fontWeight: 300 }}>
            Reservieren Sie Ihren Tisch oder rufen Sie uns direkt an — wir sind täglich für Sie da.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            {/* Fixed: uses Link for proper navigation */}
            <Link href="/reservation" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(109,165,68,0.3)' }}
                whileTap={{ scale: 0.97 }}
                style={{ background: '#6DA544', color: '#fff', padding: '16px 36px', borderRadius: 100, fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                📅 Tisch reservieren
              </motion.div>
            </Link>

            {/* Phone button */}
            <a href="tel:+4920345652844" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.04, borderColor: 'rgba(201,168,76,0.4)' }}
                whileTap={{ scale: 0.97 }}
                style={{ background: 'transparent', color: '#F5F0E8', border: '0.5px solid rgba(255,255,255,0.2)', padding: '16px 36px', borderRadius: 100, fontSize: 16, fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                📞 Telefonisch bestellen
              </motion.div>
            </a>
          </div>

          {/* Phone numbers displayed elegantly below */}
          <div style={{ display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['0203 · 45 65 284', '0203 · 45 65 287'].map(num => (
              <a key={num} href={`tel:+49${num.replace(/\D/g,'').slice(1)}`}
                style={{ fontSize: 15, color: 'rgba(201,168,76,0.7)', fontWeight: 500, letterSpacing: '0.06em', textDecoration: 'none', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: 7 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.7)')}>
                <span style={{ fontSize: 13 }}>📞</span>{num}
              </a>
            ))}
          </div>
        </AnimatedSection>
      </section>

    </main>
  );
}
