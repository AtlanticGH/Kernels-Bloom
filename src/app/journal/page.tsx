import type { Metadata } from "next";
import { getAllArticles } from "@/lib/data";
import { ArticleCard } from "@/components/article-card";
import { PageHero, PageShell } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Ingredient stories, sourcing journeys, ritual guides and sustainability reports from Kernels & Bloom.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const [lead, ...rest] = getAllArticles();

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Journal", href: "/journal" },
        ]}
        label="The Journal"
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          {lead && (
            <div className="grid grid-cols-1 items-center gap-kb-12 md:grid-cols-2">
              <ArticleCard article={lead} variant="featured" />
              <div>
                <p className="kb-label text-[10px] text-kb-terracotta">
                  This week
                </p>
                <p className="mt-3 kb-accent text-[clamp(20px,3vw,28px)] leading-snug text-kb-cacao">
                  &ldquo;{lead.pullQuote ?? lead.excerpt}&rdquo;
                </p>
              </div>
            </div>
          )}

          <div className="mt-kb-16 grid grid-cols-1 gap-x-6 gap-y-kb-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="medium" />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
