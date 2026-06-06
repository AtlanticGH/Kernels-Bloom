import type { Metadata } from "next";
import { getAllIngredients } from "@/lib/data";
import { CornerBrackets } from "@/components/corner-brackets";
import { GrainOverlay } from "@/components/grain-overlay";
import { BotanicalsGrid } from "@/components/botanicals-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "The Botanicals",
  description:
    "Every ingredient has a home. The K&B botanical index — shea, baobab, moringa, hibiscus, marula and more, with their origins and uses.",
  alternates: { canonical: "/botanicals" },
};

export default function BotanicalsPage() {
  const ingredients = getAllIngredients();

  return (
    <div className="pt-[72px]">
      {/* hero */}
      <section className="relative overflow-hidden bg-kb-dusk py-kb-16">
        <GrainOverlay opacity={0.05} />
        <CornerBrackets arm={64} inset={32} />
        <div className="relative mx-auto max-w-kb-max px-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Botanicals", href: "/botanicals" },
            ]}
          />
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(40px,7vw,64px)] font-light italic leading-[1.05] text-kb-parchment">
            Every ingredient has a home.
          </h1>
          <p className="mt-6 max-w-xl font-body text-[16px] font-light leading-relaxed text-kb-parchment/70">
            Fifty-plus species, each tied to a place and a practice. This is the
            index — start with the plant, not the claim.
          </p>
        </div>
      </section>

      {/* grid */}
      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <BotanicalsGrid ingredients={ingredients} />
        </div>
      </section>
    </div>
  );
}
