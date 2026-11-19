-- Records counsellor lead feedback for enquiries and free course leads.
-- History is preserved: every feedback update inserts a new row. The latest
-- row per enquiry_id represents the current status.
CREATE TABLE IF NOT EXISTS nifs.lead_feedback (
  id SERIAL PRIMARY KEY,
  enquiry_id INT NOT NULL REFERENCES nifs.enquiries(id),
  outcome VARCHAR(30) NOT NULL,
  reason VARCHAR(40) NULL,
  note TEXT NULL,
  staff_name TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lead_feedback_enquiry_id ON nifs.lead_feedback(enquiry_id);
