"use client";

// Minimal client-side cart persisted to localStorage. A drop-in until the
// Shopify Storefront cart is wired (see lib/integrations/shopify.ts).

import { cartLineKey } from "@/lib/product-variants";

export type CartItem = {
  slug: string;
  quantity: number;
  variantId?: string;
};

const KEY = "kb-cart";
const EVENT = "kb-cart-change";

function normalizeItem(raw: CartItem): CartItem {
  return {
    slug: raw.slug,
    quantity: raw.quantity,
    variantId: raw.variantId || undefined,
  };
}

function itemKey(item: CartItem): string {
  return cartLineKey(item.slug, item.variantId);
}

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]") as CartItem[];
    return Array.isArray(parsed) ? parsed.map(normalizeItem) : [];
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function addToCart(slug: string, quantity = 1, variantId?: string) {
  const items = readCart();
  const key = cartLineKey(slug, variantId);
  const existing = items.find((item) => itemKey(item) === key);
  if (existing) existing.quantity += quantity;
  else items.push({ slug, quantity, variantId: variantId || undefined });
  write(items);
}

export function setQuantity(slug: string, quantity: number, variantId?: string) {
  const key = cartLineKey(slug, variantId);
  let items = readCart();
  if (quantity <= 0) {
    items = items.filter((item) => itemKey(item) !== key);
  } else {
    const line = items.find((item) => itemKey(item) === key);
    if (line) line.quantity = quantity;
  }
  write(items);
}

export function removeFromCart(slug: string, variantId?: string) {
  const key = cartLineKey(slug, variantId);
  write(readCart().filter((item) => itemKey(item) !== key));
}

export const CART_EVENT = EVENT;
