import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { getSession } from "@/lib/auth/session";

const exec = promisify(execFile);

const REPO_ROOT = process.cwd();
const WORKTREES_DIR = path.join(REPO_ROOT, ".claude", "worktrees");

/** Code-Fixer is an admin-only, local-machine tool. Every route that touches
 * a worktree by a client-supplied path must call this first — it checks the
 * caller is an admin and confines the path to WORKTREES_DIR so a staff
 * account (or a tampered request) can't point `git` at an arbitrary folder. */
export async function assertAuthorizedWorktreeAccess(worktreePath: string): Promise<void> {
  const session = await getSession();
  if (session?.role !== "admin") {
    throw new Error("Unauthorized: Code Fixer is admin-only.");
  }
  const resolved = path.resolve(worktreePath);
  const base = path.resolve(WORKTREES_DIR) + path.sep;
  if (!resolved.startsWith(base)) {
    throw new Error("Invalid worktree path.");
  }
}

/** Isolates a code-fix attempt on its own branch/worktree so it never
 * touches Teja's real working directory or main until he clicks Apply. */
export async function createFixWorktree(): Promise<{ path: string; branch: string }> {
  const branch = `agent/fix-${Date.now()}`;
  const worktreePath = path.join(WORKTREES_DIR, branch.replace("/", "-"));
  await exec("git", ["worktree", "add", worktreePath, "-b", branch], { cwd: REPO_ROOT });
  return { path: worktreePath, branch };
}

export async function commitWorktree(worktreePath: string, message: string): Promise<void> {
  await exec("git", ["add", "-A"], { cwd: worktreePath });
  await exec("git", ["commit", "-m", message], { cwd: worktreePath });
}

export async function getWorktreeDiff(worktreePath: string): Promise<string> {
  const { stdout } = await exec("git", ["diff", "HEAD"], { cwd: worktreePath, maxBuffer: 10 * 1024 * 1024 });
  return stdout;
}

export async function cleanupWorktree(worktreePath: string, branch: string): Promise<void> {
  await exec("git", ["worktree", "remove", "--force", worktreePath], { cwd: REPO_ROOT });
  await exec("git", ["branch", "-D", branch], { cwd: REPO_ROOT }).catch(() => {});
}
