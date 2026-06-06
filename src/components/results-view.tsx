"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { recommend } from "@/lib/quiz";
import { ProductCard } from "./product-card";
import { KBButton } from "./kb-button";

export function ResultsView({ products }: { products: Product[] }) {
  const [answers, setAnswers] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kb-quiz");
      if (raw) setAnswers(JSON.parse(raw));
      else setAnswers({});
    } catch {
      setAnswers({});
    }
  }, []);

  if (answers === null) return null;

  if (Object.keys(answers).length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 text-center">
        <h1 className="font-display text-[clamp(32px,5vw,48px)] font-light italic text-kb-cacao">
          No ritual saved yet.
        </h1>
        <p className="mt-4 font-body text-[15px] font-light text-kb-dusk/80">
          Take the quiz and save your results to see them here.
        </p>
        <div className="mt-8">
          <KBButton href="/skin-ritual/quiz">Take the skin quiz</KBButton>
        </div>
      </div>
    );
  }

  const picks = recommend(answers, products);
  return (
    <div className="mx-auto max-w-kb-max px-6">
      <div className="text-center">
        <p className="kb-label text-kb-terracotta">Your saved ritual</p>
        <h1 className="mt-3 font-display text-[clamp(36px,5vw,52px)] font-light italic text-kb-cacao">
          Your ritual starts here.
        </h1>
      </div>
      <div className="mx-auto mt-kb-12 grid max-w-4xl grid-cols-1 gap-x-6 gap-y-kb-8 sm:grid-cols-3">
        {picks.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
