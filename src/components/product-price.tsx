"use client";

import { useCurrency } from "@/components/currency-provider";
import { formatPrice } from "@/lib/currency";

export function ProductPrice({
  amount,
  className = "",
  volume,
}: {
  amount: number;
  className?: string;
  volume?: string;
}) {
  const { formatAmount, ready, currency } = useCurrency();
  const display = ready ? formatAmount(amount) : formatPrice(amount, currency);

  return (
    <span className={className} suppressHydrationWarning>
      {display}
      {volume ? ` · ${volume}` : ""}
    </span>
  );
}
