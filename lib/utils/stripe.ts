import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
  typescript: true,
});

// ─── Create Payment Intent ────────────────────────────────────────────────────
export async function createStripePaymentIntent(params: {
  amount: number;
  currency: string;
  metadata?: Record<string, string>;
}): Promise<{ paymentIntentId: string; cs: string }> {
  const paymentIntent = await stripe.paymentIntents.create({
    amount:   params.amount,
    currency: params.currency,
    automatic_payment_methods: { enabled: true },
    metadata: params.metadata || {},
  });
  return { paymentIntentId: paymentIntent.id, cs: paymentIntent.client_secret! };
}

// ─── Confirm Payment ──────────────────────────────────────────────────────────
export async function confirmStripePayment(paymentIntentId: string): Promise<boolean> {
  try {
    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    return pi.status === 'succeeded';
  } catch {
    return false;
  }
}

// ─── Refund ───────────────────────────────────────────────────────────────────
export async function refundStripePayment(paymentIntentId: string, amount?: number): Promise<boolean> {
  try {
    await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount,
    });
    return true;
  } catch {
    return false;
  }
}

// ─── Webhook Handler ──────────────────────────────────────────────────────────
export function constructStripeWebhookEvent(payload: string, signature: string) {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET || ''
  );
}

export { stripe };
