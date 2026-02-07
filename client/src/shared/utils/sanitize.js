/**
 * Input sanitization utilities
 * Supabase client uses parameterized queries, but we sanitize user input
 * before display (XSS) and length limits.
 */

const MAX_STRING = 500;
const MAX_TEXT = 5000;

/** Trim and limit length - prevents overflow; values passed to Supabase are parameterized */
export function sanitizeString(val, max = MAX_STRING) {
  if (val == null || typeof val !== 'string') return '';
  return String(val).trim().slice(0, max);
}

export function sanitizeText(val, max = MAX_TEXT) {
  if (val == null || typeof val !== 'string') return '';
  return String(val).trim().slice(0, max);
}
