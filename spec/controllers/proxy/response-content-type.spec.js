const {
  DEFAULT_BLOCKED_CONTENT_TYPES,
  getContentType,
  isBlockedContentType,
  normalizeContentType
} = require("../../../lib/controllers/proxy/response-content-type");

describe("proxy response content type", () => {
  it("normalizes content-type values", () => {
    expect(normalizeContentType("Text/HTML; Charset=utf-8")).toBe("text/html");
    expect(normalizeContentType(["application/json; charset=utf-8"])).toBe(
      "application/json"
    );
  });

  it("gets content-type from response headers", () => {
    const headers = {
      "content-type": ["text/html; charset=utf-8", "text/plain"]
    };

    expect(getContentType(headers)).toBe("text/html");
  });

  it("detects blocked content-types", () => {
    expect(isBlockedContentType("text/html", DEFAULT_BLOCKED_CONTENT_TYPES)).toBe(
      true
    );
    expect(
      isBlockedContentType("application/json", DEFAULT_BLOCKED_CONTENT_TYPES)
    ).toBe(false);
  });
});
