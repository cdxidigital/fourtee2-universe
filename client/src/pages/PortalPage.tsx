import type { CSSProperties } from "react";

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
    designation: "WORLD / MOVEMENT / ARRIVAL",
    headline: "Choose the place by the feeling it leaves behind.",
    image: "/manus-storage/card-travel_bf8bb539.jpg",
    imageAlt: "Earth at night with illuminated cities seen from orbit",
    intro: "fourtee2travel is a reference field for places worth going slightly out of your way for. Begin with a feeling, then make the route answer it.",
    note: "Not a booking engine. A better reason to book.",
    orbit: "THE MAP IS A MOOD",
    axisTitle: "Route assembly",
    axes: [
      { code: "A / 01", title: "Locate", description: "Find the coordinate that changes the temperature of the day." },
      { code: "A / 02", title: "Stay", description: "Keep places with a point of view, not just a vacancy." },
      { code: "A / 03", title: "Return", description: "Save the fragments that make somewhere worth revisiting." },
    ],
    logTitle: "Field log / departure sequence",
    log: [
      { sequence: "01", title: "The first light", detail: "Build around one slow morning in an unfamiliar neighbourhood." },
      { sequence: "02", title: "The long table", detail: "Choose the seat, the sound, and the person before choosing the menu." },
      { sequence: "03", title: "After arrival", detail: "Leave enough unplanned space for the place to answer back." },
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

export function PortalPage({ portal }: { portal: PortalKey }) {
  const data = portals[portal];
  const heroStyle = { "--portal-image": `url(${data.image})` } as CSSProperties;

  return (
    <div className={`portal-page portal-page--${data.key}`}>
      <header className="portal-header">
        <a className="wordmark portal-header__home" href="/" aria-label="Return to fourtee2 home">fourtee2</a>
        <p className="portal-header__transmission">{data.eyebrow}</p>
        <nav aria-label="Portal navigation">
          <a className={data.key === "travel" ? "is-current nav-wordmark" : "nav-wordmark"} href="/travel">fourtee2travel</a>
          <a className={data.key === "music" ? "is-current" : ""} href="/music">4[music]2</a>
          <a className={data.key === "you" ? "is-current" : ""} href="/you">4[you]2</a>
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
          <a className="wordmark" href="/">fourtee2</a>
          <span>RETURN TO THE UNIVERSE <b>↑</b></span>
        </section>
      </main>
    </div>
  );
}
