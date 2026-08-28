// Known AI-crawler user-agent substrings — mirrors the bots explicitly
// allowed in src/app/robots.ts.
export const AI_BOTS = ["GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Google-Extended", "Amazonbot"];

// Header middleware.ts attaches when it calls /api/bot-hit server-to-server,
// so that route can reject direct hits from the public internet.
export const INTERNAL_HEADER = "x-internal-secret";
