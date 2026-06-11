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

export async function generateStaticParams() {
  const ingredients = await getAllIngredients();
  return ingredients.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const ingredient = await getIngredient(params.slug);
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

export default async function IngredientPage({ params }: { params: Params }) {
  const ingredient = await getIngredient(params.slug);
  if (!ingredient) notFound();

  const products = await getProductsByIngredient(ingredient.slug);
  const community = ingredient.communitySlug
    ? await getCommunity(ingredient.communitySlug)
    : undefined;

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Botanicals", href: "/botanicals" },
    {
      name: ingredient.commonName,
      href: `/botanicals/${ingredient.slug}`,
    },
  ];

  return (
    <PageShell>
      <BreadcrumbJsonLd items={crumbs} />
      <PageHero
        breadcrumbs={crumbs}
        label={ingredient.latinName}
        headline={ingredient.commonName}
        intro={`${ingredient.origin} · ${ingredient.primaryBenefit}`}
      />

      <section className="relative overflow-hidden bg-kb-parchment py-kb-16">
        {ingredient.illustration && (
          <BotanicalIllustration
            name={ingredient.illustration}
            size={480}
            opacity={0.06}
            className="pointer-events-none absolute -right-20 top-12 hidden lg:block"
          />
        )}
        <div className="relative mx-auto max-w-kb-content px-6">
          <div className="max-w-[680px] space-y-5 font-body text-[16px] font-light leading-[1.85] text-kb-dusk/85">
            {ingredient.bodyText.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>

          <figure className="my-kb-12 max-w-[680px]">
            <HairlineRule width="40px" variant="terracotta" />
            <blockquote className="mt-4 kb-accent text-[clamp(22px,3vw,28px)] leading-snug text-kb-terracotta">
              &ldquo;{ingredient.pullQuote}&rdquo;
            </blockquote>
          </figure>

          {community && (
            <div className="mt-kb-8">
              <p className="kb-label text-[10px] text-kb-terracotta">
                Community partner
              </p>
              <p className="mt-2 font-display text-[22px] italic text-kb-cacao">
                {community.name}
              </p>
              <p className="mt-1 font-body text-[14px] font-light text-kb-dusk/70">
                {community.location}
              </p>
              <div className="mt-4">
                <GoldCTA href={`/story/communities`}>
                  See on the sourcing map →
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
              Formulations featuring {ingredient.commonName}
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
