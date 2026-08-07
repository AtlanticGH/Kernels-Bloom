"use client";

import { useState } from "react";
import type { SubmissionRow, SubmissionType } from "@/lib/cms/submissions";

const TYPE_LABELS: Record<SubmissionType, string> = {
  trade: "Trade",
  consultation: "Consultation",
  quiz: "Quiz",
};

export function SubmissionsTable({
  initialSubmissions,
}: {
  initialSubmissions: SubmissionRow[];
}) {
  const [rows, setRows] = useState(initialSubmissions);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<SubmissionType | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  async function refresh() {
    setRefreshing(true);
    setError("");

    try {
      const res = await fetch("/api/admin/submissions", {
        credentials: "same-origin",
        cache: "no-store",
      });

      if (res.status === 401) {
        throw new Error("Session expired — please sign in again.");
      }

      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error ?? "Failed to load submissions");
      }

      const json = (await res.json()) as { submissions?: SubmissionRow[] };
      setRows(Array.isArray(json.submissions) ? json.submissions : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setRefreshing(false);
    }
  }

  const filtered =
    filter === "all" ? rows : rows.filter((row) => row.type === filter);

  const selected = rows.find((row) => row.id === openId) ?? null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(["all", "trade", "consultation", "quiz"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              className={`rounded-kb px-3 py-1.5 font-body text-[12px] font-light transition-colors ${
                filter === type
                  ? "bg-kb-cacao text-kb-parchment"
                  : "bg-kb-chalk text-kb-dusk/70 hover:text-kb-cacao"
              }`}
            >
              {type === "all" ? "All" : TYPE_LABELS[type]}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={refreshing}
          className="kb-label text-[11px] text-kb-terracotta transition-colors hover:text-kb-cacao disabled:opacity-50"
        >
          {refreshing ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-kb border-[0.5px] border-kb-terracotta/40 bg-kb-parchment px-4 py-3 font-body text-[13px] font-light text-kb-terracotta">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-kb border-[0.5px] border-kb-chalk bg-kb-parchment">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b-[0.5px] border-kb-chalk">
              <th className="px-4 py-3 kb-label text-[10px] text-kb-gold">Type</th>
              <th className="px-4 py-3 kb-label text-[10px] text-kb-gold">Summary</th>
              <th className="px-4 py-3 kb-label text-[10px] text-kb-gold">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-8 font-body text-[14px] font-light text-kb-dusk/60"
                >
                  No submissions yet.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr
                  key={`${row.type}-${row.id}`}
                  className="cursor-pointer border-b-[0.5px] border-kb-chalk/80 transition-colors hover:bg-kb-linen"
                  onClick={() => setOpenId(row.id)}
                >
                  <td className="px-4 py-3 font-body text-[13px] font-light text-kb-terracotta">
                    {TYPE_LABELS[row.type]}
                  </td>
                  <td className="px-4 py-3 font-body text-[13px] font-light text-kb-dusk">
                    {row.summary}
                  </td>
                  <td className="px-4 py-3 font-body text-[12px] font-light text-kb-dusk/60">
                    {new Date(row.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="mt-6 rounded-kb border-[0.5px] border-kb-chalk bg-kb-parchment p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="kb-label text-[10px] text-kb-gold">
                {TYPE_LABELS[selected.type]}
              </p>
              <h3 className="mt-1 font-display text-[22px] text-kb-cacao">
                {selected.summary}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setOpenId(null)}
              className="kb-label text-[11px] text-kb-dusk/50 hover:text-kb-cacao"
            >
              Close
            </button>
          </div>
          <pre className="mt-4 overflow-x-auto rounded-kb bg-kb-linen p-4 font-body text-[12px] font-light leading-relaxed text-kb-dusk/80">
            {JSON.stringify(selected.payload, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
