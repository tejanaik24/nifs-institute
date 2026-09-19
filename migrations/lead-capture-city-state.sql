-- City/state of each lead, read from Vercel's automatic edge geolocation
-- headers (x-vercel-ip-city, x-vercel-ip-country-region) at submit time —
-- no extra step for the visitor, and no third-party geolocation service.
-- Empty for rows created before this migration, and for any request that
-- didn't go through Vercel's edge network (e.g. local dev).
ALTER TABLE nifs.enquiries ADD COLUMN city TEXT NOT NULL DEFAULT '';
ALTER TABLE nifs.enquiries ADD COLUMN state TEXT NOT NULL DEFAULT '';
