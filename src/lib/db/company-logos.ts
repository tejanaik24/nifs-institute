import { asc } from "drizzle-orm";
import { db } from "./client";
import { companyLogos } from "./schema";

export async function getAllCompanyLogos() {
  return db.select().from(companyLogos).orderBy(asc(companyLogos.name));
}

export async function createCompanyLogo(name: string, logoUrl: string) {
  const [row] = await db
    .insert(companyLogos)
    .values({ name: name.trim(), logoUrl })
    .onConflictDoUpdate({
      target: companyLogos.name,
      set: { logoUrl },
    })
    .returning();
  return row;
}
