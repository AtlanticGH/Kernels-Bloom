import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const CMS_COOKIE = "kb_cms_session";

/** Used when CMS_ADMIN_PASSWORD is not set in the environment. */
export const CMS_DEFAULT_PASSWORD = "password1234";

const DEFAULT_SESSION_SECRET = "kernels-bloom-cms-session";

function sessionSecret(): string {
  const fromEnv =
    process.env.CMS_SESSION_SECRET?.trim() ||
    process.env.CMS_ADMIN_PASSWORD?.trim();
  return fromEnv || DEFAULT_SESSION_SECRET;
}

export function adminPassword(): string {
  return process.env.CMS_ADMIN_PASSWORD?.trim() || CMS_DEFAULT_PASSWORD;
}

export function createSessionToken(): string {
  return createHmac("sha256", sessionSecret())
    .update("kernels-bloom-cms")
    .digest("hex");
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const expected = createSessionToken();
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: string): boolean {
  const input = password.trim();
  const expected = adminPassword();
  try {
    const a = Buffer.from(input);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return verifySessionToken(jar.get(CMS_COOKIE)?.value);
}
