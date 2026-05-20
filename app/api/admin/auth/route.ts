import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/admin/auth
 * Body: { password: string }
 * Returns: { success: true, token: string } or { error: string }
 *
 * Token = base64(password) using Buffer (Node.js built-in, always available)
 * Set ADMIN_PASSWORD in .env.local — default fallback is 'milano2024'
 */
export async function POST(req: NextRequest) {
  console.log('[admin/auth] POST received');

  try {
    const body = await req.json();
    const { password } = body;

    console.log('[admin/auth] password received:', password ? '***' : '(empty)');

    if (!password || typeof password !== 'string') {
      console.log('[admin/auth] rejected: no password');
      return NextResponse.json({ error: 'Kein Passwort angegeben.' }, { status: 400 });
    }

    const correct = process.env.ADMIN_PASSWORD || 'milano2024';
    console.log('[admin/auth] ADMIN_PASSWORD set:', !!process.env.ADMIN_PASSWORD);

    if (password !== correct) {
      console.log('[admin/auth] rejected: wrong password');
      return NextResponse.json({ error: 'Falsches Passwort.' }, { status: 401 });
    }

    // Generate token using Buffer (works in all Node.js versions, no btoa needed)
    const token = Buffer.from(password, 'utf8').toString('base64');
    console.log('[admin/auth] login successful, token generated');

    return NextResponse.json({ success: true, token });

  } catch (err) {
    console.error('[admin/auth] unexpected error:', err);
    return NextResponse.json({ error: 'Serverfehler.' }, { status: 500 });
  }
}
