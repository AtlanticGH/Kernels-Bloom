import type { Metadata } from "next";
import { CornerBrackets } from "@/components/corner-brackets";
import { GoldCTA } from "@/components/gold-cta";
import { KBButton } from "@/components/kb-button";
import { SectionHeader } from "@/components/section-header";
import { Breadcrumbs } from "@/components/breadcrumbs";

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
    <div className="pt-[88px]">
      <section className="relative overflow-hidden bg-kb-parchment py-kb-12">
        <CornerBrackets arm={60} inset={32} />
        <div className="relative mx-auto max-w-kb-max px-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Skin Ritual", href: "/skin-ritual" },
            ]}
          />
          <h1 className="mt-6 max-w-2xl font-display text-[clamp(40px,6vw,64px)] font-light italic text-kb-cacao">
            Botanicals chosen for you, specifically.
          </h1>
          <p className="mt-6 max-w-xl font-body text-[16px] font-light leading-relaxed text-kb-dusk/80">
            No two skins are generic. Choose the path that suits you — a quick
            quiz, or a conversation.
          </p>
        </div>
      </section>

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
    </div>
  );
}
