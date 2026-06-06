import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllIngredients,
  getIngredient,
  getProductsByIngredient,
  getCommunity,
} from "@/lib/data";
import { HairlineRule } from "@/components/hairline-rule";
import { BotanicalIllustration } from "@/components/botanical-illustration";
import { ProductCard } from "@/components/product-card";
import { GoldCTA } from "@/components/gold-cta";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageHero, PageShell } from "@/components/page-hero";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllIngredients().map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const ingredient = getIngredient(params.slug);
  if (!ingredient) return {};
  return {
    title: `${ingredient.commonName} — ${ingredient.latinName}`,
    description:
      `${ingredient.commonName} from ${ingredient.origin}. ${ingredient.primaryBenefit}.`.slice(
        0,
        160
      ),
    alternates: { canonical: `/botanicals/${ingredient.slug}` },
  };
}

export default function IngredientPage({ params }: { params: Params }) {
  const ingredient = getIngredient(params.slug);
  if (!ingredient) notFound();

  const products = getProductsByIngredient(ingredient.slug);
  const community = ingredient.communitySlug
    ? getCommunity(ingredient.communitySlug)
    : undefined;

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Botanicals", href: "/botanicals" },
    { name: ingredient.commonName, href: `/botanicals/${ingredient.slug}` },
  ];

  return (
    <PageShell>
      <BreadcrumbJsonLd items={crumbs} />
      <PageHero
        breadcrumbs={crumbs}
        label="The Botanicals"
        headline={ingredient.commonName}
        intro={ingredient.latinName}
      />

      <section className="relative overflow-hidden bg-kb-parchment py-kb-12">
        <BotanicalIllustration
          name={ingredient.illustration}
          size={420}
          opacity={0.1}
          className="pointer-events-none absolute -right-16 top-16 hidden lg:block"
        />
        <div className="relative mx-auto max-w-kb-content px-6">
          {ingredient.illustration && (
            <div className="mb-kb-8 grid place-items-center py-kb-8">
              <BotanicalIllustration
                name={ingredient.illustration}
                size={280}
                opacity={0.5}
              />
            </div>
          )}

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <span className="kb-label text-[10px] text-kb-terracotta">
              Origin · {ingredient.origin}
            </span>
            <span className="kb-label text-[10px] text-kb-terracotta">
              Benefit · {ingredient.primaryBenefit}
            </span>
            <span className="kb-label text-[10px] text-kb-terracotta">
              Group · {ingredient.group}
            </span>
          </div>

          <div className="mt-kb-8 max-w-[680px] space-y-4 font-body text-[16px] font-light leading-[1.85] text-kb-dusk/85">
            {ingredient.bodyText.map((para, i) =>
              i === 0 ? (
                <p key={i} className="kb-accent text-[20px] text-kb-cacao">
                  {para}
                </p>
              ) : (
                <p key={i}>{para}</p>
              )
            )}
          </div>

          <figure className="mt-kb-8 max-w-[680px]">
            <HairlineRule width="40px" variant="terracotta" />
            <blockquote className="mt-4 kb-accent text-[clamp(20px,3vw,24px)] leading-snug text-kb-terracotta">
              {ingredient.pullQuote}
            </blockquote>
          </figure>

          {community && (
            <div className="mt-kb-8 max-w-[680px] border-l-[0.5px] border-kb-chalk pl-6">
              <p className="kb-label text-[10px] text-kb-cacao">
                Sourced with
              </p>
              <p className="mt-2 font-display text-[22px] font-normal italic text-kb-cacao">
                {community.name}
              </p>
              <p className="mt-1 font-body text-[14px] font-light text-kb-dusk/70">
                {community.location}
              </p>
              <div className="mt-4">
                <GoldCTA href="/story/communities">
                  Meet our community partners →
                </GoldCTA>
              </div>
            </div>
          )}
        </div>
      </section>

      {products.length > 0 && (
        <section className="bg-kb-linen py-kb-12">
          <div className="mx-auto max-w-kb-max px-6">
            <h2 className="font-display text-[28px] font-light italic text-kb-cacao">
              Formulated with {ingredient.commonName}
            </h2>
            <div className="mt-kb-8 grid grid-cols-1 gap-x-6 gap-y-kb-8 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
