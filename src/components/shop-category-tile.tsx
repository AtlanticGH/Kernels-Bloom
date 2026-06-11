import Image from "next/image";
import Link from "next/link";
import type { ProductCategory } from "@/lib/types";
import { BotanicalIllustration } from "./botanical-illustration";

/** Shop landing category tile — photo or illustration with name overlay. */
export function ShopCategoryTile({ category }: { category: ProductCategory }) {
  const hasPhoto = Boolean(category.tileImage);

  return (
    <Link
      href={`/shop/${category.slug}`}
      className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden bg-kb-linen p-8 ring-[0.5px] ring-kb-chalk transition-transform duration-300 hover:-translate-y-1"
    >
      {hasPhoto ? (
        <>
          <Image
            src={category.tileImage!}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-kb-cacao/85 via-kb-cacao/35 to-kb-cacao/10" />
        </>
      ) : (
        <div className="pointer-events-none absolute right-4 top-4 opacity-60">
          <BotanicalIllustration
            name={category.botanicalAnchor}
            size={120}
            opacity={0.5}
          />
        </div>
      )}
      <span className="absolute inset-0 bg-kb-cacao/0 transition-colors duration-300 group-hover:bg-kb-cacao/5" />
      <div className="relative transition-transform duration-300 group-hover:-translate-y-1">
        <h2
          className={`font-display text-[26px] font-normal italic ${
            hasPhoto ? "text-kb-parchment" : "text-kb-cacao"
          }`}
        >
          {category.name}
        </h2>
        <p
          className={`mt-2 max-w-xs font-body text-[14px] font-light ${
            hasPhoto ? "text-kb-parchment/80" : "text-kb-dusk/75"
          }`}
        >
          {category.description}
        </p>
      </div>
    </Link>
  );
}
