"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Bot, Send, Wrench, User } from "lucide-react";

export default function AgentPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/agent/chat" }),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div>
        <h1 className="font-mono text-lg text-[var(--dash-text)]">Agent</h1>
        <p className="mt-1 text-sm text-[var(--dash-text-muted)]">
          Chat with your local assistant — it can read posts, flags, analytics, and publish/edit/create posts.
        </p>
      </div>

      <div className="mt-6 flex-1 space-y-4 overflow-y-auto rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5">
        {messages.length === 0 && (
          <p className="text-sm text-[var(--dash-text-muted)]">
            Ask it something, e.g. &ldquo;what&apos;s flagged right now?&rdquo; or &ldquo;publish the draft about fire safety.&rdquo;
          </p>
        )}
        {messages.map((message) => (
          <div key={message.id} className="flex gap-3">
            <span
              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                message.role === "user" ? "bg-white/10 text-[var(--dash-text)]" : "bg-[var(--dash-accent)]/15 text-[var(--dash-accent)]"
              }`}
            >
              {message.role === "user" ? <User size={14} /> : <Bot size={14} />}
            </span>
            <div className="min-w-0 flex-1 space-y-2">
              {message.parts.map((part, i) => {
                if (part.type === "text") {
                  return (
                    <p key={i} className="whitespace-pre-wrap text-sm text-[var(--dash-text)]">
                      {part.text}
                    </p>
                  );
                }
                if (part.type.startsWith("tool-") || part.type === "dynamic-tool") {
                  const toolPart = part as { type: string; state?: string; input?: unknown; output?: unknown };
                  const toolName = part.type === "dynamic-tool" ? (part as { toolName: string }).toolName : part.type.slice(5);
                  return (
                    <div key={i} className="flex items-start gap-2 rounded-lg bg-black/20 px-3 py-2 text-xs">
                      <Wrench size={12} className="mt-0.5 shrink-0 text-[var(--dash-accent)]" />
                      <div className="min-w-0 font-mono text-[var(--dash-text-muted)]">
                        <span className="text-[var(--dash-text)]">{toolName}</span>
                        {toolPart.state && <span> — {toolPart.state}</span>}
                        {toolPart.output != null && (
                          <pre className="mt-1 max-w-full overflow-x-auto whitespace-pre-wrap break-words">
                            {JSON.stringify(toolPart.output, null, 2)}
                          </pre>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}
        {status === "submitted" && <p className="text-xs text-[var(--dash-text-muted)]">Thinking…</p>}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the agent…"
          className="flex-1 rounded-lg border border-[var(--dash-border)] bg-[var(--dash-bg)] px-4 py-2.5 text-sm text-[var(--dash-text)] placeholder:text-[var(--dash-text-muted)] focus:border-[var(--dash-accent)]/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitted" || status === "streaming"}
          className="flex items-center justify-center rounded-lg bg-[var(--dash-accent)] px-4 text-[var(--dash-bg)] transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
