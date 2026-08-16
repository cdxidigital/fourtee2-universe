export type SignalVibe = "day" | "night" | "cloud" | "rain" | "storm";

export function identifyVibe(code: number | null, cloud: number | null, isDay: boolean): SignalVibe {
  if (code !== null && [95, 96, 99].includes(code)) return "storm";
  if (code !== null && [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "rain";
  if ((cloud ?? 0) > 68 || (code !== null && [45, 48].includes(code))) return "cloud";
  return isDay ? "day" : "night";
}

export function describeVibe(vibe: SignalVibe) {
  return {
    day: "CLEAR DAYLIGHT",
    night: "NIGHT ORBIT",
    cloud: "CLOUD VEIL",
    rain: "RAIN FREQUENCY",
    storm: "ELECTRIC FRONT",
  }[vibe];
}

export function unavailableSignalMessage() {
  return "LIVE SIGNAL UNAVAILABLE / ORBIT CONTINUES";
}
