import Image from "next/image";
import Link from "next/link";
import type { Ingredient } from "@/lib/types";
import { cmsImageUnoptimized } from "@/lib/cms-image";
import { BotanicalIllustration } from "./botanical-illustration";

/** Botanical grid tile — photo or illustration backdrop with name overlay + hover lift. */
export function IngredientTile({
  ingredient,
  className = "",
}: {
  ingredient: Ingredient;
  className?: string;
}) {
  const hasPhoto = Boolean(ingredient.tileImage);

  return (
    <Link
      href={`/botanicals/${ingredient.slug}`}
      className={`group relative block aspect-[4/5] overflow-hidden bg-kb-parchment ring-[0.5px] ring-kb-chalk transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      {hasPhoto ? (
        <>
          <Image
            src={ingredient.tileImage!}
            alt={ingredient.commonName}
            fill
            unoptimized={cmsImageUnoptimized(ingredient.tileImage)}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-kb-cacao/85 via-kb-cacao/30 to-kb-cacao/5" />
        </>
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-kb-linen/60">
          <BotanicalIllustration
            name={ingredient.illustration}
            size="62%"
            opacity={0.45}
            className="transition-opacity duration-300 group-hover:opacity-65"
          />
        </div>
      )}
      <span className="absolute inset-0 bg-kb-cacao/0 transition-colors duration-300 group-hover:bg-kb-cacao/5" />
      <div className="absolute inset-0 flex flex-col justify-end gap-0.5 p-6 transition-transform duration-300 group-hover:-translate-y-1 sm:p-7">
        <p
          className={`kb-label text-[12px] leading-none ${hasPhoto ? "text-kb-gold" : "text-kb-terracotta"}`}
        >
          {ingredient.origin}
        </p>
        <h3
          className={`font-display text-[clamp(26px,3.2vw,34px)] font-normal italic leading-none ${
            hasPhoto ? "text-kb-parchment" : "text-kb-cacao"
          }`}
        >
          {ingredient.commonName}
        </h3>
        <p
          className={`kb-accent text-[13px] leading-none ${
            hasPhoto ? "text-kb-parchment/70" : "text-kb-dusk/60"
          }`}
        >
          {ingredient.latinName}
        </p>
      </div>
    </Link>
  );
}
