"use client";

import { useMemo, useState } from "react";
import { useCurrency } from "@/components/currency-provider";
import { CurrencyToggle } from "@/components/currency-toggle";
import { formatPriceBand } from "@/lib/currency";
import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

type SortKey = "featured" | "price-asc" | "price-desc";

const PRICE_BANDS = [
  { key: "under-40", min: 0, max: 40 },
  { key: "40-70", min: 40, max: 70 },
  { key: "70-plus", min: 70, max: Infinity },
] as const;

function priceBandLabel(
  band: (typeof PRICE_BANDS)[number],
  currency: "USD" | "GHS"
): string {
  if (band.max === Infinity) {
    return `${formatPriceBand(band.min, currency)}+`;
  }
  if (band.min === 0) {
    return `Under ${formatPriceBand(band.max, currency)}`;
  }
  return `${formatPriceBand(band.min, currency)}–${formatPriceBand(band.max, currency)}`;
}

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
  const { currency } = useCurrency();

  const priceBands = useMemo(
    () =>
      PRICE_BANDS.map((band) => ({
        ...band,
        label: priceBandLabel(band, currency),
      })),
    [currency]
  );

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
        const b = PRICE_BANDS.find((x) => x.key === band)!;
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
    band && {
      label: priceBands.find((b) => b.key === band)?.label ?? band,
      clear: () => setBand(null),
    },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <div className="grid grid-cols-1 gap-kb-8 lg:grid-cols-[220px_1fr]">
      {/* filters */}
      <aside className="lg:sticky lg:top-[100px] lg:self-start">
        <div className="grid grid-cols-1 gap-3 lg:hidden">
          <FilterSelect
            label="Skin type"
            value={skinType ?? ""}
            onChange={setSkinType}
            options={skinTypes.map((opt) => ({ value: opt, label: opt }))}
          />
          <FilterSelect
            label="Key ingredient"
            value={ingredient ?? ""}
            onChange={setIngredient}
            options={ingredients.map((opt) => ({
              value: opt,
              label: ingredientNames[opt] ?? opt,
            }))}
          />
          <FilterSelect
            label="Price"
            value={band ?? ""}
            onChange={setBand}
            options={priceBands.map((b) => ({ value: b.key, label: b.label }))}
          />
        </div>

        <div className="hidden lg:block">
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
            options={priceBands.map((b) => b.key)}
            labels={Object.fromEntries(priceBands.map((b) => [b.key, b.label]))}
            selected={band}
            onSelect={(v) => setBand((c) => (c === v ? null : v))}
          />
        </div>
      </aside>

      {/* grid */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-[0.5px] border-kb-chalk pb-4">
          <p className="kb-label text-[10px] text-kb-dusk/50">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <CurrencyToggle />
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

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string | null) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block min-w-0">
      <span className="kb-label text-[10px] text-kb-cacao">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value || null)}
        className="mt-2 w-full rounded-kb border-[0.5px] border-kb-chalk bg-kb-parchment px-3 py-2.5 font-body text-[14px] font-light text-kb-dusk outline-none focus:border-kb-terracotta"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
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
