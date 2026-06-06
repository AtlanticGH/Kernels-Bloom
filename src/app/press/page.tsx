import type { Metadata } from "next";
import { HairlineRule } from "@/components/hairline-rule";
import { GoldCTA } from "@/components/gold-cta";
import { PageHero, PageShell } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Press & Awards",
  description:
    "Recognition and coverage of Kernels & Bloom — Africa's luxury circular beauty brand.",
  alternates: { canonical: "/press" },
};

const AWARDS = [
  { year: "2026", name: "Sustainable Beauty Award — Circular Innovation", body: "Recognised for the Kalahari Circular line." },
  { year: "2026", name: "Best New Luxury Skincare — Editor's Choice", body: "For the Marula Facial Serum." },
  { year: "2025", name: "Ethical Sourcing Commendation", body: "For community-led botanical supply." },
];

const PRESS = [
  { outlet: "The Editorial", quote: "An argument that African botanicals belong at the very top of the luxury tier." },
  { outlet: "Bloom & Field", quote: "Provenance you can trace to a season and a source." },
  { outlet: "Continent", quote: "Quiet, confident, and unmistakably rooted in Ghana." },
];

export default function PressPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Press & Awards", href: "/press" },
        ]}
        label="Recognition"
        headline="Press & Awards"
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <div className="grid grid-cols-1 gap-kb-16 lg:grid-cols-2">
            <div>
              <p className="kb-label text-[10px] text-kb-terracotta">Awards</p>
              <ul className="mt-4 divide-y-[0.5px] divide-kb-chalk border-y-[0.5px] border-kb-chalk">
                {AWARDS.map((a) => (
                  <li key={a.name} className="py-5">
                    <p className="kb-label text-[10px] text-kb-dusk/50">{a.year}</p>
                    <p className="mt-1 font-display text-[20px] font-normal italic text-kb-cacao">
                      {a.name}
                    </p>
                    <p className="mt-1 font-body text-[14px] font-light text-kb-dusk/70">
                      {a.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="kb-label text-[10px] text-kb-terracotta">In the press</p>
              <div className="mt-4 space-y-kb-8">
                {PRESS.map((p) => (
                  <figure key={p.outlet}>
                    <HairlineRule width="40px" variant="terracotta" />
                    <blockquote className="mt-3 kb-accent text-[clamp(18px,2.5vw,24px)] leading-snug text-kb-cacao">
                      &ldquo;{p.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-2 kb-label text-[10px] text-kb-dusk/60">
                      {p.outlet}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-kb-16">
            <GoldCTA href="/contact">Press enquiries →</GoldCTA>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
