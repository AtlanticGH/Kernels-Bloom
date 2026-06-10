import type { Metadata } from "next";
import Link from "next/link";
import { CMS_BLOCK_META } from "@/lib/cms/blocks";
import { listCmsBlocks } from "@/lib/cms/content";
import { countSubmissions } from "@/lib/cms/submissions";
import { isSupabaseConfigured } from "@/lib/integrations/supabase-server";

export const metadata: Metadata = {
  title: "CMS Dashboard",
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
        Edit live homepage copy and review trade, consultation, and quiz
        submissions stored in Supabase.
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
          <span className={isSupabaseConfigured() ? "text-kb-terracotta" : "text-kb-dusk/50"}>
            {isSupabaseConfigured() ? "connected" : "not configured — using defaults"}
          </span>
        </p>
      </div>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-[24px] text-kb-cacao">Content blocks</h2>
          <Link
            href="/admin/content"
            className="kb-label text-[11px] text-kb-terracotta hover:text-kb-cacao"
          >
            Edit all →
          </Link>
        </div>
        <ul className="mt-4 divide-y-[0.5px] divide-kb-chalk rounded-kb border-[0.5px] border-kb-chalk bg-kb-parchment">
          {blocks.map((block) => (
            <li
              key={block.id}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
            >
              <div>
                <p className="font-body text-[15px] font-light text-kb-dusk">
                  {CMS_BLOCK_META[block.id].label}
                </p>
                <p className="mt-1 font-body text-[12px] font-light text-kb-dusk/50">
                  {block.updated_at
                    ? `Updated ${new Date(block.updated_at).toLocaleString()}`
                    : "Using defaults"}
                </p>
              </div>
              <Link
                href="/admin/content"
                className="kb-label text-[11px] text-kb-gold hover:text-kb-cacao"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
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
