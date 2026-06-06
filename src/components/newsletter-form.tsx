"use client";

import { useState } from "react";

/** Newsletter signup. Posts to /api/newsletter (Klaviyo adapter, stubbed). */
export function NewsletterForm({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className={`kb-accent text-[16px] text-kb-gold ${className}`}>
        Thank you — we&apos;ll write soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex items-end gap-3 ${className}`}>
      <div className="flex-1">
        <label htmlFor="nl-email" className="sr-only">
          Email address
        </label>
        <input
          id="nl-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="w-full border-0 border-b-[0.5px] border-kb-parchment/30 bg-transparent pb-2 font-body text-[14px] font-light text-kb-parchment outline-none transition-colors placeholder:text-kb-parchment/40 focus:border-kb-terracotta"
        />
      </div>
      <button
        type="submit"
        disabled={state === "loading"}
        className="kb-label rounded-kb bg-kb-cacao px-5 py-2 text-[11px] text-kb-parchment transition-colors hover:bg-kb-terracotta disabled:opacity-50"
      >
        {state === "loading" ? "…" : "Join"}
      </button>
    </form>
  );
}
