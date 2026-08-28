import { NextResponse } from "next/server";
import { commitWorktree } from "@/lib/agent/worktree";

export async function POST(request: Request) {
  const { worktreePath, branch } = await request.json();
  if (typeof worktreePath !== "string" || typeof branch !== "string") {
    return NextResponse.json({ error: "Missing worktreePath or branch." }, { status: 400 });
  }

  try {
    await commitWorktree(worktreePath, `Agent fix (${branch})`);
    return NextResponse.json({ committed: true, branch });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed to commit the fix." }, { status: 500 });
  }
}
