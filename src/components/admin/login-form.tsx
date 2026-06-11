"use client";

import { useState } from "react";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "network">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      if (!res.ok) {
        setStatus(res.status === 401 ? "error" : "network");
        return;
      }

      // Full navigation so the session cookie is sent on the next request.
      window.location.assign("/admin");
    } catch {
      setStatus("network");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-sm">
      <label className="block">
        <span className="kb-label text-[11px] text-kb-terracotta">
          Admin password
        </span>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          className="mt-2 w-full border-b-[0.5px] border-kb-chalk bg-transparent py-2 font-body text-[15px] font-light text-kb-dusk outline-none focus:border-kb-gold"
          autoComplete="current-password"
          required
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-8 w-full rounded-kb bg-kb-cacao px-6 py-3 font-body text-[13px] font-light tracking-wide text-kb-parchment transition-colors hover:bg-kb-terracotta disabled:opacity-60"
      >
        {status === "loading" ? "Signing in…" : "Sign in"}
      </button>
      {status === "error" && (
        <p className="mt-3 font-body text-[13px] font-light text-kb-terracotta">
          Invalid password. Check for typos and try again.
        </p>
      )}
      {status === "network" && (
        <p className="mt-3 font-body text-[13px] font-light text-kb-terracotta">
          Could not reach the server. Refresh and try again.
        </p>
      )}
    </form>
  );
}
