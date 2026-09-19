-- Logs every click on a wa.me WhatsApp link anywhere on the site (see
-- src/components/analytics/whatsapp-click-tracker.tsx) — previously
-- invisible to the dashboard entirely.
CREATE TABLE nifs.whatsapp_clicks (
  id SERIAL PRIMARY KEY,
  page_path TEXT NOT NULL,
  link_label TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Lets the callback form save a draft while the visitor is still typing
-- (see /api/enquiry/draft), so an abandoned form still leaves a callable
-- lead. 'submitted' is the default so every existing row is unaffected.
ALTER TABLE nifs.enquiries
  ADD COLUMN status TEXT NOT NULL DEFAULT 'submitted';
