// Domain types mirror the Sanity schema shapes (see src/sanity/schemas).
// The local data layer returns these; swapping to live Sanity/Shopify keeps
// the same interfaces so pages never change.

export type BotanicalName =
  | "Shea"
  | "Baobab"
  | "Moringa"
  | "Hibiscus"
  | "Marula"
  | "Kalahari melon";

export type CategorySlug =
  | "skin-facial"
  | "hair-scalp"
  | "body-bath"
  | "kids-baby"
  | "lip-colour"
  | "household"
  | "bundles"
  | "circular";

export interface ProductCategory {
  slug: CategorySlug;
  name: string;
  description: string;
  botanicalAnchor: BotanicalName;
}

export interface Ingredient {
  slug: string;
  commonName: string;
  latinName: string;
  origin: string;
  region: string;
  group: "Oils" | "Butters" | "Extracts" | "Active";
  primaryBenefit: string;
  illustration: BotanicalName | null;
  bodyText: string[];
  pullQuote: string;
  communitySlug?: string;
  coordinates: { lat: number; lng: number };
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  keyIngredient: string; // ingredient slug
  ingredients: string[]; // ingredient slugs
  tagline: string;
  description: string[];
  usage: string;
  sustainability: string;
  inci: string;
  price: number; // GBP
  volume: string;
  image: string;
  featured: boolean;
  inStock: boolean;
  skinTypes: string[];
  related: string[]; // product slugs
}

export interface Community {
  slug: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  description: string;
  supplies: string[]; // ingredient slugs
}

export type ArticleCategory =
  | "ingredient-story"
  | "sourcing-journey"
  | "ritual-guide"
  | "sustainability";

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  body: string[];
  pullQuote?: string;
  readTime: number;
  publishedAt: string;
  image: string;
  relatedProducts: string[];
}
