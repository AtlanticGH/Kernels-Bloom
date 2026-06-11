"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { CategorySlug, Product } from "@/lib/types";
import type { CatalogListContent } from "@/lib/cms/types";
import { categories } from "@/lib/data/categories";
import { ingredients } from "@/lib/data/ingredients";
import { ImageField } from "@/components/admin/image-field";

type ProductsCatalogEditorProps = {
  data: CatalogListContent<Product>;
  onChange: (data: CatalogListContent<Product>) => void;
};

type ProductPanel = "details" | "copy" | "media" | "links";

const CATEGORY_OPTIONS = categories.map((c) => ({
  value: c.slug,
  label: c.name,
}));

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function isImagePath(path: string): boolean {
  return /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(path);
}

function galleryForProduct(product: Product): string[] {
  const gallery = product.images?.filter(Boolean) ?? [];
  if (gallery.length > 0) return gallery;
  return product.image ? [product.image] : [];
}

function syncProductImages(product: Product, images: string[]): Product {
  const cleaned = images.map((src) => src.trim()).filter(Boolean);
  return {
    ...product,
    images: cleaned,
    image: cleaned[0] ?? product.image,
  };
}

function emptyProduct(): Product {
  return {
    slug: "",
    name: "New product",
    category: "skin-facial",
    keyIngredient: ingredients[0]?.slug ?? "shea",
    ingredients: [ingredients[0]?.slug ?? "shea"],
    tagline: "",
    description: [],
    usage: "",
    sustainability: "",
    inci: "",
    price: 0,
    volume: "",
    image: "/images/DSC09530.jpg",
    images: ["/images/DSC09530.jpg"],
    featured: false,
    inStock: true,
    skinTypes: [],
    related: [],
  };
}

function TextField({
  label,
  value,
  onChange,
  multiline = false,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  type?: "text" | "number";
  hint?: string;
}) {
  return (
    <label className="block min-w-0">
      <span className="kb-label text-[10px] text-kb-terracotta">{label}</span>
      {hint && (
        <p className="mt-1 font-body text-[12px] font-light text-kb-dusk/50">
          {hint}
        </p>
      )}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          className="mt-2 w-full resize-y rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-2 font-body text-[14px] font-light leading-relaxed text-kb-dusk outline-none focus:border-kb-gold"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-2 font-body text-[14px] font-light text-kb-dusk outline-none focus:border-kb-gold"
        />
      )}
    </label>
  );
}

function PanelTabs({
  panel,
  onChange,
}: {
  panel: ProductPanel;
  onChange: (panel: ProductPanel) => void;
}) {
  const tabs: { id: ProductPanel; label: string }[] = [
    { id: "details", label: "Details" },
    { id: "copy", label: "Copy" },
    { id: "media", label: "Images" },
    { id: "links", label: "Ingredients & related" },
  ];

  return (
    <div className="flex flex-wrap gap-1 border-b-[0.5px] border-kb-chalk">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`rounded-t-kb px-4 py-2 font-body text-[12px] font-light transition-colors ${
            panel === tab.id
              ? "bg-kb-linen text-kb-cacao"
              : "text-kb-dusk/60 hover:bg-kb-chalk/50 hover:text-kb-cacao"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function ProductGalleryEditor({
  product,
  onChange,
}: {
  product: Product;
  onChange: (product: Product) => void;
}) {
  const images = galleryForProduct(product);

  function setImages(next: string[]) {
    onChange(syncProductImages(product, next));
  }

  function updateImage(index: number, url: string) {
    const next = [...images];
    next[index] = url;
    setImages(next);
  }

  function removeImage(index: number) {
    if (images.length <= 1) return;
    setImages(images.filter((_, i) => i !== index));
  }

  function moveImage(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    const next = [...images];
    [next[index], next[target]] = [next[target], next[index]];
    setImages(next);
  }

  function addImage() {
    setImages([...images, ""]);
  }

  return (
    <div className="space-y-4">
      <p className="font-body text-[12px] font-light leading-relaxed text-kb-dusk/50">
        Image 1 is the shop tile and main product photo. Add more for the detail
        page gallery.
      </p>

      <div className="space-y-3">
        {images.map((src, index) => (
          <div
            key={`${product.slug}-gallery-${index}`}
            className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-parchment/50 p-3"
          >
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="kb-label text-[10px] text-kb-gold">
                Image {index + 1}
                {index === 0 ? " · shop tile" : ""}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveImage(index, -1)}
                  disabled={index === 0}
                  aria-label="Move image up"
                  className="rounded-kb px-2 py-1 font-body text-[12px] font-light text-kb-dusk/60 hover:bg-kb-linen disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(index, 1)}
                  disabled={index === images.length - 1}
                  aria-label="Move image down"
                  className="rounded-kb px-2 py-1 font-body text-[12px] font-light text-kb-dusk/60 hover:bg-kb-linen disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  disabled={images.length <= 1}
                  className="rounded-kb px-2 py-1 font-body text-[12px] font-light text-kb-terracotta hover:bg-kb-linen disabled:opacity-30"
                >
                  Remove
                </button>
              </div>
            </div>
            <ImageField
              label=""
              value={src}
              onChange={(url) => updateImage(index, url)}
              compact
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addImage}
        className="rounded-kb border-[0.5px] border-dashed border-kb-chalk px-4 py-2 font-body text-[13px] font-light text-kb-dusk/70 hover:border-kb-gold hover:text-kb-cacao"
      >
        + Add gallery image
      </button>
    </div>
  );
}

function ProductEditor({
  product,
  panel,
  onPanelChange,
  allSlugs,
  onChange,
  onRemove,
}: {
  product: Product;
  panel: ProductPanel;
  onPanelChange: (panel: ProductPanel) => void;
  allSlugs: string[];
  onChange: (product: Product) => void;
  onRemove: () => void;
}) {
  const preview = product.image && isImagePath(product.image);

  return (
    <div className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen/30">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b-[0.5px] border-kb-chalk px-5 py-4">
        <div className="flex min-w-0 items-start gap-4">
          {preview && (
            <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen">
              <Image
                src={product.image}
                alt=""
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          )}
          <div className="min-w-0">
            <p className="kb-label text-[10px] text-kb-gold">
              {CATEGORY_OPTIONS.find((c) => c.value === product.category)?.label ??
                product.category}
            </p>
            <h3 className="mt-1 font-display text-[22px] text-kb-cacao">
              {product.name || "Untitled product"}
            </h3>
            <p className="mt-0.5 font-body text-[12px] font-light text-kb-dusk/60">
              /shop/{product.category}/{product.slug || "…"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 font-body text-[12px] font-light text-kb-terracotta hover:text-kb-cacao"
        >
          Remove product
        </button>
      </div>

      <div className="px-5 pt-4">
        <PanelTabs panel={panel} onChange={onPanelChange} />
      </div>

      <div className="space-y-5 p-5">
        {panel === "details" && (
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Product name"
              value={product.name}
              onChange={(name) => {
                const next = { ...product, name };
                if (!product.slug || product.slug.startsWith("new-product-")) {
                  next.slug = slugify(name);
                }
                onChange(next);
              }}
            />
            <TextField
              label="URL slug"
              value={product.slug}
              onChange={(slug) => onChange({ ...product, slug: slugify(slug) })}
              hint="Used in /shop/category/slug"
            />
            <label className="block min-w-0">
              <span className="kb-label text-[10px] text-kb-terracotta">
                Shop category
              </span>
              <select
                value={product.category}
                onChange={(e) =>
                  onChange({
                    ...product,
                    category: e.target.value as CategorySlug,
                  })
                }
                className="mt-2 w-full rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-2 font-body text-[14px] font-light text-kb-dusk outline-none focus:border-kb-gold"
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <TextField
              label="Volume"
              value={product.volume}
              onChange={(volume) => onChange({ ...product, volume })}
            />
            <TextField
              label="Price (USD)"
              type="number"
              value={String(product.price)}
              onChange={(value) =>
                onChange({ ...product, price: Math.max(0, Number(value) || 0) })
              }
            />
            <TextField
              label="Skin types"
              value={product.skinTypes.join(", ")}
              onChange={(value) =>
                onChange({
                  ...product,
                  skinTypes: value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              hint="Comma-separated, e.g. Dry, Normal, Combination"
            />
            <div className="flex flex-wrap gap-6 sm:col-span-2">
              <label className="flex items-center gap-2 font-body text-[14px] font-light text-kb-dusk">
                <input
                  type="checkbox"
                  checked={product.featured}
                  onChange={(e) =>
                    onChange({ ...product, featured: e.target.checked })
                  }
                  className="rounded border-kb-chalk"
                />
                Featured on homepage
              </label>
              <label className="flex items-center gap-2 font-body text-[14px] font-light text-kb-dusk">
                <input
                  type="checkbox"
                  checked={product.inStock}
                  onChange={(e) =>
                    onChange({ ...product, inStock: e.target.checked })
                  }
                  className="rounded border-kb-chalk"
                />
                In stock
              </label>
            </div>
          </div>
        )}

        {panel === "copy" && (
          <div className="grid gap-5">
            <TextField
              label="Tagline"
              value={product.tagline}
              onChange={(tagline) => onChange({ ...product, tagline })}
            />
            <TextField
              label="Description paragraphs"
              value={product.description.join("\n\n")}
              onChange={(value) =>
                onChange({
                  ...product,
                  description: value
                    .split(/\n{2,}/)
                    .map((p) => p.trim())
                    .filter(Boolean),
                })
              }
              multiline
              hint="Separate paragraphs with a blank line"
            />
            <TextField
              label="How to use"
              value={product.usage}
              onChange={(usage) => onChange({ ...product, usage })}
              multiline
            />
            <TextField
              label="Full ingredients (INCI)"
              value={product.inci}
              onChange={(inci) => onChange({ ...product, inci })}
              multiline
            />
            <TextField
              label="Sustainability"
              value={product.sustainability}
              onChange={(sustainability) =>
                onChange({ ...product, sustainability })
              }
              multiline
            />
          </div>
        )}

        {panel === "media" && (
          <ProductGalleryEditor product={product} onChange={onChange} />
        )}

        {panel === "links" && (
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block min-w-0">
              <span className="kb-label text-[10px] text-kb-terracotta">
                Key ingredient
              </span>
              <select
                value={product.keyIngredient}
                onChange={(e) =>
                  onChange({ ...product, keyIngredient: e.target.value })
                }
                className="mt-2 w-full rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-2 font-body text-[14px] font-light text-kb-dusk outline-none focus:border-kb-gold"
              >
                {ingredients.map((ingredient) => (
                  <option key={ingredient.slug} value={ingredient.slug}>
                    {ingredient.commonName}
                  </option>
                ))}
              </select>
            </label>
            <div className="sm:col-span-2" />
            <TextField
              label="All ingredient slugs"
              value={product.ingredients.join("\n")}
              onChange={(value) =>
                onChange({
                  ...product,
                  ingredients: value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean),
                })
              }
              multiline
              hint="One botanical slug per line"
            />
            <TextField
              label="Related product slugs"
              value={product.related.join("\n")}
              onChange={(value) =>
                onChange({
                  ...product,
                  related: value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean)
                    .filter((slug) => slug !== product.slug),
                })
              }
              multiline
              hint="One product slug per line"
            />
            {allSlugs.length > 0 && (
              <p className="sm:col-span-2 font-body text-[12px] font-light text-kb-dusk/45">
                Available slugs: {allSlugs.filter((s) => s !== product.slug).join(", ")}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function truncateName(name: string, max = 22): string {
  if (name.length <= max) return name;
  return `${name.slice(0, max - 1)}…`;
}

export function ProductsCatalogEditor({
  data,
  onChange,
}: ProductsCatalogEditorProps) {
  const sorted = useMemo(
    () =>
      [...data.items].sort(
        (a, b) =>
          a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
      ),
    [data.items]
  );

  const [activeSlug, setActiveSlug] = useState<string | null>(
    sorted[0]?.slug ?? null
  );
  const [panel, setPanel] = useState<ProductPanel>("details");

  useEffect(() => {
    if (sorted.length === 0) {
      setActiveSlug(null);
      return;
    }
    if (!activeSlug || !sorted.some((product) => product.slug === activeSlug)) {
      setActiveSlug(sorted[0].slug);
    }
  }, [sorted, activeSlug]);

  const activeProduct =
    sorted.find((product) => product.slug === activeSlug) ?? null;
  const allSlugs = sorted.map((p) => p.slug).filter(Boolean);

  function replaceProduct(originalSlug: string, product: Product) {
    const items = data.items.map((item) =>
      item.slug === originalSlug ? product : item
    );
    onChange({ items });
    if (product.slug !== originalSlug) {
      setActiveSlug(product.slug);
    }
  }

  function removeProduct(slug: string) {
    const nextItems = data.items.filter((item) => item.slug !== slug);
    onChange({ items: nextItems });
    if (activeSlug === slug) {
      const nextSorted = [...nextItems].sort(
        (a, b) =>
          a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
      );
      setActiveSlug(nextSorted[0]?.slug ?? null);
    }
  }

  function addProduct() {
    const product = emptyProduct();
    product.slug = `new-product-${Date.now()}`;
    onChange({ items: [product, ...data.items] });
    setActiveSlug(product.slug);
    setPanel("details");
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <p className="max-w-2xl font-body text-[13px] font-light leading-relaxed text-kb-dusk/60">
          Add products or select a tab to edit copy, pricing, images, and shop
          placement. Save changes to publish to the live shop.
        </p>
        <button
          type="button"
          onClick={addProduct}
          className="shrink-0 rounded-kb border-[0.5px] border-kb-cacao px-4 py-2 font-body text-[13px] font-light text-kb-cacao transition-colors hover:bg-kb-cacao hover:text-kb-parchment"
        >
          + Add product
        </button>
      </div>

      {sorted.length === 0 ? (
        <p className="rounded-kb border-[0.5px] border-dashed border-kb-chalk px-4 py-8 text-center font-body text-[14px] font-light text-kb-dusk/60">
          No products yet. Add one to get started.
        </p>
      ) : (
        <>
          <div
            className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1"
            role="tablist"
            aria-label="Products"
          >
            {sorted.map((product) => {
              const active = product.slug === activeSlug;
              return (
                <button
                  key={product.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveSlug(product.slug)}
                  className={`shrink-0 rounded-kb border-[0.5px] px-3 py-2 font-body text-[12px] font-light transition-colors ${
                    active
                      ? "border-kb-cacao bg-kb-cacao text-kb-parchment"
                      : "border-kb-chalk bg-kb-parchment text-kb-dusk/70 hover:border-kb-gold hover:text-kb-cacao"
                  }`}
                >
                  {truncateName(product.name || product.slug)}
                </button>
              );
            })}
          </div>

          {activeProduct && (
            <ProductEditor
              product={activeProduct}
              panel={panel}
              onPanelChange={setPanel}
              allSlugs={allSlugs}
              onChange={(next) => replaceProduct(activeProduct.slug, next)}
              onRemove={() => removeProduct(activeProduct.slug)}
            />
          )}
        </>
      )}
    </div>
  );
}
