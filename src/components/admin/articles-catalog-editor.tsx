"use client";

import type { Article, ArticleCategory } from "@/lib/types";
import type { CatalogListContent } from "@/lib/cms/types";
import { ImageField } from "@/components/admin/image-field";

const CATEGORIES: { value: ArticleCategory; label: string }[] = [
  { value: "ingredient-story", label: "Ingredient story" },
  { value: "sourcing-journey", label: "Sourcing journey" },
  { value: "ritual-guide", label: "Ritual guide" },
  { value: "sustainability", label: "Sustainability" },
];

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
          rows={4}
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

function ArticleCard({
  article,
  index,
  onChange,
  onRemove,
}: {
  article: Article;
  index: number;
  onChange: (article: Article) => void;
  onRemove: () => void;
}) {
  return (
    <article className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen/40 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b-[0.5px] border-kb-chalk pb-4">
        <div>
          <p className="kb-label text-[10px] text-kb-gold">Post {index + 1}</p>
          <h3 className="mt-1 font-display text-[20px] text-kb-cacao">
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
          Remove
        </button>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
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
        <div className="sm:col-span-2">
          <TextField
            label="Excerpt"
            value={article.excerpt}
            onChange={(excerpt) => onChange({ ...article, excerpt })}
            multiline
          />
        </div>
        <div className="sm:col-span-2">
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
        </div>
        <div className="sm:col-span-2">
          <TextField
            label="Pull quote"
            value={article.pullQuote ?? ""}
            onChange={(pullQuote) => onChange({ ...article, pullQuote })}
          />
        </div>
        <div className="sm:col-span-2">
          <ImageField
            label="Cover image"
            value={article.image}
            onChange={(image) => onChange({ ...article, image })}
          />
        </div>
        <div className="sm:col-span-2">
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
      </div>
    </article>
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

export function ArticlesCatalogEditor({
  data,
  onChange,
}: ArticlesCatalogEditorProps) {
  const sorted = [...data.items].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
  );

  function updateArticle(slug: string, article: Article) {
    const items = data.items.map((item) => (item.slug === slug ? article : item));
    onChange({ items });
  }

  function removeArticle(slug: string) {
    onChange({ items: data.items.filter((item) => item.slug !== slug) });
  }

  function addArticle() {
    const article = emptyArticle();
    article.slug = `new-post-${Date.now()}`;
    article.title = "New journal post";
    onChange({ items: [article, ...data.items] });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <p className="max-w-2xl font-body text-[13px] font-light leading-relaxed text-kb-dusk/60">
          Add and edit journal posts. The newest post by date appears as the
          featured lead on <span className="text-kb-cacao">/journal</span>.
        </p>
        <button
          type="button"
          onClick={addArticle}
          className="shrink-0 rounded-kb border-[0.5px] border-kb-cacao px-4 py-2 font-body text-[13px] font-light text-kb-cacao transition-colors hover:bg-kb-cacao hover:text-kb-parchment"
        >
          + Add post
        </button>
      </div>

      <div className="grid gap-4">
        {sorted.map((article, index) => (
          <ArticleCard
            key={article.slug}
            article={article}
            index={index}
            onChange={(next) => {
              const originalSlug = article.slug;
              if (next.slug !== originalSlug) {
                const items = data.items.map((item) =>
                  item.slug === originalSlug ? next : item
                );
                onChange({ items });
              } else {
                updateArticle(originalSlug, next);
              }
            }}
            onRemove={() => removeArticle(article.slug)}
          />
        ))}
      </div>
    </div>
  );
}
