-- Suggestion box on the free Ergonomic Safety course page. Additive only (new table).
CREATE TABLE IF NOT EXISTS nifs.course_suggestions (
  id SERIAL PRIMARY KEY,
  registration_id INTEGER NOT NULL REFERENCES nifs.course_registrations(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS course_suggestions_reg_idx ON nifs.course_suggestions (registration_id, created_at DESC);
