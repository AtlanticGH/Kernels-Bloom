"use client";

import { useCurrency } from "@/components/currency-provider";
import type { Currency } from "@/lib/currency";

const OPTIONS: { value: Currency; label: string }[] = [
  { value: "GHS", label: "GH¢" },
  { value: "USD", label: "USD$" },
];

export function CurrencyToggle({
  className = "",
  variant = "default",
  atBottom = false,
}: {
  className?: string;
  /** `nav` matches header link styling; `default` is the boxed toggle for shop/cart */
  variant?: "default" | "nav";
  atBottom?: boolean;
}) {
  const { currency, setCurrency } = useCurrency();

  const isNav = variant === "nav";

  return (
    <div
      className={`inline-flex items-center ${
        isNav
          ? "gap-0.5 rounded-kb border-[0.5px] border-kb-terracotta/40 bg-kb-terracotta/[0.08] p-0.5"
          : "kb-header-surface gap-0.5 rounded-kb border-[0.5px] border-kb-chalk p-0.5"
      } ${className}`}
      role="group"
      aria-label="Currency"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={currency === option.value}
          onClick={() => setCurrency(option.value)}
          className={
            isNav
              ? `kb-label rounded-kb px-2.5 py-1 text-[11px] transition-all duration-200 ${
                  atBottom ? "font-bold" : "font-medium"
                } ${
                  currency === option.value
                    ? "bg-kb-terracotta text-kb-parchment shadow-[0_1px_0_rgba(44,36,32,0.12)]"
                    : "text-kb-cacao hover:bg-kb-terracotta/10 hover:text-kb-terracotta"
                }`
              : `kb-label px-3 py-1 text-[10px] transition-colors ${
                  currency === option.value
                    ? "bg-kb-dusk text-kb-parchment"
                    : "text-kb-dusk/70 hover:text-kb-cacao"
                }`
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
