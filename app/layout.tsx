import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

// ─── Fonts ────────────────────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets:  ['latin'],
  variable: '--font-playfair',
  display:  'swap',
  weight:   ['400', '600', '700', '900'],
  style:    ['normal', 'italic'],
});

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
  weight:   ['300', '400', '500', '600'],
});

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://milano-pizzeria-duisburg.de'),
  
  title: {
    default:  'Milano Pizzeria Duisburg — Authentisch Italienisch',
    template: '%s | Milano Pizzeria Duisburg',
  },
  
  description:
    'Authentische Italienische Küche in Duisburg. Pizza, Pasta, Schnitzel — frisch zubereitet. ' +
    'Online bestellen & Tisch reservieren. Lieferung in 30 Min. ⭐ 4.9/5 Google Rating.',
  
  keywords: [
    'Pizza Duisburg', 'Pizzeria Duisburg', 'Italienisches Restaurant Duisburg',
    'Pizza liefern Duisburg', 'Online Pizza bestellen Duisburg',
    'Milano Pizzeria', 'Pasta Duisburg', 'Schnitzel Duisburg',
    'Essen bestellen Duisburg', 'Restaurant Duisburg',
    'Lieferdienst Duisburg', 'Duisburg Essen Lieferung',
  ],
  
  authors: [{ name: 'Milano Pizzeria Duisburg' }],
  creator: 'Milano Pizzeria Duisburg',
  publisher: 'Milano Pizzeria Duisburg',
  
  openGraph: {
    type:        'website',
    locale:      'de_DE',
    url:         'https://milano-pizzeria-duisburg.de',
    siteName:    'Milano Pizzeria Duisburg',
    title:       'Milano Pizzeria Duisburg — Authentisch Italienisch',
    description: 'Authentische Italienische Küche in Duisburg. Frische Pizza, Pasta & mehr.',
    images: [{
      url:    '/og-image.jpg',
      width:  1200,
      height: 630,
      alt:    'Milano Pizzeria Duisburg',
    }],
  },
  
  twitter: {
    card:        'summary_large_image',
    title:       'Milano Pizzeria Duisburg',
    description: 'Authentische Italienische Küche in Duisburg.',
    images:      ['/og-image.jpg'],
  },
  
  robots: {
    index:          true,
    follow:         true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },
  
  alternates: {
    canonical: 'https://milano-pizzeria-duisburg.de',
    languages: {
      'de': 'https://milano-pizzeria-duisburg.de',
      'en': 'https://milano-pizzeria-duisburg.de/en',
      'ar': 'https://milano-pizzeria-duisburg.de/ar',
    },
  },
  
  icons: {
    icon:    [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
    apple:   '/apple-touch-icon.png',
    shortcut: '/favicon-16x16.png',
  },
  
  manifest: '/manifest.json',
  
  other: {
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
  },
};

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width:              'device-width',
  initialScale:       1,
  maximumScale:       5,
  themeColor:         [
    { media: '(prefers-color-scheme: dark)',  color: '#050505' },
    { media: '(prefers-color-scheme: light)', color: '#050505' },
  ],
};

// ─── Structured Data (JSON-LD) ────────────────────────────────────────────────
const structuredData = {
  '@context':  'https://schema.org',
  '@type':     'Restaurant',
  name:        'Milano Pizzeria Duisburg',
  image:       'https://milano-pizzeria-duisburg.de/og-image.jpg',
  url:         'https://milano-pizzeria-duisburg.de',
  telephone:   '+4920312345677',
  email:       'info@milano-pizzeria-duisburg.de',
  description: 'Authentische Italienische Küche in Duisburg — frische Pizza, Pasta und mehr.',
  address: {
    '@type':          'PostalAddress',
    streetAddress:    'Musterstraße 42',
    addressLocality:  'Duisburg',
    postalCode:       '47051',
    addressCountry:   'DE',
  },
  geo: {
    '@type':    'GeoCoordinates',
    latitude:   51.4344,
    longitude:  6.7623,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '11:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '12:00', closes: '23:00' },
  ],
  servesCuisine: ['Italian', 'Italienisch'],
  priceRange:    '€€',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '500', bestRating: '5' },
  hasMenu:       'https://milano-pizzeria-duisburg.de/menu',
  acceptsReservations: true,
  currenciesAccepted:  'EUR',
  paymentAccepted:     'Cash, Credit Card, PayPal',
  sameAs: [
    'https://www.instagram.com/milano.pizzeria.duisburg',
    'https://www.facebook.com/milanoduisburg',
  ],
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      dir="ltr"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#050505" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
