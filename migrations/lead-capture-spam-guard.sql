-- Anti-spam guard: caps automated draft creation per phone per day, so a
-- script hitting POST /api/enquiry/draft directly can't flood the leads
-- table. Submitted (status='submitted') rows are never limited by this —
-- only repeated draft inserts for the same phone.
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

-- Anti-spam guard: caps WhatsApp click logging per page per short window,
-- blunting a scripted flood against POST /api/track/whatsapp-click while
-- still comfortably covering real traffic spikes (a genuinely viral page
-- getting >100 real WhatsApp clicks in one minute is not realistic for
-- this site's traffic volume).
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
