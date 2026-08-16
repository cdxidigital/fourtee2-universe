import type { SignalVibe } from "./liveSignal";

export type LivePortal = "travel" | "music" | "you";

type PortalOverlayCopy = {
  label: string;
  title: string;
  detail: string;
};

const livePortalCopy: Record<LivePortal, Record<SignalVibe, PortalOverlayCopy>> = {
  travel: {
    day: { label: "DAYLIGHT ROUTE", title: "Visibility open.", detail: "Plot the long horizon while the corridor is clear." },
    night: { label: "NIGHT ROUTE", title: "After-dark corridor.", detail: "Keep the connection close; the field is low-light." },
    cloud: { label: "CLOUD ROUTE", title: "Soft horizon.", detail: "Hold a little more time between arrival points." },
    rain: { label: "RAIN ROUTE", title: "Wet-world protocol.", detail: "Travel light, layer once, and leave margin in the route." },
    storm: { label: "STORM ROUTE", title: "Volatile corridor.", detail: "Check the field before departure. Keep the next route flexible." },
  },
  music: {
    day: { label: "DAYLIGHT LISTENING", title: "Open-spectrum mode.", detail: "Choose a bright transmission and let the day carry the tempo." },
    night: { label: "NIGHT LISTENING", title: "Night-drive mode.", detail: "Lower the light. Keep the pulse wide and the horizon open." },
    cloud: { label: "CLOUD LISTENING", title: "Low-sky sequence.", detail: "Let slow frequency occupy the room without filling it." },
    rain: { label: "RAIN LISTENING", title: "Drift mode active.", detail: "Use the weather as percussion. Keep the next track soft." },
    storm: { label: "STORM LISTENING", title: "Electric sequence.", detail: "Match the charge outside with a sharper transmission inside." },
  },
  you: {
    day: { label: "DAYLIGHT RITUAL", title: "Activate the field.", detail: "Begin with a clear layer, deliberate movement, and forward energy." },
    night: { label: "NIGHT RITUAL", title: "Downshift the orbit.", detail: "Remove one layer. Return attention to recovery and reset." },
    cloud: { label: "CLOUD RITUAL", title: "Steady the signal.", detail: "Use a small repeatable ritual to hold the day in place." },
    rain: { label: "RAIN RITUAL", title: "Restore the field.", detail: "Slow the transition. Make softness part of the protocol." },
    storm: { label: "STORM RITUAL", title: "Ground the charge.", detail: "Shorten the ritual. Keep breath, form, and attention close." },
  },
};

export function getPortalOverlayCopy(portal: LivePortal, vibe: SignalVibe) {
  return livePortalCopy[portal][vibe];
}
