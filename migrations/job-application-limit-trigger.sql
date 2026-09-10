-- Duplicate-application guard for nifs.job_applications.
-- Allows up to 2 submissions per (job, phone, day) — covers a genuine
-- network-retry double-submit — and blocks the 3rd+ attempt same day.
-- Does not affect the existing 30-day app-level cooldown for a real
-- re-application later.

CREATE OR REPLACE FUNCTION nifs.check_job_application_limit()
RETURNS trigger AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM nifs.job_applications
    WHERE job_id = NEW.job_id
      AND applicant_phone = NEW.applicant_phone
      AND created_at::date = NEW.created_at::date
  ) >= 2 THEN
    RAISE EXCEPTION 'Duplicate application limit reached for this job today';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS job_application_limit_trigger ON nifs.job_applications;

CREATE TRIGGER job_application_limit_trigger
BEFORE INSERT ON nifs.job_applications
FOR EACH ROW EXECUTE FUNCTION nifs.check_job_application_limit();
