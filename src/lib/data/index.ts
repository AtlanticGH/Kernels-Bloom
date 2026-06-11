import { getCmsBlock } from "@/lib/cms/content";
import {
  articles as localArticles,
  categories as localCategories,
  communities as localCommunities,
  ingredients as localIngredients,
  products as localProducts,
} from "./local";
import type {
  Article,
  CategorySlug,
  Community,
  Ingredient,
  Product,
  ProductCategory,
} from "@/lib/types";

function mergeProducts(cmsItems: Product[]): Product[] {
  const localBySlug = new Map(localProducts.map((p) => [p.slug, p]));
  return cmsItems.map((item) => {
    const base = localBySlug.get(item.slug);
    return base ? { ...base, ...item } : item;
  });
}

function mergeCategories(cmsItems: ProductCategory[]): ProductCategory[] {
  const localBySlug = new Map(localCategories.map((c) => [c.slug, c]));
  return cmsItems.map((item) => {
    const base = localBySlug.get(item.slug);
    return base ? { ...base, ...item } : item;
  });
}

export async function getAllProducts(): Promise<Product[]> {
  const { items } = await getCmsBlock("catalog.products");
  if (items.length === 0) return localProducts;
  return mergeProducts(items);
}

export async function getProductsByCategory(
  category: CategorySlug
): Promise<Product[]> {
  const products = await getAllProducts();
  if (category === ("all" as CategorySlug)) return products;
  return products.filter((p) => p.category === category);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.featured).slice(0, limit);
}

export async function getProductsByIngredient(
  ingredientSlug: string
): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.ingredients.includes(ingredientSlug));
}

function mergeIngredients(cmsItems: Ingredient[]): Ingredient[] {
  const localBySlug = new Map(localIngredients.map((i) => [i.slug, i]));
  return cmsItems.map((item) => {
    const base = localBySlug.get(item.slug);
    return base ? { ...base, ...item } : item;
  });
}

export async function getAllIngredients(): Promise<Ingredient[]> {
  const { items } = await getCmsBlock("catalog.ingredients");
  if (items.length === 0) return localIngredients;
  return mergeIngredients(items);
}

export async function getIngredient(
  slug: string
): Promise<Ingredient | undefined> {
  const ingredients = await getAllIngredients();
  return ingredients.find((i) => i.slug === slug);
}

export async function getIllustratedIngredients(): Promise<Ingredient[]> {
  const ingredients = await getAllIngredients();
  return ingredients.filter((i) => i.illustration !== null);
}

export async function getAllCommunities(): Promise<Community[]> {
  const { items } = await getCmsBlock("catalog.communities");
  return items.length > 0 ? items : localCommunities;
}

export async function getCommunity(
  slug: string
): Promise<Community | undefined> {
  const communities = await getAllCommunities();
  return communities.find((c) => c.slug === slug);
}

function mergeArticles(cmsItems: Article[]): Article[] {
  const localBySlug = new Map(localArticles.map((a) => [a.slug, a]));
  return cmsItems.map((item) => {
    const base = localBySlug.get(item.slug);
    return base ? { ...base, ...item } : item;
  });
}

export async function getAllArticles(): Promise<Article[]> {
  const { items } = await getCmsBlock("catalog.articles");
  const source = items.length > 0 ? mergeArticles(items) : localArticles;
  return [...source].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
  );
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const articles = await getAllArticles();
  return articles.find((a) => a.slug === slug);
}

export async function getAllCategories(): Promise<ProductCategory[]> {
  const { items } = await getCmsBlock("catalog.categories");
  if (items.length === 0) return localCategories;
  return mergeCategories(items);
}

export async function getCategory(
  slug: string
): Promise<ProductCategory | undefined> {
  const categories = await getAllCategories();
  return categories.find((c) => c.slug === slug);
}

export async function resolveProducts(slugs: string[]): Promise<Product[]> {
  const products = await getAllProducts();
  return slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p));
}
