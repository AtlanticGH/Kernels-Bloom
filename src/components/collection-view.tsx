"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

type SortKey = "featured" | "price-asc" | "price-desc";

const PRICE_BANDS = [
  { label: "Under £40", min: 0, max: 40 },
  { label: "£40–£70", min: 40, max: 70 },
  { label: "£70+", min: 70, max: Infinity },
];

export function CollectionView({
  products,
  ingredientNames,
}: {
  products: Product[];
  ingredientNames: Record<string, string>;
}) {
  const [skinType, setSkinType] = useState<string | null>(null);
  const [ingredient, setIngredient] = useState<string | null>(null);
  const [band, setBand] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("featured");

  const skinTypes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.skinTypes))).sort(),
    [products]
  );
  const ingredients = useMemo(
    () => Array.from(new Set(products.map((p) => p.keyIngredient))),
    [products]
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (skinType && !p.skinTypes.includes(skinType)) return false;
      if (ingredient && p.keyIngredient !== ingredient) return false;
      if (band) {
        const b = PRICE_BANDS.find((x) => x.label === band)!;
        if (p.price < b.min || p.price >= b.max) return false;
      }
      return true;
    });
    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "featured")
      list.sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [products, skinType, ingredient, band, sort]);

  const activeChips = [
    skinType && { label: skinType, clear: () => setSkinType(null) },
    ingredient && {
      label: ingredientNames[ingredient] ?? ingredient,
      clear: () => setIngredient(null),
    },
    band && { label: band, clear: () => setBand(null) },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <div className="grid grid-cols-1 gap-kb-8 lg:grid-cols-[220px_1fr]">
      {/* filters */}
      <aside className="lg:sticky lg:top-[100px] lg:self-start">
        <FilterGroup
          title="Skin Type"
          options={skinTypes}
          selected={skinType}
          onSelect={(v) => setSkinType((c) => (c === v ? null : v))}
        />
        <FilterGroup
          title="Key Ingredient"
          options={ingredients}
          labels={ingredientNames}
          selected={ingredient}
          onSelect={(v) => setIngredient((c) => (c === v ? null : v))}
        />
        <FilterGroup
          title="Price"
          options={PRICE_BANDS.map((b) => b.label)}
          selected={band}
          onSelect={(v) => setBand((c) => (c === v ? null : v))}
        />
      </aside>

      {/* grid */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-[0.5px] border-kb-chalk pb-4">
          <p className="kb-label text-[10px] text-kb-dusk/50">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
          <label className="flex items-center gap-2 kb-label text-[10px] text-kb-dusk/60">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-kb border-[0.5px] border-kb-chalk bg-transparent px-3 py-1 font-body text-[12px] font-light outline-none focus:border-kb-terracotta"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
            </select>
          </label>
        </div>

        {activeChips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeChips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={chip.clear}
                className="flex items-center gap-2 rounded-kb bg-kb-terracotta/10 px-3 py-1 font-body text-[11px] font-light text-kb-terracotta"
              >
                {chip.label}
                <span aria-hidden="true">×</span>
                <span className="sr-only">Remove filter</span>
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="mt-kb-12 text-center font-display text-[24px] font-light italic text-kb-cacao">
            Nothing matches that combination — yet.
          </p>
        ) : (
          <div className="mt-kb-6 grid grid-cols-1 gap-x-6 gap-y-kb-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  options,
  selected,
  onSelect,
  labels,
}: {
  title: string;
  options: string[];
  selected: string | null;
  onSelect: (v: string) => void;
  labels?: Record<string, string>;
}) {
  return (
    <div className="mb-kb-6">
      <p className="kb-label text-[10px] text-kb-cacao">{title}</p>
      <ul className="mt-3 space-y-2">
        {options.map((opt) => (
          <li key={opt}>
            <button
              type="button"
              onClick={() => onSelect(opt)}
              className={`font-body text-[14px] font-light transition-colors ${
                selected === opt
                  ? "text-kb-terracotta"
                  : "text-kb-dusk/70 hover:text-kb-cacao"
              }`}
            >
              {labels?.[opt] ?? opt}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
