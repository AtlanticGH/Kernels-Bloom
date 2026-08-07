import { products as localProducts } from "./products";
import type { Product } from "@/lib/types";

function cmsGallery(cms: Product): string[] {
  return (cms.images ?? []).map((src) => src.trim()).filter(Boolean);
}

/** Uploaded via admin (Supabase storage) or any non-empty CMS gallery. */
function cmsHasImages(cms: Product): boolean {
  const gallery = cmsGallery(cms);
  if (gallery.length > 0) return true;
  return Boolean(cms.image?.trim());
}

function resolveCmsImages(base: Product, cms: Product): {
  image: string;
  images: string[];
} {
  const gallery = cmsGallery(cms);
  const primary = gallery[0] ?? cms.image?.trim() ?? "";

  if (gallery.length > 0) {
    return { image: gallery[0], images: gallery };
  }

  if (primary) {
    return { image: primary, images: [primary] };
  }

  const fallback = base.images?.filter(Boolean).length
    ? base.images!.filter(Boolean)
    : base.image
      ? [base.image]
      : [];

  return {
    image: fallback[0] ?? base.image,
    images: fallback,
  };
}

function mergeOne(base: Product, cms: Product): Product {
  const images = cmsHasImages(cms)
    ? resolveCmsImages(base, cms)
    : {
        image: base.image,
        images: base.images?.length
          ? base.images.filter(Boolean)
          : base.image
            ? [base.image]
            : [],
      };

  return {
    ...base,
    ...cms,
    image: images.image,
    images: images.images,
    variants:
      cms.variants && cms.variants.length > 0 ? cms.variants : base.variants,
  };
}

/**
 * Merge CMS product rows onto the local seed catalog.
 * - Every local seed product is included (CMS cannot drop products).
 * - CMS-uploaded / admin-assigned images are preserved when present.
 * - CMS-only products (custom slugs) are appended.
 */
export function mergeProductCatalogItems(cmsItems: Product[]): Product[] {
  const cmsBySlug = new Map(cmsItems.map((item) => [item.slug, item]));

  const merged = localProducts.map((base) => {
    const cms = cmsBySlug.get(base.slug);
    return cms ? mergeOne(base, cms) : base;
  });

  const cmsOnly = cmsItems.filter(
    (item) => !localProducts.some((base) => base.slug === item.slug)
  );

  return [...merged, ...cmsOnly];
}
