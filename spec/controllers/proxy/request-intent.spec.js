const {
  isDocumentRequest
} = require("../../../lib/controllers/proxy/request-intent");

describe("proxy request intent", () => {
  it("detects document destination", () => {
    expect(
      isDocumentRequest({
        "sec-fetch-dest": "document"
      })
    ).toBe(true);
  });

  it("detects iframe destination", () => {
    expect(
      isDocumentRequest({
        "sec-fetch-dest": "iframe"
      })
    ).toBe(true);
  });

  it("detects navigate mode", () => {
    expect(
      isDocumentRequest({
        "sec-fetch-mode": "navigate"
      })
    ).toBe(true);
  });

  it("detects accept header with html", () => {
    expect(
      isDocumentRequest({
        accept: "text/html,application/xhtml+xml"
      })
    ).toBe(true);
  });

  it("returns false for non-document requests", () => {
    expect(
      isDocumentRequest({
        accept: "application/json",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty"
      })
    ).toBe(false);
  });
});
