import { NextRequest, NextResponse } from 'next/server';
import { eq, and, desc, asc, sql } from 'drizzle-orm';
import db from '@/lib/db';
import { menuItems } from '@/lib/db/schema';
import { verifyAdminToken } from '@/lib/utils/auth';

// ─── GET /api/menu ────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category    = searchParams.get('category');
    const available   = searchParams.get('available');
    const highlighted = searchParams.get('highlighted');

    const conditions = [];
    if (category)    conditions.push(eq(menuItems.category, category as any));
    if (available === 'true')    conditions.push(eq(menuItems.isAvailable, true));
    if (highlighted === 'true')  conditions.push(eq(menuItems.isHighlighted, true));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const items = await db.query.menuItems.findMany({
      where: whereClause,
      orderBy: [asc(menuItems.sortOrder), desc(menuItems.createdAt)],
    });

    // Group by category if no filter
    if (!category) {
      const grouped = items.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {} as Record<string, typeof items>);

      return NextResponse.json({ success: true, data: { items, grouped } });
    }

    return NextResponse.json({ success: true, data: { items } });

  } catch (error) {
    console.error('GET /api/menu error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// ─── POST /api/menu ───────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const admin = await verifyAdminToken(token || '');
    if (!admin || admin.role === 'staff') {
      return NextResponse.json({ success: false, error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const {
      category, name, nameEn, nameAr,
      description, descriptionEn, descriptionAr,
      emoji, imageUrl, badge,
      rating, sizes, extras, allergens,
      calories, preparationTime, isAvailable,
      isHighlighted, tags, sortOrder,
    } = body;

    if (!category || !name || !description || !sizes?.length) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const [newItem] = await db.insert(menuItems).values({
      category, name, nameEn, nameAr,
      description, descriptionEn, descriptionAr,
      emoji: emoji || '🍕', imageUrl, badge,
      rating: rating?.toString() || '4.5',
      reviewCount: 0,
      sizes:   sizes   || [],
      extras:  extras  || [],
      allergens: allergens || [],
      calories, preparationTime,
      isAvailable: isAvailable ?? true,
      isHighlighted: isHighlighted ?? false,
      tags: tags || [],
      sortOrder: sortOrder ?? 0,
    }).returning();

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });

  } catch (error) {
    console.error('POST /api/menu error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// ─── PATCH /api/menu/[id] ─────────────────────────────────────────────────────
export async function PATCH(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const admin = await verifyAdminToken(token || '');
    if (!admin || admin.role === 'staff') {
      return NextResponse.json({ success: false, error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;
    if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });

    const [updated] = await db.update(menuItems)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(menuItems.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });

  } catch (error) {
    console.error('PATCH /api/menu error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// ─── DELETE /api/menu/[id] ────────────────────────────────────────────────────
export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const admin = await verifyAdminToken(token || '');
    if (!admin || admin.role !== 'superadmin') {
      return NextResponse.json({ success: false, error: 'Only superadmin can delete items' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });

    // Soft delete — just mark unavailable
    const [updated] = await db.update(menuItems)
      .set({ isAvailable: false, updatedAt: new Date() })
      .where(eq(menuItems.id, id))
      .returning({ id: menuItems.id });

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Item deactivated' });

  } catch (error) {
    console.error('DELETE /api/menu error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
