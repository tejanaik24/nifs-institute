import {
  integer,
  jsonb,
  pgSchema,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// Own schema, not the default "public" one — this Supabase project
// (vyzma-agency) is shared with other clients, so NIFS's tables are kept in
// their own namespace rather than mixed into whatever else lives here.
const nifsSchema = pgSchema("nifs");
const pgTable = nifsSchema.table;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull().default(""),
  role: varchar("role", { length: 20 }).notNull().default("staff"), // "admin" | "staff"
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
  faqs: jsonb("faqs")
    .$type<{ question: string; answer: string }[]>()
    .notNull()
    .default([]),
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

// Callback requests from the admissions form. formsubmit.co (the previous
// delivery path) silently rejects every submission until someone clicks an
// activation link buried in an inbox — storing leads here instead means a
// broken third-party mail service can never eat a real enquiry again.
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: varchar("phone", { length: 15 }).notNull(),
  course: text("course").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  jobCode: varchar("job_code", { length: 30 }).unique(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  companyName: text("company_name").notNull(),
  clientCompany: text("client_company").default(""),
  clientLogoUrl: text("client_logo_url").default(""),
  location: text("location").notNull(),
  languages: text("languages").default(""),
  otherBenefits: text("other_benefits").default(""),
  applyByDate: timestamp("apply_by_date"),
  posterImageUrl: text("poster_image_url").default(""),
  placementOfficerName: text("placement_officer_name").default(""),
  officerEmail: text("officer_email").default(""),
  contactEmail: text("contact_email").default(""),
  contactPhone: text("contact_phone").default(""),
  additionalNotice: text("additional_notice").default(""),
  status: varchar("status", { length: 20 }).notNull().default("draft"), // "draft" | "open" | "closed"
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdByUserId: integer("created_by_user_id").references(() => users.id),
});

// Reusable client-company logo library so staff pick a saved logo (search by
// name) instead of re-uploading the same client's logo on every posting.
export const companyLogos = pgTable("company_logos", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  logoUrl: text("logo_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const jobPositions = pgTable("job_positions", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobs.id, { onDelete: "cascade" }),
  designation: text("designation").notNull(),
  vacancies: integer("vacancies").notNull().default(1),
  qualification: text("qualification").default(""),
  experience: text("experience").default(""),
  salary: text("salary").default(""),
  sortOrder: integer("sort_order").default(0),
});

// Duplicate-application limit (max 2 per job/phone/day — allows one
// network-retry resubmit, blocks a 3rd+ same-day attempt) is enforced by a
// Postgres trigger (see migrations/job-application-limit-trigger.sql), not a
// unique index — Drizzle's schema builder can't express a counting rule.
export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobs.id, { onDelete: "cascade" }),
  positionId: integer("position_id").references(() => jobPositions.id),
  applicantName: text("applicant_name").notNull(),
  applicantPhone: varchar("applicant_phone", { length: 20 }).notNull(),
  resumeUrl: text("resume_url").default(""),
  openedByUserId: integer("opened_by_user_id").references(() => users.id),
  openedAt: timestamp("opened_at"),
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
