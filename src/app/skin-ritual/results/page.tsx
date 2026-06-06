import type { Metadata } from "next";
import { getAllProducts } from "@/lib/data";
import { ResultsView } from "@/components/results-view";

export const metadata: Metadata = {
  title: "Your Ritual Results",
  description: "Your personalised K&B ritual, built from your quiz answers.",
  alternates: { canonical: "/skin-ritual/results" },
  robots: { index: false },
};

export default function ResultsPage() {
  return (
    <div className="bg-kb-parchment pt-[88px]">
      <section className="py-kb-16">
        <ResultsView products={getAllProducts()} />
      </section>
    </div>
  );
}
