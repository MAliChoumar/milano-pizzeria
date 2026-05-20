import type { CartItem, OrderFormData } from '@/types';

// ─── Number Generators ────────────────────────────────────────────────────────
export function generateOrderNumber(): string {
  const ts   = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `ORD-${ts}-${rand}`;
}

export function generateReservationNumber(): string {
  const ts   = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 4).toUpperCase();
  return `RES-${ts}-${rand}`;
}

export function generateTrackingCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// ─── Validation ───────────────────────────────────────────────────────────────
interface ValidationResult { valid: boolean; error?: string }

export function validateOrderRequest(params: {
  cartItems: CartItem[];
  formData: OrderFormData;
}): ValidationResult {
  const { cartItems, formData } = params;

  if (!cartItems?.length) return { valid: false, error: 'Cart is empty' };
  if (!formData.customerName?.trim()) return { valid: false, error: 'Customer name is required' };
  if (!formData.customerPhone?.trim()) return { valid: false, error: 'Phone number is required' };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.customerEmail)) return { valid: false, error: 'Invalid email address' };

  if (formData.deliveryMode === 'delivery') {
    if (!formData.deliveryAddress?.street) return { valid: false, error: 'Delivery address is required' };
    if (!formData.deliveryAddress?.houseNumber) return { valid: false, error: 'House number is required' };
    if (!formData.deliveryAddress?.zip) return { valid: false, error: 'ZIP code is required' };
  }

  for (const item of cartItems) {
    if (!item.name) return { valid: false, error: `Invalid item: missing name` };
    if (item.quantity < 1) return { valid: false, error: `Invalid quantity for ${item.name}` };
    if (item.totalPrice < 0) return { valid: false, error: `Invalid price for ${item.name}` };
  }

  return { valid: true };
}

// ─── Price Calculation ────────────────────────────────────────────────────────
export function calculateOrderTotals(params: {
  cartItems: CartItem[];
  deliveryMode: 'delivery' | 'pickup';
  discountPercent?: number;
  tip?: number;
}) {
  const { cartItems, deliveryMode, discountPercent = 0, tip = 0 } = params;
  const subtotal    = cartItems.reduce((s, item) => s + item.totalPrice, 0);
  const deliveryFee = deliveryMode === 'delivery' && subtotal < 20 ? 2.99 : 0;
  const discount    = subtotal * (discountPercent / 100);
  const total       = subtotal + deliveryFee + tip - discount;
  return {
    subtotal:    parseFloat(subtotal.toFixed(2)),
    deliveryFee: parseFloat(deliveryFee.toFixed(2)),
    discount:    parseFloat(discount.toFixed(2)),
    tip:         parseFloat(tip.toFixed(2)),
    total:       parseFloat(total.toFixed(2)),
  };
}

// ─── Loyalty Points ───────────────────────────────────────────────────────────
export function calculateLoyaltyPoints(orderTotal: number): number {
  return Math.floor(orderTotal);
}

export function loyaltyPointsToDiscount(points: number): number {
  return parseFloat((points * 0.01).toFixed(2));
}
