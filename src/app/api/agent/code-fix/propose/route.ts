import { NextResponse } from "next/server";
import { proposeFix } from "@/lib/agent/code-fix";

export async function POST(request: Request) {
  if (process.env.VERCEL) {
    return NextResponse.json(
      { error: "Code Fixer only works when the dashboard runs locally on your own PC, not on Vercel." },
      { status: 400 }
    );
  }

  const { description } = await request.json();
  if (typeof description !== "string" || !description.trim()) {
    return NextResponse.json({ error: "Describe the bug first." }, { status: 400 });
  }

  try {
    const result = await proposeFix(description);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed to propose a fix." }, { status: 500 });
  }
}
