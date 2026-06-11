"use client";

import Image from "next/image";
import type { ProductCategory } from "@/lib/types";
import type { CatalogListContent } from "@/lib/cms/types";
import { ImageField } from "@/components/admin/image-field";

type CategoriesCatalogEditorProps = {
  data: CatalogListContent<ProductCategory>;
  onChange: (data: CatalogListContent<ProductCategory>) => void;
};

function isImagePath(path: string): boolean {
  return /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(path);
}

function TilePreview({ category }: { category: ProductCategory }) {
  const src = category.tileImage ?? "";

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen">
      {src && isImagePath(src) ? (
        <Image
          src={src}
          alt={category.name}
          fill
          className="object-cover"
          sizes="160px"
        />
      ) : (
        <div className="flex h-full items-center justify-center px-3 text-center font-body text-[12px] font-light text-kb-dusk/40">
          No tile image
        </div>
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-kb-cacao/70 via-transparent to-transparent" />
      <p className="absolute bottom-2 left-2 right-2 font-display text-[14px] italic text-kb-parchment">
        {category.name}
      </p>
    </div>
  );
}

function CategoryTileCard({
  category,
  onChange,
}: {
  category: ProductCategory;
  onChange: (category: ProductCategory) => void;
}) {
  return (
    <article className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen/40 p-4">
      <div className="grid gap-4 sm:grid-cols-[140px_minmax(0,1fr)]">
        <TilePreview category={category} />
        <div className="min-w-0 space-y-3">
          <div>
            <h3 className="font-display text-[20px] text-kb-cacao">
              {category.name}
            </h3>
            <p className="mt-1 font-body text-[12px] font-light leading-relaxed text-kb-dusk/60">
              {category.description}
            </p>
          </div>
          <ImageField
            label="Tile image"
            value={category.tileImage ?? ""}
            onChange={(tileImage) => onChange({ ...category, tileImage })}
          />
        </div>
      </div>
    </article>
  );
}

export function CategoriesCatalogEditor({
  data,
  onChange,
}: CategoriesCatalogEditorProps) {
  function updateCategory(index: number, category: ProductCategory) {
    const items = [...data.items];
    items[index] = category;
    onChange({ items });
  }

  return (
    <div className="space-y-6">
      <p className="font-body text-[13px] font-light leading-relaxed text-kb-dusk/60">
        Upload a photo for each collection tile on the{" "}
        <span className="text-kb-cacao">/shop</span> landing page. Category
        names and descriptions stay as-is — only the grid image is edited here.
      </p>

      <div className="grid gap-4">
        {data.items.map((category, index) => (
          <CategoryTileCard
            key={category.slug}
            category={category}
            onChange={(next) => updateCategory(index, next)}
          />
        ))}
      </div>
    </div>
  );
}
