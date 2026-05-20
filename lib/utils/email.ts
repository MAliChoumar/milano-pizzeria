import nodemailer from 'nodemailer';

// ─── Transport ────────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
  port:   parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = `"Milano Pizzeria Duisburg" <${process.env.SMTP_USER}>`;
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://milano-pizzeria-duisburg.de';

// ─── Shared Email Layout ──────────────────────────────────────────────────────
function emailLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Milano Pizzeria Duisburg</title>
  <style>
    body { font-family: Georgia, serif; background: #f5f5f5; margin: 0; padding: 0; color: #333; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
    .header { background: #050505; padding: 32px 40px; text-align: center; }
    .logo { font-family: Georgia, serif; font-size: 28px; font-weight: bold; color: #c9a84c; letter-spacing: 2px; }
    .logo span { color: #D62828; }
    .tagline { color: #888; font-size: 13px; margin-top: 4px; }
    .body { padding: 40px; }
    .greeting { font-size: 22px; font-weight: bold; color: #050505; margin-bottom: 8px; }
    .text { font-size: 15px; line-height: 1.7; color: #555; margin-bottom: 20px; }
    .box { background: #f9f9f9; border: 1px solid #eee; border-radius: 12px; padding: 24px; margin: 24px 0; }
    .box-title { font-size: 12px; font-weight: bold; color: #888; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; font-size: 14px; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { color: #888; }
    .detail-value { font-weight: bold; color: #050505; }
    .ref-code { font-size: 26px; font-weight: bold; color: #6DA544; text-align: center; letter-spacing: 4px; padding: 16px; background: rgba(109,165,68,0.08); border-radius: 10px; margin: 16px 0; font-family: monospace; }
    .btn { display: inline-block; background: #6DA544; color: #fff; padding: 14px 32px; border-radius: 100px; text-decoration: none; font-size: 15px; font-weight: bold; margin: 8px 4px; }
    .btn-outline { background: transparent; color: #050505; border: 2px solid #ddd; }
    .items-table { width: 100%; border-collapse: collapse; font-size: 14px; }
    .items-table th { padding: 8px 12px; background: #050505; color: #fff; text-align: left; font-size: 12px; letter-spacing: 0.5px; }
    .items-table td { padding: 10px 12px; border-bottom: 1px solid #eee; }
    .items-table tr:last-child td { border-bottom: none; }
    .total-row td { font-weight: bold; background: #f5f5f5; font-size: 16px; }
    .footer { background: #050505; padding: 24px 40px; text-align: center; }
    .footer p { color: #555; font-size: 12px; margin: 4px 0; }
    .footer a { color: #6DA544; text-decoration: none; }
    .divider { height: 1px; background: linear-gradient(90deg, transparent, #ddd, transparent); margin: 20px 0; }
    .green { color: #6DA544; }
    .gold { color: #c9a84c; }
    @media (max-width: 600px) {
      .body { padding: 24px 20px; }
      .header { padding: 24px 20px; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo">Milano<span>·</span>Pizzeria</div>
      <div class="tagline">Authentische Italienische Küche · Duisburg</div>
    </div>
    <div class="body">${content}</div>
    <div class="footer">
      <p>📍 Musterstraße 42, 47051 Duisburg</p>
      <p>📞 +49 203 123 4567 &nbsp;|&nbsp; ✉️ <a href="mailto:info@milano-pizzeria-duisburg.de">info@milano-pizzeria-duisburg.de</a></p>
      <p style="margin-top:12px;color:#333">© 2025 Milano Pizzeria Duisburg. Alle Rechte vorbehalten.</p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Order Confirmation Email ─────────────────────────────────────────────────
interface OrderEmailParams {
  to: string;
  name: string;
  orderNumber: string;
  items: { name: string; sizeName: string; quantity: number; totalPrice: number }[];
  total: number;
  deliveryMode: 'delivery' | 'pickup';
}

export async function sendOrderConfirmationEmail(params: OrderEmailParams): Promise<void> {
  const { to, name, orderNumber, items, total, deliveryMode } = params;

  const itemsHtml = items.map(item => `
    <tr>
      <td>${item.name} (${item.sizeName})</td>
      <td style="text-align:center">${item.quantity}</td>
      <td style="text-align:right">${item.totalPrice.toFixed(2)} €</td>
    </tr>
  `).join('');

  const content = `
    <div class="greeting">Vielen Dank, ${name}! 🎉</div>
    <p class="text">Ihre Bestellung wurde erfolgreich aufgenommen und wird jetzt bearbeitet.</p>
    
    <div class="box">
      <div class="box-title">Bestellnummer</div>
      <div class="ref-code">${orderNumber}</div>
    </div>
    
    <div class="box">
      <div class="box-title">Bestellte Artikel</div>
      <table class="items-table">
        <thead><tr><th>Artikel</th><th style="text-align:center">Menge</th><th style="text-align:right">Preis</th></tr></thead>
        <tbody>${itemsHtml}</tbody>
        <tfoot>
          <tr class="total-row">
            <td colspan="2">Gesamtbetrag</td>
            <td style="text-align:right">${total.toFixed(2)} €</td>
          </tr>
        </tfoot>
      </table>
    </div>
    
    <div class="box">
      <div class="detail-row">
        <span class="detail-label">Lieferart</span>
        <span class="detail-value">${deliveryMode === 'delivery' ? '🛵 Lieferung (~30 Min.)' : '🏪 Abholung (~15 Min.)'}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Status</span>
        <span class="detail-value green">✅ Bestätigt</span>
      </div>
    </div>
    
    <div style="text-align:center;margin-top:28px">
      <a href="${BASE_URL}/order/track/${orderNumber}" class="btn">Bestellung verfolgen</a>
    </div>
    
    <div class="divider"></div>
    <p class="text" style="font-size:13px;text-align:center;color:#888">
      Bei Fragen erreichen Sie uns unter <strong>+49 203 123 4567</strong> oder per WhatsApp.
    </p>
  `;

  await transporter.sendMail({
    from:    FROM,
    to,
    subject: `✅ Bestellung ${orderNumber} bestätigt — Milano Pizzeria`,
    html:    emailLayout(content),
  });
}

// ─── Reservation Confirmation Email ──────────────────────────────────────────
interface ReservationEmailParams {
  to: string;
  name: string;
  reservationNumber: string;
  date: string;
  time: string;
  guestCount: number;
  occasion: string;
  specialRequests?: string;
}

const occasionLabels: Record<string, string> = {
  romantic:    '💑 Romantisches Dinner',
  family:      '👨‍👩‍👧 Familienfeier',
  birthday:    '🎂 Geburtstag',
  business:    '💼 Geschäftsessen',
  friends:     '🥂 Freundesabend',
  anniversary: '💍 Jahrestag',
  other:       '🍽️ Restaurantbesuch',
};

export async function sendReservationConfirmationEmail(params: ReservationEmailParams): Promise<void> {
  const { to, name, reservationNumber, date, time, guestCount, occasion, specialRequests } = params;

  const dateFormatted = new Date(date + 'T12:00:00').toLocaleDateString('de-DE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const content = `
    <div class="greeting">Ihre Reservierung ist bestätigt! 🎉</div>
    <p class="text">Hallo ${name}, wir freuen uns auf Ihren Besuch bei Milano Pizzeria Duisburg.</p>
    
    <div class="box">
      <div class="box-title">Reservierungsnummer</div>
      <div class="ref-code">${reservationNumber}</div>
    </div>
    
    <div class="box">
      <div class="box-title">Reservierungsdetails</div>
      <div class="detail-row">
        <span class="detail-label">📅 Datum</span>
        <span class="detail-value">${dateFormatted}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">🕐 Uhrzeit</span>
        <span class="detail-value">${time} Uhr</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">👥 Personen</span>
        <span class="detail-value">${guestCount} Person${guestCount !== 1 ? 'en' : ''}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">🎉 Anlass</span>
        <span class="detail-value">${occasionLabels[occasion] || '🍽️ Restaurantbesuch'}</span>
      </div>
      ${specialRequests ? `
      <div class="detail-row">
        <span class="detail-label">📝 Besondere Wünsche</span>
        <span class="detail-value">${specialRequests}</span>
      </div>` : ''}
    </div>
    
    <div style="background:rgba(109,165,68,0.08);border:1px solid rgba(109,165,68,0.2);border-radius:12px;padding:16px;margin:20px 0;font-size:14px;color:#555">
      <strong>⚠️ Wichtige Hinweise:</strong><br>
      • Bitte erscheinen Sie pünktlich oder informieren Sie uns rechtzeitig.<br>
      • Bei Nichterscheinen ohne Absage kann die Reservierung storniert werden.<br>
      • Für Absagen bitte mindestens 2 Stunden vorher anrufen: <strong>+49 203 123 4567</strong>
    </div>
    
    <div style="text-align:center;margin-top:28px">
      <a href="https://maps.google.com/?q=Musterstra%C3%9Fe+42+Duisburg" class="btn">Route planen</a>
      <a href="tel:+4920312345677" class="btn btn-outline">Anrufen</a>
    </div>
    
    <div class="divider"></div>
    <p class="text" style="font-size:13px;text-align:center;color:#888">
      Wir freuen uns auf Sie! Das Team von Milano Pizzeria Duisburg 🍕
    </p>
  `;

  await transporter.sendMail({
    from:    FROM,
    to,
    subject: `📅 Reservierung ${reservationNumber} bestätigt — Milano Pizzeria`,
    html:    emailLayout(content),
  });
}

// ─── Contact Form Email ───────────────────────────────────────────────────────
export async function sendContactEmail(params: {
  from: string; name: string; phone?: string; subject: string; message: string;
}): Promise<void> {
  await transporter.sendMail({
    from:    FROM,
    to:      process.env.ADMIN_EMAIL || process.env.SMTP_USER,
    replyTo: params.from,
    subject: `📧 Kontaktanfrage: ${params.subject} — von ${params.name}`,
    html: emailLayout(`
      <div class="greeting">Neue Kontaktanfrage</div>
      <div class="box">
        <div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">${params.name}</span></div>
        <div class="detail-row"><span class="detail-label">E-Mail</span><span class="detail-value">${params.from}</span></div>
        ${params.phone ? `<div class="detail-row"><span class="detail-label">Telefon</span><span class="detail-value">${params.phone}</span></div>` : ''}
        <div class="detail-row"><span class="detail-label">Betreff</span><span class="detail-value">${params.subject}</span></div>
      </div>
      <div class="box">
        <div class="box-title">Nachricht</div>
        <p style="font-size:15px;line-height:1.7;color:#333">${params.message}</p>
      </div>
    `),
  });
}
