"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import type { CatalogListContent } from "@/lib/cms/types";
import { ImageField } from "@/components/admin/image-field";

type ProductsCatalogEditorProps = {
  data: CatalogListContent<Product>;
  onChange: (data: CatalogListContent<Product>) => void;
};

function isImagePath(path: string): boolean {
  return /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(path);
}

function formatCategory(slug: string): string {
  return slug.replace(/-/g, " ");
}

function TilePreview({ product }: { product: Product }) {
  const src = product.image ?? "";

  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen">
      {src && isImagePath(src) ? (
        <Image
          src={src}
          alt={product.name}
          fill
          className="object-cover"
          sizes="160px"
        />
      ) : (
        <div className="flex h-full items-center justify-center px-3 text-center font-body text-[12px] font-light text-kb-dusk/40">
          No product image
        </div>
      )}
    </div>
  );
}

function ProductTileCard({
  product,
  onChange,
}: {
  product: Product;
  onChange: (product: Product) => void;
}) {
  return (
    <article className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen/40 p-4">
      <div className="grid gap-4 sm:grid-cols-[120px_minmax(0,1fr)]">
        <TilePreview product={product} />
        <div className="min-w-0 space-y-3">
          <div>
            <p className="kb-label text-[10px] text-kb-gold">
              {formatCategory(product.category)}
            </p>
            <h3 className="mt-1 font-display text-[20px] text-kb-cacao">
              {product.name}
            </h3>
            <p className="mt-0.5 font-body text-[12px] font-light text-kb-dusk/60">
              {product.volume} · ${product.price}
            </p>
          </div>
          <ImageField
            label="Product tile image"
            value={product.image}
            onChange={(image) => onChange({ ...product, image })}
          />
        </div>
      </div>
    </article>
  );
}

export function ProductsCatalogEditor({
  data,
  onChange,
}: ProductsCatalogEditorProps) {
  const sorted = [...data.items].sort(
    (a, b) =>
      a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
  );

  function updateProduct(slug: string, product: Product) {
    const items = data.items.map((item) => (item.slug === slug ? product : item));
    onChange({ items });
  }

  return (
    <div className="space-y-6">
      <p className="font-body text-[13px] font-light leading-relaxed text-kb-dusk/60">
        Upload a photo for each product card across the shop, homepage features,
        and related-product grids. Product copy and pricing are unchanged — only
        the tile image is edited here.
      </p>

      <div className="grid gap-4">
        {sorted.map((product) => (
          <ProductTileCard
            key={product.slug}
            product={product}
            onChange={(next) => updateProduct(product.slug, next)}
          />
        ))}
      </div>
    </div>
  );
}
