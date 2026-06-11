import Link from "next/link";
import type { Ingredient, Product } from "@/lib/types";

function DetailCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen/50 px-4 py-3">
      <p className="kb-label text-[9px] text-kb-gold">{label}</p>
      <p className="mt-1 font-body text-[14px] font-light text-kb-cacao">{value}</p>
    </div>
  );
}

export function ProductDetailsPanel({
  product,
  keyIngredient,
  botanicals,
}: {
  product: Product;
  keyIngredient?: Ingredient;
  botanicals: Ingredient[];
}) {
  return (
    <div className="space-y-8">
      <div>
        <p className="kb-label text-[10px] text-kb-terracotta">At a glance</p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <DetailCell label="Volume" value={product.volume} />
          <DetailCell
            label="Availability"
            value={product.inStock ? "In stock" : "Join waitlist"}
          />
          {keyIngredient && (
            <DetailCell
              label="Key botanical"
              value={keyIngredient.commonName}
            />
          )}
          {keyIngredient && (
            <DetailCell label="Origin" value={keyIngredient.origin} />
          )}
          {keyIngredient && (
            <DetailCell
              label="Primary benefit"
              value={keyIngredient.primaryBenefit}
            />
          )}
        </div>
      </div>

      {product.skinTypes.length > 0 && (
        <div>
          <p className="kb-label text-[10px] text-kb-terracotta">Suited to</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {product.skinTypes.map((type) => (
              <li
                key={type}
                className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-parchment px-3 py-1.5 font-body text-[12px] font-light text-kb-dusk"
              >
                {type}
              </li>
            ))}
          </ul>
        </div>
      )}

      {botanicals.length > 0 && (
        <div>
          <p className="kb-label text-[10px] text-kb-terracotta">Botanical blend</p>
          <ul className="mt-3 divide-y-[0.5px] divide-kb-chalk border-y-[0.5px] border-kb-chalk">
            {botanicals.map((ingredient) => (
              <li key={ingredient.slug} className="py-4">
                <Link
                  href={`/botanicals/${ingredient.slug}`}
                  className="group block"
                >
                  <p className="font-display text-[18px] italic text-kb-cacao transition-colors group-hover:text-kb-terracotta">
                    {ingredient.commonName}
                  </p>
                  <p className="mt-0.5 font-body text-[12px] font-light text-kb-dusk/55">
                    {ingredient.latinName}
                  </p>
                  <p className="mt-2 font-body text-[14px] font-light leading-relaxed text-kb-dusk/75">
                    {ingredient.primaryBenefit} · {ingredient.origin}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function ProductSourcingStory({
  keyIngredient,
  botanicals,
}: {
  keyIngredient?: Ingredient;
  botanicals: Ingredient[];
}) {
  if (!keyIngredient && botanicals.length === 0) {
    return <p>Sourcing details coming soon.</p>;
  }

  return (
    <div className="space-y-4">
      {keyIngredient && (
        <div>
          <p className="font-body text-[15px] font-light leading-[1.85] text-kb-dusk/85">
            {keyIngredient.bodyText.slice(0, 2).join(" ")}
          </p>
          <p className="mt-3">
            <Link
              href={`/botanicals/${keyIngredient.slug}`}
              className="font-body text-[14px] font-light text-kb-terracotta underline-offset-2 hover:underline"
            >
              Read the full {keyIngredient.commonName} story →
            </Link>
          </p>
        </div>
      )}
      {botanicals.length > 1 && (
        <div>
          <p className="kb-label text-[10px] text-kb-gold">Also in this formula</p>
          <ul className="mt-2 space-y-1 font-body text-[14px] font-light text-kb-dusk/75">
            {botanicals
              .filter((ing) => ing.slug !== keyIngredient?.slug)
              .map((ing) => (
                <li key={ing.slug}>
                  <Link
                    href={`/botanicals/${ing.slug}`}
                    className="text-kb-terracotta underline-offset-2 hover:underline"
                  >
                    {ing.commonName}
                  </Link>
                  {" — "}
                  {ing.origin}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
