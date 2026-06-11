import type { Metadata } from "next";
import { getCmsBlock } from "@/lib/cms/content";
import { ConsultationForm } from "@/components/consultation-form";
import { PageHero, PageShell } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsBlock("page.consultation");
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: "/skin-ritual/consultation" },
  };
}

export default async function ConsultationPage() {
  const content = await getCmsBlock("page.consultation");

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Skin Ritual", href: "/skin-ritual" },
          { name: "Consultation", href: "/skin-ritual/consultation" },
        ]}
        label={content.label}
        headline={content.headline}
        intro={content.intro}
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-content px-6">
          <ConsultationForm />
        </div>
      </section>
    </PageShell>
  );
}
