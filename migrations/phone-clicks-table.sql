-- Mirrors whatsapp_clicks: logs every tel: link click site-wide via
-- PhoneClickTracker, so the "Action Clicks (Phone)" dashboard step stops
-- showing "Not measured".
CREATE TABLE IF NOT EXISTS nifs.phone_clicks (
  id SERIAL PRIMARY KEY,
  page_path TEXT NOT NULL,
  link_label TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Anti-spam guard: same shape as check_whatsapp_click_limit in
-- lead-capture-spam-guard.sql — caps clicks logged per page per minute.
CREATE OR REPLACE FUNCTION nifs.check_phone_click_limit()
RETURNS trigger AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM nifs.phone_clicks
    WHERE page_path = NEW.page_path
      AND created_at > now() - interval '1 minute'
  ) >= 100 THEN
    RAISE EXCEPTION 'phone click rate limit reached for this page';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS phone_click_limit_trigger ON nifs.phone_clicks;
CREATE TRIGGER phone_click_limit_trigger
BEFORE INSERT ON nifs.phone_clicks
FOR EACH ROW EXECUTE FUNCTION nifs.check_phone_click_limit();
