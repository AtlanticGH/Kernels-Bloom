import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false },
};

// Placeholder for the Sanity Studio mount point. Schema definitions live in
// src/sanity/schema.ts. To activate the live Studio, install `sanity` and
// `next-sanity`, then replace this file with the NextStudio embed at
// src/app/studio/[[...tool]]/page.tsx (see src/sanity/README.md).
export default function StudioPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Studio", href: "/studio" }]}
        label="Content Studio"
        headline="Content Studio"
        intro="The Sanity Studio mounts here."
      />

      <section className="bg-kb-parchment py-kb-12">
        <div className="mx-auto max-w-lg px-6 text-center">
          <p className="font-body text-[15px] font-light leading-[1.8] text-kb-dusk/70">
            Schema types — products, ingredients, communities, articles and
            categories — are defined in <code>src/sanity/schema.ts</code>. Add a
            project ID and install the Sanity packages to embed the editing
            experience here. The site currently runs on the matching local data
            layer.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
