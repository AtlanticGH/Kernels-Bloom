"use client";

import Image from "next/image";
import type { Ingredient } from "@/lib/types";
import type { CatalogListContent } from "@/lib/cms/types";
import { ImageField } from "@/components/admin/image-field";

type IngredientsCatalogEditorProps = {
  data: CatalogListContent<Ingredient>;
  onChange: (data: CatalogListContent<Ingredient>) => void;
};

function isImagePath(path: string): boolean {
  return /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(path);
}

function TilePreview({ ingredient }: { ingredient: Ingredient }) {
  const src = ingredient.tileImage ?? "";

  return (
    <div className="relative aspect-square overflow-hidden rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen">
      {src && isImagePath(src) ? (
        <Image
          src={src}
          alt={ingredient.commonName}
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
        {ingredient.commonName}
      </p>
    </div>
  );
}

function IngredientTileCard({
  ingredient,
  onChange,
}: {
  ingredient: Ingredient;
  onChange: (ingredient: Ingredient) => void;
}) {
  return (
    <article className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen/40 p-4">
      <div className="grid gap-4 sm:grid-cols-[140px_minmax(0,1fr)]">
        <TilePreview ingredient={ingredient} />
        <div className="min-w-0 space-y-3">
          <div>
            <p className="kb-label text-[10px] text-kb-gold">{ingredient.group}</p>
            <h3 className="mt-1 font-display text-[20px] text-kb-cacao">
              {ingredient.commonName}
            </h3>
            <p className="mt-0.5 font-body text-[12px] font-light text-kb-dusk/60">
              {ingredient.latinName} · {ingredient.origin}
            </p>
          </div>
          <ImageField
            label="Tile image"
            value={ingredient.tileImage ?? ""}
            onChange={(tileImage) => onChange({ ...ingredient, tileImage })}
          />
        </div>
      </div>
    </article>
  );
}

export function IngredientsCatalogEditor({
  data,
  onChange,
}: IngredientsCatalogEditorProps) {
  function updateIngredient(index: number, ingredient: Ingredient) {
    const items = [...data.items];
    items[index] = ingredient;
    onChange({ items });
  }

  return (
    <div className="space-y-6">
      <p className="font-body text-[13px] font-light leading-relaxed text-kb-dusk/60">
        Upload a photo for each botanical tile on the{" "}
        <span className="text-kb-cacao">/botanicals</span> index. Ingredient
        copy and detail pages are unchanged — only the grid image is edited here.
      </p>

      <div className="grid gap-4">
        {data.items.map((ingredient, index) => (
          <IngredientTileCard
            key={ingredient.slug}
            ingredient={ingredient}
            onChange={(next) => updateIngredient(index, next)}
          />
        ))}
      </div>
    </div>
  );
}
