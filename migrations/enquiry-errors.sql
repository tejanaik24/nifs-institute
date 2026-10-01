-- Records WHY an enquiry form submit failed, so "36% of form starts hit an
-- error" (GA4, 2026-10-01) can be split into real causes instead of guessing.
-- reason: 'validation' (client-side field check failed; detail = field names,
-- never values), 'delivery' (client saw a failed/slow submit; detail = timeout,
-- network, http_<status>) or 'server' (the /api/enquiry route itself threw).
-- No names, phone numbers or other personal data are ever stored here.
CREATE TABLE IF NOT EXISTS nifs.enquiry_errors (
  id SERIAL PRIMARY KEY,
  reason VARCHAR(20) NOT NULL,
  detail TEXT NOT NULL DEFAULT '',
  page_path TEXT NOT NULL DEFAULT '',
  user_agent TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Anti-spam guard, same shape as the click-table guards: caps logged errors
-- to 100 per minute site-wide so the public route can't be used to flood
-- the table.
CREATE OR REPLACE FUNCTION nifs.check_enquiry_error_limit()
RETURNS trigger AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM nifs.enquiry_errors
    WHERE created_at > now() - interval '1 minute'
  ) >= 100 THEN
    RAISE EXCEPTION 'enquiry error log rate limit reached';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enquiry_error_limit_trigger ON nifs.enquiry_errors;
CREATE TRIGGER enquiry_error_limit_trigger
BEFORE INSERT ON nifs.enquiry_errors
FOR EACH ROW EXECUTE FUNCTION nifs.check_enquiry_error_limit();
