import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { describeVibe, identifyVibe, unavailableSignalMessage } from "./liveSignal";

describe("live world signal mapping", () => {
  it("prioritises severe weather over other hero conditions", () => {
    expect(identifyVibe(95, 0, true)).toBe("storm");
    expect(identifyVibe(61, 10, true)).toBe("rain");
  });

  it("uses cloud cover and local daylight to shape the ambient state", () => {
    expect(identifyVibe(0, 79, true)).toBe("cloud");
    expect(identifyVibe(0, 0, true)).toBe("day");
    expect(identifyVibe(0, 0, false)).toBe("night");
  });

  it("publishes a concise operational label for each visual state", () => {
    expect(describeVibe("storm")).toBe("ELECTRIC FRONT");
    expect(describeVibe("night")).toBe("NIGHT ORBIT");
    expect(unavailableSignalMessage()).toBe("LIVE SIGNAL UNAVAILABLE / ORBIT CONTINUES");
  });

  it("keeps atmospheric drift disabled for visitors who prefer reduced motion", () => {
    const css = readFileSync(new URL("../live-hero.css", import.meta.url), "utf8");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain(".hero__atmosphere::before { animation: none; }");
  });
});
