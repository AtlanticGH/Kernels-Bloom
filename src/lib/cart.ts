"use client";

// Minimal client-side cart persisted to localStorage. A drop-in until the
// Shopify Storefront cart is wired (see lib/integrations/shopify.ts).

export type CartItem = { slug: string; quantity: number };

const KEY = "kb-cart";
const EVENT = "kb-cart-change";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function addToCart(slug: string, quantity = 1) {
  const items = readCart();
  const existing = items.find((i) => i.slug === slug);
  if (existing) existing.quantity += quantity;
  else items.push({ slug, quantity });
  write(items);
}

export function setQuantity(slug: string, quantity: number) {
  let items = readCart();
  if (quantity <= 0) items = items.filter((i) => i.slug !== slug);
  else {
    const it = items.find((i) => i.slug === slug);
    if (it) it.quantity = quantity;
  }
  write(items);
}

export function removeFromCart(slug: string) {
  write(readCart().filter((i) => i.slug !== slug));
}

export const CART_EVENT = EVENT;
