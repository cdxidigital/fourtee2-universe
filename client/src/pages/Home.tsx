import GalaxyExplorer from "@/components/GalaxyExplorer";
import LiveHero from "@/components/LiveHero";
import { useCallback, useState } from "react";

type NavIntent = "map" | "worlds" | "search" | "about" | null;

/**
 * fourtee2 Astral Editorial System: cosmic portal layout with Righteous-only
 * fourtee2 wordmarks, IBM Plex Mono interface labels, and cinematic image wells.
 */
export default function Home() {
  const [hasEntered, setHasEntered] = useState(() => new URLSearchParams(window.location.search).get("galaxy") === "1");
  const [navIntent, setNavIntent] = useState<NavIntent>(null);
  const enterUniverse = useCallback(() => {
    setHasEntered(true);
    window.setTimeout(() => document.getElementById("galaxy")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }, []);
  const requestNavigation = (intent: Exclude<NavIntent, null>) => {
    enterUniverse();
    setNavIntent(intent);
  };

  return (
    <div className={`universe-shell galaxy-home${hasEntered ? " is-entered" : ""}`}>
      <header className="site-header" aria-label="Primary navigation">
        <button className="wordmark wordmark--nav site-header__core" type="button" onClick={() => requestNavigation("map")} aria-label="Return to fourtee2 galaxy core">
          fourtee2
        </button>
        <nav className="site-nav" aria-label="Galaxy navigation">
          <button type="button" onClick={() => requestNavigation("map")}>MAP</button>
          <button type="button" onClick={() => requestNavigation("worlds")}>WORLDS</button>
          <button type="button" onClick={() => requestNavigation("search")}>SEARCH</button>
          <button type="button" onClick={() => requestNavigation("about")}>ABOUT</button>
        </nav>
      </header>

      <main id="top">
        {!hasEntered ? <LiveHero onEnter={enterUniverse} /> : <GalaxyExplorer navIntent={navIntent} onIntentHandled={() => setNavIntent(null)} />}
      </main>

      <footer className="site-footer galaxy-footer">
        <p>TRANSMISSION COMPLETE</p>
        <button type="button" className="wordmark wordmark--footer" onClick={() => requestNavigation("map")}>fourtee2</button>
        <span>THE UNIVERSE IS STILL EXPANDING.</span>
      </footer>
    </div>
  );
}
