// Supabase adapter. Persists form submissions (quiz results, B2B
// applications, consultation bookings) via the REST endpoint when env vars
// are present; otherwise logs and returns success for local development.
//
// Expected tables: quiz_results, trade_applications, consultations.

type Payload = Record<string, unknown>;

export async function insertRecord(
  table: "quiz_results" | "trade_applications" | "consultations",
  payload: Payload
): Promise<{ ok: boolean; live: boolean }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.info(`[supabase] stub: would insert into ${table}`, payload);
    return { ok: true, live: false };
  }

  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  return { ok: res.ok, live: true };
}
