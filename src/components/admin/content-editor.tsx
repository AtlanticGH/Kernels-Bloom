"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CMS_BLOCK_META,
  CMS_IMAGE_FIELDS,
  CMS_JSON_FIELDS,
  CMS_PAGE_NAV,
  getCmsBlockKind,
  type CmsBlockId,
  type CmsBlockMap,
  type CmsNavGroup,
} from "@/lib/cms/blocks";
import { BlockEditorPanel } from "@/components/admin/block-editor-panel";
import { CmsSidebar } from "@/components/admin/cms-sidebar";
import { ImageField } from "@/components/admin/image-field";
import { CategoriesCatalogEditor } from "@/components/admin/categories-catalog-editor";
import { IngredientsCatalogEditor } from "@/components/admin/ingredients-catalog-editor";
import { ProductsCatalogEditor } from "@/components/admin/products-catalog-editor";
import { QuizBlockEditor } from "@/components/admin/quiz-block-editor";
import type { Ingredient, Product, ProductCategory } from "@/lib/types";
import type { CatalogListContent, PageQuizContent } from "@/lib/cms/types";

type BlockRow = {
  id: CmsBlockId;
  data: CmsBlockMap[CmsBlockId];
  updated_at: string | null;
};

function blockHash(id: CmsBlockId) {
  return encodeURIComponent(id);
}

function hashToBlockId(hash: string): CmsBlockId | null {
  const raw = decodeURIComponent(hash.replace(/^#/, ""));
  if (raw in CMS_BLOCK_META) return raw as CmsBlockId;
  return null;
}

const FIELD_LABELS: Record<string, string> = {
  eyebrow: "Eyebrow",
  headlineLine1: "Headline line 1",
  headlineLine2: "Headline line 2",
  subcopy: "Subcopy",
  backgroundImage: "Background image",
  ctaPrimary: "Primary CTA label",
  ctaPrimaryHref: "Primary CTA link",
  ctaSecondary: "Secondary CTA label",
  ctaSecondaryHref: "Secondary CTA link",
  sectionLabel: "Section label",
  commonName: "Ingredient name",
  latinName: "Latin name",
  body: "Body copy",
  pullQuote: "Pull quote",
  image: "Image",
  illustrationBotanical: "Illustration botanical",
  ctaLabel: "CTA label",
  ctaHref: "CTA link",
  facebook: "Facebook URL",
  instagram: "Instagram URL",
  youtube: "YouTube URL",
  footerTagline: "Footer tagline",
  newsletterLabel: "Newsletter label",
  copyright: "Copyright line",
  careEmail: "Customer care email",
  tradeEmail: "Trade email",
  careIntro: "Customer care intro",
  tradeIntro: "Trade intro",
  studioLocation: "Studio location",
  headline: "Headline",
  label: "Label",
  intro: "Intro",
  metaTitle: "SEO title",
  metaDescription: "SEO description",
  quote: "Quote",
  attribution: "Attribution",
  quizCta: "Quiz CTA",
  quizHref: "Quiz link",
  consultCta: "Consultation CTA",
  consultHref: "Consultation link",
  weeklyLabel: "Weekly label",
  careLabel: "Customer care label",
  tradeLabel: "Trade label",
  studioLabel: "Studio label",
  tradeCtaLabel: "Trade page CTA",
  tradeCtaHref: "Trade page link",
  whyLabel: "Why section label",
  pricingHeadline: "Pricing headline",
  catalogueLabel: "Catalogue CTA",
  catalogueHref: "Catalogue PDF link",
  appLabel: "Application label",
  appHeadline: "Application headline",
  appIntro: "Application intro",
  awardsLabel: "Awards label",
  pressLabel: "Press label",
  paragraph1: "Paragraph 1",
  paragraph2: "Paragraph 2",
  closingQuote: "Closing quote",
  founderName: "Founder name",
  founderOrigin: "Founder origin",
  portraitImage: "Portrait image",
  videoSrc: "Video source path",
  videoPoster: "Video poster image",
  resultsLabel: "Results eyebrow",
  resultsHeadline: "Results headline",
  resultsBody: "Results body",
  saveSectionLabel: "Save section label",
  emailPlaceholder: "Email placeholder",
  saveButtonLabel: "Save button label",
  savedMessage: "Saved confirmation",
  consultationHref: "Consultation link",
  retakeLabel: "Retake quiz label",
  emptyHeadline: "Empty state headline",
  emptyBody: "Empty state body",
  emptyCta: "Empty state CTA",
  savedLabel: "Saved results eyebrow",
  savedHeadline: "Saved results headline",
};

const EDITOR_FIELD_GROUPS: { label: string; keys: string[] }[] = [
  {
    label: "Search & sharing",
    keys: ["metaTitle", "metaDescription"],
  },
  {
    label: "Hero & intro",
    keys: [
      "label",
      "eyebrow",
      "headline",
      "headlineLine1",
      "headlineLine2",
      "intro",
      "subcopy",
      "founderName",
      "founderOrigin",
      "sectionLabel",
      "commonName",
      "latinName",
      "weeklyLabel",
      "whyLabel",
      "pricingHeadline",
      "appLabel",
      "appHeadline",
      "awardsLabel",
      "pressLabel",
    ],
  },
  {
    label: "Calls to action",
    keys: [
      "ctaLabel",
      "ctaHref",
      "ctaPrimary",
      "ctaPrimaryHref",
      "ctaSecondary",
      "ctaSecondaryHref",
      "quizCta",
      "quizHref",
      "consultCta",
      "consultHref",
      "tradeCtaLabel",
      "tradeCtaHref",
      "catalogueLabel",
      "catalogueHref",
      "emptyCta",
      "retakeLabel",
      "saveButtonLabel",
      "consultationHref",
    ],
  },
  {
    label: "Images & media",
    keys: [
      "backgroundImage",
      "image",
      "portraitImage",
      "videoPoster",
      "videoSrc",
      "illustrationBotanical",
    ],
  },
  {
    label: "Body & quotes",
    keys: [
      "body",
      "paragraph1",
      "paragraph2",
      "quote",
      "attribution",
      "closingQuote",
      "pullQuote",
      "careIntro",
      "tradeIntro",
      "appIntro",
      "resultsBody",
      "savedMessage",
      "emptyBody",
      "resultsHeadline",
      "emptyHeadline",
      "savedHeadline",
    ],
  },
  {
    label: "Labels & UI copy",
    keys: [
      "resultsLabel",
      "saveSectionLabel",
      "savedLabel",
      "emailPlaceholder",
      "careLabel",
      "tradeLabel",
      "studioLabel",
    ],
  },
  {
    label: "Social & site info",
    keys: [
      "facebook",
      "instagram",
      "youtube",
      "footerTagline",
      "newsletterLabel",
      "copyright",
      "careEmail",
      "tradeEmail",
      "studioLocation",
    ],
  },
];

function isLongField(key: string, value: string): boolean {
  return (
    key === "subcopy" ||
    key === "body" ||
    key === "metaDescription" ||
    key === "intro" ||
    key === "paragraph1" ||
    key === "paragraph2" ||
    key === "quote" ||
    key === "closingQuote" ||
    key === "resultsBody" ||
    key === "savedMessage" ||
    key === "emptyBody" ||
    value.length > 80
  );
}

function groupBlockFields(data: Record<string, unknown>) {
  const entries = Object.entries(data).filter(
    ([key]) => !CMS_JSON_FIELDS.has(key) && key !== "questions"
  );
  const assigned = new Set<string>();
  const groups: { label: string; fields: [string, unknown][] }[] = [];

  for (const group of EDITOR_FIELD_GROUPS) {
    const fields = entries.filter(([key]) => group.keys.includes(key));
    if (fields.length > 0) {
      fields.forEach(([key]) => assigned.add(key));
      groups.push({ label: group.label, fields });
    }
  }

  const other = entries.filter(([key]) => !assigned.has(key));
  if (other.length > 0) {
    groups.push({ label: "Other settings", fields: other });
  }

  return groups;
}

function FieldInput({
  fieldKey,
  value,
  onChange,
}: {
  fieldKey: string;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const label = FIELD_LABELS[fieldKey] ?? fieldKey;
  const stringValue = String(value ?? "");
  const isLong = isLongField(fieldKey, stringValue);
  const spanFull =
    CMS_IMAGE_FIELDS.has(fieldKey) || isLongField(fieldKey, stringValue);

  if (CMS_IMAGE_FIELDS.has(fieldKey)) {
    return (
      <div className={spanFull ? "sm:col-span-2" : ""}>
        <ImageField
          label={label}
          value={stringValue}
          onChange={(next) => onChange(next)}
        />
      </div>
    );
  }

  return (
    <label className={`block min-w-0 ${spanFull ? "sm:col-span-2" : ""}`}>
      <span className="kb-label text-[10px] text-kb-terracotta">{label}</span>
      {isLong ? (
        <textarea
          value={stringValue}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="mt-2 w-full resize-y rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-2 font-body text-[14px] font-light leading-relaxed text-kb-dusk outline-none focus:border-kb-gold"
        />
      ) : (
        <input
          value={stringValue}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen px-3 py-2 font-body text-[14px] font-light text-kb-dusk outline-none focus:border-kb-gold"
        />
      )}
    </label>
  );
}

function BlockEditor({
  block,
  groupLabel,
  pageLabel,
  pagePath,
  saving,
  saved,
  onSave,
  onFieldChange,
  onReplaceData,
}: {
  block: BlockRow;
  groupLabel: CmsNavGroup;
  pageLabel: string;
  pagePath?: string;
  saving: boolean;
  saved: boolean;
  onSave: () => void;
  onFieldChange: (key: string, value: unknown) => void;
  onReplaceData: (data: BlockRow["data"]) => void;
}) {
  const meta = CMS_BLOCK_META[block.id];
  const kind = getCmsBlockKind(block.id);

  let body: ReactNode;

  if (block.id === "catalog.products") {
    body = (
      <ProductsCatalogEditor
        data={block.data as CatalogListContent<Product>}
        onChange={onReplaceData}
      />
    );
  } else if (block.id === "catalog.categories") {
    body = (
      <CategoriesCatalogEditor
        data={block.data as CatalogListContent<ProductCategory>}
        onChange={onReplaceData}
      />
    );
  } else if (block.id === "catalog.ingredients") {
    body = (
      <IngredientsCatalogEditor
        data={block.data as CatalogListContent<Ingredient>}
        onChange={onReplaceData}
      />
    );
  } else if (block.id === "page.quiz") {
    body = (
      <QuizBlockEditor
        data={block.data as PageQuizContent}
        onChange={onReplaceData}
      />
    );
  } else {
    const groups = groupBlockFields(block.data as Record<string, unknown>);

    body = (
      <div className="space-y-8">
        {groups.map((group) => (
          <fieldset
            key={group.label}
            className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen/30 p-5"
          >
            <legend className="kb-label px-1 text-[10px] text-kb-gold">
              {group.label}
            </legend>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              {group.fields.map(([key, value]) => (
                <FieldInput
                  key={key}
                  fieldKey={key}
                  value={value}
                  onChange={(next) => onFieldChange(key, next)}
                />
              ))}
            </div>
          </fieldset>
        ))}

        {Object.keys(block.data).some((key) => CMS_JSON_FIELDS.has(key)) && (
          <p className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-linen/60 px-4 py-3 font-body text-[13px] font-light text-kb-dusk/60">
            Structured lists for this section (stats, chapters, catalog items,
            etc.) are managed in their dedicated editors — not raw JSON.
          </p>
        )}
      </div>
    );
  }

  return (
    <BlockEditorPanel
      groupLabel={groupLabel}
      pageLabel={pageLabel}
      pagePath={pagePath}
      blockLabel={meta.label}
      blockDescription={meta.description}
      blockKind={kind}
      updatedAt={block.updated_at}
      saving={saving}
      saved={saved}
      onSave={onSave}
    >
      {body}
    </BlockEditorPanel>
  );
}

export function ContentEditor() {
  const [blocks, setBlocks] = useState<BlockRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<CmsBlockId | null>(null);
  const [savedId, setSavedId] = useState<CmsBlockId | null>(null);
  const [filter, setFilter] = useState("");
  const [activeId, setActiveId] = useState<CmsBlockId | null>(null);

  const selectBlock = useCallback((id: CmsBlockId) => {
    setActiveId(id);
    window.history.replaceState(null, "", `#${blockHash(id)}`);
  }, []);

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

  useEffect(() => {
    if (loading || blocks.length === 0) return;

    const fromHash = hashToBlockId(window.location.hash);
    if (fromHash && blocks.some((b) => b.id === fromHash)) {
      setActiveId(fromHash);
      return;
    }

    const firstPage = CMS_PAGE_NAV[0];
    setActiveId(firstPage?.ids[0] ?? blocks[0]?.id ?? null);
  }, [loading, blocks]);

  const blocksById = useMemo(
    () => new Map(blocks.map((block) => [block.id, block])),
    [blocks]
  );

  const query = filter.trim().toLowerCase();

  const pageNav = useMemo(
    () =>
      CMS_PAGE_NAV.map((page) => ({
        ...page,
        blocks: page.ids
          .map((id) => blocksById.get(id))
          .filter((block): block is BlockRow => Boolean(block))
          .filter((block) => {
            if (!query) return true;
            const meta = CMS_BLOCK_META[block.id];
            return (
              page.label.toLowerCase().includes(query) ||
              page.group.toLowerCase().includes(query) ||
              page.path?.toLowerCase().includes(query) ||
              block.id.toLowerCase().includes(query) ||
              meta.label.toLowerCase().includes(query) ||
              meta.description.toLowerCase().includes(query)
            );
          }),
      })).filter((page) => page.blocks.length > 0),
    [blocksById, query]
  );

  const activeBlock = activeId ? blocksById.get(activeId) : undefined;
  const activePageNav = activeId
    ? pageNav.find((p) => p.ids.includes(activeId))
    : undefined;

  function updateField(id: CmsBlockId, key: string, value: unknown) {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id
          ? { ...block, data: { ...block.data, [key]: value } }
          : block
      )
    );
  }

  function replaceBlockData(id: CmsBlockId, data: CmsBlockMap[CmsBlockId]) {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, data } : block))
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
    <div className="min-w-0">
      {error && (
        <p className="mb-6 rounded-kb border-[0.5px] border-kb-terracotta/40 bg-kb-parchment px-4 py-3 font-body text-[13px] font-light text-kb-terracotta">
          {error}
        </p>
      )}

      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] xl:gap-8">
        <CmsSidebar
          pages={pageNav}
          activeId={activeId}
          onSelect={selectBlock}
          filter={filter}
          onFilterChange={setFilter}
        />

        <div className="min-w-0">
          {activeBlock && activePageNav ? (
            <BlockEditor
              block={activeBlock}
              groupLabel={activePageNav.group}
              pageLabel={activePageNav.label}
              pagePath={activePageNav.path}
              saving={savingId === activeBlock.id}
              saved={savedId === activeBlock.id}
              onSave={() => void save(activeBlock.id)}
              onFieldChange={(key, value) =>
                updateField(activeBlock.id, key, value)
              }
              onReplaceData={(data) => replaceBlockData(activeBlock.id, data)}
            />
          ) : (
            <div className="flex min-h-[320px] items-center justify-center rounded-kb border-[0.5px] border-dashed border-kb-chalk bg-kb-parchment/60 px-6">
              <p className="max-w-sm text-center font-body text-[14px] font-light text-kb-dusk/60">
                Choose a section from the sidebar to edit page copy, tile
                images, or quiz content.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
