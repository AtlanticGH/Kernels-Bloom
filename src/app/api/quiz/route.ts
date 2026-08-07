import { NextResponse } from "next/server";
import { insertRecord } from "@/lib/integrations/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await insertRecord("quiz_results", {
      answers: body.answers ?? {},
      email: body.email ?? null,
      created_at: new Date().toISOString(),
    });
    return NextResponse.json(result, { status: result.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
