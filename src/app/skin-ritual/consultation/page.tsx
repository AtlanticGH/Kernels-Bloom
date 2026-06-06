import type { Metadata } from "next";
import { ConsultationForm } from "@/components/consultation-form";
import { PageHero, PageShell } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "A private, one-to-one consultation to build a considered routine around your skin and hair.",
  alternates: { canonical: "/skin-ritual/consultation" },
};

export default function ConsultationPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Skin Ritual", href: "/skin-ritual" },
          { name: "Consultation", href: "/skin-ritual/consultation" },
        ]}
        label="Consultation"
        intro="Tell us a little about your skin and hair. We'll arrange a private consultation and build a routine around them."
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-content px-6">
          <ConsultationForm />
        </div>
      </section>
    </PageShell>
  );
}
