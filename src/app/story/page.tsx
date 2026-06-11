import type { Metadata } from "next";
import Link from "next/link";
import { getCmsBlock } from "@/lib/cms/content";
import { PageHero, PageShell } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsBlock("story.index");
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: "/story" },
  };
}

export default async function StoryPage() {
  const content = await getCmsBlock("story.index");

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Our Story", href: "/story" },
        ]}
        label={content.label}
        headline={content.headline}
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <ul className="divide-y-[0.5px] divide-kb-chalk border-y-[0.5px] border-kb-chalk">
            {content.chapters.map((chapter) => (
              <li key={chapter.href}>
                <Link
                  href={chapter.href}
                  className="group flex flex-col gap-1 py-8 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="font-display text-[clamp(28px,4vw,40px)] font-light italic text-kb-cacao transition-colors group-hover:text-kb-terracotta">
                    {chapter.name}
                  </span>
                  <span className="max-w-sm font-body text-[15px] font-light text-kb-dusk/70">
                    {chapter.body}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
