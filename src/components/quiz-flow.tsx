"use client";

import { useState } from "react";
import type { PageQuizContent } from "@/lib/cms/types";
import type { Product } from "@/lib/types";
import { recommend } from "@/lib/quiz";
import { QuizStep } from "./quiz-step";
import { ProductCard } from "./product-card";
import { CornerBrackets } from "./corner-brackets";
import { GoldCTA } from "./gold-cta";

type QuizFlowProps = {
  products: Product[];
  config: PageQuizContent;
};

export function QuizFlow({ products, config }: QuizFlowProps) {
  const questions = config.questions.filter(
    (q) => q.question.trim() && q.options.length > 0
  );
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const total = questions.length;

  if (total === 0) {
    return (
      <p className="mx-auto max-w-md px-6 text-center font-body text-[15px] font-light text-kb-dusk/70">
        No quiz questions are configured yet. Add them in the CMS under Skin
        Ritual → Skin quiz.
      </p>
    );
  }

  function handleSelect(value: string) {
    const q = questions[step];
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    setTimeout(() => {
      if (step < total - 1) setStep((s) => s + 1);
      else setDone(true);
    }, 300);
  }

  async function saveResults(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    try {
      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, email }),
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("kb-quiz", JSON.stringify(answers));
      }
    } catch {
      /* non-blocking */
    }
  }

  if (done) {
    const picks = recommend(answers, products);
    return (
      <div className="mx-auto max-w-kb-max px-6">
        <div className="text-center">
          <p className="kb-label text-kb-terracotta">{config.resultsLabel}</p>
          <h1 className="mt-3 font-display text-[clamp(36px,5vw,52px)] font-light italic text-kb-cacao">
            {config.resultsHeadline}
          </h1>
          <p className="mx-auto mt-4 max-w-md font-body text-[15px] font-light text-kb-dusk/80">
            {config.resultsBody}
          </p>
        </div>

        <div className="mx-auto mt-kb-12 grid max-w-4xl grid-cols-1 gap-x-6 gap-y-kb-8 sm:grid-cols-3">
          {picks.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <div className="relative mx-auto mt-kb-12 max-w-lg bg-kb-linen p-8">
          <CornerBrackets arm={24} inset={12} />
          <div className="relative text-center">
            {saved ? (
              <p className="kb-accent text-[18px] text-kb-cacao">
                {config.savedMessage}
              </p>
            ) : (
              <>
                <p className="kb-label text-[10px] text-kb-terracotta">
                  {config.saveSectionLabel}
                </p>
                <form onSubmit={saveResults} className="mt-4 flex items-end gap-3">
                  <div className="flex-1">
                    <label htmlFor="quiz-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="quiz-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={config.emailPlaceholder}
                      className="w-full border-0 border-b-[0.5px] border-kb-chalk bg-transparent pb-2 font-body text-[15px] font-light outline-none focus:border-kb-terracotta"
                    />
                  </div>
                  <button
                    type="submit"
                    className="kb-label rounded-kb bg-kb-cacao px-5 py-2 text-[11px] text-kb-parchment hover:bg-kb-terracotta"
                  >
                    {config.saveButtonLabel}
                  </button>
                </form>
              </>
            )}
            <div className="mt-6">
              <GoldCTA href={config.consultationHref}>
                {config.consultationCta}
              </GoldCTA>
            </div>
          </div>
        </div>

        <div className="mt-kb-8 text-center">
          <button
            type="button"
            onClick={() => {
              setStep(0);
              setAnswers({});
              setDone(false);
              setSaved(false);
            }}
            className="kb-gold-cta text-kb-dusk/60"
          >
            {config.retakeLabel}
          </button>
        </div>
      </div>
    );
  }

  const q = questions[step];
  return (
    <QuizStep
      stepLabel={q.stepLabel}
      question={q.question}
      options={q.options}
      selected={answers[q.id]}
      onSelect={handleSelect}
      current={step + 1}
      total={total}
    />
  );
}
