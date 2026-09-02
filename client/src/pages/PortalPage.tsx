import { useRef, useState } from "react";
import type { CSSProperties, FormEvent, KeyboardEvent } from "react";
import { Link } from "wouter";
import "./portal-fallback.css";
import "../music-playlist.css";
import "../playback-console.css";
import "../portal-overlay.css";
import { SaveSignalButton } from "@/components/SaveSignalButton";
import LivePortalOverlay from "@/components/LivePortalOverlay";
import { airportValue, searchAirports, type Airport } from "@/lib/airports";
import { formatPlaybackTime } from "@/lib/playback";
import { selectedPlaylist, type SelectedPlaylistTrack } from "@/lib/selectedPlaylist";

/**
 * fourtee2 Astral Editorial System: dedicated archival portal pages use shared
 * Righteous wordmarks, image-born light, operational labels, and no generic card UI.
 */
type PortalKey = "travel" | "music" | "you";

type PortalConfig = {
  key: PortalKey;
  wordmark: string;
  eyebrow: string;
  designation: string;
  headline: string;
  image: string;
  imageAlt: string;
  intro: string;
  note: string;
  orbit: string;
  axisTitle: string;
  axes: Array<{ code: string; title: string; description: string }>;
  logTitle: string;
  log: Array<{ sequence: string; title: string; detail: string }>;
  status: string;
};

const portals: Record<PortalKey, PortalConfig> = {
  travel: {
    key: "travel",
    wordmark: "fourtee2travel",
    eyebrow: "TRANSMISSION 01 / TERRAIN FIELD",
    designation: "WORLD / INTELLIGENCE / ARRIVAL",
    headline: "Any world. Your way.",
    image: "/manus-storage/card-travel_bf8bb539.jpg",
    imageAlt: "Earth at night with illuminated cities seen from orbit",
    intro: "fourtee2travel is the one-stop travel destination for every journey in the universe. Name the place, set the dates, decide what matters most—and let the field resolve the route around you.",
    note: "Cheapest. Best value. Most luxurious. The route begins with your definition of worth.",
    orbit: "THE WHOLE WORLD / YOUR SIGNAL",
    axisTitle: "Travel intelligence",
    axes: [
      { code: "A / 01", title: "Price radar", description: "Find the lowest viable fare, stay and transfer combination for the journey." },
      { code: "A / 02", title: "Value engine", description: "Balance price, location, comfort and time so the trip gives more than it takes." },
      { code: "A / 03", title: "Luxury field", description: "Prioritise the stay, seat and small details that make the arrival exceptional." },
    ],
    logTitle: "Intelligence log / departure sequence",
    log: [
      { sequence: "01", title: "Set the signal", detail: "Choose the destination, timing and outcome that will make this journey worth taking." },
      { sequence: "02", title: "Scan the field", detail: "Compare flights, stays and routes through the lens you chose—not a one-size-fits-all result." },
      { sequence: "03", title: "Move with certainty", detail: "Save the route that meets your standard, then keep the entire journey close on your signal board." },
    ],
    status: "FIELD OPEN / ROUTES IN FORMATION",
  },
  music: {
    key: "music",
    wordmark: "4[music]2",
    eyebrow: "TRANSMISSION 02 / FREQUENCY FIELD",
    designation: "SOUND / MEMORY / MOTION",
    headline: "Choose your frequency. Keep it close.",
    image: "/manus-storage/card-music_0929e7cc.jpg",
    imageAlt: "Milky Way spanning a dark mountain range",
    intro: "4[music]2 is an ambient index for the music that holds a moment in place. A sequence for the road after dark, the room before people arrive, and the day when the signal is low.",
    note: "No noise. Just the tracks that alter the atmosphere.",
    orbit: "THE SOUND IS THE COORDINATE",
    axisTitle: "Frequency selection",
    axes: [
      { code: "B / 01", title: "Calibrate", description: "Start with tempo, light and the weather outside the window." },
      { code: "B / 02", title: "Sequence", description: "Let the next track arrive like a change in terrain." },
      { code: "B / 03", title: "Repeat", description: "Keep the frequencies that become part of the memory." },
    ],
    logTitle: "Signal queue / listening field",
    log: [
      { sequence: "01", title: "Night drive", detail: "Low horizon, late lanes, a pulse with room to breathe." },
      { sequence: "02", title: "Soft arrival", detail: "For keys on the table and the light that stays on after midnight." },
      { sequence: "03", title: "Altitude", detail: "For any moment that needs its edges taken away." },
    ],
    status: "FIELD OPEN / SEQUENCES IN ORBIT",
  },
  you: {
    key: "you",
    wordmark: "4[you]2",
    eyebrow: "TRANSMISSION 03 / PERSONAL FIELD",
    designation: "RITUAL / FORM / ENERGY",
    headline: "Hold the signal. Move differently.",
    image: "/manus-storage/card-you_7c45eb9e.jpg",
    imageAlt: "Flowing purple fabric texture in dark light",
    intro: "4[you]2 is a personal field for the small systems that alter how you arrive. A considered collection of ritual, recovery and form—built for energy with a point of view.",
    note: "The personal field is in orbit. Keep your coordinates close.",
    orbit: "RITUAL IS A FORM OF SIGNAL",
    axisTitle: "Personal protocol",
    axes: [
      { code: "C / 01", title: "Prepare", description: "Start with the details that set the day into motion." },
      { code: "C / 02", title: "Perform", description: "Carry only what supports your energy and your attention." },
      { code: "C / 03", title: "Recover", description: "Return to the rituals that make the next day possible." },
    ],
    logTitle: "Protocol log / personal orbit",
    log: [
      { sequence: "01", title: "First layer", detail: "Hair, skin and the first deliberate act of the day." },
      { sequence: "02", title: "Midfield", detail: "Form, focus and the cue that brings the energy back." },
      { sequence: "03", title: "Return state", detail: "The quiet protocol for taking the field back down." },
    ],
    status: "FIELD IN ORBIT / ACCESS PENDING",
  },
};

type Destination = {
  id: string;
  number: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  mapX: number;
  mapY: number;
  note: string;
};

const destinations: Destination[] = [
  { id: "perth", number: "01", name: "Perth", location: "WA / AU", lat: -31.953512, lng: 115.857048, mapX: 81, mapY: 76, note: "A long westward light. Start at the river, then let the coast alter the route." },
  { id: "tokyo", number: "02", name: "Tokyo", location: "KANTO / JP", lat: 35.6762, lng: 139.6503, mapX: 86, mapY: 39, note: "Follow the quiet alleys after the last train. Keep the first coffee unplanned." },
  { id: "lisbon", number: "03", name: "Lisbon", location: "LISBOA / PT", lat: 38.7223, lng: -9.1393, mapX: 42, mapY: 42, note: "Look for the hill with the late tables. Let the city decide when to descend." },
];

function MusicPlayer() {
  const [activeTrack, setActiveTrack] = useState<SelectedPlaylistTrack>(selectedPlaylist.tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const selectTrack = (track: SelectedPlaylistTrack) => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setActiveTrack(track);
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <section className="music-playlist" aria-labelledby="player-title">
      <div className="music-playlist__header">
        <p className="section-label">4[MUSIC]2 / SELECTED PLAYLIST</p>
        <p>{selectedPlaylist.trackCount} TRANSMISSIONS / PLAYABLE</p>
      </div>
      <div className="music-playlist__deck">
        <div className="music-playlist__profile">
          <p className="music-playlist__status"><i /> FIELD PLAYABLE</p>
          <h2 id="player-title">4[music]2<br /><span>Selected signal.</span></h2>
          <p>{selectedPlaylist.title}. Select a transmission, then play it directly inside the frequency field.</p>
          <SaveSignalButton signal={{ signalType: "playlist", portal: "music", sourceId: selectedPlaylist.id, title: selectedPlaylist.title, subtitle: "Selected transmissions / frequency field", href: "/music" }} />
          <div className="music-playlist__queue" role="listbox" aria-label="4 music 2 selected playlist track selection">
            {selectedPlaylist.tracks.map((track, index) => (
              <button key={track.id} type="button" role="option" aria-selected={activeTrack.id === track.id} className={activeTrack.id === track.id ? "is-active" : ""} onClick={() => selectTrack(track)}>
                <span>{String(index + 1).padStart(2, "0")}</span><strong>{track.title}</strong><em>{track.detail}</em><i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
        </div>
        <div className="music-playlist__frame-wrap">
          <div className="music-playlist__scan" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="music-playlist__playback">
            <p>NOW PLAYING / SELECTED PLAYLIST</p>
            <h3>{activeTrack.title}</h3>
            <span>{activeTrack.detail}</span>
            <audio ref={audioRef} className="music-playlist__audio" preload="metadata" aria-label={`Play ${activeTrack.title}`} key={activeTrack.id} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} onEnded={() => setIsPlaying(false)}>
              <source src={`https://cdn1.suno.ai/${activeTrack.id}.mp3`} type="audio/mpeg" />
              Your browser does not support audio playback.
            </audio>
            <div className={isPlaying ? "music-playlist__controls is-playing" : "music-playlist__controls"}>
              <div className="music-playlist__control-top"><button className="music-playlist__play-toggle" type="button" onClick={() => void togglePlayback()}>{isPlaying ? "PAUSE SIGNAL" : "PLAY SIGNAL"}</button><div className="music-playlist__bars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div><span>{isPlaying ? "FREQUENCY ACTIVE" : "FREQUENCY READY"}</span></div>
              <label className="music-playlist__timeline"><span>{formatPlaybackTime(currentTime)}</span><input type="range" min="0" max={duration || 1} step="0.1" value={Math.min(currentTime, duration || 1)} onChange={(event) => seek(Number(event.target.value))} aria-label={`Seek through ${activeTrack.title}`} /><span>{formatPlaybackTime(duration)}</span></label>
            </div>
            <p className="music-playlist__playback-help">Enter the sequence. Switch transmissions when the field changes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TravelFieldNotes() {
  const [activeDestination, setActiveDestination] = useState(destinations[0]);

  return (
    <section className="travel-notes" aria-labelledby="notes-title">
      <div className="travel-notes__header">
        <p className="section-label">LIVE FIELD NOTES / COORDINATES</p>
        <h2 id="notes-title">Start anywhere.<br />Go everywhere.</h2>
        <p>Set a departure point, then let the travel intelligence field pull the rest of the journey into focus.</p>
      </div>
      <div className="travel-notes__interface">
        <aside className="travel-notes__list" aria-label="Destination field notes">
          {destinations.map((destination) => (
            <button
              type="button"
              key={destination.id}
              className={activeDestination.id === destination.id ? "is-active" : ""}
              onClick={() => setActiveDestination(destination)}
              aria-pressed={activeDestination.id === destination.id}
            >
              <span>{destination.number}</span>
              <strong>{destination.name}</strong>
              <em>{destination.location}</em>
              <i aria-hidden="true">↗</i>
            </button>
          ))}
        </aside>
        <div className="travel-notes__map-wrap">
          <div className="travel-notes__coordinate-map" aria-label="Interactive fourtee2travel coordinate map">
            <div className="travel-notes__latitude" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <div className="travel-notes__longitude" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <span className="travel-notes__route travel-notes__route--one" aria-hidden="true" />
            <span className="travel-notes__route travel-notes__route--two" aria-hidden="true" />
            {destinations.map((destination) => (
              <button
                type="button"
                key={destination.id}
                className={activeDestination.id === destination.id ? "is-active" : ""}
                style={{ left: `${destination.mapX}%`, top: `${destination.mapY}%` }}
                onClick={() => setActiveDestination(destination)}
                aria-label={`View ${destination.name} field note`}
              >
                <i>{destination.number}</i><span>{destination.name}</span>
              </button>
            ))}
          </div>
          <div className="travel-notes__map-index" aria-hidden="true">MAP / TERRAIN / 042</div>
        </div>
        <article className="travel-notes__active-note">
          <p>ACTIVE NOTE / {activeDestination.number}</p>
          <h3>{activeDestination.name}</h3>
          <span>{activeDestination.lat.toFixed(4)}° / {activeDestination.lng.toFixed(4)}°</span>
          <blockquote>{activeDestination.note}</blockquote>
          <SaveSignalButton signal={{ signalType: "destination", portal: "travel", sourceId: `reference-route-${activeDestination.id}`, title: activeDestination.name, subtitle: `${activeDestination.location} / field route`, href: "/travel" }} />
        </article>
      </div>
    </section>
  );
}

const travelPriorities = [
  { id: "lowest", number: "01", label: "CHEAPEST", title: "Lowest viable fare", description: "Keep the route lean. The field prioritises the most economical combination of fare, stay and transfer.", metric: "PRICE / FIRST" },
  { id: "value", number: "02", label: "BEST VALUE", title: "Worth more than it costs", description: "Balance location, timing, comfort and price to find the journey that returns the most for every dollar.", metric: "RETURN / FIRST" },
  { id: "luxury", number: "03", label: "LUXURY", title: "The elevated route", description: "Put exceptional stays, thoughtful service and effortless movement at the centre of the travel field.", metric: "EXPERIENCE / FIRST" },
] as const;

function AirportAutocomplete({ id, label, value, onChange, placeholder }: { id: string; label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const matches = searchAirports(value);

  const chooseAirport = (airport: Airport) => {
    onChange(airportValue(airport));
    setActiveIndex(0);
    setIsOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && ["ArrowDown", "ArrowUp"].includes(event.key)) setIsOpen(true);
    if (event.key === "ArrowDown") { event.preventDefault(); setActiveIndex((index) => Math.min(index + 1, Math.max(matches.length - 1, 0))); }
    if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)); }
    if (event.key === "Enter" && isOpen && matches[activeIndex]) { event.preventDefault(); chooseAirport(matches[activeIndex]); }
    if (event.key === "Escape") setIsOpen(false);
  };

  return (
    <div className="travel-search__field travel-search__field--airport">
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} onChange={(event) => { onChange(event.target.value); setActiveIndex(0); setIsOpen(true); }} onFocus={() => setIsOpen(true)} onKeyDown={handleKeyDown} placeholder={placeholder} autoComplete="off" required role="combobox" aria-expanded={isOpen} aria-autocomplete="list" aria-controls={`${id}-suggestions`} aria-activedescendant={isOpen && matches[activeIndex] ? `${id}-${matches[activeIndex].code}` : undefined} />
      {isOpen && (
        <div className="airport-autocomplete" id={`${id}-suggestions`} role="listbox" aria-label={`${label} airport suggestions`}>
          {matches.length > 0 ? matches.map((airport, index) => (
            <button type="button" role="option" key={airport.code} id={`${id}-${airport.code}`} aria-selected={index === activeIndex} className={index === activeIndex ? "is-active" : ""} onMouseDown={(event) => { event.preventDefault(); chooseAirport(airport); }}>
              <strong>{airport.city} <span>{airport.code}</span></strong><em>{airport.airport} / {airport.country}</em>
            </button>
          )) : <p>NO AIRPORT SIGNAL FOUND</p>}
        </div>
      )}
    </div>
  );
}

function TravelIntelligence() {
  const [priority, setPriority] = useState<(typeof travelPriorities)[number]["id"]>("value");
  const active = travelPriorities.find(item => item.id === priority) ?? travelPriorities[1];
  const [origin, setOrigin] = useState("Perth (PER)");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("2026-10-14");
  const [returnDate, setReturnDate] = useState("2026-10-21");
  const [passengers, setPassengers] = useState("1 traveller");
  const [routeSignal, setRouteSignal] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRouteSignal(`${origin.toUpperCase()} / ${destination.toUpperCase()} / ${active.label} / ${passengers.toUpperCase()}`);
  };

  return (
    <section className="travel-intelligence" aria-labelledby="intelligence-title">
      <div className="travel-intelligence__header">
        <p className="section-label">TRAVEL INTELLIGENCE / PRIORITY FIELD</p>
        <h2 id="intelligence-title">Decide what<br /><span>the route means.</span></h2>
        <p>Every destination can be optimised differently. Choose the signal that matters most before the search begins.</p>
      </div>
      <form className="travel-search" onSubmit={handleSearch} aria-label="fourtee2travel route search">
        <div className="travel-search__heading"><p>ROUTE INPUT / REQUIRED</p><span>01 — 04</span></div>
        <div className="travel-search__fields">
          <AirportAutocomplete id="route-origin" label="ORIGIN" value={origin} onChange={setOrigin} placeholder="City or airport" />
          <AirportAutocomplete id="route-destination" label="DESTINATION" value={destination} onChange={setDestination} placeholder="Where to?" />
          <label><span>DEPART</span><input type="date" value={departureDate} min="2026-08-15" onChange={(event) => setDepartureDate(event.target.value)} required /></label>
          <label><span>RETURN</span><input type="date" value={returnDate} min={departureDate} onChange={(event) => setReturnDate(event.target.value)} required /></label>
          <label><span>TRAVELLERS</span><select value={passengers} onChange={(event) => setPassengers(event.target.value)}><option>1 traveller</option><option>2 travellers</option><option>3 travellers</option><option>4 travellers</option><option>5+ travellers</option></select></label>
          <button type="submit">SET ROUTE <b>↗</b></button>
        </div>
        <p className={routeSignal ? "travel-search__status is-active" : "travel-search__status"} aria-live="polite">{routeSignal ? `ROUTE SIGNAL LOCKED / ${routeSignal}` : "ENTER THE COORDINATES. THE FIELD WILL HOLD THE INTENT."}</p>
      </form>
      <div className="travel-intelligence__console">
        <div className="travel-intelligence__choices" role="tablist" aria-label="Travel priority">
          {travelPriorities.map((item) => (
            <button key={item.id} type="button" role="tab" aria-selected={priority === item.id} className={priority === item.id ? "is-active" : ""} onClick={() => setPriority(item.id)}>
              <span>{item.number}</span><strong>{item.label}</strong><i aria-hidden="true">↗</i>
            </button>
          ))}
        </div>
        <article className="travel-intelligence__readout" aria-live="polite">
          <p>ACTIVE PRIORITY / {active.metric}</p>
          <h3>{active.title}</h3>
          <blockquote>{active.description}</blockquote>
          <div><span>ANY DESTINATION</span><span>FLIGHTS / STAYS / TRANSFERS</span><span>FIELD READY</span></div>
        </article>
      </div>
    </section>
  );
}

export function PortalPage({ portal }: { portal: PortalKey }) {
  const data = portals[portal];
  const heroStyle = { "--portal-image": `url(${data.image})` } as CSSProperties;

  return (
    <div className={`portal-page portal-page--${data.key}`}>
      <header className="portal-header">
        <Link className="wordmark portal-header__home" href="/" aria-label="Return to fourtee2 home">fourtee2</Link>
        <p className="portal-header__transmission">{data.eyebrow}</p>
        <nav aria-label="Portal navigation">
          <Link href="/board">BOARD</Link>
          <Link className={data.key === "travel" ? "is-current nav-wordmark" : "nav-wordmark"} href="/travel">fourtee2travel</Link>
          <Link className={data.key === "music" ? "is-current" : ""} href="/music">4[music]2</Link>
          <Link className={data.key === "you" ? "is-current" : ""} href="/you">4[you]2</Link>
        </nav>
      </header>

      <main>
        <section className="portal-hero" style={heroStyle} aria-labelledby="portal-title">
          <div className="portal-hero__stars" aria-hidden="true" />
          <div className="portal-hero__content">
            <p className="portal-hero__eyebrow">{data.designation}</p>
            <h1 id="portal-title" className="wordmark portal-hero__wordmark">{data.wordmark}</h1>
            <p className="portal-hero__orbit">{data.orbit}</p>
          </div>
          <LivePortalOverlay portal={portal} />
          <a className="portal-hero__scroll" href="#manifest"><span>READ FIELD NOTE</span><i aria-hidden="true" /></a>
          <p className="portal-hero__status">{data.status}</p>
        </section>

        <section id="manifest" className="portal-manifest" aria-labelledby="manifest-title">
          <div className="portal-manifest__index">
            <p>FIELD NOTE</p>
            <span>0{portal === "travel" ? "1" : portal === "music" ? "2" : "3"}</span>
          </div>
          <div className="portal-manifest__copy">
            <p className="section-label">MANIFEST / ACTIVE</p>
            <h2 id="manifest-title">{data.headline}</h2>
            <div className="portal-manifest__body"><p>{data.intro}</p><p>{data.note}</p></div>
          </div>
          <div className="portal-manifest__dial" aria-label="Field status indicator">
            <span className="portal-manifest__dial-core" />
            <span className="portal-manifest__dial-mark portal-manifest__dial-mark--one" />
            <span className="portal-manifest__dial-mark portal-manifest__dial-mark--two" />
            <p>COORDINATE<br />LOCKED</p>
          </div>
        </section>

        {portal === "music" && <MusicPlayer />}
        {portal === "travel" && <><TravelFieldNotes /><TravelIntelligence /></>}

        <section className={`portal-axes portal-axes--${data.key}`} aria-labelledby="axes-title">
          <div className="portal-axes__header">
            <p className="section-label">FIELD INTERFACE</p>
            <h2 id="axes-title">{data.axisTitle}</h2>
            <p>Use the three points below as a way into the field. Move in any order.</p>
          </div>
          <div className={`axis-list axis-list--${data.key}`}>
            {data.axes.map((axis) => (
              <article className="axis-entry" key={axis.code}>
                <p className="axis-entry__code">{axis.code}</p>
                <h3>{axis.title}</h3>
                <p>{axis.description}</p>
                <span aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className={`portal-log portal-log--${data.key}`} aria-labelledby="log-title">
          <div className={`portal-log__signal portal-log__signal--${data.key}`} aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="portal-log__header">
            <p className="section-label">ARCHIVE / 042</p>
            <h2 id="log-title">{data.logTitle}</h2>
          </div>
          <ol>
            {data.log.map((entry) => (
              <li key={entry.sequence}>
                <span>{entry.sequence}</span>
                <div><h3>{entry.title}</h3><p>{entry.detail}</p></div>
              </li>
            ))}
          </ol>
          <p className="portal-log__footnote">THIS INDEX IS IN ACTIVE FORMATION. RETURN WHEN THE SIGNAL CHANGES.</p>
        </section>

        <section className="portal-return" aria-label="Return to fourtee2 universe">
          <p>END OF CURRENT FIELD</p>
          <Link className="wordmark" href="/">fourtee2</Link>
          <span>RETURN TO THE UNIVERSE <b>↑</b></span>
        </section>
      </main>
    </div>
  );
}
