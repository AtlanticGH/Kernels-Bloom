import type { Metadata } from "next";
import { getCmsBlock } from "@/lib/cms/content";
import { getAllProducts } from "@/lib/data";
import { ResultsView } from "@/components/results-view";
import { PageHero, PageShell } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsBlock("page.results");
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: "/skin-ritual/results" },
    robots: { index: false },
  };
}

export default async function ResultsPage() {
  const [content, products] = await Promise.all([
    getCmsBlock("page.results"),
    getAllProducts(),
  ]);

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Skin Ritual", href: "/skin-ritual" },
          { name: "Results", href: "/skin-ritual/results" },
        ]}
        label={content.label}
        headline={content.headline}
        intro={content.intro}
      />

      <section className="bg-kb-parchment py-kb-16">
        <ResultsView products={products} config={content} />
      </section>
    </PageShell>
  );
}
