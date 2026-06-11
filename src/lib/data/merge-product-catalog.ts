import { products as localProducts } from "./products";
import type { Product } from "@/lib/types";

export function mergeProductCatalogItems(cmsItems: Product[]): Product[] {
  const localBySlug = new Map(localProducts.map((p) => [p.slug, p]));
  return cmsItems.map((item) => {
    const base = localBySlug.get(item.slug);
    if (!base) return item;
    return {
      ...base,
      ...item,
      images:
        item.images && item.images.length > 0 ? item.images : base.images,
      image: item.image || base.image,
    };
  });
}
