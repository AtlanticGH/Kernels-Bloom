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

function GalleryThumbnails({ images }: { images: string[] }) {
  if (images.length <= 1) return null;

  return (
    <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
      {images.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className="relative h-11 w-11 shrink-0 overflow-hidden rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen"
        >
          {isImagePath(src) ? (
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="44px"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-body text-[9px] text-kb-dusk/40">
              {index + 1}
            </div>
          )}
        </div>
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
      <div>
        <p className="kb-label text-[10px] text-kb-terracotta">
          Detail page gallery
        </p>
        <p className="mt-1 font-body text-[12px] font-light leading-relaxed text-kb-dusk/50">
          Upload photos for the product page thumbnail strip. Image 1 is also
          the shop tile and main photo.
        </p>
      </div>

      <div className="space-y-4">
        {images.map((src, index) => (
          <div
            key={`${product.slug}-gallery-${index}`}
            className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-parchment/50 p-4"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
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
                  className="rounded-kb px-2 py-1 font-body text-[12px] font-light text-kb-dusk/60 hover:bg-kb-linen hover:text-kb-cacao disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(index, 1)}
                  disabled={index === images.length - 1}
                  aria-label="Move image down"
                  className="rounded-kb px-2 py-1 font-body text-[12px] font-light text-kb-dusk/60 hover:bg-kb-linen hover:text-kb-cacao disabled:opacity-30"
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
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addImage}
        className="rounded-kb border-[0.5px] border-dashed border-kb-chalk px-4 py-2.5 font-body text-[13px] font-light text-kb-dusk/70 transition-colors hover:border-kb-gold hover:text-kb-cacao"
      >
        + Add gallery image
      </button>
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
  const gallery = galleryForProduct(product);

  return (
    <article className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen/40 p-4">
      <div className="grid gap-6 lg:grid-cols-[140px_minmax(0,1fr)]">
        <div>
          <TilePreview product={product} />
          <GalleryThumbnails images={gallery} />
          <p className="mt-2 text-center font-body text-[11px] font-light text-kb-dusk/45">
            {gallery.length} photo{gallery.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="min-w-0 space-y-5">
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
          <ProductGalleryEditor product={product} onChange={onChange} />
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
        Manage each product&apos;s shop tile and detail-page gallery. Upload
        images, reorder with the arrows, then save — changes appear on the live
        site after you click Save changes.
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
