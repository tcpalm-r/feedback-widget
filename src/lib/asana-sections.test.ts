import { describe, it, expect } from "vitest";
import { buildSectionMap, gidToStatus, statusToGid } from "./asana-sections";

const SECTIONS = [
  { gid: "100", name: "New" },
  { gid: "200", name: "Feature" },
  { gid: "300", name: "Bug" },
  { gid: "400", name: "Development" },
  { gid: "500", name: "Testing" },
  { gid: "600", name: "On Hold" },
  { gid: "700", name: "Completed" },
];

describe("asana-sections", () => {
  it("builds a bidirectional map keyed by status name", () => {
    const map = buildSectionMap(SECTIONS);
    expect(map.byStatus.get("new")).toBe("100");
    expect(map.byStatus.get("on_hold")).toBe("600");
    expect(map.byGid.get("500")).toBe("testing");
  });

  it("ignores Asana sections that don't match a known status", () => {
    const map = buildSectionMap([...SECTIONS, { gid: "999", name: "Custom" }]);
    expect(map.byGid.get("999")).toBeUndefined();
  });

  it("reports missing statuses", () => {
    const partial = SECTIONS.slice(0, 3); // only new/feature/bug
    const map = buildSectionMap(partial);
    expect(map.missingStatuses).toEqual(["development", "testing", "on_hold", "completed"]);
  });

  it("statusToGid returns undefined for unmapped status", () => {
    const partial = buildSectionMap(SECTIONS.slice(0, 3));
    expect(statusToGid(partial, "completed")).toBeUndefined();
  });

  it("gidToStatus returns the status for a known gid", () => {
    const map = buildSectionMap(SECTIONS);
    expect(gidToStatus(map, "300")).toBe("bug");
  });
});
