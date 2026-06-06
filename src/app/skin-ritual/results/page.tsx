import type { Metadata } from "next";
import { getAllProducts } from "@/lib/data";
import { ResultsView } from "@/components/results-view";
import { PageHero, PageShell } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Your Ritual Results",
  description: "Your personalised K&B ritual, built from your quiz answers.",
  alternates: { canonical: "/skin-ritual/results" },
  robots: { index: false },
};

export default function ResultsPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Skin Ritual", href: "/skin-ritual" },
          { name: "Results", href: "/skin-ritual/results" },
        ]}
        label="Your Ritual"
        headline="Your personalised ritual."
        intro="Your personalised K&B ritual, built from your quiz answers."
      />

      <section className="bg-kb-parchment py-kb-16">
        <ResultsView products={getAllProducts()} />
      </section>
    </PageShell>
  );
}
