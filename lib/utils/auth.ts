// ─── lib/utils/auth.ts ─────────────────────────────────────────────
import jwt from 'jsonwebtoken';

const JWT_SECRET =
  process.env.JWT_SECRET || 'REDACTED_SET_VIA_ENV';

const JWT_EXPIRES = '7d';

const ADMIN_EMAIL = 'admin@milano-pizzeria.de';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'REDACTED_SET_VIA_ENV';

// Verify admin token
export async function verifyAdminToken(token: string) {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      adminId: string;
      role: string;
      email: string;
    };

    return {
      id: payload.adminId,
      name: 'Milano Admin',
      email: payload.email,
      role: payload.role,
      isActive: true,
    };
  } catch {
    return null;
  }
}

// Login admin (without database)
export async function loginAdmin(
  email: string,
  password: string
) {
  if (
    email.toLowerCase().trim() !== ADMIN_EMAIL ||
    password !== ADMIN_PASSWORD
  ) {
    return null;
  }

  const admin = {
    id: 'milano-admin',
    name: 'Milano Admin',
    email: ADMIN_EMAIL,
    role: 'admin',
  };

  const token = jwt.sign(
    {
      adminId: admin.id,
      role: admin.role,
      email: admin.email,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );

  return { admin, token };
}

export async function hashPassword(password: string) {
  return password;
}