import { NextResponse } from "next/server";
import { DEFAULT_USD_TO_GHS } from "@/lib/currency";

export const revalidate = 86_400;

export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 86_400 },
    });
    if (!res.ok) throw new Error("Rate fetch failed");

    const data = (await res.json()) as {
      result?: string;
      rates?: { GHS?: number };
      time_last_update_utc?: string;
    };

    const rate = data.rates?.GHS;
    if (data.result !== "success" || typeof rate !== "number" || !Number.isFinite(rate)) {
      throw new Error("Invalid rate payload");
    }

    return NextResponse.json({
      usdToGhs: rate,
      updatedAt: data.time_last_update_utc ?? null,
    });
  } catch {
    return NextResponse.json({
      usdToGhs: DEFAULT_USD_TO_GHS,
      fallback: true,
    });
  }
}
