const {
  processHeaders
} = require("../../../lib/controllers/proxy/process-headers");

describe("proxy processHeaders", () => {
  it("properly set headers", () => {
    const headers = {
      "Proxy-Connection": "delete me!",
      unfilteredheader: "don't delete me!"
    };

    const result = processHeaders(headers, 1200);
    expect(result["Proxy-Connection"]).toBeUndefined();
    expect(result.unfilteredheader).toBe(headers.unfilteredheader);
    expect(result["cache-control"]).toBe("public,max-age=1200");
    expect(result["access-control-allow-origin"]).toBe("*");
    expect(result["content-security-policy"]).toBe("sandbox");
    expect(result["x-content-type-options"]).toBe("nosniff");
  });

  it("don't set duration when undefined", () => {
    const headers = {
      "Proxy-Connection": "delete me!",
      unfilteredheader: "don't delete me!"
    };

    const result = processHeaders(headers, undefined);
    expect(result["Proxy-Connection"]).toBeUndefined();
    expect(result.unfilteredheader).toBe(headers.unfilteredheader);
    expect(result["cache-control"]).toBeUndefined();
    expect(result["access-control-allow-origin"]).toBe("*");
    expect(result["content-security-policy"]).toBe("sandbox");
    expect(result["x-content-type-options"]).toBe("nosniff");
  });
});
