export type Currency = "USD" | "GHS";

/** Fallback when the live rate API is unavailable (Mar 2026 market ~11.25). */
export const DEFAULT_USD_TO_GHS = 11.25;

/** Stored product prices are USD; GHS is derived at display time. */
export function convertFromUsd(
  usd: number,
  currency: Currency,
  rate = DEFAULT_USD_TO_GHS
): number {
  return currency === "USD" ? usd : usd * rate;
}

export function formatPrice(
  usd: number,
  currency: Currency,
  rate = DEFAULT_USD_TO_GHS
): string {
  const amount = Number.isFinite(usd) ? usd : 0;
  if (currency === "USD") {
    return `USD$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  }
  return `GH¢${Math.round(convertFromUsd(amount, "GHS", rate)).toLocaleString("en-US")}`;
}

export function formatPriceBand(
  usd: number,
  currency: Currency,
  rate = DEFAULT_USD_TO_GHS
): string {
  if (currency === "USD") {
    return `USD$${usd}`;
  }
  return `GH¢${Math.round(convertFromUsd(usd, "GHS", rate)).toLocaleString("en-US")}`;
}
