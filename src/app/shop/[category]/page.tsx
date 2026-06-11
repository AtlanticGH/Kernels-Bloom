import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getProductsByCategory,
  getCategory,
  getAllIngredients,
  getAllProducts,
} from "@/lib/data";
import type { CategorySlug } from "@/lib/types";
import { CollectionView } from "@/components/collection-view";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageHero, PageShell } from "@/components/page-hero";

type Params = { category: string };

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return [{ category: "all" }, ...categories.map((c) => ({ category: c.slug }))];
}

async function resolve(category: string) {
  if (category === "all") {
    return {
      name: "All Products",
      description: "The complete K&B collection.",
      products: await getAllProducts(),
    };
  }
  const cat = await getCategory(category);
  if (!cat) return null;
  return {
    name: cat.name,
    description: cat.description,
    products: await getProductsByCategory(category as CategorySlug),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const resolved = await resolve(params.category);
  if (!resolved) return {};
  return {
    title: resolved.name,
    description: resolved.description,
    alternates: { canonical: `/shop/${params.category}` },
    openGraph: { title: resolved.name, description: resolved.description },
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const resolved = await resolve(params.category);
  if (!resolved) notFound();

  const ingredientNames = Object.fromEntries(
    (await getAllIngredients()).map((i) => [i.slug, i.commonName])
  );

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: resolved.name, href: `/shop/${params.category}` },
  ];

  return (
    <PageShell>
      <BreadcrumbJsonLd items={crumbs} />
      <PageHero breadcrumbs={crumbs} label="Shop" headline={resolved.name} intro={resolved.description} />
      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <CollectionView products={resolved.products} ingredientNames={ingredientNames} />
        </div>
      </section>
    </PageShell>
  );
}
