"use client";

import { useMemo, useState } from "react";
import { addToCart } from "@/lib/cart";
import {
  getProductVariant,
  getProductVariants,
  hasProductVariants,
} from "@/lib/product-variants";
import type { Product } from "@/lib/types";
import { KBButton } from "./kb-button";
import { CurrencyToggle } from "./currency-toggle";
import { ProductPrice } from "./product-price";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const variants = useMemo(() => getProductVariants(product), [product]);
  const [variantId, setVariantId] = useState(variants[0]?.id ?? "default");
  const [added, setAdded] = useState(false);

  const selected = getProductVariant(product, variantId);
  const showSizeSelect = hasProductVariants(product);
  const inStock = selected.inStock ?? product.inStock;

  return (
    <div>
      <p className="mt-5 font-body text-[18px] font-light text-kb-dusk">
        <ProductPrice amount={selected.price} />
        {showSizeSelect && (
          <span className="ml-2 font-body text-[13px] font-light text-kb-dusk/55">
            · {selected.volume}
          </span>
        )}
      </p>
      {!showSizeSelect && (
        <p className="font-body text-[13px] font-light text-kb-dusk/60">
          {selected.volume}
        </p>
      )}
      <CurrencyToggle className="mt-3" />

      {showSizeSelect && (
        <fieldset className="mt-6">
          <legend className="kb-label text-[10px] text-kb-terracotta">
            Select size
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {variants.map((variant) => {
              const active = variant.id === selected.id;
              const variantInStock = variant.inStock ?? product.inStock;

              return (
                <button
                  key={variant.id}
                  type="button"
                  disabled={!variantInStock}
                  aria-pressed={active}
                  onClick={() => setVariantId(variant.id)}
                  className={`rounded-kb border-[0.5px] px-3 py-2 text-left transition-colors ${
                    active
                      ? "border-kb-terracotta bg-kb-linen text-kb-cacao"
                      : "border-kb-chalk bg-kb-parchment text-kb-dusk hover:border-kb-gold"
                  } ${!variantInStock ? "cursor-not-allowed opacity-45" : ""}`}
                >
                  <span className="block font-body text-[13px] font-light leading-snug">
                    {variant.label}
                  </span>
                  <span className="mt-0.5 block font-body text-[11px] font-light text-kb-dusk/60">
                    <ProductPrice amount={variant.price} />
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="mt-6">
        {!inStock ? (
          <KBButton type="button" disabled className="w-full">
            Join the waitlist
          </KBButton>
        ) : (
          <KBButton
            type="button"
            className="w-full"
            onClick={() => {
              addToCart(
                product.slug,
                1,
                selected.id === "default" ? undefined : selected.id
              );
              setAdded(true);
              setTimeout(() => setAdded(false), 2000);
            }}
          >
            {added ? "Added to your ritual ✓" : "Add to cart"}
          </KBButton>
        )}
      </div>
    </div>
  );
}
