"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import {
  CART_EVENT,
  readCart,
  removeFromCart,
  setQuantity,
  type CartItem,
} from "@/lib/cart";
import { useCurrency } from "@/components/currency-provider";
import { CurrencyToggle } from "@/components/currency-toggle";
import { ProductPrice } from "@/components/product-price";
import { KBButton } from "./kb-button";
import { HairlineRule } from "./hairline-rule";

export function CartView({ products }: { products: Product[] }) {
  const { formatAmount } = useCurrency();
  const [items, setItems] = useState<CartItem[] | null>(null);
  const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));

  useEffect(() => {
    const sync = () => setItems(readCart());
    sync();
    window.addEventListener(CART_EVENT, sync);
    return () => window.removeEventListener(CART_EVENT, sync);
  }, []);

  if (items === null) return null;

  const lines = items
    .map((i) => ({ item: i, product: bySlug[i.slug] }))
    .filter((l) => l.product);

  const subtotal = lines.reduce(
    (sum, l) => sum + l.product.price * l.item.quantity,
    0
  );

  if (lines.length === 0) {
    return (
      <div className="text-center">
        <p className="font-display text-[clamp(28px,4vw,40px)] font-light italic text-kb-cacao">
          Your ritual is empty.
        </p>
        <p className="mt-4 font-body text-[15px] font-light text-kb-dusk/70">
          Begin with a botanical, or let the quiz choose for you.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <KBButton href="/shop/all">Browse the collection</KBButton>
          <Link href="/skin-ritual/quiz" className="kb-gold-cta text-kb-cacao">
            Take the quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-kb-12 lg:grid-cols-[1fr_360px]">
      <div className="flex justify-end lg:col-span-2">
        <CurrencyToggle />
      </div>
      <ul className="divide-y-[0.5px] divide-kb-chalk border-y-[0.5px] border-kb-chalk">
        {lines.map(({ item, product }) => (
          <li key={product.slug} className="flex gap-6 py-6">
            <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-kb-chalk">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <Link
                href={`/shop/${product.category}/${product.slug}`}
                className="font-display text-[20px] font-normal text-kb-cacao hover:text-kb-terracotta"
              >
                {product.name}
              </Link>
              <p className="mt-1 font-body text-[13px] font-light text-kb-dusk/60">
                <ProductPrice amount={product.price} volume={product.volume} />
              </p>
              <div className="mt-auto flex items-center gap-4 pt-3">
                <div className="flex items-center gap-3 border-[0.5px] border-kb-chalk px-3 py-1">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity(product.slug, item.quantity - 1)}
                    className="text-kb-cacao"
                  >
                    −
                  </button>
                  <span className="font-body text-[14px] font-light tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity(product.slug, item.quantity + 1)}
                    className="text-kb-cacao"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.slug)}
                  className="kb-label text-[10px] text-kb-dusk/50 hover:text-kb-terracotta"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="font-body text-[15px] font-light text-kb-dusk">
              {formatAmount(product.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <aside className="lg:sticky lg:top-[100px] lg:self-start">
        <div className="bg-kb-linen p-8">
          <p className="kb-label text-[10px] text-kb-terracotta">Summary</p>
          <div className="mt-4 flex items-center justify-between font-body text-[15px] font-light text-kb-dusk">
            <span>Subtotal</span>
            <span>{formatAmount(subtotal)}</span>
          </div>
          <p className="mt-2 font-body text-[13px] font-light text-kb-dusk/60">
            Shipping calculated at checkout. Refill and return options shown up
            front.
          </p>
          <HairlineRule width="100%" variant="chalk" className="my-5" />
          <KBButton type="button" className="w-full">
            Checkout
          </KBButton>
          <p className="mt-3 font-body text-[11px] font-light text-kb-dusk/50">
            Checkout connects to Shopify once the Storefront API is configured.
          </p>
        </div>
      </aside>
    </div>
  );
}
