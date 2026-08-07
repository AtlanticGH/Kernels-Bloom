"use client";

import { useMemo, useState } from "react";
import type { Ingredient } from "@/lib/types";
import { IngredientTile } from "./ingredient-tile";

const GROUPS = ["All", "Oils", "Butters", "Extracts", "Active"] as const;

export function BotanicalsGrid({ ingredients }: { ingredients: Ingredient[] }) {
  const [group, setGroup] = useState<(typeof GROUPS)[number]>("All");

  const filtered = useMemo(
    () =>
      group === "All"
        ? ingredients
        : ingredients.filter((i) => i.group === group),
    [ingredients, group]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {GROUPS.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGroup(g)}
            className={`kb-label rounded-kb border-[0.5px] px-4 py-2 text-[10px] transition-colors ${
              group === g
                ? "border-kb-cacao bg-kb-cacao text-kb-parchment"
                : "border-kb-chalk text-kb-dusk/70 hover:border-kb-cacao"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="mt-kb-8 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ingredient, i) => (
          <IngredientTile
            key={ingredient.slug}
            ingredient={ingredient}
            tall={i % 3 === 1}
          />
        ))}
      </div>
    </div>
  );
}
