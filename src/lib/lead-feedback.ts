import { z } from "zod";

export const FEEDBACK_OUTCOMES = [
  "Interested",
  "Not interested",
  "No answer",
  "Call back later",
  "Visit booked",
  "Joined",
] as const;

export type FeedbackOutcome = (typeof FEEDBACK_OUTCOMES)[number];

export const FEEDBACK_REASONS = [
  "Fees too high",
  "Centre too far",
  "Wants online only",
  "Only wanted free course",
  "Wants job guarantee",
  "Timing / working",
  "Parents not agreed",
  "Joined other institute",
  "Wrong number",
  "Other",
] as const;

export type FeedbackReason = (typeof FEEDBACK_REASONS)[number];

/** Outcomes that allow / prompt for an optional reason */
export const OUTCOMES_WITH_REASON = [
  "Not interested",
  "No answer",
  "Call back later",
] as const;

export type OutcomeWithReason = (typeof OUTCOMES_WITH_REASON)[number];

export function canHaveReason(outcome: string): boolean {
  return OUTCOMES_WITH_REASON.includes(outcome as OutcomeWithReason);
}

export const leadFeedbackInputSchema = z.object({
  enquiryId: z.number().int().positive(),
  outcome: z.enum(FEEDBACK_OUTCOMES),
  reason: z.enum(FEEDBACK_REASONS).optional().nullable(),
  note: z.string().max(300, "Note must be 300 characters or less").optional().nullable(),
});

export type LeadFeedbackInput = z.infer<typeof leadFeedbackInputSchema>;

export type LeadFeedbackRecord = {
  id: number;
  enquiryId: number;
  outcome: string;
  reason: string | null;
  note: string | null;
  staffName: string;
  createdAt: Date | null;
};
