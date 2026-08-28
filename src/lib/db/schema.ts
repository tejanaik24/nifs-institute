import { integer, jsonb, pgSchema, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Own schema, not the default "public" one — this Supabase project
// (vyzma-agency) is shared with other clients, so NIFS's tables are kept in
// their own namespace rather than mixed into whatever else lives here.
const nifsSchema = pgSchema("nifs");
const pgTable = nifsSchema.table;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  coverImage: text("cover_image").notNull().default(""),
  category: varchar("category", { length: 120 }).notNull().default(""),
  seoTitle: text("seo_title").notNull().default(""),
  metaDescription: text("meta_description").notNull().default(""),
  ogImage: text("og_image").notNull().default(""),
  wordCount: integer("word_count").notNull().default(0),
  faqs: jsonb("faqs").$type<{ question: string; answer: string }[]>().notNull().default([]),
  authorName: text("author_name").notNull().default(""),
  authorTitle: text("author_title").notNull().default(""),
  status: varchar("status", { length: 20 }).notNull().default("draft"), // "draft" | "published"
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// One row per detected AI-crawler request (GPTBot, ClaudeBot, PerplexityBot,
// etc.) — GA4 can't see these at all since bots don't run JavaScript. Written
// by src/middleware.ts on every public-page request that matches a known bot
// user-agent.
export const botHits = pgTable("bot_hits", {
  id: serial("id").primaryKey(),
  botName: varchar("bot_name", { length: 60 }).notNull(),
  path: text("path").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Activity log for the AI agent — not a confirmation gate (the agent runs
// autonomously), just an after-the-fact record so Teja can see what it did.
export const agentActions = pgTable("agent_actions", {
  id: serial("id").primaryKey(),
  toolName: varchar("tool_name", { length: 60 }).notNull(),
  args: jsonb("args").notNull(),
  result: jsonb("result"),
  error: text("error"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
