import type { Product } from "@/lib/types";

/** Gallery images for product detail — falls back to the tile image. */
export function getProductImages(product: Product): string[] {
  const gallery = product.images?.filter(Boolean) ?? [];
  if (gallery.length > 0) return gallery;
  return product.image ? [product.image] : [];
}
