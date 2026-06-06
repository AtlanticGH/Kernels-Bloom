import type { Metadata } from "next";
import { getAllProducts } from "@/lib/data";
import { QuizFlow } from "@/components/quiz-flow";
import { PageHero, PageShell } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "The Ritual Quiz",
  description:
    "Seven questions to read your skin and hair, then a routine built from the botanicals that suit them.",
  alternates: { canonical: "/skin-ritual/quiz" },
};

export default function QuizPage() {
  const products = getAllProducts();
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Skin Ritual", href: "/skin-ritual" },
          { name: "Quiz", href: "/skin-ritual/quiz" },
        ]}
        label="Skin Quiz"
        headline="Read your skin in seven questions."
        intro="Seven questions to read your skin and hair, then a routine built from the botanicals that suit them."
      />

      <section className="bg-kb-parchment py-kb-12">
        <QuizFlow products={products} />
      </section>
    </PageShell>
  );
}
