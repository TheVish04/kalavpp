/**
 * Downloads API - client wrapper that calls server endpoints
 * Signed URLs and ownership checks run server-side for security.
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Request signed download URL - calls server API
 */
export async function getSignedDownloadUrl(assetId, token) {
  const res = await fetch(`${API_BASE}/downloads/signed-url?assetId=${encodeURIComponent(assetId)}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.json();
}

/**
 * Check download access - calls server API
 */
export async function hasDownloadAccess(assetId, token) {
  const res = await fetch(`${API_BASE}/downloads/access?assetId=${encodeURIComponent(assetId)}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const data = await res.json();
  return data.hasAccess ?? false;
}
