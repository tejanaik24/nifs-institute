/** Vercel has no filesystem to point GOOGLE_APPLICATION_CREDENTIALS at, so
 * the service account key must travel as an env var there instead. Locally,
 * GOOGLE_APPLICATION_CREDENTIALS (a file path) still works via Google's
 * normal Application Default Credentials lookup — this only kicks in when
 * the JSON var is actually set. */
export function getGoogleCredentials(): { credentials: { client_email: string; private_key: string } } | undefined {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!json) return undefined;
  const parsed = JSON.parse(json);
  return { credentials: { client_email: parsed.client_email, private_key: parsed.private_key } };
}
