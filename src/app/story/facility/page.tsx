import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, PageShell } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "The Facility",
  description:
    "Where Africa's botanicals become formulations — small-batch, science-led, and close to source, in Ghana.",
  alternates: { canonical: "/story/facility" },
};

export default function FacilityPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Our Story", href: "/story" },
          { name: "The Facility", href: "/story/facility" },
        ]}
        label="The Facility"
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-content px-6">
          <div className="relative aspect-[16/9] overflow-hidden bg-kb-chalk">
            <Image
              src="/images/DSC09558.jpg"
              alt="Finished K&B body care — hand lotion, scrub, cream and barrier lotion grouped on a dark surface"
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              className="object-cover"
            />
          </div>

          <div className="mt-kb-8 max-w-[680px] space-y-5 font-body text-[16px] font-light leading-[1.85] text-kb-dusk/85">
            <p>
              Our facility sits close to the communities we source from, which
              keeps kernels and pulp fresh and keeps decisions accountable to the
              people who grow them.
            </p>
            <p>
              We work in small batches. Oils are pressed or received cold, blended
              with care, and held to the same standards a clinical brand would
              recognise — only with botanicals named for where they come from.
            </p>
            <p>
              Every batch carries a code, so what reaches you can be traced back
              to a season and a source.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
