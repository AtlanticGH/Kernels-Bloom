import { createServiceClient } from "@/lib/integrations/supabase-server";

export type SubmissionType = "trade" | "consultation" | "quiz";

export type SubmissionRow = {
  id: string;
  type: SubmissionType;
  created_at: string;
  summary: string;
  payload: Record<string, unknown>;
};

export async function listSubmissions(limit = 50): Promise<SubmissionRow[]> {
  const client = createServiceClient();
  if (!client) return [];

  const [trade, consultations, quiz] = await Promise.all([
    client
      .from("trade_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit),
    client
      .from("consultations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit),
    client
      .from("quiz_results")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit),
  ]);

  if (trade.error) console.error("trade_applications:", trade.error.message);
  if (consultations.error) {
    console.error("consultations:", consultations.error.message);
  }
  if (quiz.error) console.error("quiz_results:", quiz.error.message);

  const rows: SubmissionRow[] = [];

  for (const row of trade.data ?? []) {
    rows.push({
      id: String(row.id),
      type: "trade",
      created_at: row.created_at,
      summary: `${row.businessName ?? "Trade"} — ${row.email ?? ""}`,
      payload: row as Record<string, unknown>,
    });
  }

  for (const row of consultations.data ?? []) {
    rows.push({
      id: String(row.id),
      type: "consultation",
      created_at: row.created_at,
      summary: `${row.name ?? "Consultation"} — ${row.email ?? ""}`,
      payload: row as Record<string, unknown>,
    });
  }

  for (const row of quiz.data ?? []) {
    rows.push({
      id: String(row.id),
      type: "quiz",
      created_at: row.created_at,
      summary: row.email ? String(row.email) : "Quiz result",
      payload: row as Record<string, unknown>,
    });
  }

  return rows.sort(
    (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
  );
}

export async function countSubmissions(): Promise<{
  trade: number;
  consultation: number;
  quiz: number;
  total: number;
}> {
  const client = createServiceClient();
  if (!client) {
    return { trade: 0, consultation: 0, quiz: 0, total: 0 };
  }

  const [trade, consultations, quiz] = await Promise.all([
    client.from("trade_applications").select("id", { count: "exact", head: true }),
    client.from("consultations").select("id", { count: "exact", head: true }),
    client.from("quiz_results").select("id", { count: "exact", head: true }),
  ]);

  const tradeCount = trade.count ?? 0;
  const consultationCount = consultations.count ?? 0;
  const quizCount = quiz.count ?? 0;

  return {
    trade: tradeCount,
    consultation: consultationCount,
    quiz: quizCount,
    total: tradeCount + consultationCount + quizCount,
  };
}
