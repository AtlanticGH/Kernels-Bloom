import type { Metadata } from "next";
import { getAllCommunities } from "@/lib/data";
import { SourcingMap } from "@/components/sourcing-map";
import { PageHero, PageShell } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Community Partners",
  description:
    "The twenty-plus cooperatives and gatherers we source with, shown as geography — from Northern Ghana to the Kalahari.",
  alternates: { canonical: "/story/communities" },
};

export default function CommunitiesPage() {
  const communities = getAllCommunities();

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Our Story", href: "/story" },
          { name: "Community Partners", href: "/story/communities" },
        ]}
        label="Community Partners"
        intro="We buy at the cooperative, in cash, at a price the partners set. Hover a pin to read who supplies what, and from where."
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <SourcingMap communities={communities} />
        </div>
      </section>
    </PageShell>
  );
}
