"use client";

import Image from "next/image";
import type { PartnerBrand } from "@/lib/types";
import type { PartnerBrandsContent } from "@/lib/cms/types";
import { ImageField } from "@/components/admin/image-field";

type PartnerBrandsCatalogEditorProps = {
  data: PartnerBrandsContent;
  onChange: (data: PartnerBrandsContent) => void;
};

function isImagePath(path: string): boolean {
  return /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(path);
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || `brand-${Date.now()}`
  );
}

function LogoPreview({ brand }: { brand: PartnerBrand }) {
  const src = brand.logo ?? "";

  return (
    <div className="relative flex h-16 w-full max-w-[160px] items-center justify-center overflow-hidden rounded-kb border-[0.5px] border-kb-chalk bg-kb-parchment px-3">
      {src && isImagePath(src) ? (
        <Image
          src={src}
          alt={brand.name || "Brand logo"}
          width={140}
          height={32}
          className="max-h-8 w-auto object-contain opacity-80"
          unoptimized={src.startsWith("http")}
        />
      ) : (
        <span className="font-body text-[12px] font-light text-kb-dusk/40">
          No logo
        </span>
      )}
    </div>
  );
}

function PartnerBrandCard({
  brand,
  onChange,
  onRemove,
}: {
  brand: PartnerBrand;
  onChange: (brand: PartnerBrand) => void;
  onRemove: () => void;
}) {
  return (
    <article className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen/40 p-4">
      <div className="grid gap-4 sm:grid-cols-[160px_minmax(0,1fr)]">
        <LogoPreview brand={brand} />
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <p className="kb-label text-[10px] text-kb-gold">Partner logo</p>
            <button
              type="button"
              onClick={onRemove}
              className="rounded-kb px-2 py-1 font-body text-[12px] font-light text-kb-terracotta hover:bg-kb-linen"
            >
              Remove
            </button>
          </div>
          <label className="block">
            <span className="kb-label text-[10px] text-kb-terracotta">
              Brand name
            </span>
            <input
              value={brand.name}
              onChange={(e) => onChange({ ...brand, name: e.target.value })}
              className="mt-2 w-full rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-2 font-body text-[14px] font-light text-kb-dusk outline-none focus:border-kb-gold"
            />
          </label>
          <ImageField
            label="Logo image (PNG recommended)"
            value={brand.logo}
            onChange={(logo) => onChange({ ...brand, logo })}
          />
        </div>
      </div>
    </article>
  );
}

export function PartnerBrandsCatalogEditor({
  data,
  onChange,
}: PartnerBrandsCatalogEditorProps) {
  function updateBrand(index: number, brand: PartnerBrand) {
    const items = [...data.items];
    items[index] = brand;
    onChange({ ...data, items });
  }

  function addBrand() {
    onChange({
      ...data,
      items: [
        ...data.items,
        { id: `brand-${Date.now()}`, name: "", logo: "" },
      ],
    });
  }

  function removeBrand(index: number) {
    onChange({
      ...data,
      items: data.items.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="space-y-6">
      <p className="font-body text-[13px] font-light leading-relaxed text-kb-dusk/60">
        Manage the scrolling partner logos on the homepage. Upload PNG logos
        with transparent backgrounds for best results.
      </p>

      <label className="block max-w-md">
        <span className="kb-label text-[10px] text-kb-terracotta">
          Section label
        </span>
        <input
          value={data.sectionLabel}
          onChange={(e) => onChange({ ...data, sectionLabel: e.target.value })}
          className="mt-2 w-full rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-2 font-body text-[14px] font-light text-kb-dusk outline-none focus:border-kb-gold"
        />
      </label>

      <div className="grid gap-4">
        {data.items.map((brand, index) => (
          <PartnerBrandCard
            key={brand.id}
            brand={brand}
            onChange={(next) => {
              const name = next.name.trim();
              const id =
                brand.id.startsWith("brand-") && name
                  ? slugify(name)
                  : next.id;
              updateBrand(index, { ...next, id });
            }}
            onRemove={() => removeBrand(index)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addBrand}
        className="rounded-kb border-[0.5px] border-dashed border-kb-chalk px-4 py-2 font-body text-[13px] font-light text-kb-dusk/70 hover:border-kb-gold hover:text-kb-cacao"
      >
        + Add brand
      </button>
    </div>
  );
}
