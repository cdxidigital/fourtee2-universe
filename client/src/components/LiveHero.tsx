import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { describeVibe, identifyVibe, unavailableSignalMessage, type SignalVibe } from "@/lib/liveSignal";

type WorldSignal = {
  location: string;
  temperature: number | null;
  wind: number | null;
  cloud: number | null;
  code: number | null;
  isDay: boolean;
  vibe: SignalVibe;
  updatedAt: Date | null;
};

type WeatherResponse = {
  current?: {
    temperature_2m?: number;
    is_day?: number;
    weather_code?: number;
    cloud_cover?: number;
    wind_speed_10m?: number;
  };
};

const PERTH = { latitude: -31.9523, longitude: 115.8613, label: "PERTH / ORIGIN SIGNAL" };

const fallbackSignal: WorldSignal = {
  location: PERTH.label,
  temperature: null,
  wind: null,
  cloud: null,
  code: null,
  isDay: false,
  vibe: "night",
  updatedAt: null,
};

function formatClock(date: Date | null, isOrigin: boolean) {
  const value = date ?? new Date();
  return new Intl.DateTimeFormat("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: isOrigin ? "Australia/Perth" : undefined,
  }).format(value);
}

export default function LiveHero() {
  const [signal, setSignal] = useState<WorldSignal>(fallbackSignal);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [message, setMessage] = useState("TUNING TO PERTH ATMOSPHERE");

  const loadSignal = useCallback(async (latitude: number, longitude: number, location: string) => {
    setIsRefreshing(true);
    setMessage("READING LIVE ATMOSPHERE");
    try {
      if (new URLSearchParams(window.location.search).get("world-signal") === "offline") {
        throw new Error("Offline hero validation state");
      }
      const url = new URL("https://api.open-meteo.com/v1/forecast");
      url.searchParams.set("latitude", String(latitude));
      url.searchParams.set("longitude", String(longitude));
      url.searchParams.set("current", "temperature_2m,is_day,weather_code,cloud_cover,wind_speed_10m");
      url.searchParams.set("timezone", "auto");
      const response = await fetch(url.toString());
      if (!response.ok) throw new Error("World signal unavailable");
      const payload = (await response.json()) as WeatherResponse;
      const current = payload.current;
      if (!current) throw new Error("World signal unavailable");
      const isDay = current.is_day === 1;
      const code = current.weather_code ?? null;
      const cloud = current.cloud_cover ?? null;
      const nextSignal: WorldSignal = {
        location,
        temperature: current.temperature_2m ?? null,
        wind: current.wind_speed_10m ?? null,
        cloud,
        code,
        isDay,
        vibe: identifyVibe(code, cloud, isDay),
        updatedAt: new Date(),
      };
      setSignal(nextSignal);
      setMessage(`${describeVibe(nextSignal.vibe)} / LIVE`);
    } catch {
      setMessage(unavailableSignalMessage());
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadSignal(PERTH.latitude, PERTH.longitude, PERTH.label);
  }, [loadSignal]);

  const useNearbyAtmosphere = () => {
    if (!navigator.geolocation) {
      setMessage("NEARBY SIGNAL NOT SUPPORTED / PERTH REMAINS ACTIVE");
      return;
    }
    setMessage("REQUESTING NEARBY ATMOSPHERE");
    navigator.geolocation.getCurrentPosition(
      position => void loadSignal(position.coords.latitude, position.coords.longitude, "NEARBY / YOUR SIGNAL"),
      () => setMessage("LOCATION NOT SHARED / PERTH REMAINS ACTIVE"),
      { enableHighAccuracy: false, timeout: 8_000, maximumAge: 600_000 },
    );
  };

  const atmosphereStyle = useMemo(() => ({
    "--world-wind": `${Math.min(1, Math.max(0.16, (signal.wind ?? 10) / 54))}`,
    "--world-cloud": `${Math.min(1, Math.max(0.1, (signal.cloud ?? 25) / 100))}`,
  }) as CSSProperties, [signal.cloud, signal.wind]);

  const isOriginSignal = signal.location === PERTH.label;
  const clock = formatClock(signal.updatedAt, isOriginSignal);
  const temperature = signal.temperature === null ? "—" : `${Math.round(signal.temperature)}°C`;
  const wind = signal.wind === null ? "—" : `${Math.round(signal.wind)} km/h`;

  return (
    <section className={`hero hero--live hero--${signal.vibe}`} style={atmosphereStyle} aria-labelledby="hero-title">
      <div className="hero__cosmos" aria-hidden="true" />
      <div className="hero__atmosphere" aria-hidden="true"><i /><i /><i /></div>
      <div className="hero__grain" aria-hidden="true" />
      <div className="hero__copy">
        <p className="eyebrow">A BRAND UNIVERSE / LIVE WORLD SIGNAL</p>
        <h1 id="hero-title" className="wordmark wordmark--hero">fourtee2</h1>
        <p className="hero__statement">travel. music. your signal.</p>
      </div>
      <aside className="hero__world-signal" aria-live="polite" aria-label="Live world signal">
        <div className="hero__world-heading"><span>WORLD SIGNAL</span><strong>{describeVibe(signal.vibe)}</strong></div>
        <p>{signal.location} · {clock} · {temperature} · WIND {wind}</p>
        <small>{message}</small>
        <div className="hero__world-actions">
          <button type="button" onClick={() => void loadSignal(PERTH.latitude, PERTH.longitude, PERTH.label)} disabled={isRefreshing}>REFRESH PERTH</button>
          <button type="button" onClick={useNearbyAtmosphere} disabled={isRefreshing}>USE MY ATMOSPHERE</button>
        </div>
      </aside>
    </section>
  );
}
