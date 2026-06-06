import type { Metadata } from "next";

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
    <div className="grid min-h-[70vh] place-items-center px-6 pt-[88px] text-center">
      <div className="max-w-lg">
        <p className="kb-label text-kb-terracotta">Content Studio</p>
        <h1 className="mt-3 font-display text-[clamp(28px,4vw,44px)] font-light italic text-kb-cacao">
          The Sanity Studio mounts here.
        </h1>
        <p className="mt-4 font-body text-[15px] font-light leading-[1.8] text-kb-dusk/70">
          Schema types — products, ingredients, communities, articles and
          categories — are defined in <code>src/sanity/schema.ts</code>. Add a
          project ID and install the Sanity packages to embed the editing
          experience here. The site currently runs on the matching local data
          layer.
        </p>
      </div>
    </div>
  );
}
