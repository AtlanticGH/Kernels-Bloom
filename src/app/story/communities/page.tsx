import type { Metadata } from "next";
import { getAllCommunities } from "@/lib/data";
import { getCmsBlock } from "@/lib/cms/content";
import { SourcingMap } from "@/components/sourcing-map";
import { PageHero, PageShell } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsBlock("story.communities");
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: "/story/communities" },
  };
}

export default async function CommunitiesPage() {
  const [content, communities] = await Promise.all([
    getCmsBlock("story.communities"),
    getAllCommunities(),
  ]);

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Our Story", href: "/story" },
          { name: "Community Partners", href: "/story/communities" },
        ]}
        label={content.label}
        headline={content.headline}
        intro={content.intro}
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <SourcingMap communities={communities} />
        </div>
      </section>
    </PageShell>
  );
}
