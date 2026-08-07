"use client";

import { useFormStatus } from "react-dom";
import { adminLoginAction } from "@/app/admin/login/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-8 w-full rounded-kb bg-kb-cacao px-6 py-3 font-body text-[13px] font-light tracking-wide text-kb-parchment transition-colors hover:bg-kb-terracotta disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export function AdminLoginForm() {
  return (
    <form action={adminLoginAction} className="mx-auto max-w-sm">
      <label className="block">
        <span className="kb-label text-[11px] text-kb-terracotta">
          Admin password
        </span>
        <input
          type="password"
          name="password"
          className="mt-2 w-full border-b-[0.5px] border-kb-chalk bg-transparent py-2 font-body text-[15px] font-light text-kb-dusk outline-none focus:border-kb-gold"
          autoComplete="current-password"
          required
        />
      </label>
      <SubmitButton />
    </form>
  );
}
