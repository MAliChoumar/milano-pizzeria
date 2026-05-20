import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import db from '@/lib/db';
import { orders } from '@/lib/db/schema';
import { verifyAdminToken } from '@/lib/utils/auth';

// ─── GET /api/orders/[id] ─────────────────────────────────────────────────────
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, params.id),
      with: { customer: true },
    });
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error('GET /api/orders/[id] error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// ─── PATCH /api/orders/[id] ───────────────────────────────────────────────────
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const admin = await verifyAdminToken(token || '');
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status, paymentStatus, estimatedTime, notes } = body;

    const allowedStatuses = ['confirmed', 'preparing', 'ready', 'delivering', 'delivered', 'cancelled'];
    if (status && !allowedStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
    }

    const updateData: Partial<typeof orders.$inferInsert> = {
      updatedAt: new Date(),
    };
    if (status)        updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (estimatedTime) updateData.estimatedTime = estimatedTime;
    if (notes !== undefined) updateData.notes = notes;
    if (status === 'delivered') updateData.actualDeliveryTime = new Date();

    const [updated] = await db.update(orders)
      .set(updateData)
      .where(eq(orders.id, params.id))
      .returning();

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('PATCH /api/orders/[id] error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
