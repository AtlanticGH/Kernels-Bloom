import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
  getCategory,
  getAllIngredients,
} from "@/lib/data";
import type { CategorySlug } from "@/lib/types";
import { CollectionView } from "@/components/collection-view";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageHero, PageShell } from "@/components/page-hero";

type Params = { category: string };

export function generateStaticParams() {
  return [{ category: "all" }, ...getAllCategories().map((c) => ({ category: c.slug }))];
}

function resolve(category: string) {
  if (category === "all") {
    return { name: "All Products", description: "The complete K&B collection.", products: getAllProducts() };
  }
  const cat = getCategory(category);
  if (!cat) return null;
  return {
    name: cat.name,
    description: cat.description,
    products: getProductsByCategory(category as CategorySlug),
  };
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const resolved = resolve(params.category);
  if (!resolved) return {};
  return {
    title: resolved.name,
    description: resolved.description,
    alternates: { canonical: `/shop/${params.category}` },
    openGraph: { title: resolved.name, description: resolved.description },
  };
}

export default function CategoryPage({ params }: { params: Params }) {
  const resolved = resolve(params.category);
  if (!resolved) notFound();

  const ingredientNames = Object.fromEntries(
    getAllIngredients().map((i) => [i.slug, i.commonName])
  );

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: resolved.name, href: `/shop/${params.category}` },
  ];

  return (
    <PageShell>
      <BreadcrumbJsonLd items={crumbs} />
      <PageHero
        breadcrumbs={crumbs}
        label="The Collection"
        headline={resolved.name}
        intro={resolved.description}
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <CollectionView products={resolved.products} ingredientNames={ingredientNames} />
        </div>
      </section>
    </PageShell>
  );
}
