import { describe, expect, it } from "vitest";
import { currentMissions, galaxyRelationships, galaxyWorlds, searchWorlds } from "./galaxy";

describe("fourtee2 galaxy data", () => {
  it("contains a unique, navigable world inventory", () => {
    expect(galaxyWorlds).toHaveLength(14);
    expect(new Set(galaxyWorlds.map(world => world.id)).size).toBe(galaxyWorlds.length);
    expect(galaxyWorlds.every(world => world.url.startsWith("/"))).toBe(true);
  });

  it("keeps missions and relationship endpoints inside the world inventory", () => {
    const ids = new Set(galaxyWorlds.map(world => world.id));
    expect(currentMissions.every(mission => ids.has(mission.worldId))).toBe(true);
    expect(galaxyRelationships.every(link => ids.has(link.source) && ids.has(link.target))).toBe(true);
  });

  it("finds a world through name, category and keyword search", () => {
    expect(searchWorlds("travel").map(world => world.id)).toContain("travel");
    expect(searchWorlds("server").map(world => world.id)).toContain("cinevo");
  });
});
