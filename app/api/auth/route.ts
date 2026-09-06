import { NextRequest, NextResponse } from 'next/server';
import { loginAdmin, verifyAdminToken } from '@/lib/utils/auth';

// POST /api/auth → login
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'E-Mail und Passwort erforderlich',
        },
        { status: 400 }
      );
    }

    const result = await loginAdmin(
      email.toLowerCase().trim(),
      password
    );

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ungültige Anmeldedaten',
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      data: {
        admin: result.admin,
        token: result.token,
      },
    });

    // SAVE COOKIE
    response.cookies.set(
      'admin_token',
      result.token,
      {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      }
    );

    return response;
  } catch (error) {
    console.error('POST /api/auth error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Interner Serverfehler',
      },
      { status: 500 }
    );
  }
}

// GET /api/auth → verify token / get current admin
export async function GET(request: NextRequest) {
  try {
    const authHeader =
      request.headers.get('Authorization');

    const cookieToken =
      request.cookies.get('admin_token')?.value;

    const token =
      authHeader?.replace('Bearer ', '') ||
      cookieToken;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'Nicht authentifiziert',
        },
        { status: 401 }
      );
    }

    const admin = await verifyAdminToken(token);

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ungültiger oder abgelaufener Token',
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('GET /api/auth error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Interner Serverfehler',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/auth → logout
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Erfolgreich abgemeldet',
  });

  response.cookies.delete('admin_token');

  return response;
}