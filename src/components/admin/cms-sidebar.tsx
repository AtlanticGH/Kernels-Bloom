"use client";

import {
  CMS_BLOCK_META,
  CMS_NAV_GROUP_ORDER,
  getCmsBlockKind,
  type CmsBlockId,
  type CmsNavGroup,
} from "@/lib/cms/blocks";

type BlockRow = {
  id: CmsBlockId;
  updated_at: string | null;
};

type FilteredPage = {
  label: string;
  path?: string;
  group: CmsNavGroup;
  blocks: BlockRow[];
};

type CmsSidebarProps = {
  pages: FilteredPage[];
  activeId: CmsBlockId | null;
  onSelect: (id: CmsBlockId) => void;
  filter: string;
  onFilterChange: (value: string) => void;
};

const KIND_DOT: Record<ReturnType<typeof getCmsBlockKind>, string> = {
  copy: "bg-kb-dusk/30",
  images: "bg-kb-gold",
  quiz: "bg-kb-terracotta",
  catalog: "bg-kb-cacao/40",
  journal: "bg-kb-terracotta/70",
};

export function CmsSidebar({
  pages,
  activeId,
  onSelect,
  filter,
  onFilterChange,
}: CmsSidebarProps) {
  const grouped = CMS_NAV_GROUP_ORDER.map((group) => ({
    group,
    pages: pages.filter((page) => page.group === group),
  })).filter((entry) => entry.pages.length > 0);

  return (
    <aside className="flex min-h-0 flex-col lg:sticky lg:top-6 lg:max-h-[calc(100dvh-3rem)]">
      <div className="shrink-0 border-b-[0.5px] border-kb-chalk pb-4">
        <label className="block">
          <span className="kb-label text-[9px] text-kb-gold">Find content</span>
          <input
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            placeholder="Page, section, or path…"
            className="mt-2 w-full rounded-kb border-[0.5px] border-kb-chalk bg-kb-parchment px-3 py-2 font-body text-[13px] font-light text-kb-dusk outline-none focus:border-kb-gold"
          />
        </label>
      </div>

      <nav
        className="mt-4 min-h-0 flex-1 space-y-6 overflow-y-auto pr-1"
        aria-label="Content sections"
      >
        {grouped.map(({ group, pages: groupPages }) => (
          <div key={group}>
            <p className="kb-label px-2 text-[9px] text-kb-gold">{group}</p>
            <ul className="mt-2 space-y-4">
              {groupPages.map((page) => (
                <li key={page.label}>
                  <div className="px-2">
                    <p className="font-body text-[12px] font-light text-kb-cacao">
                      {page.label}
                    </p>
                    {page.path && (
                      <p className="mt-0.5 font-body text-[10px] font-light text-kb-dusk/40">
                        {page.path}
                      </p>
                    )}
                  </div>
                  <ul className="mt-1.5 space-y-0.5 border-l-[0.5px] border-kb-chalk ml-3 pl-2">
                    {page.blocks.map((block) => {
                      const active = block.id === activeId;
                      const meta = CMS_BLOCK_META[block.id];
                      const kind = getCmsBlockKind(block.id);

                      return (
                        <li key={block.id}>
                          <button
                            type="button"
                            onClick={() => onSelect(block.id)}
                            className={`flex w-full items-start gap-2 rounded-kb px-2.5 py-2 text-left transition-colors ${
                              active
                                ? "bg-kb-cacao text-kb-parchment"
                                : "text-kb-dusk/80 hover:bg-kb-chalk/70 hover:text-kb-cacao"
                            }`}
                          >
                            <span
                              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                                active ? "bg-kb-gold" : KIND_DOT[kind]
                              }`}
                              aria-hidden="true"
                            />
                            <span className="min-w-0">
                              <span className="block font-body text-[12px] font-light leading-snug">
                                {meta.label}
                              </span>
                              {block.updated_at && !active && (
                                <span className="mt-0.5 block font-body text-[10px] font-light text-kb-dusk/40">
                                  Edited
                                </span>
                              )}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {pages.length === 0 && (
        <p className="mt-6 px-2 font-body text-[13px] font-light text-kb-dusk/50">
          No sections match your search.
        </p>
      )}

      <div className="mt-4 shrink-0 border-t-[0.5px] border-kb-chalk pt-4">
        <p className="px-2 font-body text-[10px] font-light leading-relaxed text-kb-dusk/45">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-kb-gold" />
            Tile images
          </span>
          <span className="mx-2">·</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-kb-terracotta/70" />
            Journal
          </span>
          <span className="mx-2">·</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-kb-terracotta" />
            Quiz
          </span>
          <span className="mx-2">·</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-kb-dusk/30" />
            Page copy
          </span>
        </p>
      </div>
    </aside>
  );
}

export type { FilteredPage };
