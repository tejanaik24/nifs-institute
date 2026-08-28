import { streamText, convertToModelMessages, stepCountIs, type UIMessage } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { agentTools } from "@/lib/agent/tools";

const ollama = createOpenAICompatible({
  name: "ollama",
  baseURL: process.env.OLLAMA_BASE_URL ?? "http://localhost:11434/v1",
  apiKey: "ollama",
});

const SYSTEM_PROMPT = `You are the admin assistant for the NIFS India blog dashboard.
You can read blog posts, SEO health flags, and analytics, and you can update
post SEO fields, publish/unpublish posts, and create new draft posts.
You do NOT have a tool to delete posts — never claim you deleted one.
Be direct and concise. When you take an action, say plainly what you did.`;

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: ollama(process.env.OLLAMA_MODEL ?? "triv-qwen:latest"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools: agentTools,
    stopWhen: stepCountIs(8),
  });

  return result.toUIMessageStreamResponse();
}
