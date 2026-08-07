import type { Product } from "@/lib/types";

export type Question = {
  id: string;
  stepLabel: string;
  question: string;
  options: string[];
};

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: "concern",
    stepLabel: "Concern",
    question: "What's your primary skin concern?",
    options: ["Hydration", "Uneven Tone", "Ageing", "Sensitivity", "Oiliness", "Acne"],
  },
  {
    id: "midday",
    stepLabel: "Balance",
    question: "How does your skin feel mid-day?",
    options: ["Tight", "Balanced", "Oily all over", "Oily T-zone only", "Normal"],
  },
  {
    id: "oil-use",
    stepLabel: "Habit",
    question: "How often do you currently use facial oil?",
    options: ["Never", "Occasionally", "Every other day", "Daily"],
  },
  {
    id: "morning",
    stepLabel: "Morning",
    question: "What's your skin's biggest complaint in the morning?",
    options: ["Dull", "Dry patches", "Shine", "Fine lines", "Redness"],
  },
  {
    id: "values",
    stepLabel: "Values",
    question: "What matters most to you in a product?",
    options: ["Clean ingredients", "Proven efficacy", "Scent", "Texture", "Origin"],
  },
  {
    id: "hair-type",
    stepLabel: "Hair",
    question: "What is your hair type?",
    options: ["Fine & straight", "Wavy", "Curly", "Coily", "Locs"],
  },
  {
    id: "hair-routine",
    stepLabel: "Routine",
    question: "How would you describe your current haircare routine?",
    options: ["Minimal", "Weekly treatment", "Daily", "Building a routine"],
  },
];

/**
 * Lightweight rules engine: score each product against the answers and return
 * the top three. Deterministic and good enough for a styling/UX demo.
 */
export function recommend(
  answers: Record<string, string>,
  products: Product[]
): Product[] {
  const scored = products.map((p) => {
    let score = p.featured ? 1 : 0;
    const concern = answers.concern;
    const midday = answers.midday;

    if (concern === "Hydration" && p.keyIngredient === "shea") score += 3;
    if (concern === "Uneven Tone" && p.keyIngredient === "hibiscus") score += 3;
    if (concern === "Ageing" && p.keyIngredient === "baobab") score += 3;
    if (concern === "Sensitivity" && p.category === "kids-baby") score += 3;
    if ((concern === "Oiliness" || concern === "Acne") && p.keyIngredient === "moringa")
      score += 3;
    if ((concern === "Oiliness" || concern === "Acne") && p.keyIngredient === "kalahari-melon")
      score += 2;

    if (midday === "Tight" && p.skinTypes.includes("Dry")) score += 2;
    if ((midday === "Oily all over" || midday === "Oily T-zone only") &&
        p.skinTypes.includes("Oily"))
      score += 2;

    if (["Curly", "Coily", "Locs"].includes(answers["hair-type"]) &&
        p.category === "hair-scalp")
      score += 2;

    return { product: p, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.product);
}
