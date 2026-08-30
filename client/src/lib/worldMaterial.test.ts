import { describe, expect, it } from "vitest";
import { galaxyWorlds } from "./galaxy";
import { getWorldMaterial, hasCompleteWorldMaterial } from "./worldMaterial";

describe("world material", () => {
  it("provides an owned field note and visual direction for every world", () => {
    expect(hasCompleteWorldMaterial()).toBe(true);
    expect(galaxyWorlds).toHaveLength(14);
  });

  it("keeps the travel transmission recognisable as route intelligence", () => {
    expect(getWorldMaterial("travel")?.fieldNote).toContain("Route intelligence");
  });
});
