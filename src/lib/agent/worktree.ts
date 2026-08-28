import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const exec = promisify(execFile);

const REPO_ROOT = process.cwd();
const WORKTREES_DIR = path.join(REPO_ROOT, ".claude", "worktrees");

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
