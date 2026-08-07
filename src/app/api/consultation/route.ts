import { NextResponse } from "next/server";
import { insertRecord } from "@/lib/integrations/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }
    const result = await insertRecord("consultations", {
      ...body,
      created_at: new Date().toISOString(),
    });
    return NextResponse.json(result, { status: result.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
