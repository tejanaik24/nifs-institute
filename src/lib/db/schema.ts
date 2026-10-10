import {
  date,
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
  pagePath: text("page_path"),
  // Visitor's city/state, read from Vercel's edge geolocation headers at
  // submit/draft-create time (see src/lib/geo.ts) — empty outside Vercel
  // (e.g. local dev) or for rows created before this column existed.
  city: text("city").notNull().default(""),
  state: text("state").notNull().default(""),
  status: varchar("status", { length: 20 }).notNull().default("submitted"), // "draft" | "submitted"
  // Random per-draft ownership token (see
  // migrations/lead-capture-draft-token.sql) — returned once when a draft is
  // created and required on every later PATCH/submit for that row, so a
  // guessed sequential id can't be used to hijack someone else's draft.
  // Nullable: only draft rows ever get one.
  draftToken: text("draft_token"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Logged by /api/track/whatsapp-click — every wa.me link on the site is
// wired through WhatsAppClickTracker (see
// src/components/analytics/whatsapp-click-tracker.tsx), so this counts
// real click volume even though we never see what gets typed in WhatsApp.
export const whatsappClicks = pgTable("whatsapp_clicks", {
  id: serial("id").primaryKey(),
  pagePath: text("page_path").notNull(),
  linkLabel: text("link_label").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Logged by /api/track/phone-click — mirrors whatsappClicks. Every tel:
// link on the site is wired through PhoneClickTracker (see
// src/components/analytics/phone-click-tracker.tsx).
export const phoneClicks = pgTable("phone_clicks", {
  id: serial("id").primaryKey(),
  pagePath: text("page_path").notNull(),
  linkLabel: text("link_label").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Why an enquiry submit failed (see migrations/enquiry-errors.sql). Never
// holds names, numbers or other personal data.
export const enquiryErrors = pgTable("enquiry_errors", {
  id: serial("id").primaryKey(),
  reason: varchar("reason", { length: 20 }).notNull(), // "validation" | "delivery" | "server"
  detail: text("detail").notNull().default(""),
  pagePath: text("page_path").notNull().default(""),
  userAgent: text("user_agent").notNull().default(""),
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

// Free "Ergonomic Safety" course (see migrations/free-course-ergonomic.sql):
// one row per student holds registration, assignment and the timed exam.
// All exam timestamps are timestamptz so the 10-minute clock is timezone-safe.
export const courseRegistrations = pgTable("course_registrations", {
  id: serial("id").primaryKey(),
  course: text("course").notNull().default("ergonomic-safety"),
  name: text("name").notNull(),
  phone: varchar("phone", { length: 15 }).notNull(),
  email: text("email").notNull(),
  country: text("country"),
  token: text("token").notNull().unique(),
  assignmentAnswers: jsonb("assignment_answers").$type<string[]>(),
  assignmentAt: timestamp("assignment_at", { withTimezone: true }),
  examStartedAt: timestamp("exam_started_at", { withTimezone: true }),
  examSubmittedAt: timestamp("exam_submitted_at", { withTimezone: true }),
  examSeed: integer("exam_seed"),
  examAnswers: jsonb("exam_answers").$type<Record<string, number>>(),
  score: integer("score"),
  certificateSentAt: timestamp("certificate_sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Placement-seeker form on /placements (see migrations/placement-leads.sql).
export const placementLeads = pgTable("placement_leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  dob: date("dob", { mode: "string" }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull(),
  email: text("email").notNull(),
  location: text("location").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Suggestion box on the free Ergonomic Safety course (see migrations/free-course-suggestions.sql).
export const courseSuggestions = pgTable("course_suggestions", {
  id: serial("id").primaryKey(),
  registrationId: integer("registration_id").notNull().references(() => courseRegistrations.id, { onDelete: "cascade" }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Abroad & International student enquiries on /courses/abroad-students (see migrations/abroad-enquiries.sql).
export const abroadEnquiries = pgTable("abroad_enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: varchar("phone", { length: 35 }).notNull(), // Contact No
  email: text("email").notNull(),
  country: text("country").notNull().default(""),
  state: text("state").notNull().default(""),
  city: text("city").default(""),
  location: text("location").default(""),
  course: text("course").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Center partnership & franchise applications on /centers/apply (see migrations/center-applications.sql)
// Applications are reviewed directly by the Office of the Director (director@nifsindia.com).
export const centerApplications = pgTable("center_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: varchar("phone", { length: 35 }).notNull(),
  email: text("email").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  profession: text("profession").notNull().default(""),
  carpetArea: text("carpet_area").notNull().default(""),
  investmentCapacity: text("investment_capacity").notNull().default(""),
  timeline: text("timeline").notNull().default(""),
  message: text("message").notNull().default(""),
  status: varchar("status", { length: 20 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

