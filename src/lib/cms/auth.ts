import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const CMS_COOKIE = "kb_cms_session";

function sessionSecret(): string {
  // Keep session signing separate from Supabase keys so auth stays stable.
  return (
    process.env.CMS_SESSION_SECRET ??
    process.env.CMS_ADMIN_PASSWORD ??
    "kb-cms-dev-secret"
  );
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
  const expected = process.env.CMS_ADMIN_PASSWORD?.trim();
  if (!expected) return input === "kernels-bloom";
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
