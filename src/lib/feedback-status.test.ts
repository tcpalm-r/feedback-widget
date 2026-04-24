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

  it("validates a known status and rejects non-strings or unknown strings", () => {
    expect(isFeedbackStatus("bug")).toBe(true);
    expect(isFeedbackStatus("triaged")).toBe(false);
    expect(isFeedbackStatus("")).toBe(false);
    expect(isFeedbackStatus(null)).toBe(false);
    expect(isFeedbackStatus(undefined)).toBe(false);
    expect(isFeedbackStatus(42)).toBe(false);
    expect(isFeedbackStatus({})).toBe(false);
  });

  it("converts Asana section names to status keys (case- and space-insensitive)", () => {
    expect(sectionNameToStatus("New")).toBe("new");
    expect(sectionNameToStatus("On Hold")).toBe("on_hold");
    expect(sectionNameToStatus("  Development  ")).toBe("development");
    expect(sectionNameToStatus("Unknown Column")).toBeUndefined();
  });

  it("converts every status key back to its canonical section name", () => {
    expect(statusToSectionName("new")).toBe("New");
    expect(statusToSectionName("feature")).toBe("Feature");
    expect(statusToSectionName("bug")).toBe("Bug");
    expect(statusToSectionName("development")).toBe("Development");
    expect(statusToSectionName("testing")).toBe("Testing");
    expect(statusToSectionName("on_hold")).toBe("On Hold");
    expect(statusToSectionName("completed")).toBe("Completed");
  });

  it("treats testing and completed as resolved states", () => {
    expect(isResolvedStatus("testing")).toBe(true);
    expect(isResolvedStatus("completed")).toBe(true);
    expect(isResolvedStatus("development")).toBe(false);
    expect(isResolvedStatus("new")).toBe(false);
  });
});
