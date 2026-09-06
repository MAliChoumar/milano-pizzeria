// ─── lib/utils/auth.ts ─────────────────────────────────────────────
import jwt from 'jsonwebtoken';

const JWT_EXPIRES = '7d';

const ADMIN_EMAIL = 'admin@milano-pizzeria.de';

// Read the secrets at call time and never fall back to a literal. A build that
// is missing either value must refuse every login instead of accepting one that
// anyone reading this repository already knows.
function authConfig() {
  const secret = process.env.JWT_SECRET;
  const password = process.env.ADMIN_PASSWORD;

  if (!secret || !password) {
    console.error(
      'Auth is not configured: JWT_SECRET and ADMIN_PASSWORD must both be set.'
    );
    return null;
  }

  return { secret, password };
}

// Verify admin token
export async function verifyAdminToken(token: string) {
  const config = authConfig();
  if (!config) return null;

  try {
    const payload = jwt.verify(token, config.secret) as {
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
  const config = authConfig();
  if (!config) return null;

  if (
    email.toLowerCase().trim() !== ADMIN_EMAIL ||
    password !== config.password
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
    config.secret,
    { expiresIn: JWT_EXPIRES }
  );

  return { admin, token };
}
