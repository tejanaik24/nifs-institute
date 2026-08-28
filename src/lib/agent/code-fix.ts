import path from "node:path";
import { query, type CanUseTool } from "@anthropic-ai/claude-agent-sdk";
import { createFixWorktree, getWorktreeDiff } from "./worktree";

const ALLOWED_TOOLS = ["Read", "Glob", "Grep", "Edit", "Write"];

/** The real safety boundary: allowedTools/disallowedTools only control
 * whether the SDK *prompts* — they don't sandbox paths. This callback is the
 * actual enforcement, checked ourselves against every tool call, and it's
 * what a real test (see code-fix.test.ts / manual escape test) verifies. */
function makeCanUseTool(worktreePath: string): CanUseTool {
  const base = path.resolve(worktreePath);

  function escapesWorktree(value: string): boolean {
    if (!path.isAbsolute(value)) return false;
    const resolved = path.resolve(value);
    return resolved !== base && !resolved.startsWith(base + path.sep);
  }

  // Only these fields ever hold a path the model controls (Read/Write/Edit
  // use file_path; Glob/Grep use path). Everything else — old_string,
  // new_string, content, pattern — is file CONTENT or a search pattern, not
  // a path, and must never be run through an "is this a path" check (a
  // content string that happens to start with "/", e.g. a "//" comment,
  // otherwise false-positives as an absolute-path escape).
  const PATH_FIELDS = ["file_path", "path"];

  return async (toolName, input) => {
    if (!ALLOWED_TOOLS.includes(toolName)) {
      return { behavior: "deny", message: `${toolName} is not permitted for code fixes.` };
    }
    for (const field of PATH_FIELDS) {
      const value = input[field];
      if (typeof value === "string" && escapesWorktree(value)) {
        return { behavior: "deny", message: `Refusing to touch a path outside the isolated worktree: ${value}` };
      }
    }
    return { behavior: "allow", updatedInput: input };
  };
}

export async function proposeFix(description: string): Promise<{
  worktreePath: string;
  branch: string;
  summary: string;
  diff: string;
}> {
  const { path: worktreePath, branch } = await createFixWorktree();

  let summary = "";
  const result = query({
    prompt: `You are fixing a bug in this website's codebase. Bug report: ${description}\n\nFind the root cause and fix it directly in the files under this directory. Do not commit or push — just make the edit. When done, briefly explain what you changed and why.`,
    options: {
      cwd: worktreePath,
      // Deliberately NOT listing Read/Glob/Grep/Edit/Write in allowedTools —
      // a bare name there auto-approves the call before canUseTool ever
      // runs (the SDK warns about this: CLAUDE_SDK_CAN_USE_TOOL_SHADOWED).
      // Leaving them unlisted makes every call fall through to canUseTool,
      // which is the actual path-boundary check.
      disallowedTools: ["Bash", "WebFetch", "WebSearch"],
      // "dontAsk" denies any tool not pre-approved via allowedTools WITHOUT
      // ever calling canUseTool (confirmed by testing) — "default" is what
      // actually routes Read/Glob/Grep/Edit/Write through the callback.
      permissionMode: "default",
      canUseTool: makeCanUseTool(worktreePath),
    },
  });

  for await (const message of result) {
    if (message.type === "result" && message.subtype === "success") {
      summary = message.result;
    }
  }

  const diff = await getWorktreeDiff(worktreePath);
  return { worktreePath, branch, summary, diff };
}
