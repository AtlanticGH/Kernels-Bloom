"use client";

import { useEffect, useState } from "react";
import {
  CMS_BLOCK_META,
  type CmsBlockId,
  type CmsBlockMap,
} from "@/lib/cms/blocks";

type BlockRow = {
  id: CmsBlockId;
  data: CmsBlockMap[CmsBlockId];
  updated_at: string | null;
};

const FIELD_LABELS: Record<string, string> = {
  eyebrow: "Eyebrow",
  subcopy: "Subcopy",
  ctaPrimary: "Primary CTA label",
  ctaPrimaryHref: "Primary CTA link",
  ctaSecondary: "Secondary CTA label",
  ctaSecondaryHref: "Secondary CTA link",
  sectionLabel: "Section label",
  commonName: "Ingredient name",
  latinName: "Latin name",
  body: "Body copy",
  pullQuote: "Pull quote",
  image: "Image path",
  ctaLabel: "CTA label",
  ctaHref: "CTA link",
  facebook: "Facebook URL",
  instagram: "Instagram URL",
  youtube: "YouTube URL",
};

export function ContentEditor() {
  const [blocks, setBlocks] = useState<BlockRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<CmsBlockId | null>(null);
  const [savedId, setSavedId] = useState<CmsBlockId | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/admin/content");
        if (!res.ok) throw new Error("Failed to load content");
        const json = await res.json();
        setBlocks(json.blocks);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function updateField(
    id: CmsBlockId,
    key: string,
    value: string
  ) {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id
          ? { ...block, data: { ...block.data, [key]: value } }
          : block
      )
    );
  }

  async function save(id: CmsBlockId) {
    const block = blocks.find((b) => b.id === id);
    if (!block) return;

    setSavingId(id);
    setSavedId(null);
    setError("");

    try {
      const res = await fetch(`/api/admin/content/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(block.data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Save failed");
      }
      setSavedId(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSavingId(null);
    }
  }

  if (loading) {
    return (
      <p className="font-body text-[14px] font-light text-kb-dusk/60">
        Loading content…
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <p className="rounded-kb border-[0.5px] border-kb-terracotta/40 bg-kb-parchment px-4 py-3 font-body text-[13px] font-light text-kb-terracotta">
          {error}
        </p>
      )}

      {blocks.map((block) => (
        <section
          key={block.id}
          className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-parchment p-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="kb-label text-[10px] text-kb-gold">{block.id}</p>
              <h2 className="mt-1 font-display text-[24px] text-kb-cacao">
                {CMS_BLOCK_META[block.id].label}
              </h2>
              <p className="mt-2 font-body text-[13px] font-light text-kb-dusk/60">
                {CMS_BLOCK_META[block.id].description}
              </p>
            </div>
            {block.updated_at && (
              <p className="font-body text-[11px] font-light text-kb-dusk/50">
                Updated {new Date(block.updated_at).toLocaleString()}
              </p>
            )}
          </div>

          <div className="mt-6 grid gap-5">
            {Object.entries(block.data).map(([key, value]) => {
              const isLong =
                key === "subcopy" || key === "body" || value.length > 80;
              const label = FIELD_LABELS[key] ?? key;
              return (
                <label key={key} className="block">
                  <span className="kb-label text-[10px] text-kb-terracotta">
                    {label}
                  </span>
                  {isLong ? (
                    <textarea
                      value={value}
                      onChange={(e) => updateField(block.id, key, e.target.value)}
                      rows={4}
                      className="mt-2 w-full resize-y border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-2 font-body text-[14px] font-light text-kb-dusk outline-none focus:border-kb-gold"
                    />
                  ) : (
                    <input
                      value={value}
                      onChange={(e) => updateField(block.id, key, e.target.value)}
                      className="mt-2 w-full border-b-[0.5px] border-kb-chalk bg-transparent py-2 font-body text-[14px] font-light text-kb-dusk outline-none focus:border-kb-gold"
                    />
                  )}
                </label>
              );
            })}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={() => void save(block.id)}
              disabled={savingId === block.id}
              className="bg-kb-cacao px-5 py-2.5 font-body text-[13px] font-light text-kb-parchment transition-colors hover:bg-kb-terracotta disabled:opacity-60"
            >
              {savingId === block.id ? "Saving…" : "Save changes"}
            </button>
            {savedId === block.id && (
              <p className="font-body text-[13px] font-light text-kb-terracotta">
                Saved.
              </p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
