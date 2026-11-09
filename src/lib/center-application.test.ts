import { describe, expect, it } from "vitest";
import { isSpamApplication } from "./center-application";

const ok = { name: "Sanjeev Ranjan", location: "Jehanabad, Bihar", message: "" };

describe("isSpamApplication", () => {
  it("lets real applicants through", () => {
    expect(isSpamApplication(ok)).toBe(false);
    expect(isSpamApplication({ ...ok, name: "ALIIED HEALTH AND VOCATIONAL TRAINING COUNCIL", location: "Tiruvannamalai" })).toBe(false);
    expect(isSpamApplication({ ...ok, name: "McDonald", location: "Kushinagar" })).toBe(false);
  });
  it("blocks random-letter bot rows", () => {
    expect(isSpamApplication({ name: "pOEoCWyfkUjqFihXU", location: "HNSvXvxkSyJAwhVwJ" })).toBe(true);
    expect(isSpamApplication({ ...ok, location: "oJOswEAmjRVMgSgYMAWMh" })).toBe(true);
  });
  it("blocks the honeypot", () => {
    expect(isSpamApplication({ ...ok, website: "x" })).toBe(true);
  });
});
