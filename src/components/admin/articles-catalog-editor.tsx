"use client";

import { useEffect, useMemo, useState } from "react";
import type { Article, ArticleCategory } from "@/lib/types";
import type { CatalogListContent } from "@/lib/cms/types";
import { ImageField } from "@/components/admin/image-field";

const CATEGORIES: { value: ArticleCategory; label: string }[] = [
  { value: "ingredient-story", label: "Ingredient story" },
  { value: "sourcing-journey", label: "Sourcing journey" },
  { value: "ritual-guide", label: "Ritual guide" },
  { value: "sustainability", label: "Sustainability" },
];

type ArticlePanel = "details" | "content" | "media";

type ArticlesCatalogEditorProps = {
  data: CatalogListContent<Article>;
  onChange: (data: CatalogListContent<Article>) => void;
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
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  type?: "text" | "date" | "number";
}) {
  return (
    <label className="block min-w-0">
      <span className="kb-label text-[10px] text-kb-terracotta">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={multiline ? 6 : 4}
          className="mt-2 w-full resize-y rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-2 font-body text-[14px] font-light leading-relaxed text-kb-dusk outline-none focus:border-kb-gold"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-2 font-body text-[14px] font-light text-kb-dusk outline-none focus:border-kb-gold"
        />
      )}
    </label>
  );
}

function PanelTabs({
  panel,
  onChange,
}: {
  panel: ArticlePanel;
  onChange: (panel: ArticlePanel) => void;
}) {
  const tabs: { id: ArticlePanel; label: string }[] = [
    { id: "details", label: "Details" },
    { id: "content", label: "Content" },
    { id: "media", label: "Media & links" },
  ];

  return (
    <div className="flex flex-wrap gap-1 border-b-[0.5px] border-kb-chalk">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`rounded-t-kb px-4 py-2 font-body text-[12px] font-light transition-colors ${
            panel === tab.id
              ? "bg-kb-linen text-kb-cacao"
              : "text-kb-dusk/60 hover:bg-kb-chalk/50 hover:text-kb-cacao"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function ArticleEditor({
  article,
  panel,
  onChange,
  onRemove,
}: {
  article: Article;
  panel: ArticlePanel;
  onChange: (article: Article) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen/40">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b-[0.5px] border-kb-chalk px-5 py-4">
        <div className="min-w-0">
          <h3 className="font-display text-[22px] text-kb-cacao">
            {article.title || "Untitled post"}
          </h3>
          <p className="mt-0.5 font-body text-[12px] font-light text-kb-dusk/50">
            /journal/{article.slug || "…"}
          </p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="kb-label text-[10px] text-kb-terracotta transition-colors hover:text-kb-cacao"
        >
          Delete post
        </button>
      </div>

      <div className="p-5">
        {panel === "details" && (
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Title"
              value={article.title}
              onChange={(title) =>
                onChange({
                  ...article,
                  title,
                  slug: article.slug || slugify(title),
                })
              }
            />
            <TextField
              label="URL slug"
              value={article.slug}
              onChange={(slug) => onChange({ ...article, slug: slugify(slug) })}
            />
            <label className="block min-w-0">
              <span className="kb-label text-[10px] text-kb-terracotta">
                Category
              </span>
              <select
                value={article.category}
                onChange={(e) =>
                  onChange({
                    ...article,
                    category: e.target.value as ArticleCategory,
                  })
                }
                className="mt-2 w-full rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-2 font-body text-[14px] font-light text-kb-dusk outline-none focus:border-kb-gold"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </label>
            <TextField
              label="Published date"
              type="date"
              value={article.publishedAt}
              onChange={(publishedAt) => onChange({ ...article, publishedAt })}
            />
            <TextField
              label="Read time (minutes)"
              type="number"
              value={String(article.readTime)}
              onChange={(value) =>
                onChange({
                  ...article,
                  readTime: Math.max(1, Number(value) || 1),
                })
              }
            />
          </div>
        )}

        {panel === "content" && (
          <div className="grid gap-5">
            <TextField
              label="Excerpt"
              value={article.excerpt}
              onChange={(excerpt) => onChange({ ...article, excerpt })}
              multiline
            />
            <TextField
              label="Body paragraphs (one per line)"
              value={article.body.join("\n")}
              onChange={(value) =>
                onChange({
                  ...article,
                  body: value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean),
                })
              }
              multiline
            />
            <TextField
              label="Pull quote"
              value={article.pullQuote ?? ""}
              onChange={(pullQuote) => onChange({ ...article, pullQuote })}
            />
          </div>
        )}

        {panel === "media" && (
          <div className="grid gap-5">
            <ImageField
              label="Cover image"
              value={article.image}
              onChange={(image) => onChange({ ...article, image })}
            />
            <TextField
              label="Related product slugs (one per line)"
              value={article.relatedProducts.join("\n")}
              onChange={(value) =>
                onChange({
                  ...article,
                  relatedProducts: value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean),
                })
              }
              multiline
            />
          </div>
        )}
      </div>
    </div>
  );
}

function emptyArticle(): Article {
  const today = new Date().toISOString().slice(0, 10);
  return {
    slug: "",
    title: "",
    category: "ingredient-story",
    excerpt: "",
    body: [],
    pullQuote: "",
    readTime: 5,
    publishedAt: today,
    image: "/images/DSC09530.jpg",
    relatedProducts: [],
  };
}

function truncateTitle(title: string, max = 28): string {
  if (title.length <= max) return title;
  return `${title.slice(0, max - 1)}…`;
}

export function ArticlesCatalogEditor({
  data,
  onChange,
}: ArticlesCatalogEditorProps) {
  const sorted = useMemo(
    () =>
      [...data.items].sort(
        (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
      ),
    [data.items]
  );

  const [activeSlug, setActiveSlug] = useState<string | null>(
    sorted[0]?.slug ?? null
  );
  const [panel, setPanel] = useState<ArticlePanel>("details");

  useEffect(() => {
    if (sorted.length === 0) {
      setActiveSlug(null);
      return;
    }
    if (!activeSlug || !sorted.some((article) => article.slug === activeSlug)) {
      setActiveSlug(sorted[0].slug);
    }
  }, [sorted, activeSlug]);

  const activeArticle =
    sorted.find((article) => article.slug === activeSlug) ?? null;

  function replaceArticle(originalSlug: string, article: Article) {
    const items = data.items.map((item) =>
      item.slug === originalSlug ? article : item
    );
    onChange({ items });
    if (article.slug !== originalSlug) {
      setActiveSlug(article.slug);
    }
  }

  function removeArticle(slug: string) {
    const nextItems = data.items.filter((item) => item.slug !== slug);
    onChange({ items: nextItems });
    if (activeSlug === slug) {
      const nextSorted = [...nextItems].sort(
        (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
      );
      setActiveSlug(nextSorted[0]?.slug ?? null);
    }
  }

  function addArticle() {
    const article = emptyArticle();
    article.slug = `new-post-${Date.now()}`;
    article.title = "New journal post";
    onChange({ items: [article, ...data.items] });
    setActiveSlug(article.slug);
    setPanel("details");
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <p className="max-w-2xl font-body text-[13px] font-light leading-relaxed text-kb-dusk/60">
          Select a post tab to edit. The newest by date is featured on{" "}
          <span className="text-kb-cacao">/journal</span>.
        </p>
        <button
          type="button"
          onClick={addArticle}
          className="shrink-0 rounded-kb border-[0.5px] border-kb-cacao px-4 py-2 font-body text-[13px] font-light text-kb-cacao transition-colors hover:bg-kb-cacao hover:text-kb-parchment"
        >
          + Add post
        </button>
      </div>

      {sorted.length === 0 ? (
        <p className="rounded-kb border-[0.5px] border-dashed border-kb-chalk px-4 py-8 text-center font-body text-[14px] font-light text-kb-dusk/60">
          No journal posts yet. Add one to get started.
        </p>
      ) : (
        <>
          <div
            className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1"
            role="tablist"
            aria-label="Journal posts"
          >
            {sorted.map((article) => {
              const active = article.slug === activeSlug;
              return (
                <button
                  key={article.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setActiveSlug(article.slug);
                    setPanel("details");
                  }}
                  className={`shrink-0 rounded-kb border-[0.5px] px-3 py-2 text-left transition-colors ${
                    active
                      ? "border-kb-cacao bg-kb-cacao text-kb-parchment"
                      : "border-kb-chalk bg-kb-parchment text-kb-dusk hover:border-kb-gold/50 hover:text-kb-cacao"
                  }`}
                >
                  <span className="block max-w-[11rem] truncate font-body text-[12px] font-light">
                    {truncateTitle(article.title || "Untitled")}
                  </span>
                  <span
                    className={`mt-0.5 block font-body text-[10px] font-light ${
                      active ? "text-kb-parchment/60" : "text-kb-dusk/45"
                    }`}
                  >
                    {article.publishedAt}
                  </span>
                </button>
              );
            })}
          </div>

          {activeArticle && (
            <div>
              <PanelTabs panel={panel} onChange={setPanel} />
              <div className="mt-4">
                <ArticleEditor
                  article={activeArticle}
                  panel={panel}
                  onChange={(next) => replaceArticle(activeArticle.slug, next)}
                  onRemove={() => removeArticle(activeArticle.slug)}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
