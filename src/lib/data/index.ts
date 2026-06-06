// Data-access layer. Pages import only from here. Today it returns local
// typed data; when Sanity/Shopify credentials are present the adapters in
// src/lib/integrations resolve the same shapes from the live services.

import { products } from "./products";
import { ingredients } from "./ingredients";
import { communities } from "./communities";
import { articles } from "./articles";
import { categories } from "./categories";
import type {
  Article,
  CategorySlug,
  Community,
  Ingredient,
  Product,
  ProductCategory,
} from "@/lib/types";

// --- Products ---------------------------------------------------------------
export function getAllProducts(): Product[] {
  return products;
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  if (category === ("all" as CategorySlug)) return products;
  return products.filter((p) => p.category === category);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getProductsByIngredient(ingredientSlug: string): Product[] {
  return products.filter((p) => p.ingredients.includes(ingredientSlug));
}

// --- Ingredients ------------------------------------------------------------
export function getAllIngredients(): Ingredient[] {
  return ingredients;
}

export function getIngredient(slug: string): Ingredient | undefined {
  return ingredients.find((i) => i.slug === slug);
}

export function getIllustratedIngredients(): Ingredient[] {
  return ingredients.filter((i) => i.illustration !== null);
}

// --- Communities ------------------------------------------------------------
export function getAllCommunities(): Community[] {
  return communities;
}

export function getCommunity(slug: string): Community | undefined {
  return communities.find((c) => c.slug === slug);
}

// --- Articles ---------------------------------------------------------------
export function getAllArticles(): Article[] {
  return [...articles].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
  );
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

// --- Categories -------------------------------------------------------------
export function getAllCategories(): ProductCategory[] {
  return categories;
}

export function getCategory(slug: string): ProductCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export function resolveProducts(slugs: string[]): Product[] {
  return slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p));
}
