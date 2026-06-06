import type { Metadata } from "next";
import { getAllCommunities } from "@/lib/data";
import { SectionHeader } from "@/components/section-header";
import { SourcingMap } from "@/components/sourcing-map";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Community Partners",
  description:
    "The twenty-plus cooperatives and gatherers we source with, shown as geography — from Northern Ghana to the Kalahari.",
  alternates: { canonical: "/story/communities" },
};

export default function CommunitiesPage() {
  const communities = getAllCommunities();

  return (
    <div className="pt-[88px]">
      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Our Story", href: "/story" },
              { name: "Community Partners", href: "/story/communities" },
            ]}
          />
          <div className="mt-6">
            <SectionHeader
              label="Sourcing Map"
              headline="Twenty-plus communities, named."
            />
          </div>
          <p className="mt-6 max-w-xl font-body text-[16px] font-light leading-relaxed text-kb-dusk/80">
            We buy at the cooperative, in cash, at a price the partners set.
            Hover a pin to read who supplies what, and from where.
          </p>

          <div className="mt-kb-12">
            <SourcingMap communities={communities} />
          </div>
        </div>
      </section>
    </div>
  );
}
