"use client";

import { useCurrency } from "@/components/currency-provider";
import type { Currency } from "@/lib/currency";

const OPTIONS: { value: Currency; sign: string; label: string }[] = [
  { value: "GHS", sign: "¢", label: "GH¢" },
  { value: "USD", sign: "$", label: "USD$" },
];

export function CurrencyToggle({
  className = "",
  compact = false,
}: {
  className?: string;
  /** Header use — currency signs only (¢ / $). */
  compact?: boolean;
}) {
  const { currency, setCurrency, ready } = useCurrency();

  if (!ready) {
    return (
      <div
        className={`inline-flex items-center rounded-kb border-[0.5px] border-kb-chalk p-0.5 opacity-0 ${className}`}
        aria-hidden="true"
      >
        <span className="px-3 py-1 kb-label text-[10px]">¢</span>
      </div>
    );
  }

  return (
    <div
      className={`kb-header-surface inline-flex items-center rounded-kb border-[0.5px] border-kb-chalk p-0.5 ${className}`}
      role="group"
      aria-label="Currency"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={currency === option.value}
          onClick={() => setCurrency(option.value)}
          className={`kb-label transition-colors ${
            compact ? "px-2 py-0.5 text-[9px]" : "px-3 py-1 text-[10px]"
          } ${
            currency === option.value
              ? "bg-kb-dusk text-kb-parchment"
              : "text-kb-dusk/70 hover:text-kb-cacao"
          }`}
        >
          {compact ? option.sign : option.label}
        </button>
      ))}
    </div>
  );
}
