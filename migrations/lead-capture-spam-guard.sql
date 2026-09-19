-- Anti-spam guard: caps automated draft creation per phone per day. This
-- catches a script that repeatedly hammers the SAME phone number, not a
-- determined attacker who varies the phone on every request (this is a
-- basic guard against casual abuse, not full IP/session-level throttling).
-- Submitted (status='submitted') rows are never limited by this — only
-- repeated draft inserts for the same phone.
CREATE OR REPLACE FUNCTION nifs.check_enquiry_draft_limit()
RETURNS trigger AS $$
BEGIN
  IF NEW.status = 'draft' AND (
    SELECT COUNT(*) FROM nifs.enquiries
    WHERE phone = NEW.phone
      AND status = 'draft'
      AND created_at::date = NEW.created_at::date
  ) >= 10 THEN
    RAISE EXCEPTION 'draft limit reached for this phone today';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enquiry_draft_limit_trigger ON nifs.enquiries;
CREATE TRIGGER enquiry_draft_limit_trigger
BEFORE INSERT ON nifs.enquiries
FOR EACH ROW EXECUTE FUNCTION nifs.check_enquiry_draft_limit();

-- Anti-spam guard: caps WhatsApp click logging per page per short window.
-- pagePath is caller-supplied and unvalidated, so a script that varies the
-- path on every request bypasses this cap — it stops a script hammering
-- the SAME reported page, not a determined attacker (basic guard against
-- casual abuse, not full IP/session-level throttling). Still comfortably
-- covers real traffic spikes (a genuinely viral page getting >100 real
-- WhatsApp clicks in one minute is not realistic for this site's volume).
CREATE OR REPLACE FUNCTION nifs.check_whatsapp_click_limit()
RETURNS trigger AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM nifs.whatsapp_clicks
    WHERE page_path = NEW.page_path
      AND created_at > now() - interval '1 minute'
  ) >= 100 THEN
    RAISE EXCEPTION 'whatsapp click rate limit reached for this page';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS whatsapp_click_limit_trigger ON nifs.whatsapp_clicks;
CREATE TRIGGER whatsapp_click_limit_trigger
BEFORE INSERT ON nifs.whatsapp_clicks
FOR EACH ROW EXECUTE FUNCTION nifs.check_whatsapp_click_limit();
