import type { Metadata } from "next";
import { getAllCategories } from "@/lib/data";
import { getCmsBlock } from "@/lib/cms/content";
import { GoldCTA } from "@/components/gold-cta";
import { ShopCategoryTile } from "@/components/shop-category-tile";
import { PageHero, PageShell } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsBlock("page.shop");
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: "/shop" },
  };
}

export default async function ShopLandingPage() {
  const [content, categories] = await Promise.all([
    getCmsBlock("page.shop"),
    getAllCategories(),
  ]);

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Shop", href: "/shop" },
        ]}
        label={content.label}
        headline={content.headline}
        intro={content.intro}
      >
        <div className="mt-8">
          <GoldCTA href={content.ctaHref} tone="parchment">
            {content.ctaLabel}
          </GoldCTA>
        </div>
      </PageHero>

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <ShopCategoryTile key={cat.slug} category={cat} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
