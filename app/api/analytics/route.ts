import { NextRequest, NextResponse } from 'next/server';
import { sql, gte, and, eq } from 'drizzle-orm';
import db from '@/lib/db';
import { orders, reservations, reviews } from '@/lib/db/schema';
import { verifyAdminToken } from '@/lib/utils/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '') || request.cookies.get('admin_token')?.value;
    const admin = await verifyAdminToken(token || '');
    if (!admin) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const today     = new Date(); today.setHours(0, 0, 0, 0);
    const weekStart = new Date(); weekStart.setDate(weekStart.getDate() - 6); weekStart.setHours(0, 0, 0, 0);

    const [
      todayOrders,
      weeklyOrders,
      todayReservations,
      avgRating,
      weeklyRevenue,
    ] = await Promise.all([
      // Today's orders count + revenue
      db.select({
        count:   sql<number>`count(*)`,
        revenue: sql<number>`coalesce(sum(total::numeric), 0)`,
      }).from(orders).where(and(gte(orders.createdAt, today), eq(orders.status, 'delivered'))),

      // Weekly orders for chart
      db.select({
        date:    sql<string>`date(created_at)`,
        count:   sql<number>`count(*)`,
        revenue: sql<number>`coalesce(sum(total::numeric), 0)`,
      }).from(orders).where(gte(orders.createdAt, weekStart)).groupBy(sql`date(created_at)`).orderBy(sql`date(created_at)`),

      // Today's reservations
      db.select({ count: sql<number>`count(*)` }).from(reservations).where(gte(reservations.createdAt, today)),

      // Average rating
      db.select({ avg: sql<number>`coalesce(avg(rating), 4.9)` }).from(reviews).where(eq(reviews.isPublished, true)),

      // Weekly revenue (last 7 days, one per day)
      db.select({
        revenue: sql<number>`coalesce(sum(total::numeric), 0)`,
      }).from(orders).where(gte(orders.createdAt, weekStart)).groupBy(sql`date(created_at)`),
    ]);

    // Build weekly chart data (fill missing days with 0)
    const revenueByDay: Record<string, number> = {};
    weeklyOrders.forEach((row) => { revenueByDay[row.date] = Number(row.revenue); });
    const weeklyChartData: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      weeklyChartData.push(revenueByDay[key] || 0);
    }

    return NextResponse.json({
      success: true,
      data: {
        today: {
          revenue:      Number(todayOrders[0]?.revenue || 0),
          orders:       Number(todayOrders[0]?.count || 0),
          reservations: Number(todayReservations[0]?.count || 0),
          avgRating:    Number(avgRating[0]?.avg || 4.9).toFixed(1),
        },
        weekly: {
          chartData: weeklyChartData,
          totalRevenue: weeklyChartData.reduce((s, v) => s + v, 0),
        },
      },
    });
  } catch (error) {
    console.error('GET /api/analytics error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
