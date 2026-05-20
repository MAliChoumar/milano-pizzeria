import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { constructStripeWebhookEvent } from '@/lib/utils/stripe';
import db from '@/lib/db';
import { orders } from '@/lib/db/schema';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body      = await request.text();
    const signature = request.headers.get('stripe-signature') || '';

    let event: ReturnType<typeof constructStripeWebhookEvent>;
    try {
      event = constructStripeWebhookEvent(body, signature);
    } catch (err: any) {
      console.error('Stripe webhook signature error:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object as any;
        await db.update(orders)
          .set({ paymentStatus: 'paid', status: 'confirmed', updatedAt: new Date() })
          .where(eq(orders.stripePaymentIntentId, pi.id));
        console.log(`✅ Payment succeeded: ${pi.id}`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const pi = event.data.object as any;
        await db.update(orders)
          .set({ paymentStatus: 'failed', status: 'cancelled', updatedAt: new Date() })
          .where(eq(orders.stripePaymentIntentId, pi.id));
        console.log(`❌ Payment failed: ${pi.id}`);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as any;
        if (charge.payment_intent) {
          await db.update(orders)
            .set({ paymentStatus: 'refunded', status: 'cancelled', updatedAt: new Date() })
            .where(eq(orders.stripePaymentIntentId, charge.payment_intent));
        }
        break;
      }

      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}
