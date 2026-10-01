-- Placement-seeker form on /placements (name, DOB, phone, email, location). Additive only (new table).
CREATE TABLE IF NOT EXISTS nifs.placement_leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  dob DATE NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (phone, email)
);
