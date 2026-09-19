-- Random per-draft ownership token, returned once by POST /api/enquiry/draft
-- and required on every later PATCH or submit-conversion for that row, so a
-- caller can't act on a draft just by guessing its sequential id.
ALTER TABLE nifs.enquiries ADD COLUMN draft_token TEXT;
