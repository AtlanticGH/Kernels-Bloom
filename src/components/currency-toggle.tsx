"use client";

import { useCurrency } from "@/components/currency-provider";
import type { Currency } from "@/lib/currency";

const OPTIONS: { value: Currency; label: string }[] = [
  { value: "GHS", label: "Cedis" },
  { value: "USD", label: "$" },
];

export function CurrencyToggle({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { currency, setCurrency } = useCurrency();

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
          {option.label}
        </button>
      ))}
    </div>
  );
}
