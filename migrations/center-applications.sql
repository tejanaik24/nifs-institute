-- Center partnership & franchise applications from /centers/apply
-- Submissions are routed directly to the Directorate (director@nifsindia.com).
CREATE TABLE IF NOT EXISTS nifs.center_applications (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone VARCHAR(35) NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  profession TEXT NOT NULL DEFAULT '',
  carpet_area TEXT NOT NULL DEFAULT '',
  investment_capacity TEXT NOT NULL DEFAULT '',
  timeline TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  status VARCHAR(20) NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

