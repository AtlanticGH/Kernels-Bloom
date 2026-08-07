"use client";

import { useMemo, useState } from "react";
import type { Ingredient } from "@/lib/types";
import { IngredientTile } from "./ingredient-tile";

type BotanicalTab = "all" | string;

export function BotanicalsGrid({ ingredients }: { ingredients: Ingredient[] }) {
  const [active, setActive] = useState<BotanicalTab>("all");

  const tabs = useMemo(
    () => [
      { id: "all" as const, label: "All" },
      ...ingredients.map((ingredient) => ({
        id: ingredient.slug,
        label: ingredient.commonName,
      })),
    ],
    [ingredients]
  );

  const filtered = useMemo(
    () =>
      active === "all"
        ? ingredients
        : ingredients.filter((ingredient) => ingredient.slug === active),
    [ingredients, active]
  );

  const isSolo = active !== "all";

  return (
    <div>
      <div
        className="-mx-6 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Botanicals"
      >
        <div className="flex w-max min-w-full gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => setActive(tab.id)}
              className={`kb-label shrink-0 rounded-kb border-[0.5px] px-4 py-2 text-[10px] transition-colors ${
                active === tab.id
                  ? "border-kb-cacao bg-kb-cacao text-kb-parchment"
                  : "border-kb-chalk text-kb-dusk/70 hover:border-kb-cacao"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`mt-kb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${
          isSolo ? "mx-auto max-w-sm sm:max-w-none" : ""
        }`}
      >
        {filtered.map((ingredient) => (
          <IngredientTile key={ingredient.slug} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
}
