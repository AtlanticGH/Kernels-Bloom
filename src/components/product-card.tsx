"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductPrice } from "@/components/product-price";
import type { Product } from "@/lib/types";
import { ingredients } from "@/lib/data/ingredients";
import { categories } from "@/lib/data/categories";

/** Borderless product card — Parchment, 3:4 image (or square), image-only scale on hover. */
export function ProductCard({
  product,
  square = false,
  bare = false,
}: {
  product: Product;
  square?: boolean;
  /** Omit parchment card background so text sits on the section surface. */
  bare?: boolean;
}) {
  const ingredient = ingredients.find((i) => i.slug === product.keyIngredient);
  const category = categories.find((c) => c.slug === product.category);

  return (
    <Link
      href={`/shop/${product.category}/${product.slug}`}
      className={`group block ${bare ? "" : "bg-kb-parchment"}`}
    >
      <div
        className={`relative overflow-hidden bg-kb-chalk ${
          square ? "aspect-square" : "aspect-[3/4]"
        }`}
      >
        <Image
          src={product.image}
          alt={`${product.name} — ${product.volume}, ${ingredient?.commonName ?? "botanical"} on a warm stone surface`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
        />
        {!product.inStock && (
          <span className="absolute left-4 top-4 kb-label bg-kb-dusk/80 px-3 py-1 text-kb-parchment">
            Waitlist
          </span>
        )}
      </div>
      <p className="mt-4 kb-label text-[10px] text-kb-terracotta">
        {category?.name ?? "Botanical"}
      </p>
      <h3 className="mt-1 font-display text-[20px] font-normal text-kb-cacao">
        {product.name}
      </h3>
      {ingredient && (
        <p className="mt-0.5 kb-accent text-[13px] text-kb-terracotta/70">
          {ingredient.commonName}
        </p>
      )}
      <p className="mt-2 font-body text-[13px] font-light text-kb-dusk/60">
        <ProductPrice amount={product.price} volume={product.volume} />
      </p>
    </Link>
  );
}
