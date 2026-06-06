import Link from "next/link";
import type { Ingredient } from "@/lib/types";
import { BotanicalIllustration } from "./botanical-illustration";

/** Botanical grid tile — illustration backdrop with name overlay + hover lift. */
export function IngredientTile({
  ingredient,
  tall = false,
}: {
  ingredient: Ingredient;
  tall?: boolean;
}) {
  return (
    <Link
      href={`/botanicals/${ingredient.slug}`}
      className={`group relative block overflow-hidden bg-kb-parchment ring-[0.5px] ring-kb-chalk transition-transform duration-300 hover:-translate-y-1 ${
        tall ? "aspect-[3/4]" : "aspect-square"
      }`}
    >
      {/* illustration backdrop */}
      <div className="absolute inset-0 grid place-items-center">
        <BotanicalIllustration
          name={ingredient.illustration}
          size="70%"
          opacity={0.5}
          className="transition-opacity duration-300 group-hover:opacity-70"
        />
      </div>
      {/* hover wash */}
      <span className="absolute inset-0 bg-kb-cacao/0 transition-colors duration-300 group-hover:bg-kb-cacao/5" />
      {/* text */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-300 group-hover:-translate-y-1">
        <p className="kb-label text-[10px] text-kb-terracotta">
          {ingredient.origin}
        </p>
        <h3 className="mt-1 font-display text-[24px] font-normal italic text-kb-cacao">
          {ingredient.commonName}
        </h3>
        <p className="kb-accent text-[11px] text-kb-dusk/60">
          {ingredient.latinName}
        </p>
      </div>
    </Link>
  );
}
