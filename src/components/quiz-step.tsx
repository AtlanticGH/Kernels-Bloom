import { CornerBrackets } from "./corner-brackets";

type QuizStepProps = {
  stepLabel: string;
  question: string;
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
  current: number;
  total: number;
};

/** A single quiz question card: progress, label, question, answer options. */
export function QuizStep({
  stepLabel,
  question,
  options,
  selected,
  onSelect,
  current,
  total,
}: QuizStepProps) {
  const progress = (current / total) * 100;

  return (
    <div className="relative mx-auto max-w-2xl bg-kb-parchment px-6 py-kb-12 sm:px-kb-12">
      <CornerBrackets arm={48} inset={16} />

      <div className="relative">
        {/* progress */}
        <div className="flex items-center justify-between">
          <p className="kb-label text-[12px] text-kb-dusk/60">
            Step {current} of {total}
          </p>
          <p className="kb-label text-[10px] text-kb-terracotta">{stepLabel}</p>
        </div>
        <div className="mt-3 h-[0.5px] w-full bg-kb-chalk" aria-hidden="true">
          <div
            className="h-[0.5px] bg-kb-gold transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="mt-kb-6 font-display text-[clamp(26px,4vw,36px)] font-normal italic text-kb-cacao">
          {question}
        </h2>

        <div
          role="radiogroup"
          aria-label={question}
          className="mt-kb-6 grid gap-3 sm:grid-cols-2"
        >
          {options.map((option) => {
            const active = selected === option;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onSelect(option)}
                className={`rounded-kb border-[0.5px] px-5 py-4 text-left font-body text-[15px] font-light transition-colors duration-200 ${
                  active
                    ? "border-kb-gold bg-kb-cacao/5 text-kb-cacao"
                    : "border-kb-chalk text-kb-dusk/80 hover:border-kb-gold"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
