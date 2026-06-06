import type { Metadata } from "next";
import { FounderProfile } from "@/components/founder-profile";
import { FounderVideo } from "@/components/founder-video";
import { PageHero, PageShell } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Founder",
  description:
    "The vision behind Kernels & Bloom — and the conviction that Africa's botanicals belong at the luxury tier.",
  alternates: { canonical: "/story/founder" },
};

export default function FounderPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Our Story", href: "/story" },
          { name: "Founder", href: "/story/founder" },
        ]}
        label="Founder"
      />

      <section className="relative overflow-hidden bg-kb-parchment py-kb-16">
        <div className="mx-auto max-w-kb-max px-6">
          <FounderProfile />
          <FounderVideo className="mt-kb-16" />
        </div>
      </section>
    </PageShell>
  );
}
