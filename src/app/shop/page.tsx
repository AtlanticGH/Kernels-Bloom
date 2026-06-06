import type { Metadata } from "next";
import Link from "next/link";
import { getAllCategories } from "@/lib/data";
import { BotanicalIllustration } from "@/components/botanical-illustration";
import { GoldCTA } from "@/components/gold-cta";
import { PageHero, PageShell } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Botanical skin, hair, body, lip and circular essentials — organised by ritual, not by SKU.",
  alternates: { canonical: "/shop" },
};

export default function ShopLandingPage() {
  const categories = getAllCategories();

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Shop", href: "/shop" },
        ]}
        label="The Collection"
        headline="The Collection"
        intro="Six categories of botanical care, and one circular line. Begin with a ritual, or browse everything at once."
      >
        <div className="mt-8">
          <GoldCTA href="/shop/all" tone="parchment">
            Browse all products →
          </GoldCTA>
        </div>
      </PageHero>

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}`}
                className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden bg-kb-linen p-8 ring-[0.5px] ring-kb-chalk transition-colors hover:bg-kb-chalk/60"
              >
                <div className="pointer-events-none absolute right-4 top-4 opacity-60">
                  <BotanicalIllustration name={cat.botanicalAnchor} size={120} opacity={0.5} />
                </div>
                <h2 className="font-display text-[26px] font-normal italic text-kb-cacao">
                  {cat.name}
                </h2>
                <p className="mt-2 max-w-xs font-body text-[14px] font-light text-kb-dusk/75">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
