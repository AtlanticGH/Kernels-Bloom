import type { Metadata } from "next";
import { getCmsBlock } from "@/lib/cms/content";
import { getAllProducts } from "@/lib/data";
import { QuizFlow } from "@/components/quiz-flow";
import { PageHero, PageShell } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsBlock("page.quiz");
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: "/skin-ritual/quiz" },
  };
}

export default async function QuizPage() {
  const [content, products] = await Promise.all([
    getCmsBlock("page.quiz"),
    getAllProducts(),
  ]);

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Skin Ritual", href: "/skin-ritual" },
          { name: "Quiz", href: "/skin-ritual/quiz" },
        ]}
        label={content.label}
        headline={content.headline}
        intro={content.intro}
      />

      <section className="bg-kb-parchment py-kb-12">
        <QuizFlow products={products} config={content} />
      </section>
    </PageShell>
  );
}
