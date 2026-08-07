"use client";

import { useState } from "react";
import { KBInput, KBSelect, KBTextarea } from "./kb-input";
import { KBButton } from "./kb-button";

export function TradeForm({ tone = "parchment" }: { tone?: "dusk" | "parchment" }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/trade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: data["business-name"],
          contactName: data["contact-name"],
          email: data.email,
          phone: data.phone,
          businessType: data["business-type"],
          country: data.country,
          volume: data.volume,
          message: data.message,
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p
        className={`kb-accent text-[20px] ${
          tone === "dusk" ? "text-kb-cacao" : "text-kb-parchment"
        }`}
      >
        Thank you — our trade team will be in touch within two working days.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-kb-6 sm:grid-cols-2">
      <KBInput label="Business name" name="business-name" required tone={tone} />
      <KBInput label="Contact name" name="contact-name" required tone={tone} />
      <KBInput label="Email" name="email" type="email" required tone={tone} />
      <KBInput label="Phone" name="phone" type="tel" tone={tone} />
      <KBSelect
        label="Business type"
        name="business-type"
        tone={tone}
        options={["Boutique hotel", "Wellness spa", "Natural beauty retailer", "Other"]}
      />
      <KBInput label="Country" name="country" tone={tone} />
      <div className="sm:col-span-2">
        <KBSelect
          label="Estimated monthly volume"
          name="volume"
          tone={tone}
          options={["Under £1,000", "£1,000–£5,000", "£5,000–£15,000", "£15,000+"]}
        />
      </div>
      <div className="sm:col-span-2">
        <KBTextarea label="Message" name="message" tone={tone} />
      </div>
      <div className="sm:col-span-2">
        <KBButton
          type="submit"
          variant={tone === "dusk" ? "primary" : "on-dark"}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Submit application"}
        </KBButton>
        {status === "error" && (
          <p
            className={`mt-3 font-body text-[13px] font-light ${
              tone === "dusk" ? "text-kb-dusk/70" : "text-kb-kola"
            }`}
          >
            Something went wrong — please try again.
          </p>
        )}
      </div>
    </form>
  );
}
