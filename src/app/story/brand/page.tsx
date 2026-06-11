import type { Metadata } from "next";
import { HairlineRule } from "@/components/hairline-rule";
import { BotanicalIllustration } from "@/components/botanical-illustration";
import { CornerBrackets } from "@/components/corner-brackets";
import { getCmsBlock } from "@/lib/cms/content";
import { PageHero, PageShell } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsBlock("story.brand");
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: "/story/brand" },
  };
}

export default async function BrandStoryPage() {
  const content = await getCmsBlock("story.brand");

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Our Story", href: "/story" },
          { name: "Brand", href: "/story/brand" },
        ]}
        label={content.label}
        headline={content.headline}
      />

      <section className="relative overflow-hidden bg-kb-parchment py-kb-16">
        <BotanicalIllustration
          name="Baobab"
          size={420}
          opacity={0.08}
          className="pointer-events-none absolute -left-16 top-24 hidden lg:block"
        />
        <div className="relative mx-auto max-w-kb-content px-6">
          <div className="max-w-[680px] space-y-5 font-body text-[16px] font-light leading-[1.85] text-kb-dusk/85">
            <p>{content.paragraph1}</p>
            <p>{content.paragraph2}</p>
          </div>

          <figure className="my-kb-12 max-w-[680px]">
            <HairlineRule width="40px" variant="terracotta" />
            <blockquote className="mt-4 kb-accent text-[clamp(22px,3vw,28px)] leading-snug text-kb-terracotta">
              {content.pullQuote}
            </blockquote>
          </figure>

          <div className="grid grid-cols-1 gap-kb-8 md:grid-cols-3">
            {content.pillars.map((pillar) => (
              <div key={pillar.title}>
                <h2 className="font-display text-[24px] font-semibold text-kb-cacao">
                  {pillar.title}
                </h2>
                <p className="mt-3 font-body text-[15px] font-light leading-[1.8] text-kb-dusk/80">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-kb-linen py-kb-16">
        <div className="relative mx-auto max-w-kb-content px-6">
          <div className="relative bg-kb-parchment p-kb-8 text-center">
            <CornerBrackets arm={32} inset={16} />
            <p className="kb-accent text-[clamp(22px,3vw,28px)] leading-snug text-kb-cacao">
              {content.closingQuote}
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
