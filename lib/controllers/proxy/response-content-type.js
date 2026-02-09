const DEFAULT_BLOCKED_CONTENT_TYPES = [
  "text/html",
  "application/xhtml+xml",
  "image/svg+xml"
];

/**
 * Normalize content-type value.
 *
 * @param {string | string[] | undefined | null} value
 * @returns {string | undefined}
 */
function normalizeContentType(value) {
  if (!value) {
    return undefined;
  }

  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== "string") {
    return undefined;
  }

  return raw.split(";")[0].trim().toLowerCase();
}

/**
 * Get normalized content-type from response headers.
 *
 * @param {Record<string, unknown>} headers
 * @returns {string | undefined}
 */
function getContentType(headers) {
  if (!headers) {
    return undefined;
  }

  const headerValue =
    headers["content-type"] || headers["Content-Type"] || headers["CONTENT-TYPE"];
  return normalizeContentType(headerValue);
}

/**
 * Check if content-type should be blocked.
 *
 * @param {string | undefined} contentType
 * @param {string[]} blockedContentTypes
 * @returns {boolean}
 */
function isBlockedContentType(
  contentType,
  blockedContentTypes = DEFAULT_BLOCKED_CONTENT_TYPES
) {
  if (!contentType || !Array.isArray(blockedContentTypes)) {
    return false;
  }

  const normalized = normalizeContentType(contentType);
  if (!normalized) {
    return false;
  }

  return blockedContentTypes.some(
    (blocked) => normalizeContentType(blocked) === normalized
  );
}

module.exports = {
  DEFAULT_BLOCKED_CONTENT_TYPES,
  getContentType,
  isBlockedContentType,
  normalizeContentType
};
