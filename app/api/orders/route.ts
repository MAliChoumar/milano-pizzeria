import { NextRequest, NextResponse } from 'next/server';
import { eq, desc, and, gte, lte, like, sql } from 'drizzle-orm';
import db from '@/lib/db';
import { orders, customers, offers } from '@/lib/db/schema';
import { validateOrderRequest, generateOrderNumber } from '@/lib/utils/order';
import { sendOrderConfirmationEmail } from '@/lib/utils/email';
import { createStripePaymentIntent } from '@/lib/utils/stripe';
import { verifyAdminToken } from '@/lib/utils/auth';
import type { OrderFormData, CartItem } from '@/types';

// ─── GET /api/orders ──────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const admin = await verifyAdminToken(token);
    if (!admin) return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 403 });

    const { searchParams } = new URL(request.url);
    const page     = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const status   = searchParams.get('status');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo   = searchParams.get('dateTo');
    const search   = searchParams.get('search');

    const conditions = [];
    if (status) conditions.push(eq(orders.status, status as any));
    if (dateFrom) conditions.push(gte(orders.createdAt, new Date(dateFrom)));
    if (dateTo)   conditions.push(lte(orders.createdAt, new Date(dateTo + 'T23:59:59')));
    if (search)   conditions.push(like(orders.customerName, `%${search}%`));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [allOrders, countResult] = await Promise.all([
      db.query.orders.findMany({
        where: whereClause,
        with: { customer: true },
        orderBy: [desc(orders.createdAt)],
        limit: pageSize,
        offset: (page - 1) * pageSize,
      }),
      db.select({ count: sql<number>`count(*)` }).from(orders).where(whereClause),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        items: allOrders,
        total: Number(countResult[0].count),
        page,
        pageSize,
        totalPages: Math.ceil(Number(countResult[0].count) / pageSize),
      },
    });
  } catch (error) {
    console.error('GET /api/orders error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// ─── POST /api/orders ─────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartItems, formData, couponCode }: {
      cartItems: CartItem[];
      formData: OrderFormData;
      couponCode?: string;
    } = body;

    // Validate
    const validation = validateOrderRequest({ cartItems, formData });
    if (!validation.valid) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
    }
    if (!cartItems.length) {
      return NextResponse.json({ success: false, error: 'Cart is empty' }, { status: 400 });
    }

    // Calculate totals
    const subtotal    = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const deliveryFee = formData.deliveryMode === 'delivery' && subtotal < 20 ? 2.99 : 0;
    const tip         = formData.tip || 0;

    // Apply coupon
    let discount = 0;
    if (couponCode) {
      const offer = await db.query.offers.findFirst({
        where: and(
          eq(offers.code, couponCode),
          eq(offers.isActive, true),
          lte(offers.validFrom, new Date()),
          gte(offers.validUntil, new Date()),
        ),
      });
      if (offer) {
        if (offer.discountType === 'percentage') {
          discount = subtotal * (Number(offer.discountValue) / 100);
        } else if (offer.discountType === 'fixed') {
          discount = Math.min(Number(offer.discountValue), subtotal);
        }
        await db.update(offers).set({ currentUses: sql`${offers.currentUses} + 1` }).where(eq(offers.id, offer.id));
      }
    }

    const total = subtotal + deliveryFee + tip - discount;

    // Upsert customer
    let customerId: string | null = null;
    try {
      const existing = await db.query.customers.findFirst({
        where: eq(customers.email, formData.customerEmail),
      });
      if (existing) {
        await db.update(customers).set({
          name: formData.customerName,
          phone: formData.customerPhone,
          lastOrderAt: new Date(),
          totalOrders: sql`${customers.totalOrders} + 1`,
          totalSpent: sql`${customers.totalSpent} + ${total.toFixed(2)}`,
          loyaltyPoints: sql`${customers.loyaltyPoints} + ${Math.floor(total)}`,
        }).where(eq(customers.id, existing.id));
        customerId = existing.id;
      } else {
        const [newCustomer] = await db.insert(customers).values({
          name: formData.customerName,
          email: formData.customerEmail,
          phone: formData.customerPhone,
          totalOrders: 1,
          totalSpent: total.toFixed(2),
          loyaltyPoints: Math.floor(total),
          lastOrderAt: new Date(),
        }).returning({ id: customers.id });
        customerId = newCustomer.id;
      }
    } catch { /* Customer upsert failed — continue without linking */ }

    // Create Stripe payment intent if needed
    let stripePaymentIntentId: string | undefined;
    let clientSecret: string | undefined;
    if (['stripe', 'card', 'apple_pay', 'google_pay'].includes(formData.paymentMethod)) {
      const { paymentIntentId, cs } = await createStripePaymentIntent({
        amount: Math.round(total * 100),
        currency: 'eur',
        metadata: {
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
        },
      });
      stripePaymentIntentId = paymentIntentId;
      clientSecret = cs;
    }

    // Create order
    const orderNumber = generateOrderNumber();
    const orderItems = cartItems.map(item => ({
      menuItemId: item.itemId,
      name:       item.name,
      sizeName:   item.sizeName,
      quantity:   item.quantity,
      unitPrice:  item.sizePrice,
      extras:     item.extras,
      totalPrice: item.totalPrice,
    }));

    const [newOrder] = await db.insert(orders).values({
      orderNumber,
      customerId,
      customerName:          formData.customerName,
      customerPhone:         formData.customerPhone,
      customerEmail:         formData.customerEmail,
      deliveryMode:          formData.deliveryMode,
      deliveryAddress:       formData.deliveryAddress || null,
      items:                 orderItems,
      status:                'pending',
      paymentMethod:         formData.paymentMethod,
      paymentStatus:         formData.paymentMethod === 'cash' ? 'pending' : 'pending',
      stripePaymentIntentId: stripePaymentIntentId || null,
      subtotal:              subtotal.toFixed(2),
      deliveryFee:           deliveryFee.toFixed(2),
      discount:              discount.toFixed(2),
      tip:                   tip.toFixed(2),
      total:                 total.toFixed(2),
      couponCode:            couponCode || null,
      notes:                 formData.notes || null,
      estimatedTime:         formData.deliveryMode === 'delivery' ? 30 : 15,
      trackingCode:          Math.random().toString(36).substring(2, 10).toUpperCase(),
    }).returning();

    // Send confirmation email (non-blocking)
    sendOrderConfirmationEmail({
      to:          formData.customerEmail,
      name:        formData.customerName,
      orderNumber,
      items:       orderItems,
      total,
      deliveryMode: formData.deliveryMode,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      data: {
        orderId:      newOrder.id,
        orderNumber,
        total:        total.toFixed(2),
        clientSecret,
        estimatedTime: formData.deliveryMode === 'delivery' ? 30 : 15,
        trackingCode:  newOrder.trackingCode,
      },
    }, { status: 201 });

  } catch (error) {
    console.error('POST /api/orders error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
