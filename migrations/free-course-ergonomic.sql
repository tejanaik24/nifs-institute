-- Free "Ergonomic Safety" (NIFS ES) course: registration + assignment + timed exam in one row per student.
-- Additive only (new table), safe on the shared Supabase project. TIMESTAMPTZ so the exam clock
-- is correct regardless of server timezone.
CREATE TABLE IF NOT EXISTS nifs.course_registrations (
  id SERIAL PRIMARY KEY,
  course TEXT NOT NULL DEFAULT 'ergonomic-safety',
  name TEXT NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  assignment_answers JSONB,
  assignment_at TIMESTAMPTZ,
  exam_started_at TIMESTAMPTZ,
  exam_submitted_at TIMESTAMPTZ,
  exam_seed INTEGER,
  exam_answers JSONB,
  score INTEGER,
  certificate_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (course, phone, email)
);

-- Anti-spam guard, same shape as phone-clicks-table.sql: caps new registrations per minute.
CREATE OR REPLACE FUNCTION nifs.check_course_registration_limit()
RETURNS trigger AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM nifs.course_registrations
    WHERE created_at > now() - interval '1 minute'
  ) >= 60 THEN
    RAISE EXCEPTION 'course registration rate limit reached';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS course_registration_limit_trigger ON nifs.course_registrations;
CREATE TRIGGER course_registration_limit_trigger
BEFORE INSERT ON nifs.course_registrations
FOR EACH ROW EXECUTE FUNCTION nifs.check_course_registration_limit();
