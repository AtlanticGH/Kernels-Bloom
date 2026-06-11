import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import {
  getAllProducts,
  getAllIngredients,
  getAllArticles,
  getAllCategories,
} from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/shop",
    "/shop/all",
    "/botanicals",
    "/skin-ritual",
    "/skin-ritual/quiz",
    "/skin-ritual/consultation",
    "/story",
    "/story/brand",
    "/story/facility",
    "/story/circular-process",
    "/story/communities",
    "/story/founder",
    "/journal",
    "/trade",
    "/press",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));

  const [categories, products, ingredients, articles] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
    getAllIngredients(),
    getAllArticles(),
  ]);

  const categoryRoutes = categories.map((c) => ({
    url: `${base}/shop/${c.slug}`,
    lastModified: now,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/shop/${p.category}/${p.slug}`,
    lastModified: now,
  }));

  const ingredientRoutes = ingredients.map((i) => ({
    url: `${base}/botanicals/${i.slug}`,
    lastModified: now,
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${base}/journal/${a.slug}`,
    lastModified: new Date(a.publishedAt),
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...ingredientRoutes,
    ...articleRoutes,
  ];
}
