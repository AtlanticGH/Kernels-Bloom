import type { Metadata } from "next";
import { CornerBrackets } from "@/components/corner-brackets";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ConsultationForm } from "@/components/consultation-form";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "A private, one-to-one consultation to build a considered routine around your skin and hair.",
  alternates: { canonical: "/skin-ritual/consultation" },
};

export default function ConsultationPage() {
  return (
    <div className="pt-[88px]">
      <section className="relative overflow-hidden bg-kb-parchment py-kb-12">
        <CornerBrackets arm={48} inset={24} />
        <div className="relative mx-auto max-w-kb-content px-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Skin Ritual", href: "/skin-ritual" },
              { name: "Consultation", href: "/skin-ritual/consultation" },
            ]}
          />
          <h1 className="mt-6 font-display text-[clamp(36px,5vw,52px)] font-light italic text-kb-cacao">
            One-to-one, with a formulator.
          </h1>
          <p className="mt-4 max-w-xl font-body text-[16px] font-light leading-relaxed text-kb-dusk/80">
            Tell us a little about your skin and hair. We&apos;ll arrange a
            private consultation and build a routine around them.
          </p>

          <div className="mt-kb-12">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </div>
  );
}
