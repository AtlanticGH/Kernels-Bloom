import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/integrations/klaviyo";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    const result = await subscribeToNewsletter(email);
    return NextResponse.json(result, { status: result.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
