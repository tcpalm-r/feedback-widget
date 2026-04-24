import { describe, it, expect } from "vitest";
import { extractTypeAndSeverity } from "./asana-custom-fields";

const CONFIG = {
  type: "111",
  severity: "222",
  enum_options: {
    type: { bug: "t-bug", feature: "t-feat", future: "t-fut", misc: "t-misc" },
    severity: { critical: "s-crit", high: "s-hi", medium: "s-med", low: "s-lo" },
  },
};

describe("extractTypeAndSeverity", () => {
  it("returns undefined fields when customFields array is empty", () => {
    expect(extractTypeAndSeverity([], CONFIG)).toEqual({});
  });

  it("extracts type from an enum field by matching gid", () => {
    const cf = [
      { gid: "111", enum_value: { gid: "t-bug", name: "bug" } },
    ];
    expect(extractTypeAndSeverity(cf, CONFIG)).toEqual({ type: "bug" });
  });

  it("extracts severity from an enum field", () => {
    const cf = [
      { gid: "222", enum_value: { gid: "s-hi", name: "high" } },
    ];
    expect(extractTypeAndSeverity(cf, CONFIG)).toEqual({ severity: "high" });
  });

  it("extracts both when both are present", () => {
    const cf = [
      { gid: "111", enum_value: { gid: "t-feat", name: "feature" } },
      { gid: "222", enum_value: { gid: "s-med", name: "medium" } },
    ];
    expect(extractTypeAndSeverity(cf, CONFIG)).toEqual({ type: "feature", severity: "medium" });
  });

  it("ignores unknown enum option GIDs", () => {
    const cf = [
      { gid: "111", enum_value: { gid: "t-unknown", name: "legacy" } },
    ];
    expect(extractTypeAndSeverity(cf, CONFIG)).toEqual({});
  });

  it("treats null enum_value as unset", () => {
    const cf = [
      { gid: "111", enum_value: null },
      { gid: "222", enum_value: null },
    ];
    expect(extractTypeAndSeverity(cf, CONFIG)).toEqual({});
  });
});
