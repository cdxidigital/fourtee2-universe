import { useCallback, useEffect, useState } from "react";
import { getPortalOverlayCopy, type LivePortal } from "@/lib/portalOverlay";
import { describeVibe, identifyVibe, type SignalVibe, unavailableSignalMessage } from "@/lib/liveSignal";

type WeatherResponse = {
  current?: {
    temperature_2m?: number;
    is_day?: number;
    weather_code?: number;
    cloud_cover?: number;
    wind_speed_10m?: number;
  };
};

type OverlaySignal = {
  vibe: SignalVibe;
  temperature: number | null;
  wind: number | null;
  message: string;
};

const fallback: OverlaySignal = { vibe: "night", temperature: null, wind: null, message: unavailableSignalMessage() };

export default function LivePortalOverlay({ portal }: { portal: LivePortal }) {
  const [signal, setSignal] = useState<OverlaySignal>(fallback);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      if (new URLSearchParams(window.location.search).get("portal-signal") === "offline") {
        throw new Error("Offline overlay validation state");
      }
      const url = new URL("https://api.open-meteo.com/v1/forecast");
      url.searchParams.set("latitude", "-31.9523");
      url.searchParams.set("longitude", "115.8613");
      url.searchParams.set("current", "temperature_2m,is_day,weather_code,cloud_cover,wind_speed_10m");
      const response = await fetch(url.toString());
      if (!response.ok) throw new Error("Signal unavailable");
      const current = ((await response.json()) as WeatherResponse).current;
      if (!current) throw new Error("Signal unavailable");
      const vibe = identifyVibe(current.weather_code ?? null, current.cloud_cover ?? null, current.is_day === 1);
      setSignal({ vibe, temperature: current.temperature_2m ?? null, wind: current.wind_speed_10m ?? null, message: `${describeVibe(vibe)} / PERTH LIVE` });
    } catch {
      setSignal(fallback);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const copy = getPortalOverlayCopy(portal, signal.vibe);
  const temperature = signal.temperature === null ? "—" : `${Math.round(signal.temperature)}°C`;
  const wind = signal.wind === null ? "—" : `${Math.round(signal.wind)} km/h`;

  return (
    <aside className={`portal-live-overlay portal-live-overlay--${portal} portal-live-overlay--${signal.vibe}`} aria-live="polite" aria-label={`${portal} live environmental overlay`}>
      <div><span>LIVE FIELD / PERTH</span><strong>{copy.label}</strong></div>
      <h2>{copy.title}</h2>
      <p>{copy.detail}</p>
      <small>{temperature} · WIND {wind} · {signal.message}</small>
      <button type="button" onClick={() => void refresh()} disabled={isRefreshing}>{isRefreshing ? "READING FIELD" : "REFRESH FIELD"}</button>
    </aside>
  );
}
