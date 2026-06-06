import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProduct,
  getCategory,
  getIngredient,
  resolveProducts,
} from "@/lib/data";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { HairlineRule } from "@/components/hairline-rule";
import { CornerBrackets } from "@/components/corner-brackets";
import { Accordion } from "@/components/accordion";
import { AddToCart } from "@/components/add-to-cart";
import { GoldCTA } from "@/components/gold-cta";
import { ProductCard } from "@/components/product-card";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

type Params = { category: string; slug: string };

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ category: p.category, slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline.slice(0, 160),
    alternates: { canonical: `/shop/${product.category}/${product.slug}` },
    openGraph: {
      type: "website",
      title: product.name,
      description: product.tagline,
      images: [{ url: product.image, width: 1200, height: 630 }],
    },
  };
}

export default function ProductPage({ params }: { params: Params }) {
  const product = getProduct(params.slug);
  if (!product || product.category !== params.category) notFound();

  const category = getCategory(product.category);
  const keyIngredient = getIngredient(product.keyIngredient);
  const related = resolveProducts(product.related);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: category?.name ?? "Products", href: `/shop/${product.category}` },
    { name: product.name, href: `/shop/${product.category}/${product.slug}` },
  ];

  return (
    <div className="pt-[88px]">
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={crumbs} />

      <section className="mx-auto max-w-kb-max px-6 py-kb-8">
        <Breadcrumbs items={crumbs} />

        <div className="mt-kb-8 grid grid-cols-1 gap-kb-12 lg:grid-cols-[55fr_45fr]">
          {/* images */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden bg-kb-linen">
              <Image
                src={product.image}
                alt={`${product.name} — ${keyIngredient?.commonName ?? "botanical"} formulation in glass on a warm stone surface`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* info */}
          <div className="lg:sticky lg:top-32 lg:self-start lg:py-4">
            <p className="kb-label text-[10px] text-kb-terracotta">
              {category?.name}
            </p>
            <h1 className="mt-2 font-display text-[clamp(30px,4vw,36px)] font-normal text-kb-cacao">
              {product.name}
            </h1>
            {keyIngredient && (
              <p className="mt-1 kb-accent text-[16px] text-kb-terracotta">
                {keyIngredient.commonName}
              </p>
            )}
            <p className="mt-3 font-body text-[15px] font-light text-kb-dusk/70">
              {product.tagline}
            </p>
            <p className="mt-5 font-body text-[18px] font-light text-kb-dusk">
              £{product.price}
            </p>
            <p className="font-body text-[13px] font-light text-kb-dusk/60">
              {product.volume}
            </p>

            <HairlineRule width="100%" variant="chalk" className="my-6" />

            <AddToCart slug={product.slug} inStock={product.inStock} />
            <div className="mt-4">
              <GoldCTA href="/skin-ritual/quiz">
                Not sure? Take the ritual quiz →
              </GoldCTA>
            </div>

            <HairlineRule width="100%" variant="chalk" className="my-6" />

            <div className="space-y-3 font-body text-[15px] font-light leading-[1.85] text-kb-dusk/85">
              {product.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {keyIngredient && (
              <div className="relative mt-6 bg-kb-linen p-6">
                <CornerBrackets arm={20} inset={10} />
                <p className="kb-accent text-[18px] text-kb-terracotta">
                  &ldquo;{keyIngredient.pullQuote}&rdquo;
                </p>
                <p className="mt-2 kb-label text-[10px] text-kb-dusk/60">
                  {keyIngredient.commonName} · {keyIngredient.origin}
                </p>
              </div>
            )}

            <div className="mt-8">
              <Accordion
                items={[
                  {
                    label: "Full Ingredients (INCI)",
                    content: <p>{product.inci}</p>,
                  },
                  { label: "How to Use", content: <p>{product.usage}</p> },
                  {
                    label: "Sustainability Credentials",
                    content: <p>{product.sustainability}</p>,
                  },
                  {
                    label: "Sourcing Story",
                    content: (
                      <p>
                        {keyIngredient
                          ? `${keyIngredient.commonName} from ${keyIngredient.origin}. `
                          : ""}
                        Discover the full story in{" "}
                        <a
                          href={`/botanicals/${product.keyIngredient}`}
                          className="text-kb-terracotta underline-offset-2 hover:underline"
                        >
                          the botanical index
                        </a>
                        .
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-kb-16">
            <h2 className="font-display text-[28px] font-light italic text-kb-cacao">
              Complete your ritual
            </h2>
            <div className="mt-kb-8 grid grid-cols-1 gap-x-6 gap-y-kb-8 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
