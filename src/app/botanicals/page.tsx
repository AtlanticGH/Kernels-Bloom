import type { Metadata } from "next";
import { getAllIngredients } from "@/lib/data";
import { getCmsBlock } from "@/lib/cms/content";
import { BotanicalsGrid } from "@/components/botanicals-grid";
import { PageHero, PageShell } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsBlock("page.botanicals");
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: "/botanicals" },
  };
}

export default async function BotanicalsPage() {
  const [content, ingredients] = await Promise.all([
    getCmsBlock("page.botanicals"),
    getAllIngredients(),
  ]);

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Botanicals", href: "/botanicals" },
        ]}
        label={content.label}
        headline={content.headline}
        intro={content.intro}
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <BotanicalsGrid ingredients={ingredients} />
        </div>
      </section>
    </PageShell>
  );
}
