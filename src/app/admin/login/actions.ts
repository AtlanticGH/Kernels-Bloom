"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  CMS_COOKIE,
  createSessionToken,
  verifyAdminPassword,
} from "@/lib/cms/auth";

export async function adminLoginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    redirect("/admin/login?error=invalid");
  }

  const jar = await cookies();
  jar.set(CMS_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}
