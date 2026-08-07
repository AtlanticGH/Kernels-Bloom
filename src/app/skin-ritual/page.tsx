import type { Metadata } from "next";
import { GoldCTA } from "@/components/gold-cta";
import { KBButton } from "@/components/kb-button";
import { SectionHeader } from "@/components/section-header";
import { getCmsBlock } from "@/lib/cms/content";
import { PageHero, PageShell } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsBlock("page.skin-ritual");
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: "/skin-ritual" },
  };
}

export default async function SkinRitualPage() {
  const content = await getCmsBlock("page.skin-ritual");

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Skin Ritual", href: "/skin-ritual" },
        ]}
        label={content.label}
        headline={content.headline}
        intro={content.intro}
      />

      <section className="bg-kb-linen py-kb-16">
        <div className="mx-auto grid max-w-kb-max grid-cols-1 gap-px px-6 md:grid-cols-2">
          {content.paths.map((path) => (
            <div key={path.label} className="bg-kb-parchment p-kb-8">
              <SectionHeader label={path.label} headline={path.title} />
              <p className="mt-6 max-w-sm font-body text-[15px] font-light leading-[1.8] text-kb-dusk/80">
                {path.body}
              </p>
              <div className="mt-8">
                {path.cta.includes("→") ? (
                  <GoldCTA href={path.href}>{path.cta}</GoldCTA>
                ) : (
                  <KBButton href={path.href}>{path.cta}</KBButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
