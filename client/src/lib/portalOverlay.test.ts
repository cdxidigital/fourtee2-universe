import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getPortalOverlayCopy } from "./portalOverlay";

describe("live portal overlay mapping", () => {
  it("keeps each portal’s response specific to its field", () => {
    expect(getPortalOverlayCopy("travel", "rain").label).toBe("RAIN ROUTE");
    expect(getPortalOverlayCopy("music", "storm").title).toBe("Electric sequence.");
    expect(getPortalOverlayCopy("you", "night").title).toBe("Downshift the orbit.");
  });

  it("suppresses all overlay motion for visitors who prefer reduced motion", () => {
    const css = readFileSync(new URL("../portal-overlay.css", import.meta.url), "utf8");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain(".portal-live-overlay,.portal-live-overlay * { animation: none !important; transition: none !important; }");
  });
});
