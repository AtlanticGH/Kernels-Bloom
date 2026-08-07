import { GoldCTA } from "@/components/gold-cta";
import { HairlineRule } from "@/components/hairline-rule";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

/** Editorial shop bridge at the end of a journal article. */
export function JournalStoryProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  const gridCols =
    products.length === 1
      ? "grid-cols-1 max-w-sm"
      : products.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : products.length === 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section
      className="border-t-[0.5px] border-kb-chalk bg-kb-linen"
      aria-labelledby="journal-story-products-heading"
    >
      <div className="mx-auto max-w-kb-max px-6 py-kb-16">
        <div className="grid grid-cols-1 gap-kb-12 lg:grid-cols-[minmax(0,260px)_1fr] lg:items-start lg:gap-x-kb-16">
          <div>
            <HairlineRule width="48px" variant="terracotta" />
            <p className="mt-5 kb-label text-[10px] text-kb-terracotta">
              Shop the story
            </p>
            <h2
              id="journal-story-products-heading"
              className="mt-2 font-display text-[clamp(28px,3.5vw,40px)] font-light italic leading-[1.12] text-kb-cacao"
            >
              From this story
            </h2>
            <p className="mt-4 font-body text-[15px] font-light leading-[1.75] text-kb-dusk/70">
              Formulations woven through what you just read — carry the ritual
              from page to shelf.
            </p>
            <div className="mt-6">
              <GoldCTA href="/shop">Browse all products →</GoldCTA>
            </div>
            <p className="mt-8 kb-label text-[10px] text-kb-dusk/45">
              {products.length}{" "}
              {products.length === 1 ? "formulation" : "formulations"}
            </p>
          </div>

          <div className={`grid ${gridCols} gap-x-6 gap-y-kb-10`}>
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} square bare />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
