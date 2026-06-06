import type { Metadata } from "next";
import { getAllIngredients } from "@/lib/data";
import { BotanicalsGrid } from "@/components/botanicals-grid";
import { PageHero, PageShell } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "The Botanicals",
  description:
    "Every ingredient has a home. The K&B botanical index — shea, baobab, moringa, hibiscus, marula and more, with their origins and uses.",
  alternates: { canonical: "/botanicals" },
};

export default function BotanicalsPage() {
  const ingredients = getAllIngredients();

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Botanicals", href: "/botanicals" },
        ]}
        label="The Botanicals"
        intro="Fifty-plus species, each tied to a place and a practice. This is the index — start with the plant, not the claim."
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <BotanicalsGrid ingredients={ingredients} />
        </div>
      </section>
    </PageShell>
  );
}
