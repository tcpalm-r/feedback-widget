import { describe, it, expect } from "vitest";
import {
  FEEDBACK_STATUSES,
  isFeedbackStatus,
  sectionNameToStatus,
  statusToSectionName,
  isResolvedStatus,
} from "./feedback-status";

describe("feedback-status", () => {
  it("lists the 7 Template A statuses in order", () => {
    expect(FEEDBACK_STATUSES).toEqual([
      "new", "feature", "bug", "development", "testing", "on_hold", "completed",
    ]);
  });

  it("validates a known status", () => {
    expect(isFeedbackStatus("bug")).toBe(true);
    expect(isFeedbackStatus("triaged")).toBe(false);
  });

  it("converts Asana section names to status keys (case- and space-insensitive)", () => {
    expect(sectionNameToStatus("New")).toBe("new");
    expect(sectionNameToStatus("On Hold")).toBe("on_hold");
    expect(sectionNameToStatus("  Development  ")).toBe("development");
    expect(sectionNameToStatus("Unknown Column")).toBeUndefined();
  });

  it("converts status keys back to canonical section names", () => {
    expect(statusToSectionName("on_hold")).toBe("On Hold");
    expect(statusToSectionName("new")).toBe("New");
  });

  it("treats testing and completed as resolved states", () => {
    expect(isResolvedStatus("testing")).toBe(true);
    expect(isResolvedStatus("completed")).toBe(true);
    expect(isResolvedStatus("development")).toBe(false);
    expect(isResolvedStatus("new")).toBe(false);
  });
});
