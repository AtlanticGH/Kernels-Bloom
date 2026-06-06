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
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CollectionView } from "@/components/collection-view";
import { BreadcrumbJsonLd } from "@/components/json-ld";

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

  return (
    <div className="pt-[88px]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Shop", href: "/shop" },
          { name: resolved.name, href: `/shop/${params.category}` },
        ]}
      />
      <section className="mx-auto max-w-kb-max px-6 py-kb-12">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Shop", href: "/shop" },
            { name: resolved.name, href: `/shop/${params.category}` },
          ]}
        />
        <h1 className="mt-6 font-display text-[clamp(36px,5vw,56px)] font-light italic text-kb-cacao">
          {resolved.name}
        </h1>
        <p className="mt-4 max-w-xl font-body text-[16px] font-light leading-relaxed text-kb-dusk/80">
          {resolved.description}
        </p>

        <div className="mt-kb-12">
          <CollectionView products={resolved.products} ingredientNames={ingredientNames} />
        </div>
      </section>
    </div>
  );
}
