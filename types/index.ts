// ─── Menu & Food ─────────────────────────────────────────────────────────────
export type MenuCategory =
  | 'pizza' | 'pasta' | 'salad' | 'schnitzel'
  | 'dessert' | 'drinks' | 'kids' | 'offers';

export interface MenuItemSize {
  name: string;
  price: number;
  cm?: number;
}

export interface MenuItemExtra {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

export interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  nameEn?: string;
  nameAr?: string;
  description: string;
  descriptionEn?: string;
  descriptionAr?: string;
  emoji: string;
  imageUrl?: string;
  badge?: 'hot' | 'new' | 'bestseller' | 'veg' | null;
  rating: number;
  reviewCount: number;
  sizes: MenuItemSize[];
  extras: MenuItemExtra[];
  allergens?: string[];
  calories?: number;
  preparationTime?: number;
  isAvailable: boolean;
  isHighlighted?: boolean;
  tags: string[];
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem {
  key: string;
  itemId: string;
  name: string;
  emoji: string;
  sizeName: string;
  sizePrice: number;
  extras: { name: string; price: number }[];
  quantity: number;
  totalPrice: number;
  notes?: string;
}

export interface Cart {
  items: CartItem[];
  deliveryMode: 'delivery' | 'pickup';
  couponCode?: string;
  discount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

// ─── Order ────────────────────────────────────────────────────────────────────
export type OrderStatus =
  | 'pending' | 'confirmed' | 'preparing'
  | 'ready' | 'delivering' | 'delivered' | 'cancelled';

export type PaymentMethod =
  | 'cash' | 'card' | 'paypal' | 'stripe' | 'apple_pay' | 'google_pay';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  sizeName: string;
  quantity: number;
  unitPrice: number;
  extras: { name: string; price: number }[];
  notes?: string;
  totalPrice: number;
}

export interface DeliveryAddress {
  street: string;
  houseNumber: string;
  city: string;
  zip: string;
  floor?: string;
  bell?: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryMode: 'delivery' | 'pickup';
  deliveryAddress?: DeliveryAddress;
  items: OrderItem[];
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  stripePaymentIntentId?: string;
  paypalOrderId?: string;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tip: number;
  total: number;
  couponCode?: string;
  notes?: string;
  estimatedTime?: number;
  actualDeliveryTime?: Date;
  trackingCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Reservation ─────────────────────────────────────────────────────────────
export type ReservationStatus = 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no_show';

export type ReservationOccasion =
  | 'romantic' | 'family' | 'birthday' | 'business'
  | 'friends' | 'anniversary' | 'other';

export interface Reservation {
  id: string;
  reservationNumber: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  occasion: ReservationOccasion;
  guestCount: number;
  date: string;
  time: string;
  tableId?: string;
  status: ReservationStatus;
  specialRequests?: string;
  newsletter: boolean;
  reminderSent: boolean;
  confirmationSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Customer ─────────────────────────────────────────────────────────────────
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: DeliveryAddress;
  loyaltyPoints: number;
  totalOrders: number;
  totalSpent: number;
  preferredLanguage: 'de' | 'en' | 'ar';
  newsletter: boolean;
  createdAt: Date;
  lastOrderAt?: Date;
}

// ─── Admin ────────────────────────────────────────────────────────────────────
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'manager' | 'staff';
  permissions: string[];
  lastLoginAt?: Date;
  createdAt: Date;
}

// ─── Analytics ───────────────────────────────────────────────────────────────
export interface DashboardStats {
  todayRevenue: number;
  todayOrders: number;
  todayReservations: number;
  avgRating: number;
  weeklyRevenue: number[];
  topDishes: { name: string; emoji: string; sales: number; percentage: number }[];
  deliveryStats: { deliveries: number; pickups: number; avgDeliveryTime: number };
  revenueChange: number;
  ordersChange: number;
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
export interface Review {
  id: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  text: string;
  source: 'google' | 'internal';
  reply?: string;
  createdAt: Date;
  isVerified: boolean;
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
export type GalleryCategory = 'food' | 'interior' | 'team' | 'events' | 'videos';

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  url: string;
  thumbnailUrl?: string;
  alt: string;
  caption?: string;
  type: 'image' | 'video';
  width: number;
  height: number;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
}

// ─── Offers ───────────────────────────────────────────────────────────────────
export interface Offer {
  id: string;
  title: string;
  description: string;
  emoji: string;
  discountType: 'percentage' | 'fixed' | 'bundle';
  discountValue: number;
  code?: string;
  minOrder?: number;
  maxUses?: number;
  currentUses: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  applicableItems?: string[];
  createdAt: Date;
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  labelEn: string;
  labelAr: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
}

// ─── API Responses ────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Forms ───────────────────────────────────────────────────────────────────
export interface ReservationFormData {
  occasion: ReservationOccasion;
  date: string;
  time: string;
  guestCount: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  specialRequests?: string;
  newsletter: boolean;
}

export interface OrderFormData {
  deliveryMode: 'delivery' | 'pickup';
  deliveryAddress?: DeliveryAddress;
  paymentMethod: PaymentMethod;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  tip?: number;
  couponCode?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
