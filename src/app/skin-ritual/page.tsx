import type { Metadata } from "next";
import { GoldCTA } from "@/components/gold-cta";
import { KBButton } from "@/components/kb-button";
import { SectionHeader } from "@/components/section-header";
import { PageHero, PageShell } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Skin Ritual",
  description:
    "A short ritual quiz reads your skin and hair, then builds a routine from the botanicals that suit them.",
  alternates: { canonical: "/skin-ritual" },
};

const PATHS = [
  {
    label: "Skin Quiz",
    title: "Read your skin in seven questions.",
    body: "A guided quiz that translates how your skin behaves into a starting routine.",
    href: "/skin-ritual/quiz",
    cta: "Take the skin quiz",
  },
  {
    label: "Consultation",
    title: "One-to-one, with a formulator.",
    body: "Book a private consultation to build a considered routine around your skin and hair.",
    href: "/skin-ritual/consultation",
    cta: "Book a consultation →",
  },
];

export default function SkinRitualPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Skin Ritual", href: "/skin-ritual" },
        ]}
        label="Personalised Ritual"
        intro="No two skins are generic. Choose the path that suits you — a quick quiz, or a conversation."
      />

      <section className="bg-kb-linen py-kb-16">
        <div className="mx-auto grid max-w-kb-max grid-cols-1 gap-px px-6 md:grid-cols-2">
          {PATHS.map((path) => (
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
