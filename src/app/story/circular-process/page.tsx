import type { Metadata } from "next";
import { CircularDiagram } from "@/components/circular-diagram";
import { Accordion } from "@/components/accordion";
import { PageHero, PageShell } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "The Circular Process",
  description:
    "From botanical sourcing to upcycling, formulation and circular return — how Kernels & Bloom closes the loop.",
  alternates: { canonical: "/story/circular-process" },
};

export default function CircularProcessPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Our Story", href: "/story" },
          { name: "Circular Process", href: "/story/circular-process" },
        ]}
        label="Circular Process"
        headline="Waste, transformed into luxury."
        intro="Circularity is not a marketing layer for us. Increasingly, it is where the formulations begin."
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-kb-max px-6">
          <CircularDiagram />
        </div>
      </section>

      <section className="bg-kb-linen py-kb-12">
        <div className="mx-auto max-w-kb-content px-6">
          <Accordion
            items={[
              {
                label: "Botanical Sourcing",
                content: (
                  <p>
                    We gather wild and cooperative-grown botanicals across
                    Ghana and the continent, designed around leaving the tree
                    standing — fallen baobab pods rather than felled trees,
                    cooperative shea rather than extractive supply.
                  </p>
                ),
              },
              {
                label: "Upcycle & Refine",
                content: (
                  <p>
                    The Kalahari melon seed — long discarded after harvest — is
                    pressed into a clear, balancing oil. Upcycling turns a
                    by-product into the heart of a luxury line.
                  </p>
                ),
              },
              {
                label: "Formulation",
                content: (
                  <p>
                    Small-batch, science-led formulation in Ghana, with batch
                    codes for traceability and minimal, recyclable packaging.
                  </p>
                ),
              },
              {
                label: "Circular Return",
                content: (
                  <p>
                    Glass and refills return through our programme. The goal is
                    a closed loop: nothing in the chain treated as waste.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>
    </PageShell>
  );
}
