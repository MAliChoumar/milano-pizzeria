/**
 * DB Seed — Milano Pizzeria Duisburg
 * Run: npx tsx lib/db/seed.ts
 */
import db from './index';
import { menuItems, adminUsers, offers, reviews, galleryItems } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Seeding Milano Pizzeria database...\n');

  // ─── Admin Users ────────────────────────────────────────────────────────────
  console.log('👤 Creating admin users...');
  const passwordHash = await bcrypt.hash('REDACTED_SET_VIA_ENV', 12);
  await db.insert(adminUsers).values([
    { name: 'Antonio Marchetti', email: 'admin@milano-pizzeria-duisburg.de', passwordHash, role: 'superadmin', permissions: ['all'], isActive: true },
    { name: 'Manager',           email: 'manager@milano-pizzeria-duisburg.de', passwordHash, role: 'manager', permissions: ['orders', 'reservations', 'menu'], isActive: true },
  ]).onConflictDoNothing();

  // ─── Menu Items ─────────────────────────────────────────────────────────────
  console.log('🍕 Creating menu items...');
  await db.insert(menuItems).values([
    // Pizza
    { category: 'pizza', name: 'Margherita Classica', description: 'San Marzano Tomaten, Büffelmozzarella, frisches Basilikum — das Fundament der neapolitanischen Pizzakunst', emoji: '🍕', badge: 'bestseller', rating: '4.9', reviewCount: 234, tags: ['Vegetarisch', 'Klassiker'], sizes: [{ name: 'Klein 28cm', price: 9.90 }, { name: 'Mittel 32cm', price: 10.90 }, { name: 'Groß 40cm', price: 13.90 }], extras: [{ id: 'e1', name: 'Extrakäse', price: 1.50, available: true }, { id: 'e2', name: 'Chili', price: 0.50, available: true }], isAvailable: true, isHighlighted: true, sortOrder: 1 },
    { category: 'pizza', name: 'Diavola', description: 'Pikante Salami, Büffelmozzarella, Tomaten, scharfe Chilis', emoji: '🍕', badge: 'hot', rating: '4.8', reviewCount: 187, tags: ['Scharf', 'Fleisch'], sizes: [{ name: 'Klein 28cm', price: 11.90 }, { name: 'Mittel 32cm', price: 12.90 }, { name: 'Groß 40cm', price: 15.90 }], extras: [{ id: 'e1', name: 'Extrakäse', price: 1.50, available: true }, { id: 'e2', name: 'Doppel Salami', price: 2.00, available: true }], isAvailable: true, sortOrder: 2 },
    { category: 'pizza', name: 'Quattro Formaggi', description: 'Vier Käsesorten — Mozzarella, Gorgonzola, Parmesan, Ricotta', emoji: '🍕', badge: 'new', rating: '4.9', reviewCount: 156, tags: ['Vegetarisch', 'Premium'], sizes: [{ name: 'Klein 28cm', price: 12.90 }, { name: 'Mittel 32cm', price: 13.90 }, { name: 'Groß 40cm', price: 16.90 }], extras: [{ id: 'e1', name: 'Trüffelöl', price: 2.00, available: true }], isAvailable: true, sortOrder: 3 },
    { category: 'pizza', name: 'Prosciutto e Funghi', description: 'Parmaschinken, Champignons, Mozzarella, Tomatensoße', emoji: '🍕', badge: null, rating: '4.7', reviewCount: 120, tags: ['Fleisch'], sizes: [{ name: 'Klein 28cm', price: 11.50 }, { name: 'Mittel 32cm', price: 12.50 }, { name: 'Groß 40cm', price: 15.50 }], extras: [], isAvailable: true, sortOrder: 4 },
    // Pasta
    { category: 'pasta', name: 'Spaghetti Carbonara', description: 'Original römisches Rezept — Guanciale, Pecorino, Eigelb, schwarzer Pfeffer. Kein Sahne!', emoji: '🍝', badge: 'bestseller', rating: '4.9', reviewCount: 312, tags: ['Klassiker', 'Fleisch'], sizes: [{ name: 'Normal', price: 11.90 }, { name: 'Groß', price: 14.90 }], extras: [{ id: 'e1', name: 'Extra Speck', price: 1.50, available: true }], isAvailable: true, isHighlighted: true, sortOrder: 10 },
    { category: 'pasta', name: 'Penne Arrabbiata', description: 'Pikante Tomatensoße, Knoblauch, Chili, Petersilie', emoji: '🍝', badge: null, rating: '4.7', reviewCount: 145, tags: ['Vegetarisch', 'Scharf'], sizes: [{ name: 'Normal', price: 9.90 }, { name: 'Groß', price: 12.90 }], extras: [], isAvailable: true, sortOrder: 11 },
    { category: 'pasta', name: 'Tagliatelle al Ragù', description: 'Hausgemachte Bolognese nach Nonna\'s Geheimrezept — 4 Stunden gekocht', emoji: '🍝', badge: 'new', rating: '4.9', reviewCount: 198, tags: ['Fleisch', 'Hausgemacht'], sizes: [{ name: 'Normal', price: 12.90 }, { name: 'Groß', price: 15.90 }], extras: [], isAvailable: true, sortOrder: 12 },
    // Salate
    { category: 'salad', name: 'Insalata Caprese', description: 'Büffelmozzarella, Flaschentomaten, Basilikum, Olivenöl extra vergine', emoji: '🥗', badge: 'veg', rating: '4.7', reviewCount: 89, tags: ['Vegetarisch', 'Leicht'], sizes: [{ name: 'Normal', price: 8.90 }, { name: 'Groß', price: 11.90 }], extras: [], isAvailable: true, sortOrder: 20 },
    // Schnitzel
    { category: 'schnitzel', name: 'Wiener Schnitzel', description: 'Paniertes Kalbsschnitzel, goldbraun frittiert, mit Zitrone, Pommes und Preiselbeeren', emoji: '🥩', badge: 'bestseller', rating: '4.8', reviewCount: 223, tags: ['Fleisch', 'Klassiker'], sizes: [{ name: 'Regular', price: 15.90 }, { name: 'Jumbo', price: 18.90 }], extras: [{ id: 'e1', name: 'Pommes Frites', price: 2.50, available: true }], isAvailable: true, isHighlighted: true, sortOrder: 30 },
    { category: 'schnitzel', name: 'Jägerschnitzel', description: 'Schweineschnitzel mit Pilzrahmsoße, Spätzle oder Pommes', emoji: '🥩', badge: null, rating: '4.7', reviewCount: 145, tags: ['Fleisch'], sizes: [{ name: 'Regular', price: 14.90 }, { name: 'Jumbo', price: 17.90 }], extras: [], isAvailable: true, sortOrder: 31 },
    // Desserts
    { category: 'dessert', name: 'Tiramisù della Casa', description: 'Hausgemachtes Tiramisù nach Originalrezept — Mascarpone, Espresso, Savoiardi', emoji: '🍰', badge: 'bestseller', rating: '5.0', reviewCount: 278, tags: ['Hausgemacht', 'Klassiker'], sizes: [{ name: 'Portion', price: 5.90 }, { name: 'Doppelt', price: 8.90 }], extras: [], isAvailable: true, isHighlighted: true, sortOrder: 40 },
    { category: 'dessert', name: 'Panna Cotta', description: 'Sahnepudding mit Waldbeeren-Coulis und frischen Beeren', emoji: '🍮', badge: 'new', rating: '4.9', reviewCount: 134, tags: ['Hausgemacht'], sizes: [{ name: 'Portion', price: 5.50 }], extras: [], isAvailable: true, sortOrder: 41 },
    // Getränke
    { category: 'drinks', name: 'Limonade Hausgemacht', description: 'Frisch gepresste Zitrone, Minze, Sprudelwasser', emoji: '🍋', badge: null, rating: '4.8', reviewCount: 89, tags: ['Alkoholfrei'], sizes: [{ name: '0,3L', price: 3.50 }, { name: '0,5L', price: 4.90 }], extras: [], isAvailable: true, sortOrder: 50 },
    { category: 'drinks', name: 'San Pellegrino', description: 'Natürliches Mineralwasser aus den Alpen', emoji: '💧', badge: null, rating: '4.5', reviewCount: 45, tags: ['Alkoholfrei'], sizes: [{ name: '0,25L', price: 2.50 }, { name: '0,75L', price: 4.50 }], extras: [], isAvailable: true, sortOrder: 51 },
    // Kids
    { category: 'kids', name: 'Bambini Pizza', description: 'Kleine Pizza Margherita mit Pommes und Ketchup (bis 12 Jahre)', emoji: '🧒', badge: null, rating: '4.8', reviewCount: 167, tags: ['Kinder', 'Vegetarisch'], sizes: [{ name: 'Kinderportion', price: 7.90 }], extras: [], isAvailable: true, sortOrder: 60 },
    // Angebote
    { category: 'offers', name: 'Family Bundle', description: '2x Große Pizza + 1x Pasta + 4x Getränke', emoji: '👨‍👩‍👧', badge: 'hot', rating: '4.9', reviewCount: 201, tags: ['Familie', 'Angebot'], sizes: [{ name: 'Komplett-Paket', price: 39.90 }], extras: [], isAvailable: true, sortOrder: 70 },
    { category: 'offers', name: 'Lunch Special', description: 'Mittagsangebot: Pizza + Salat + Getränk — tägl. 11-15 Uhr', emoji: '☀️', badge: 'hot', rating: '4.7', reviewCount: 89, tags: ['Mittagsangebot'], sizes: [{ name: 'Komplett', price: 11.90 }], extras: [], isAvailable: true, sortOrder: 71 },
  ]).onConflictDoNothing();

  // ─── Offers / Coupons ───────────────────────────────────────────────────────
  console.log('🎁 Creating offers...');
  const now = new Date();
  const yearEnd = new Date(now.getFullYear(), 11, 31);
  await db.insert(offers).values([
    { title: '10% Rabatt', description: 'Willkommensrabatt für Neukunden', emoji: '🎉', discountType: 'percentage', discountValue: '10', code: 'MILANO10', minOrder: '15', maxUses: 1000, validFrom: now, validUntil: yearEnd, isActive: true },
    { title: '5% Rabatt',  description: 'Danke für Ihren Besuch',          emoji: '💚', discountType: 'percentage', discountValue: '5',  code: 'WELCOME5', maxUses: 500, validFrom: now, validUntil: yearEnd, isActive: true },
    { title: '20% Rabatt', description: 'Exklusives Newsletter-Angebot',   emoji: '📧', discountType: 'percentage', discountValue: '20', code: 'PIZZA20',  maxUses: 200, validFrom: now, validUntil: yearEnd, isActive: true },
  ]).onConflictDoNothing();

  // ─── Reviews ────────────────────────────────────────────────────────────────
  console.log('⭐ Creating reviews...');
  await db.insert(reviews).values([
    { customerName: 'Klaus M.',  rating: 5, text: 'Die beste Pizza in ganz Duisburg! Frische Zutaten, perfekter Teig und super Service.', source: 'google', isVerified: true, isPublished: true },
    { customerName: 'Sarah K.',  rating: 5, text: 'Wir haben hier unsere Hochzeit gefeiert — absolut unvergesslich. Das Team ist hervorragend.', source: 'google', isVerified: true, isPublished: true },
    { customerName: 'Ahmed B.',  rating: 5, text: 'Das Carbonara ist genau wie in Rom. Endlich ein Lokal, das keine Sahne reinpackt!', source: 'google', isVerified: true, isPublished: true },
    { customerName: 'Petra W.',  rating: 5, text: 'Schnelle Lieferung, heiß angekommen und absolut lecker. Die Diavola ist top!', source: 'google', isVerified: true, isPublished: true },
    { customerName: 'Michael R.', rating: 5, text: 'Das Tiramisù ist himmlisch. Ich bestelle jede Woche und bin immer begeistert.', source: 'internal', isVerified: true, isPublished: true },
  ]).onConflictDoNothing();

  // ─── Gallery ─────────────────────────────────────────────────────────────────
  console.log('🖼️ Creating gallery items...');
  await db.insert(galleryItems).values([
    { category: 'food', url: '/images/gallery/margherita.jpg', alt: 'Margherita Classica Pizza', caption: 'San Marzano · Büffelmozzarella', type: 'image', width: 800, height: 600, sortOrder: 1, isActive: true },
    { category: 'food', url: '/images/gallery/carbonara.jpg', alt: 'Spaghetti Carbonara', caption: 'Original römisches Rezept', type: 'image', width: 800, height: 600, sortOrder: 2, isActive: true },
    { category: 'interior', url: '/images/gallery/interior.jpg', alt: 'Restaurant Innenraum', caption: 'Elegantes Ambiente', type: 'image', width: 1200, height: 800, sortOrder: 3, isActive: true },
    { category: 'team', url: '/images/gallery/chef.jpg', alt: 'Chef Antonio', caption: '20 Jahre Erfahrung', type: 'image', width: 600, height: 800, sortOrder: 4, isActive: true },
  ]).onConflictDoNothing();

  console.log('\n✅ Seed complete! Database ready.\n');
  console.log('Admin login:');
  console.log('  Email:    admin@milano-pizzeria-duisburg.de');
  console.log('  Password: REDACTED_SET_VIA_ENV\n');
  console.log('Coupon codes: MILANO10 · WELCOME5 · PIZZA20\n');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
