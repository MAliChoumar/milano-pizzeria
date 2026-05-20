/**
 * Validates admin token using Buffer (Node.js built-in)
 * Token = Buffer.from(password).toString('base64')
 */
export function isValidAdminToken(token: string): boolean {
  const pw = process.env.ADMIN_PASSWORD || 'milano2024';
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    return decoded === pw;
  } catch {
    return false;
  }
}
