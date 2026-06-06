import type { Metadata } from "next";
import { HairlineRule } from "@/components/hairline-rule";
import { BotanicalIllustration } from "@/components/botanical-illustration";
import { CornerBrackets } from "@/components/corner-brackets";
import { PageHero, PageShell } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Brand Story",
  description:
    "A heartfelt tribute to the timeless beauty of Africa — the heritage, science and community behind Kernels & Bloom.",
  alternates: { canonical: "/story/brand" },
};

const PILLARS = [
  {
    title: "Heritage",
    body: "We begin with place — Northern Ghana, the Sahel, the groves of the south — and the practices held there across generations.",
  },
  {
    title: "Science",
    body: "Botanicals are formulated with rigour, small-batch and evidence-led, so heritage and efficacy sit together.",
  },
  {
    title: "Community",
    body: "We source with cooperatives and gatherers on fair terms, because a supply chain is also a set of relationships.",
  },
];

export default function BrandStoryPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Our Story", href: "/story" },
          { name: "Brand", href: "/story/brand" },
        ]}
        label="Brand Story"
        headline="A heartfelt tribute to the timeless beauty of Africa."
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
            <p>
              Kernels &amp; Bloom began with a question that sounds simple and
              is not: why are Africa&apos;s botanicals so often treated as raw
              material for someone else&apos;s luxury?
            </p>
            <p>
              Shea, baobab, moringa, hibiscus, marula — ingredients with deep
              cultural lives and serious efficacy, named here with the
              specificity they deserve. We formulate them in Ghana, and we keep
              the value close to where the plants grow.
            </p>
          </div>

          <figure className="my-kb-12 max-w-[680px]">
            <HairlineRule width="40px" variant="terracotta" />
            <blockquote className="mt-4 kb-accent text-[clamp(22px,3vw,28px)] leading-snug text-kb-terracotta">
              Sustainability is not a compromise. At its best, it is an
              elevation.
            </blockquote>
          </figure>

          <div className="grid grid-cols-1 gap-kb-8 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title}>
                <h2 className="font-display text-[24px] font-semibold text-kb-cacao">
                  {p.title}
                </h2>
                <p className="mt-3 font-body text-[15px] font-light leading-[1.8] text-kb-dusk/80">
                  {p.body}
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
              Africa&apos;s first luxury circular beauty brand — rooted in
              Ghanaian heritage, powered by science, built on community.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
