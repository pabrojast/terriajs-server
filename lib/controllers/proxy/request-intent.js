function getHeaderValue(headers, name) {
  if (!headers) {
    return "";
  }

  const raw = headers[name] ?? headers[name.toLowerCase()];
  if (raw === undefined || raw === null) {
    return "";
  }

  if (Array.isArray(raw)) {
    return raw.join(",");
  }

  return String(raw);
}

function isDocumentRequest(headers) {
  const dest = getHeaderValue(headers, "sec-fetch-dest").toLowerCase();
  if (dest === "document" || dest === "iframe") {
    return true;
  }

  const mode = getHeaderValue(headers, "sec-fetch-mode").toLowerCase();
  if (mode === "navigate") {
    return true;
  }

  const accept = getHeaderValue(headers, "accept").toLowerCase();
  return accept.includes("text/html");
}

module.exports = { isDocumentRequest };
