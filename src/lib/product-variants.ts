import type { Product, ProductVariant } from "@/lib/types";

const SIZE_MULTIPLIERS: Record<number, number[]> = {
  2: [1, 1.75],
  3: [1, 1.55, 2.65],
  4: [1, 1.35, 1.85, 2.75],
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Split a comma-separated volume string into individual size labels. */
export function parseVolumeLabels(volume: string): string[] {
  return volume
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function inferredVariants(product: Product): ProductVariant[] {
  const labels = parseVolumeLabels(product.volume);
  if (labels.length <= 1) return [];

  const multipliers =
    SIZE_MULTIPLIERS[labels.length] ??
    labels.map((_, index) => 1 + index * 0.5);

  return labels.map((label, index) => ({
    id: slugify(label),
    label,
    volume: label,
    price: Math.max(1, Math.round(product.price * multipliers[index])),
    inStock: product.inStock,
  }));
}

export function hasProductVariants(product: Product): boolean {
  return getProductVariants(product).length > 1;
}

export function getProductVariants(product: Product): ProductVariant[] {
  if (product.variants?.length) return product.variants;

  const inferred = inferredVariants(product);
  if (inferred.length > 0) return inferred;

  return [
    {
      id: "default",
      label: product.volume,
      volume: product.volume,
      price: product.price,
      inStock: product.inStock,
    },
  ];
}

export function getProductVariant(
  product: Product,
  variantId?: string
): ProductVariant {
  const variants = getProductVariants(product);
  if (!variantId) return variants[0];
  return variants.find((v) => v.id === variantId) ?? variants[0];
}

export function cartLineKey(slug: string, variantId?: string): string {
  const variant = variantId && variantId !== "default" ? variantId : "";
  return variant ? `${slug}::${variant}` : slug;
}

export function parseCartLineKey(key: string): {
  slug: string;
  variantId?: string;
} {
  const [slug, variantId] = key.split("::");
  return { slug, variantId };
}

/** Starting price + volume for cards and listings (smallest / first variant). */
export function getProductListingOffer(product: Product): ProductVariant {
  const variants = getProductVariants(product);
  return variants.reduce((lowest, variant) =>
    variant.price < lowest.price ? variant : lowest
  );
}
