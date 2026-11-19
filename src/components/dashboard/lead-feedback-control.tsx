"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Check } from "lucide-react";
import {
  FEEDBACK_OUTCOMES,
  FEEDBACK_REASONS,
  canHaveReason,
  type FeedbackOutcome,
  type FeedbackReason,
} from "@/lib/lead-feedback";

export type SerializedFeedback = {
  id: number;
  enquiryId: number;
  outcome: string;
  reason: string | null;
  note: string | null;
  staffName: string;
  createdAt: string | null;
};

interface LeadFeedbackControlProps {
  enquiryId: number;
  candidateName?: string;
  initialFeedback?: SerializedFeedback | null;
}

export function LeadFeedbackControl({
  enquiryId,
  candidateName,
  initialFeedback,
}: LeadFeedbackControlProps) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<SerializedFeedback | null>(
    initialFeedback ?? null,
  );
  const [isOpen, setIsOpen] = useState(false);

  // Form states
  const [selectedOutcome, setSelectedOutcome] = useState<FeedbackOutcome | "">(
    (feedback?.outcome as FeedbackOutcome) || "",
  );
  const [selectedReason, setSelectedReason] = useState<FeedbackReason | "">(
    (feedback?.reason as FeedbackReason) || "",
  );
  const [note, setNote] = useState<string>(feedback?.note || "");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const openModal = () => {
    setSelectedOutcome((feedback?.outcome as FeedbackOutcome) || "");
    setSelectedReason((feedback?.reason as FeedbackReason) || "");
    setNote(feedback?.note || "");
    setErrorMsg(null);
    setIsOpen(true);
  };

  const closeModal = () => {
    if (isSaving) return;
    setIsOpen(false);
    setErrorMsg(null);
  };

  const handleOutcomeSelect = (outcome: FeedbackOutcome) => {
    setSelectedOutcome(outcome);
    if (!canHaveReason(outcome)) {
      setSelectedReason("");
    }
  };

  const handleReasonSelect = (reason: FeedbackReason) => {
    // Tap to select, tap again to unselect
    setSelectedReason((prev) => (prev === reason ? "" : reason));
  };

  const handleSave = async () => {
    if (!selectedOutcome) {
      setErrorMsg("Please select an outcome.");
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/dashboard/lead-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiryId,
          outcome: selectedOutcome,
          reason: selectedReason || null,
          note: note.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save feedback");
      }

      const data = await res.json();
      const saved: SerializedFeedback = {
        id: data.feedback.id,
        enquiryId: data.feedback.enquiryId,
        outcome: data.feedback.outcome,
        reason: data.feedback.reason,
        note: data.feedback.note,
        staffName: data.feedback.staffName,
        createdAt: data.feedback.createdAt
          ? new Date(data.feedback.createdAt).toISOString()
          : new Date().toISOString(),
      };

      setFeedback(saved);
      setIsOpen(false);
      router.refresh();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (isoString?: string | null) => {
    if (!isoString) return "";
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  // Outcome Chip Colors: Joined -> green, Not interested -> red, others -> grey
  const getOutcomeChipClass = (outcome: string) => {
    if (outcome === "Joined") {
      return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30";
    }
    if (outcome === "Not interested") {
      return "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30";
    }
    return "bg-[var(--dash-surface)] text-[var(--dash-text-muted)] border-[var(--dash-border)]";
  };

  return (
    <div className="flex flex-col gap-1.5 min-w-[160px]">
      {feedback ? (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold leading-tight ${getOutcomeChipClass(
                feedback.outcome,
              )}`}
            >
              {feedback.outcome}
            </span>
            <button
              type="button"
              onClick={openModal}
              className="min-h-[44px] sm:min-h-[26px] min-w-[44px] sm:min-w-0 inline-flex items-center justify-center rounded px-2 py-1 text-[11px] font-medium text-[var(--dash-text-muted)] hover:text-[var(--dash-text)] hover:bg-[var(--dash-surface)] border border-transparent hover:border-[var(--dash-border)] transition-colors"
              title="Update feedback"
            >
              Update
            </button>
          </div>

          {feedback.reason && (
            <div
              className="text-[11px] font-medium text-[var(--dash-text)] truncate max-w-[180px]"
              title={feedback.reason}
            >
              ↳ {feedback.reason}
            </div>
          )}

          {feedback.note && (
            <div
              className="text-[10px] text-[var(--dash-text-muted)] italic truncate max-w-[180px]"
              title={feedback.note}
            >
              &ldquo;{feedback.note}&rdquo;
            </div>
          )}

          <div className="text-[10px] text-[var(--dash-text-muted)]/80">
            {feedback.staffName || "Staff"} · {formatDate(feedback.createdAt)}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[var(--dash-text-muted)]">
            No feedback
          </span>
          <button
            type="button"
            onClick={openModal}
            className="min-h-[44px] sm:min-h-[26px] min-w-[44px] sm:min-w-0 inline-flex items-center justify-center rounded border border-[var(--dash-border)] bg-[var(--dash-surface)] px-2.5 py-1 text-[11px] font-medium text-[var(--dash-text)] hover:bg-[var(--dash-bg)] transition-colors"
          >
            Update
          </button>
        </div>
      )}

      {/* Popover / Sheet Dialog */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4 backdrop-blur-xs transition-opacity"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="w-full sm:max-w-md rounded-t-2xl sm:rounded-xl bg-[var(--dash-surface)] border border-[var(--dash-border)] p-5 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[var(--dash-border)]">
              <div>
                <h3 className="text-base font-bold text-[var(--dash-text)]">
                  Update Lead Feedback
                </h3>
                <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">
                  Lead #{enquiryId} {candidateName ? `• ${candidateName}` : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                disabled={isSaving}
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg text-[var(--dash-text-muted)] hover:text-[var(--dash-text)] hover:bg-[var(--dash-bg)] transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-600 dark:text-red-400 font-medium">
                {errorMsg}
              </div>
            )}

            {/* Step 1: Outcome buttons */}
            <div>
              <label className="block text-xs font-semibold text-[var(--dash-text)] mb-2">
                Outcome <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {FEEDBACK_OUTCOMES.map((outcome) => {
                  const isSelected = selectedOutcome === outcome;
                  let selectedStyle =
                    "bg-[var(--dash-text)] text-[var(--dash-surface)] border-[var(--dash-text)]";
                  if (outcome === "Joined") {
                    selectedStyle = "bg-emerald-600 text-white border-emerald-600";
                  } else if (outcome === "Not interested") {
                    selectedStyle = "bg-rose-600 text-white border-rose-600";
                  }

                  return (
                    <button
                      key={outcome}
                      type="button"
                      onClick={() => handleOutcomeSelect(outcome)}
                      className={`min-h-[44px] px-3 py-2 text-xs font-medium rounded-lg border flex items-center justify-center text-center transition-all ${
                        isSelected
                          ? `${selectedStyle} shadow-sm font-semibold`
                          : "bg-[var(--dash-bg)] text-[var(--dash-text)] border-[var(--dash-border)] hover:bg-[var(--dash-surface)]"
                      }`}
                    >
                      {outcome}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Reason chips (only shown when outcome is Not interested / No answer / Call back later) */}
            {canHaveReason(selectedOutcome) && (
              <div>
                <label className="block text-xs font-semibold text-[var(--dash-text)] mb-2">
                  Reason <span className="text-xs font-normal text-[var(--dash-text-muted)]">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {FEEDBACK_REASONS.map((reason) => {
                    const isSelected = selectedReason === reason;
                    return (
                      <button
                        key={reason}
                        type="button"
                        onClick={() => handleReasonSelect(reason)}
                        className={`min-h-[44px] px-3 py-2 text-xs rounded-full border flex items-center gap-1.5 transition-all ${
                          isSelected
                            ? "bg-[var(--dash-accent)] text-white border-[var(--dash-accent)] shadow-sm font-medium"
                            : "bg-[var(--dash-bg)] text-[var(--dash-text)] border-[var(--dash-border)] hover:bg-[var(--dash-surface)]"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                        {reason}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Optional 1-line note (max 300 chars) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-[var(--dash-text)]">
                  Note <span className="text-xs font-normal text-[var(--dash-text-muted)]">(optional, max 300 chars)</span>
                </label>
                <span className="text-[10px] text-[var(--dash-text-muted)]">
                  {note.length}/300
                </span>
              </div>
              <input
                type="text"
                maxLength={300}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Needs evening batch, call next Monday"
                className="w-full min-h-[44px] px-3 py-2 text-xs rounded-lg border border-[var(--dash-border)] bg-[var(--dash-bg)] text-[var(--dash-text)] placeholder:text-[var(--dash-text-muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--dash-accent)]"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--dash-border)] mt-1">
              <button
                type="button"
                onClick={closeModal}
                disabled={isSaving}
                className="min-h-[44px] px-4 py-2 text-xs font-medium rounded-lg border border-[var(--dash-border)] text-[var(--dash-text-muted)] hover:text-[var(--dash-text)] hover:bg-[var(--dash-bg)] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving || !selectedOutcome}
                className="min-h-[44px] px-5 py-2 text-xs font-semibold rounded-lg bg-[var(--dash-accent)] text-white hover:bg-[var(--dash-accent-hover)] transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSaving ? "Saving..." : "Save Feedback"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
