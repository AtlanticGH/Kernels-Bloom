import type { Metadata } from "next";
import Link from "next/link";
import { CMS_PAGE_NAV } from "@/lib/cms/blocks";
import { listCmsBlocks } from "@/lib/cms/content";
import { countSubmissions } from "@/lib/cms/submissions";
import { isSupabaseConfigured } from "@/lib/integrations/supabase-server";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const [blocks, counts] = await Promise.all([
    listCmsBlocks(),
    countSubmissions(),
  ]);

  return (
    <div>
      <p className="kb-label text-[11px] text-kb-terracotta">Dashboard</p>
      <h1 className="mt-2 font-display text-[36px] text-kb-cacao">Overview</h1>
      <p className="mt-3 max-w-xl font-body text-[15px] font-light leading-relaxed text-kb-dusk/70">
        Edit every page, catalog entry, and site-wide copy in the Supabase CMS.
        Review form submissions below.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Submissions" value={String(counts.total)} />
        <StatCard label="Trade" value={String(counts.trade)} />
        <StatCard label="Consultations" value={String(counts.consultation)} />
        <StatCard label="Quiz results" value={String(counts.quiz)} />
      </div>

      <div className="mt-10 rounded-kb border-[0.5px] border-kb-chalk bg-kb-parchment p-5">
        <p className="kb-label text-[10px] text-kb-gold">Connection</p>
        <p className="mt-2 font-body text-[14px] font-light text-kb-dusk">
          Supabase{" "}
          <span
            className={
              isSupabaseConfigured() ? "text-kb-terracotta" : "text-kb-dusk/50"
            }
          >
            {isSupabaseConfigured()
              ? "connected — edits save to the live site"
              : "not configured — using defaults locally"}
          </span>
        </p>
      </div>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-[24px] text-kb-cacao">Pages</h2>
          <Link
            href="/admin/content"
            className="kb-label text-[11px] text-kb-terracotta hover:text-kb-cacao"
          >
            Open editor →
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {CMS_PAGE_NAV.map((page) => {
            const pageBlocks = page.ids
              .map((id) => blocks.find((b) => b.id === id))
              .filter((b): b is (typeof blocks)[number] => Boolean(b));
            const edited = pageBlocks.filter((b) => b.updated_at).length;

            return (
              <Link
                key={page.label}
                href={`/admin/content#${encodeURIComponent(page.ids[0])}`}
                className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-parchment px-5 py-4 transition-colors hover:border-kb-gold/50"
              >
                <p className="font-body text-[15px] font-light text-kb-dusk">
                  {page.label}
                </p>
                {page.path && (
                  <p className="mt-1 font-body text-[12px] font-light text-kb-dusk/45">
                    {page.path}
                  </p>
                )}
                <p className="mt-2 font-body text-[11px] font-light text-kb-dusk/50">
                  {pageBlocks.length} section{pageBlocks.length === 1 ? "" : "s"}
                  {edited > 0 ? ` · ${edited} edited` : ""}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-kb border-[0.5px] border-kb-chalk bg-kb-parchment px-5 py-4">
      <p className="kb-label text-[10px] text-kb-gold">{label}</p>
      <p className="mt-2 font-display text-[32px] text-kb-cacao">{value}</p>
    </div>
  );
}
