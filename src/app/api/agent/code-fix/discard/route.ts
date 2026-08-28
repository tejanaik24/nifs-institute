import { NextResponse } from "next/server";
import { cleanupWorktree } from "@/lib/agent/worktree";

export async function POST(request: Request) {
  const { worktreePath, branch } = await request.json();
  if (typeof worktreePath !== "string" || typeof branch !== "string") {
    return NextResponse.json({ error: "Missing worktreePath or branch." }, { status: 400 });
  }

  try {
    await cleanupWorktree(worktreePath, branch);
    return NextResponse.json({ discarded: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed to discard." }, { status: 500 });
  }
}
