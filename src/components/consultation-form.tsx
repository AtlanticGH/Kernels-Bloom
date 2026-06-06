"use client";

import { useState } from "react";
import { KBInput, KBSelect, KBTextarea } from "./kb-input";
import { KBButton } from "./kb-button";

export function ConsultationForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="kb-accent text-[20px] text-kb-cacao">
        Thank you — we&apos;ll be in touch to confirm a time.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-kb-6 sm:grid-cols-2">
      <KBInput label="Your name" name="name" required />
      <KBInput label="Email" name="email" type="email" required />
      <KBSelect
        label="Focus"
        name="focus"
        options={["Skin", "Hair", "Both", "Gifting advice"]}
      />
      <KBSelect
        label="Preferred format"
        name="format"
        options={["Video call", "Phone", "In person (Accra)"]}
      />
      <div className="sm:col-span-2">
        <KBTextarea label="Tell us about your skin or hair" name="notes" />
      </div>
      <div className="sm:col-span-2">
        <KBButton type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Request a consultation"}
        </KBButton>
        {status === "error" && (
          <p className="mt-3 font-body text-[13px] font-light text-kb-terracotta">
            Something went wrong — please try again.
          </p>
        )}
      </div>
    </form>
  );
}
