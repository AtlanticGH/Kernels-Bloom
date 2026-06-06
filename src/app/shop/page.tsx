import type { Metadata } from "next";
import Link from "next/link";
import { getAllCategories } from "@/lib/data";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BotanicalIllustration } from "@/components/botanical-illustration";
import { GoldCTA } from "@/components/gold-cta";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Botanical skin, hair, body, lip and circular essentials — organised by ritual, not by SKU.",
  alternates: { canonical: "/shop" },
};

export default function ShopLandingPage() {
  const categories = getAllCategories();

  return (
    <div className="pt-[88px]">
      <section className="mx-auto max-w-kb-max px-6 py-kb-12">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Shop", href: "/shop" }]} />
        <h1 className="mt-6 font-display text-[clamp(40px,6vw,64px)] font-light italic text-kb-cacao">
          The Collection
        </h1>
        <p className="mt-4 max-w-xl font-body text-[16px] font-light leading-relaxed text-kb-dusk/80">
          Six categories of botanical care, and one circular line. Begin with a
          ritual, or browse everything at once.
        </p>
        <div className="mt-8">
          <GoldCTA href="/shop/all">Browse all products →</GoldCTA>
        </div>

        <div className="mt-kb-12 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden bg-kb-linen p-8 ring-[0.5px] ring-kb-chalk transition-colors hover:bg-kb-chalk/60"
            >
              <div className="pointer-events-none absolute right-4 top-4 opacity-60">
                <BotanicalIllustration name={cat.botanicalAnchor} size={120} opacity={0.5} />
              </div>
              <h2 className="font-display text-[26px] font-normal italic text-kb-cacao">
                {cat.name}
              </h2>
              <p className="mt-2 max-w-xs font-body text-[14px] font-light text-kb-dusk/75">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
