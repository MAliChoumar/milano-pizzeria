import {
  pgTable, pgEnum, uuid, varchar, text, integer, numeric,
  boolean, timestamp, jsonb, index, uniqueIndex,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ─── Enums ────────────────────────────────────────────────────────────────────
export const menuCategoryEnum = pgEnum('menu_category', [
  'pizza', 'pasta', 'salad', 'schnitzel', 'dessert', 'drinks', 'kids', 'offers',
]);

export const badgeEnum = pgEnum('badge_type', ['hot', 'new', 'bestseller', 'veg']);

export const orderStatusEnum = pgEnum('order_status', [
  'pending', 'confirmed', 'preparing', 'ready', 'delivering', 'delivered', 'cancelled',
]);

export const paymentMethodEnum = pgEnum('payment_method', [
  'cash', 'card', 'paypal', 'stripe', 'apple_pay', 'google_pay',
]);

export const paymentStatusEnum = pgEnum('payment_status', [
  'pending', 'paid', 'failed', 'refunded',
]);

export const reservationStatusEnum = pgEnum('reservation_status', [
  'pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show',
]);

export const occasionEnum = pgEnum('occasion_type', [
  'romantic', 'family', 'birthday', 'business', 'friends', 'anniversary', 'other',
]);

export const discountTypeEnum = pgEnum('discount_type', ['percentage', 'fixed', 'bundle']);

export const galleryCategoryEnum = pgEnum('gallery_category', [
  'food', 'interior', 'team', 'events', 'videos',
]);

export const reviewSourceEnum = pgEnum('review_source', ['google', 'internal']);

export const adminRoleEnum = pgEnum('admin_role', ['superadmin', 'manager', 'staff']);

export const deliveryModeEnum = pgEnum('delivery_mode', ['delivery', 'pickup']);

// ─── Menu Items ───────────────────────────────────────────────────────────────
export const menuItems = pgTable('menu_items', {
  id:            uuid('id').primaryKey().defaultRandom(),
  category:      menuCategoryEnum('category').notNull(),
  name:          varchar('name', { length: 200 }).notNull(),
  nameEn:        varchar('name_en', { length: 200 }),
  nameAr:        varchar('name_ar', { length: 200 }),
  description:   text('description').notNull(),
  descriptionEn: text('description_en'),
  descriptionAr: text('description_ar'),
  emoji:         varchar('emoji', { length: 10 }).notNull().default('🍕'),
  imageUrl:      varchar('image_url', { length: 500 }),
  badge:         badgeEnum('badge'),
  rating:        numeric('rating', { precision: 3, scale: 2 }).notNull().default('4.5'),
  reviewCount:   integer('review_count').notNull().default(0),
  sizes:         jsonb('sizes').notNull().default([]),
  extras:        jsonb('extras').notNull().default([]),
  allergens:     jsonb('allergens').default([]),
  calories:      integer('calories'),
  preparationTime: integer('preparation_time'),
  isAvailable:   boolean('is_available').notNull().default(true),
  isHighlighted: boolean('is_highlighted').notNull().default(false),
  tags:          jsonb('tags').notNull().default([]),
  sortOrder:     integer('sort_order').notNull().default(0),
  createdAt:     timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt:     timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  categoryIdx:   index('menu_items_category_idx').on(t.category),
  availableIdx:  index('menu_items_available_idx').on(t.isAvailable),
  sortIdx:       index('menu_items_sort_idx').on(t.sortOrder),
}));

// ─── Customers ────────────────────────────────────────────────────────────────
export const customers = pgTable('customers', {
  id:                uuid('id').primaryKey().defaultRandom(),
  name:              varchar('name', { length: 200 }).notNull(),
  email:             varchar('email', { length: 200 }).notNull(),
  phone:             varchar('phone', { length: 50 }),
  addressLine1:      varchar('address_line1', { length: 300 }),
  addressCity:       varchar('address_city', { length: 100 }).default('Duisburg'),
  addressZip:        varchar('address_zip', { length: 10 }),
  loyaltyPoints:     integer('loyalty_points').notNull().default(0),
  totalOrders:       integer('total_orders').notNull().default(0),
  totalSpent:        numeric('total_spent', { precision: 10, scale: 2 }).notNull().default('0'),
  preferredLanguage: varchar('preferred_language', { length: 5 }).notNull().default('de'),
  newsletter:        boolean('newsletter').notNull().default(false),
  createdAt:         timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  lastOrderAt:       timestamp('last_order_at', { withTimezone: true }),
}, (t) => ({
  emailIdx: uniqueIndex('customers_email_idx').on(t.email),
  phoneIdx: index('customers_phone_idx').on(t.phone),
}));

// ─── Orders ───────────────────────────────────────────────────────────────────
export const orders = pgTable('orders', {
  id:                     uuid('id').primaryKey().defaultRandom(),
  orderNumber:            varchar('order_number', { length: 20 }).notNull(),
  customerId:             uuid('customer_id').references(() => customers.id, { onDelete: 'set null' }),
  customerName:           varchar('customer_name', { length: 200 }).notNull(),
  customerPhone:          varchar('customer_phone', { length: 50 }).notNull(),
  customerEmail:          varchar('customer_email', { length: 200 }).notNull(),
  deliveryMode:           deliveryModeEnum('delivery_mode').notNull(),
  deliveryAddress:        jsonb('delivery_address'),
  items:                  jsonb('items').notNull().default([]),
  status:                 orderStatusEnum('status').notNull().default('pending'),
  paymentMethod:          paymentMethodEnum('payment_method').notNull(),
  paymentStatus:          paymentStatusEnum('payment_status').notNull().default('pending'),
  stripePaymentIntentId:  varchar('stripe_payment_intent_id', { length: 200 }),
  paypalOrderId:          varchar('paypal_order_id', { length: 200 }),
  subtotal:               numeric('subtotal', { precision: 10, scale: 2 }).notNull(),
  deliveryFee:            numeric('delivery_fee', { precision: 10, scale: 2 }).notNull().default('0'),
  discount:               numeric('discount', { precision: 10, scale: 2 }).notNull().default('0'),
  tip:                    numeric('tip', { precision: 10, scale: 2 }).notNull().default('0'),
  total:                  numeric('total', { precision: 10, scale: 2 }).notNull(),
  couponCode:             varchar('coupon_code', { length: 50 }),
  notes:                  text('notes'),
  estimatedTime:          integer('estimated_time'),
  actualDeliveryTime:     timestamp('actual_delivery_time', { withTimezone: true }),
  trackingCode:           varchar('tracking_code', { length: 50 }),
  createdAt:              timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt:              timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  orderNumberIdx: uniqueIndex('orders_order_number_idx').on(t.orderNumber),
  statusIdx:      index('orders_status_idx').on(t.status),
  customerIdx:    index('orders_customer_idx').on(t.customerId),
  createdAtIdx:   index('orders_created_at_idx').on(t.createdAt),
}));

// ─── Reservations ─────────────────────────────────────────────────────────────
export const reservations = pgTable('reservations', {
  id:                 uuid('id').primaryKey().defaultRandom(),
  reservationNumber:  varchar('reservation_number', { length: 20 }).notNull(),
  customerId:         uuid('customer_id').references(() => customers.id, { onDelete: 'set null' }),
  customerName:       varchar('customer_name', { length: 200 }).notNull(),
  customerPhone:      varchar('customer_phone', { length: 50 }).notNull(),
  customerEmail:      varchar('customer_email', { length: 200 }).notNull(),
  occasion:           occasionEnum('occasion').notNull().default('other'),
  guestCount:         integer('guest_count').notNull(),
  date:               varchar('date', { length: 10 }).notNull(),
  time:               varchar('time', { length: 5 }).notNull(),
  tableId:            varchar('table_id', { length: 20 }),
  status:             reservationStatusEnum('status').notNull().default('pending'),
  specialRequests:    text('special_requests'),
  newsletter:         boolean('newsletter').notNull().default(false),
  reminderSent:       boolean('reminder_sent').notNull().default(false),
  confirmationSent:   boolean('confirmation_sent').notNull().default(false),
  createdAt:          timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt:          timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  reservationNumberIdx: uniqueIndex('reservations_number_idx').on(t.reservationNumber),
  dateIdx:              index('reservations_date_idx').on(t.date),
  statusIdx:            index('reservations_status_idx').on(t.status),
}));

// ─── Reviews ──────────────────────────────────────────────────────────────────
export const reviews = pgTable('reviews', {
  id:           uuid('id').primaryKey().defaultRandom(),
  customerId:   uuid('customer_id').references(() => customers.id, { onDelete: 'set null' }),
  customerName: varchar('customer_name', { length: 200 }).notNull(),
  avatarUrl:    varchar('avatar_url', { length: 500 }),
  rating:       integer('rating').notNull(),
  text:         text('text').notNull(),
  source:       reviewSourceEnum('source').notNull().default('internal'),
  reply:        text('reply'),
  isVerified:   boolean('is_verified').notNull().default(false),
  isPublished:  boolean('is_published').notNull().default(true),
  createdAt:    timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  ratingIdx:    index('reviews_rating_idx').on(t.rating),
  publishedIdx: index('reviews_published_idx').on(t.isPublished),
}));

// ─── Offers ───────────────────────────────────────────────────────────────────
export const offers = pgTable('offers', {
  id:               uuid('id').primaryKey().defaultRandom(),
  title:            varchar('title', { length: 200 }).notNull(),
  titleEn:          varchar('title_en', { length: 200 }),
  titleAr:          varchar('title_ar', { length: 200 }),
  description:      text('description').notNull(),
  emoji:            varchar('emoji', { length: 10 }).notNull().default('🎉'),
  discountType:     discountTypeEnum('discount_type').notNull(),
  discountValue:    numeric('discount_value', { precision: 10, scale: 2 }).notNull(),
  code:             varchar('code', { length: 50 }),
  minOrder:         numeric('min_order', { precision: 10, scale: 2 }),
  maxUses:          integer('max_uses'),
  currentUses:      integer('current_uses').notNull().default(0),
  validFrom:        timestamp('valid_from', { withTimezone: true }).notNull(),
  validUntil:       timestamp('valid_until', { withTimezone: true }).notNull(),
  isActive:         boolean('is_active').notNull().default(true),
  applicableItems:  jsonb('applicable_items').default([]),
  createdAt:        timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  codeIdx:     uniqueIndex('offers_code_idx').on(t.code),
  activeIdx:   index('offers_active_idx').on(t.isActive),
  validIdx:    index('offers_valid_idx').on(t.validFrom, t.validUntil),
}));

// ─── Gallery ──────────────────────────────────────────────────────────────────
export const galleryItems = pgTable('gallery_items', {
  id:           uuid('id').primaryKey().defaultRandom(),
  category:     galleryCategoryEnum('category').notNull(),
  url:          varchar('url', { length: 500 }).notNull(),
  thumbnailUrl: varchar('thumbnail_url', { length: 500 }),
  alt:          varchar('alt', { length: 300 }).notNull(),
  caption:      text('caption'),
  type:         varchar('type', { length: 10 }).notNull().default('image'),
  width:        integer('width').notNull().default(0),
  height:       integer('height').notNull().default(0),
  sortOrder:    integer('sort_order').notNull().default(0),
  isActive:     boolean('is_active').notNull().default(true),
  createdAt:    timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  categoryIdx: index('gallery_category_idx').on(t.category),
  activeIdx:   index('gallery_active_idx').on(t.isActive),
}));

// ─── Admin Users ──────────────────────────────────────────────────────────────
export const adminUsers = pgTable('admin_users', {
  id:          uuid('id').primaryKey().defaultRandom(),
  name:        varchar('name', { length: 200 }).notNull(),
  email:       varchar('email', { length: 200 }).notNull(),
  passwordHash: varchar('password_hash', { length: 500 }).notNull(),
  role:        adminRoleEnum('role').notNull().default('staff'),
  permissions: jsonb('permissions').notNull().default([]),
  isActive:    boolean('is_active').notNull().default(true),
  lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
  createdAt:   timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  emailIdx: uniqueIndex('admin_users_email_idx').on(t.email),
}));

// ─── Notifications ────────────────────────────────────────────────────────────
export const notifications = pgTable('notifications', {
  id:        uuid('id').primaryKey().defaultRandom(),
  type:      varchar('type', { length: 50 }).notNull(),
  title:     varchar('title', { length: 300 }).notNull(),
  body:      text('body').notNull(),
  data:      jsonb('data').default({}),
  isRead:    boolean('is_read').notNull().default(false),
  adminId:   uuid('admin_id').references(() => adminUsers.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  adminIdx:  index('notifications_admin_idx').on(t.adminId),
  readIdx:   index('notifications_read_idx').on(t.isRead),
}));

// ─── Relations ────────────────────────────────────────────────────────────────
export const ordersRelations = relations(orders, ({ one }) => ({
  customer: one(customers, { fields: [orders.customerId], references: [customers.id] }),
}));

export const reservationsRelations = relations(reservations, ({ one }) => ({
  customer: one(customers, { fields: [reservations.customerId], references: [customers.id] }),
}));

export const customersRelations = relations(customers, ({ many }) => ({
  orders:       many(orders),
  reservations: many(reservations),
  reviews:      many(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  customer: one(customers, { fields: [reviews.customerId], references: [customers.id] }),
}));

// ─── Type Exports ─────────────────────────────────────────────────────────────
export type DbMenuItem     = typeof menuItems.$inferSelect;
export type NewMenuItem    = typeof menuItems.$inferInsert;
export type DbOrder        = typeof orders.$inferSelect;
export type NewOrder       = typeof orders.$inferInsert;
export type DbReservation  = typeof reservations.$inferSelect;
export type NewReservation = typeof reservations.$inferInsert;
export type DbCustomer     = typeof customers.$inferSelect;
export type NewCustomer    = typeof customers.$inferInsert;
export type DbReview       = typeof reviews.$inferSelect;
export type NewReview      = typeof reviews.$inferInsert;
export type DbOffer        = typeof offers.$inferSelect;
export type NewOffer       = typeof offers.$inferInsert;
export type DbGalleryItem  = typeof galleryItems.$inferSelect;
export type DbAdminUser    = typeof adminUsers.$inferSelect;
