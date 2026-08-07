import Image from "next/image";
import Link from "next/link";
import type { Ingredient } from "@/lib/types";
import { BotanicalIllustration } from "./botanical-illustration";

/** Botanical grid tile — photo or illustration backdrop with name overlay + hover lift. */
export function IngredientTile({
  ingredient,
  tall = false,
}: {
  ingredient: Ingredient;
  tall?: boolean;
}) {
  const hasPhoto = Boolean(ingredient.tileImage);

  return (
    <Link
      href={`/botanicals/${ingredient.slug}`}
      className={`group relative block overflow-hidden bg-kb-parchment ring-[0.5px] ring-kb-chalk transition-transform duration-300 hover:-translate-y-1 ${
        tall ? "aspect-[3/4]" : "aspect-square"
      }`}
    >
      {hasPhoto ? (
        <>
          <Image
            src={ingredient.tileImage!}
            alt={ingredient.commonName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-kb-cacao/80 via-kb-cacao/25 to-kb-cacao/5" />
        </>
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <BotanicalIllustration
            name={ingredient.illustration}
            size="70%"
            opacity={0.5}
            className="transition-opacity duration-300 group-hover:opacity-70"
          />
        </div>
      )}
      <span className="absolute inset-0 bg-kb-cacao/0 transition-colors duration-300 group-hover:bg-kb-cacao/5" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-300 group-hover:-translate-y-1">
        <p
          className={`kb-label text-[10px] ${hasPhoto ? "text-kb-gold" : "text-kb-terracotta"}`}
        >
          {ingredient.origin}
        </p>
        <h3
          className={`mt-1 font-display text-[24px] font-normal italic ${
            hasPhoto ? "text-kb-parchment" : "text-kb-cacao"
          }`}
        >
          {ingredient.commonName}
        </h3>
        <p
          className={`kb-accent text-[11px] ${
            hasPhoto ? "text-kb-parchment/70" : "text-kb-dusk/60"
          }`}
        >
          {ingredient.latinName}
        </p>
      </div>
    </Link>
  );
}
