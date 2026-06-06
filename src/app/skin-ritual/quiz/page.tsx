import type { Metadata } from "next";
import { getAllProducts } from "@/lib/data";
import { QuizFlow } from "@/components/quiz-flow";

export const metadata: Metadata = {
  title: "The Ritual Quiz",
  description:
    "Seven questions to read your skin and hair, then a routine built from the botanicals that suit them.",
  alternates: { canonical: "/skin-ritual/quiz" },
};

export default function QuizPage() {
  const products = getAllProducts();
  return (
    <div className="bg-kb-parchment pt-[88px]">
      <section className="py-kb-12">
        <QuizFlow products={products} />
      </section>
    </div>
  );
}
