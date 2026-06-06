export type Currency = "USD" | "GHS";

/** Stored product prices are USD; GHS is derived at display time. */
export const USD_TO_GHS = 15.5;

export function convertFromUsd(usd: number, currency: Currency): number {
  return currency === "USD" ? usd : usd * USD_TO_GHS;
}

export function formatPrice(usd: number, currency: Currency): string {
  if (currency === "USD") {
    return `USD$${usd.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  }
  return `GH¢${Math.round(usd * USD_TO_GHS).toLocaleString("en-US")}`;
}

export function formatPriceBand(usd: number, currency: Currency): string {
  if (currency === "USD") {
    return `USD$${usd}`;
  }
  return `GH¢${Math.round(usd * USD_TO_GHS).toLocaleString("en-US")}`;
}
