// Shopify Storefront API adapter (headless cart/checkout).
//
// The catalogue itself is served from the local data layer today; when the
// store domain + storefront token are present, createCheckout() returns a
// real Shopify checkout URL. Until then it returns null and the cart page
// shows its placeholder checkout state.

export type CartLine = { slug: string; quantity: number };

export function isShopifyConfigured(): boolean {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN &&
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  );
}

export async function createCheckout(
  lines: CartLine[]
): Promise<{ checkoutUrl: string | null; live: boolean }> {
  if (!isShopifyConfigured()) {
    console.info("[shopify] stub: would create checkout for", lines);
    return { checkoutUrl: null, live: false };
  }

  // Wire the Storefront API `cartCreate` mutation here once product variant
  // GIDs are mapped from the Sanity/Shopify sync. Returning null keeps the
  // build safe until that mapping exists.
  return { checkoutUrl: null, live: true };
}
