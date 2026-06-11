import type { Metadata } from "next";
import { FounderProfile } from "@/components/founder-profile";
import { FounderVideo } from "@/components/founder-video";
import { getCmsBlock } from "@/lib/cms/content";
import { PageHero, PageShell } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsBlock("story.founder");
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: "/story/founder" },
  };
}

export default async function FounderPage() {
  const content = await getCmsBlock("story.founder");

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Our Story", href: "/story" },
          { name: "Founder", href: "/story/founder" },
        ]}
        label={content.label}
        headline={content.headline}
      />

      <section className="relative overflow-hidden bg-kb-parchment py-kb-16">
        <div className="mx-auto max-w-kb-max px-6">
          <FounderProfile content={content} />
          <FounderVideo
            className="mt-kb-16"
            videoSrc={content.videoSrc}
            videoPoster={content.videoPoster}
          />
        </div>
      </section>
    </PageShell>
  );
}
