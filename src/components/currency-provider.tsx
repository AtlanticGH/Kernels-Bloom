"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type Currency, formatPrice } from "@/lib/currency";

const STORAGE_KEY = "kb-currency";

type CurrencyContextValue = {
  currency: Currency;
  ready: boolean;
  setCurrency: (currency: Currency) => void;
  formatAmount: (usd: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("GHS");
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

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage write failures
    }
  }, []);

  const formatAmount = useCallback(
    (usd: number) => formatPrice(usd, currency),
    [currency]
  );

  const value = useMemo(
    () => ({ currency, ready, setCurrency, formatAmount }),
    [currency, ready, setCurrency, formatAmount]
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
