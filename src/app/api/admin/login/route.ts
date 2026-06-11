import { NextResponse } from "next/server";
import {
  CMS_COOKIE,
  createSessionToken,
  verifyAdminPassword,
} from "@/lib/cms/auth";

export const dynamic = "force-dynamic";

function readPassword(request: Request, body: unknown): string | null {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    if (body && typeof body === "object" && "password" in body) {
      const password = (body as { password: unknown }).password;
      return typeof password === "string" ? password : null;
    }
    return null;
  }

  return null;
}

async function readPasswordFromRequest(request: Request): Promise<string | null> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    return String(form.get("password") ?? "");
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const form = await request.formData();
    return String(form.get("password") ?? "");
  }

  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => null);
    return readPassword(request, body);
  }

  return null;
}

function setSessionCookie(response: NextResponse) {
  response.cookies.set(CMS_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function POST(request: Request) {
  try {
    const password = await readPasswordFromRequest(request);
    const contentType = request.headers.get("content-type") ?? "";
    const wantsRedirect =
      contentType.includes("form-data") ||
      contentType.includes("application/x-www-form-urlencoded");

    if (password === null || !verifyAdminPassword(password)) {
      if (wantsRedirect) {
        return NextResponse.redirect(
          new URL("/admin/login?error=invalid", request.url),
          { status: 303 }
        );
      }
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    if (wantsRedirect) {
      const response = NextResponse.redirect(new URL("/admin", request.url), {
        status: 303,
      });
      setSessionCookie(response);
      return response;
    }

    const response = NextResponse.json({ ok: true });
    setSessionCookie(response);
    return response;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
