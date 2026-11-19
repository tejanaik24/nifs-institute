import { asc, gte } from "drizzle-orm";
import { db } from "./client";
import { leadFeedback } from "./schema";

export type FeedbackSummaryData = {
  byOutcome: { outcome: string; count: number }[];
  byReason: { reason: string; count: number }[];
  byStaff: { staffName: string; leadCount: number; updateCount: number }[];
  totalUpdates: number;
};

/**
 * Returns 30-day aggregated summary of counsellor lead feedback:
 * - count per outcome
 * - count per reason
 * - per staff_name how many leads they updated (and total feedback updates)
 */
export async function getLeadFeedbackSummary(days = 30): Promise<FeedbackSummaryData> {
  try {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const outcomeMap = new Map<string, number>();
    const reasonMap = new Map<string, number>();
    const rows = await db
      .select({
        id: leadFeedback.id,
        enquiryId: leadFeedback.enquiryId,
        outcome: leadFeedback.outcome,
        reason: leadFeedback.reason,
        staffName: leadFeedback.staffName,
      })
      .from(leadFeedback)
      .where(gte(leadFeedback.createdAt, since))
      .orderBy(asc(leadFeedback.createdAt), asc(leadFeedback.id));

    // Outcome/reason counts use each lead's LATEST feedback only (a lead updated
    // 3 times counts once); staff counts still see every update.
    const latestByEnquiry = new Map<number, (typeof rows)[number]>();
    for (const r of rows) latestByEnquiry.set(r.enquiryId, r);
    for (const r of latestByEnquiry.values()) {
      outcomeMap.set(r.outcome, (outcomeMap.get(r.outcome) || 0) + 1);
      if (r.reason) reasonMap.set(r.reason, (reasonMap.get(r.reason) || 0) + 1);
    }

    const staffMap = new Map<string, { leadIds: Set<number>; updates: number }>();

    for (const r of rows) {
      const staff = r.staffName || "Staff";
      if (!staffMap.has(staff)) {
        staffMap.set(staff, { leadIds: new Set(), updates: 0 });
      }
      const s = staffMap.get(staff)!;
      s.leadIds.add(r.enquiryId);
      s.updates += 1;
    }

    const byOutcome = Array.from(outcomeMap.entries())
      .map(([outcome, count]) => ({ outcome, count }))
      .sort((a, b) => b.count - a.count);

    const byReason = Array.from(reasonMap.entries())
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count);

    const byStaff = Array.from(staffMap.entries())
      .map(([staffName, data]) => ({
        staffName,
        leadCount: data.leadIds.size,
        updateCount: data.updates,
      }))
      .sort((a, b) => b.leadCount - a.leadCount);

    return {
      byOutcome,
      byReason,
      byStaff,
      totalUpdates: rows.length,
    };
  } catch (err) {
    console.warn("Could not query lead_feedback table for summary:", err);
    return {
      byOutcome: [],
      byReason: [],
      byStaff: [],
      totalUpdates: 0,
    };
  }
}
