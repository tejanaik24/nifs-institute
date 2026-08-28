import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  // This Supabase project is shared with other clients — restrict drizzle-kit
  // to only ever look at (and diff/push against) the "nifs" schema. Without
  // this, `drizzle-kit push` compares against every schema it can see and
  // will offer to DROP tables belonging to unrelated projects (confirmed the
  // hard way: it proposed deleting clients/projects/tasks/websites tables on
  // first run — those belong to a different app in this same database).
  schemaFilter: ["nifs"],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
