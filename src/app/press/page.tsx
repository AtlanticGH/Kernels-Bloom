import type { Metadata } from "next";
import { HairlineRule } from "@/components/hairline-rule";
import { GoldCTA } from "@/components/gold-cta";
import { getCmsBlock } from "@/lib/cms/content";
import { PageHero, PageShell } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsBlock("page.press");
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: "/press" },
  };
}

export default async function PressPage() {
  const content = await getCmsBlock("page.press");

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Press & Awards", href: "/press" },
        ]}
        label={content.label}
        headline={content.headline}
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <div className="grid grid-cols-1 gap-kb-16 lg:grid-cols-2">
            <div>
              <p className="kb-label text-[10px] text-kb-terracotta">
                {content.awardsLabel}
              </p>
              <ul className="mt-4 divide-y-[0.5px] divide-kb-chalk border-y-[0.5px] border-kb-chalk">
                {content.awards.map((award) => (
                  <li key={award.name} className="py-5">
                    <p className="kb-label text-[10px] text-kb-dusk/50">{award.year}</p>
                    <p className="mt-1 font-display text-[20px] font-normal italic text-kb-cacao">
                      {award.name}
                    </p>
                    <p className="mt-1 font-body text-[14px] font-light text-kb-dusk/70">
                      {award.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="kb-label text-[10px] text-kb-terracotta">
                {content.pressLabel}
              </p>
              <div className="mt-4 space-y-kb-8">
                {content.press.map((item) => (
                  <figure key={item.outlet}>
                    <HairlineRule width="40px" variant="terracotta" />
                    <blockquote className="mt-3 kb-accent text-[clamp(18px,2.5vw,24px)] leading-snug text-kb-cacao">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-2 kb-label text-[10px] text-kb-dusk/60">
                      {item.outlet}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-kb-16">
            <GoldCTA href={content.ctaHref}>{content.ctaLabel}</GoldCTA>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
