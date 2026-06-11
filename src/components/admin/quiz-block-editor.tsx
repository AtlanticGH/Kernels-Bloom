"use client";

import type { CmsQuizQuestion, PageQuizContent } from "@/lib/cms/types";

type QuizBlockEditorProps = {
  data: PageQuizContent;
  onChange: (data: PageQuizContent) => void;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function TextField({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="block min-w-0">
      <span className="kb-label text-[10px] text-kb-terracotta">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="mt-2 w-full resize-y rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-2 font-body text-[14px] font-light leading-relaxed text-kb-dusk outline-none focus:border-kb-gold"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-2 font-body text-[14px] font-light text-kb-dusk outline-none focus:border-kb-gold"
        />
      )}
    </label>
  );
}

function QuestionCard({
  question,
  index,
  onChange,
  onRemove,
}: {
  question: CmsQuizQuestion;
  index: number;
  onChange: (question: CmsQuizQuestion) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen/50 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="kb-label text-[10px] text-kb-gold">
          Question {index + 1}
        </p>
        <button
          type="button"
          onClick={onRemove}
          className="font-body text-[11px] font-light text-kb-terracotta hover:text-kb-cacao"
        >
          Remove
        </button>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <TextField
          label="Step label"
          value={question.stepLabel}
          onChange={(stepLabel) =>
            onChange({
              ...question,
              stepLabel,
              id: question.id || slugify(stepLabel),
            })
          }
        />
        <TextField
          label="Question ID"
          value={question.id}
          onChange={(id) => onChange({ ...question, id: slugify(id) })}
        />
        <div className="sm:col-span-2">
          <TextField
            label="Question"
            value={question.question}
            onChange={(q) => onChange({ ...question, question: q })}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block">
            <span className="kb-label text-[10px] text-kb-terracotta">
              Answer options (one per line)
            </span>
            <textarea
              value={question.options.join("\n")}
              onChange={(e) =>
                onChange({
                  ...question,
                  options: e.target.value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean),
                })
              }
              rows={5}
              className="mt-2 w-full resize-y rounded-kb border-[0.5px] border-kb-chalk bg-kb-parchment px-3 py-2 font-body text-[14px] font-light leading-relaxed text-kb-dusk outline-none focus:border-kb-gold"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export function QuizBlockEditor({ data, onChange }: QuizBlockEditorProps) {
  function updateQuestion(index: number, question: CmsQuizQuestion) {
    const questions = [...data.questions];
    questions[index] = question;
    onChange({ ...data, questions });
  }

  function removeQuestion(index: number) {
    onChange({
      ...data,
      questions: data.questions.filter((_, i) => i !== index),
    });
  }

  function addQuestion() {
    const next: CmsQuizQuestion = {
      id: `question-${data.questions.length + 1}`,
      stepLabel: "New step",
      question: "Your question here?",
      options: ["Option 1", "Option 2"],
    };
    onChange({ ...data, questions: [...data.questions, next] });
  }

  return (
    <div className="grid gap-8">
      <section>
        <h3 className="font-display text-[20px] text-kb-cacao">Page hero</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField
            label="SEO title"
            value={data.metaTitle}
            onChange={(metaTitle) => onChange({ ...data, metaTitle })}
          />
          <TextField
            label="Label"
            value={data.label}
            onChange={(label) => onChange({ ...data, label })}
          />
          <div className="sm:col-span-2">
            <TextField
              label="SEO description"
              value={data.metaDescription}
              onChange={(metaDescription) =>
                onChange({ ...data, metaDescription })
              }
              multiline
            />
          </div>
          <div className="sm:col-span-2">
            <TextField
              label="Headline"
              value={data.headline}
              onChange={(headline) => onChange({ ...data, headline })}
            />
          </div>
          <div className="sm:col-span-2">
            <TextField
              label="Intro"
              value={data.intro}
              onChange={(intro) => onChange({ ...data, intro })}
              multiline
            />
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-[20px] text-kb-cacao">
              Quiz questions
            </h3>
            <p className="mt-1 font-body text-[13px] font-light text-kb-dusk/60">
              {data.questions.length} question
              {data.questions.length === 1 ? "" : "s"} in order.
            </p>
          </div>
          <button
            type="button"
            onClick={addQuestion}
            className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-4 py-2 font-body text-[13px] font-light text-kb-dusk hover:border-kb-gold"
          >
            Add question
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {data.questions.map((question, index) => (
            <QuestionCard
              key={`${question.id}-${index}`}
              question={question}
              index={index}
              onChange={(q) => updateQuestion(index, q)}
              onRemove={() => removeQuestion(index)}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-display text-[20px] text-kb-cacao">
          Results screen
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField
            label="Results eyebrow"
            value={data.resultsLabel}
            onChange={(resultsLabel) => onChange({ ...data, resultsLabel })}
          />
          <TextField
            label="Results headline"
            value={data.resultsHeadline}
            onChange={(resultsHeadline) =>
              onChange({ ...data, resultsHeadline })
            }
          />
          <div className="sm:col-span-2">
            <TextField
              label="Results body"
              value={data.resultsBody}
              onChange={(resultsBody) => onChange({ ...data, resultsBody })}
              multiline
            />
          </div>
          <TextField
            label="Save section label"
            value={data.saveSectionLabel}
            onChange={(saveSectionLabel) =>
              onChange({ ...data, saveSectionLabel })
            }
          />
          <TextField
            label="Email placeholder"
            value={data.emailPlaceholder}
            onChange={(emailPlaceholder) =>
              onChange({ ...data, emailPlaceholder })
            }
          />
          <TextField
            label="Save button"
            value={data.saveButtonLabel}
            onChange={(saveButtonLabel) =>
              onChange({ ...data, saveButtonLabel })
            }
          />
          <div className="sm:col-span-2">
            <TextField
              label="Saved confirmation message"
              value={data.savedMessage}
              onChange={(savedMessage) => onChange({ ...data, savedMessage })}
              multiline
            />
          </div>
          <TextField
            label="Consultation CTA"
            value={data.consultationCta}
            onChange={(consultationCta) =>
              onChange({ ...data, consultationCta })
            }
          />
          <TextField
            label="Consultation link"
            value={data.consultationHref}
            onChange={(consultationHref) =>
              onChange({ ...data, consultationHref })
            }
          />
          <TextField
            label="Retake quiz label"
            value={data.retakeLabel}
            onChange={(retakeLabel) => onChange({ ...data, retakeLabel })}
          />
        </div>
      </section>
    </div>
  );
}
