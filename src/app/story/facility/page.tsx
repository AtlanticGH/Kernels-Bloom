import type { Metadata } from "next";
import Image from "next/image";
import { getCmsBlock } from "@/lib/cms/content";
import { PageHero, PageShell } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsBlock("story.facility");
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: "/story/facility" },
  };
}

export default async function FacilityPage() {
  const content = await getCmsBlock("story.facility");

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Our Story", href: "/story" },
          { name: "The Facility", href: "/story/facility" },
        ]}
        label={content.label}
        headline={content.headline}
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-content px-6">
          <div className="relative aspect-[16/9] overflow-hidden bg-kb-chalk">
            <Image
              src={content.image}
              alt="Finished K&B body care — hand lotion, scrub, cream and barrier lotion grouped on a dark surface"
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              className="object-cover"
            />
          </div>

          <div className="mt-kb-8 max-w-[680px] space-y-5 font-body text-[16px] font-light leading-[1.85] text-kb-dusk/85">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
