import type { Metadata } from "next";
import { CircularDiagram } from "@/components/circular-diagram";
import { Accordion } from "@/components/accordion";
import { getCmsBlock } from "@/lib/cms/content";
import { PageHero, PageShell } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsBlock("story.circular");
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: "/story/circular-process" },
  };
}

export default async function CircularProcessPage() {
  const content = await getCmsBlock("story.circular");

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Our Story", href: "/story" },
          { name: "Circular Process", href: "/story/circular-process" },
        ]}
        label={content.label}
        headline={content.headline}
        intro={content.intro}
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <CircularDiagram stages={content.diagramStages} />
        </div>
      </section>

      <section className="bg-kb-linen py-kb-12">
        <div className="mx-auto max-w-kb-content px-6">
          <Accordion
            items={content.accordion.map((item) => ({
              label: item.label,
              content: <p>{item.content}</p>,
            }))}
          />
        </div>
      </section>
    </PageShell>
  );
}
