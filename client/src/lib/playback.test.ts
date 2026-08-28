import { describe, expect, it } from "vitest";
import { formatPlaybackTime } from "./playback";

describe("playback time formatting", () => {
  it("renders a stable frequency-console time readout", () => {
    expect(formatPlaybackTime(0)).toBe("00:00");
    expect(formatPlaybackTime(65.9)).toBe("01:05");
    expect(formatPlaybackTime(Number.NaN)).toBe("00:00");
  });
});
