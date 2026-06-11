import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProduct,
  getCategory,
  getIngredient,
  resolveProducts,
  resolveIngredients,
} from "@/lib/data";
import { HairlineRule } from "@/components/hairline-rule";
import { CornerBrackets } from "@/components/corner-brackets";
import { Accordion } from "@/components/accordion";
import { AddToCart } from "@/components/add-to-cart";
import { ProductPriceSection } from "@/components/product-price-section";
import {
  ProductDetailsPanel,
  ProductSourcingStory,
} from "@/components/product-details-panel";
import { GoldCTA } from "@/components/gold-cta";
import { ProductCard } from "@/components/product-card";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { PageHero, PageShell } from "@/components/page-hero";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { getProductImages } from "@/lib/product-images";

type Params = { category: string; slug: string };

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return {};
  const gallery = getProductImages(product);
  return {
    title: product.name,
    description: product.tagline.slice(0, 160),
    alternates: { canonical: `/shop/${product.category}/${product.slug}` },
    openGraph: {
      type: "website",
      title: product.name,
      description: product.tagline,
      images: gallery.map((url) => ({ url, width: 1200, height: 630 })),
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = await getProduct(params.slug);
  if (!product || product.category !== params.category) notFound();

  const [category, keyIngredient, botanicals, related] = await Promise.all([
    getCategory(product.category),
    getIngredient(product.keyIngredient),
    resolveIngredients(product.ingredients),
    resolveProducts(product.related),
  ]);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: category?.name ?? "Products", href: `/shop/${product.category}` },
    { name: product.name, href: `/shop/${product.category}/${product.slug}` },
  ];

  return (
    <PageShell>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={crumbs} />
      <PageHero
        breadcrumbs={crumbs}
        label={category?.name ?? "Products"}
        headline={product.name}
        intro={product.tagline}
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[52fr_48fr] lg:gap-8">
            <div>
              <ProductImageGallery
                images={getProductImages(product)}
                alt={`${product.name} — ${keyIngredient?.commonName ?? "botanical"} formulation in glass on a warm stone surface`}
              />
              {!product.inStock && (
                <p className="mt-4 kb-label text-[10px] text-kb-dusk/60">
                  Currently on waitlist — add your interest and we&apos;ll notify
                  you when this returns.
                </p>
              )}
            </div>

            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="kb-label text-[10px] text-kb-terracotta">
                {category?.name}
              </p>
              <h2 className="mt-2 font-display text-[clamp(30px,4vw,36px)] font-semibold not-italic text-kb-cacao">
                {product.name}
              </h2>
              {keyIngredient && (
                <p className="mt-1 kb-accent text-[16px] text-kb-terracotta">
                  Featuring {keyIngredient.commonName}
                  <span className="text-kb-dusk/50"> · {keyIngredient.origin}</span>
                </p>
              )}
              <ProductPriceSection price={product.price} volume={product.volume} />

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
                    {keyIngredient.commonName} · {keyIngredient.latinName}
                  </p>
                </div>
              )}

              <div className="mt-8">
                <ProductDetailsPanel
                  product={product}
                  keyIngredient={keyIngredient}
                  botanicals={botanicals}
                />
              </div>

              <div className="mt-8">
                <p className="kb-label text-[10px] text-kb-terracotta">
                  More details
                </p>
                <Accordion
                  items={[
                    {
                      label: "How to use",
                      content: <p>{product.usage}</p>,
                    },
                    {
                      label: "Full ingredients (INCI)",
                      content: <p>{product.inci}</p>,
                    },
                    {
                      label: "Sustainability",
                      content: <p>{product.sustainability}</p>,
                    },
                    {
                      label: "Sourcing story",
                      content: (
                        <ProductSourcingStory
                          keyIngredient={keyIngredient}
                          botanicals={botanicals}
                        />
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
                  <ProductCard key={p.slug} product={p} square />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
