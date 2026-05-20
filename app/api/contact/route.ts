import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/utils/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name?.trim())    return NextResponse.json({ success: false, error: 'Name erforderlich' }, { status: 400 });
    if (!message?.trim()) return NextResponse.json({ success: false, error: 'Nachricht erforderlich' }, { status: 400 });
    if (message.trim().length < 10) return NextResponse.json({ success: false, error: 'Nachricht zu kurz (min. 10 Zeichen)' }, { status: 400 });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return NextResponse.json({ success: false, error: 'Ungültige E-Mail' }, { status: 400 });

    // Rate limiting (simple - in production use Redis)
    // TODO: implement proper rate limiting with Redis

    await sendContactEmail({ from: email, name: name.trim(), phone, subject: subject || 'Kontaktanfrage', message: message.trim() });

    return NextResponse.json({ success: true, message: 'Nachricht erfolgreich gesendet' });
  } catch (error) {
    console.error('POST /api/contact error:', error);
    return NextResponse.json({ success: false, error: 'Fehler beim Senden — bitte versuchen Sie es erneut' }, { status: 500 });
  }
}
