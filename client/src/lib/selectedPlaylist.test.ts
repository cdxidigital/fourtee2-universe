import { describe, expect, it } from "vitest";
import { selectedPlaylist } from "./selectedPlaylist";

describe("4[music]2 selected playlist manifest", () => {
  it("preserves the verified selected playlist identity and playable preview transmissions", () => {
    expect(selectedPlaylist.id).toBe("b5889cb5-5682-4bb9-bf1b-407891ea5df9");
    expect(selectedPlaylist.trackCount).toBe(22);
    expect(selectedPlaylist.tracks).toHaveLength(22);
    expect(selectedPlaylist.tracks[0]?.title).toBe("STILL HERE.");
    expect(selectedPlaylist.tracks[21]?.title).toBe("Shattered Truths (Remastered)");
  });
});
