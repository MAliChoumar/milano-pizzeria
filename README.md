# 🍕 Milano Pizzeria Duisburg — Premium Restaurant Platform

> Vollständige Next.js 14 Restaurant-Plattform mit Online-Bestellung, Reservierungssystem und Admin-Dashboard.

---

## ⚡ Quick Start

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Umgebungsvariablen konfigurieren
cp .env.example .env.local
# → Füllen Sie alle Variablen in .env.local aus

# 3. Datenbank erstellen
npm run db:generate
npm run db:migrate

# 4. Beispieldaten laden
npx tsx lib/db/seed.ts

# 5. Entwicklungsserver starten
npm run dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000) im Browser.

---

## 📁 Projektstruktur

```
milano-pizzeria/
├── app/
│   ├── (main)/                   # Öffentliche Seiten
│   │   ├── page.tsx              # Startseite
│   │   ├── menu/page.tsx         # Speisekarte
│   │   ├── order/page.tsx        # Online Bestellen
│   │   ├── reservation/page.tsx  # Tisch Reservieren
│   │   ├── gallery/page.tsx      # Galerie
│   │   ├── about/page.tsx        # Über uns
│   │   ├── contact/page.tsx      # Kontakt
│   │   └── layout.tsx            # Navbar + Footer
│   ├── (admin)/
│   │   └── dashboard/page.tsx    # Admin Dashboard
│   ├── api/
│   │   ├── orders/route.ts       # Bestellungen API
│   │   ├── reservations/route.ts # Reservierungen API
│   │   ├── menu/route.ts         # Speisekarte API
│   │   ├── auth/route.ts         # Admin Authentifizierung
│   │   ├── contact/route.ts      # Kontaktformular API
│   │   ├── analytics/route.ts    # Dashboard Statistiken
│   │   └── stripe/webhook/       # Stripe Webhook
│   ├── globals.css               # Design System
│   └── layout.tsx                # Root Layout + SEO
├── components/
│   └── shared/
│       ├── Navbar.tsx            # Navigation
│       └── Footer.tsx            # Footer + Newsletter
├── lib/
│   ├── db/
│   │   ├── schema.ts             # PostgreSQL Schema (Drizzle ORM)
│   │   ├── index.ts              # DB Connection Pool
│   │   └── seed.ts               # Beispieldaten
│   └── utils/
│       ├── auth.ts               # JWT + bcrypt
│       ├── email.ts              # Nodemailer Templates
│       ├── stripe.ts             # Stripe Integration
│       └── order.ts              # Berechnungen + Validierung
├── store/
│   └── cartStore.ts              # Zustand Cart Store
├── types/
│   └── index.ts                  # TypeScript Types
├── public/
│   └── manifest.json             # PWA Manifest
├── .env.example                  # Umgebungsvariablen
├── next.config.js                # Next.js Konfiguration
├── tailwind.config.ts            # Tailwind Design System
├── drizzle.config.ts             # Drizzle Kit Config
├── tsconfig.json                 # TypeScript Config
└── vercel.json                   # Deployment Config
```

---

## 🛠 Tech Stack

| Kategorie    | Technologie              |
|-------------|--------------------------|
| Framework   | Next.js 14 (App Router)  |
| Sprache     | TypeScript               |
| Styling     | Tailwind CSS             |
| Animationen | Framer Motion            |
| Datenbank   | PostgreSQL               |
| ORM         | Drizzle ORM              |
| Auth        | JWT + bcryptjs           |
| Zahlungen   | Stripe + PayPal          |
| E-Mail      | Nodemailer               |
| State       | Zustand                  |
| Deployment  | Vercel                   |

---

## 🌐 Seiten

| Route           | Beschreibung              |
|----------------|---------------------------|
| `/`            | Startseite (Hero, Gerichte, Reviews, Location) |
| `/menu`        | Speisekarte mit Filter und Warenkorb |
| `/order`       | Online Bestellformular mit Checkout |
| `/reservation` | Tischreservierung (4-Schritt-Wizard) |
| `/gallery`     | Bildergalerie mit Lightbox |
| `/about`       | Geschichte, Team, Timeline |
| `/contact`     | Kontaktformular + Karte   |
| `/admin/dashboard` | Admin-Panel (Login erforderlich) |

---

## 🔑 Admin Zugang (nach Seed)

```
URL:      http://localhost:3000/admin/dashboard
E-Mail:   admin@milano-pizzeria-duisburg.de
Passwort: REDACTED_SET_VIA_ENV
```

---

## 🎁 Gutscheincodes

| Code       | Rabatt |
|-----------|--------|
| `MILANO10` | 10%   |
| `WELCOME5` | 5%    |
| `PIZZA20`  | 20%   |

---

## 🚀 Deployment auf Vercel

```bash
# Vercel CLI installieren
npm i -g vercel

# Projekt deployen
vercel

# Produktions-Deployment
vercel --prod
```

Konfigurieren Sie alle Umgebungsvariablen aus `.env.example` in den Vercel-Projekteinstellungen.

### Stripe Webhook

Nach dem Deployment den Webhook in Stripe konfigurieren:
```
URL:     https://ihre-domain.de/api/stripe/webhook
Events:  payment_intent.succeeded, payment_intent.payment_failed, charge.refunded
```

---

## 📧 Kontakt

Milano Pizzeria Duisburg  
📍 Musterstraße 42, 47051 Duisburg  
📞 +49 203 123 4567  
✉️ info@milano-pizzeria-duisburg.de  

---

*Built with ❤️ and 🍕*
