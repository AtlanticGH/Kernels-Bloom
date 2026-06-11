"use client";

import type { CmsBlockKind } from "@/lib/cms/blocks";

const KIND_META: Record<
  CmsBlockKind,
  { label: string; className: string }
> = {
  copy: {
    label: "Page copy",
    className: "bg-kb-chalk/80 text-kb-dusk/70",
  },
  images: {
    label: "Tile images",
    className: "bg-kb-gold/15 text-kb-cacao",
  },
  quiz: {
    label: "Quiz builder",
    className: "bg-kb-terracotta/12 text-kb-terracotta",
  },
  catalog: {
    label: "Catalog data",
    className: "bg-kb-cacao/8 text-kb-cacao",
  },
  journal: {
    label: "Journal posts",
    className: "bg-kb-terracotta/10 text-kb-terracotta",
  },
};

type BlockEditorPanelProps = {
  groupLabel: string;
  pageLabel: string;
  pagePath?: string;
  blockLabel: string;
  blockDescription: string;
  blockKind: CmsBlockKind;
  updatedAt: string | null;
  saving: boolean;
  saved: boolean;
  onSave: () => void;
  children: React.ReactNode;
};

export function BlockEditorPanel({
  groupLabel,
  pageLabel,
  pagePath,
  blockLabel,
  blockDescription,
  blockKind,
  updatedAt,
  saving,
  saved,
  onSave,
  children,
}: BlockEditorPanelProps) {
  const kind = KIND_META[blockKind];

  return (
    <section className="flex min-h-[calc(100dvh-12rem)] min-w-0 flex-col rounded-kb border-[0.5px] border-kb-chalk bg-kb-parchment">
      <header className="border-b-[0.5px] border-kb-chalk px-6 py-5 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 font-body text-[11px] font-light text-kb-dusk/50"
        >
          <span>{groupLabel}</span>
          <span aria-hidden="true">/</span>
          <span className="text-kb-dusk/70">{pageLabel}</span>
          <span aria-hidden="true">/</span>
          <span className="text-kb-cacao">{blockLabel}</span>
        </nav>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`kb-label rounded-full px-2.5 py-1 text-[9px] ${kind.className}`}
              >
                {kind.label}
              </span>
              {pagePath && (
                <a
                  href={pagePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[11px] font-light text-kb-terracotta hover:text-kb-cacao"
                >
                  View live →
                </a>
              )}
            </div>
            <h2 className="mt-3 font-display text-[clamp(22px,2.5vw,30px)] leading-tight text-kb-cacao">
              {blockLabel}
            </h2>
            <p className="mt-2 max-w-2xl font-body text-[14px] font-light leading-relaxed text-kb-dusk/60">
              {blockDescription}
            </p>
          </div>
          {updatedAt && (
            <p className="shrink-0 font-body text-[11px] font-light text-kb-dusk/45">
              Last saved {new Date(updatedAt).toLocaleString()}
            </p>
          )}
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 lg:px-8">
        {children}
      </div>

      <footer className="sticky bottom-0 border-t-[0.5px] border-kb-chalk bg-kb-parchment/95 px-6 py-4 backdrop-blur-sm lg:px-8">
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="rounded-kb bg-kb-cacao px-6 py-2.5 font-body text-[13px] font-light text-kb-parchment transition-colors hover:bg-kb-terracotta disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          {saved && (
            <p className="font-body text-[13px] font-light text-kb-terracotta">
              Saved successfully.
            </p>
          )}
        </div>
      </footer>
    </section>
  );
}
