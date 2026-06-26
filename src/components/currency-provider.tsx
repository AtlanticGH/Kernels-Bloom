"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_USD_TO_GHS,
  type Currency,
  formatPrice,
  formatPriceBand,
} from "@/lib/currency";

const STORAGE_KEY = "kb-currency";

type CurrencyContextValue = {
  currency: Currency;
  ready: boolean;
  usdToGhs: number;
  setCurrency: (currency: Currency) => void;
  formatAmount: (usd: number) => string;
  formatBand: (usd: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("GHS");
  const [usdToGhs, setUsdToGhs] = useState(DEFAULT_USD_TO_GHS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "USD" || stored === "GHS") {
        setCurrencyState(stored);
      }
    } catch {
      // Private mode or restricted storage — keep default GHS
    }
    setReady(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/exchange-rate")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { usdToGhs?: number }) => {
        if (!cancelled && typeof data.usdToGhs === "number" && Number.isFinite(data.usdToGhs)) {
          setUsdToGhs(data.usdToGhs);
        }
      })
      .catch(() => {
        // Keep DEFAULT_USD_TO_GHS fallback
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage write failures
    }
  }, []);

  const formatAmount = useCallback(
    (usd: number) => formatPrice(usd, currency, usdToGhs),
    [currency, usdToGhs]
  );

  const formatBand = useCallback(
    (usd: number) => formatPriceBand(usd, currency, usdToGhs),
    [currency, usdToGhs]
  );

  const value = useMemo(
    () => ({ currency, ready, usdToGhs, setCurrency, formatAmount, formatBand }),
    [currency, ready, usdToGhs, setCurrency, formatAmount, formatBand]
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return ctx;
}
