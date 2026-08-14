/**
 * fourtee2 Astral Editorial System: cosmic portal layout with Righteous-only
 * fourtee2 wordmarks, IBM Plex Mono interface labels, and cinematic image wells.
 */
export default function Home() {
  return (
    <div className="universe-shell">
      <header className="site-header" aria-label="Primary navigation">
        <a className="wordmark wordmark--nav" href="#top" aria-label="fourtee2 home">
          fourtee2
        </a>
        <nav className="site-nav" aria-label="Universe portals">
          <a className="nav-wordmark" href="#travel">fourtee2travel</a>
          <a href="#music">4[music]2</a>
          <a href="#you">4[you]2</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__cosmos" aria-hidden="true" />
          <div className="hero__grain" aria-hidden="true" />
          <div className="hero__copy">
            <p className="eyebrow">A BRAND UNIVERSE</p>
            <h1 id="hero-title" className="wordmark wordmark--hero">fourtee2</h1>
            <p className="hero__statement">explore the world. feel the sound.</p>
          </div>
        </section>

        <section className="transit" aria-label="Scroll to explore the universe">
          <a href="#portals" className="scroll-cue">
            <span>SCROLL</span>
            <i aria-hidden="true" />
          </a>
        </section>

        <section id="portals" className="portals" aria-labelledby="portals-title">
          <p id="portals-title" className="section-kicker">EXPLORE THE UNIVERSE</p>
          <div className="portal-grid">
            <article id="travel" className="portal portal--travel">
              <a className="portal__link" href="#travel" aria-label="Explore fourtee2travel">
                <img src="/manus-storage/card-travel_bf8bb539.jpg" alt="Earth at night viewed from space" />
                <div className="portal__wash" aria-hidden="true" />
                <span className="portal__tag">TRAVEL</span>
                <div className="portal__meta">
                  <p>⌁ flights · hotels · deals</p>
                  <h2 className="wordmark wordmark--portal">fourtee2travel</h2>
                </div>
              </a>
            </article>

            <article id="music" className="portal portal--music">
              <a className="portal__link" href="#music" aria-label="Explore 4 music 2">
                <img src="/manus-storage/card-music_0929e7cc.jpg" alt="Milky Way over a mountain ridge" />
                <div className="portal__wash" aria-hidden="true" />
                <span className="portal__tag">MUSIC</span>
                <div className="portal__meta">
                  <p>♢ ai-curated suno playlists</p>
                  <h2 className="wordmark wordmark--portal">4[music]2</h2>
                </div>
              </a>
            </article>

            <article id="you" className="portal portal--you">
              <a className="portal__link" href="#you" aria-label="Explore 4 you 2">
                <img src="/manus-storage/card-you_7c45eb9e.jpg" alt="Dark purple flowing fabric texture" />
                <div className="portal__wash" aria-hidden="true" />
                <span className="portal__tag portal__tag--soon">○ COMING<br />SOON</span>
                <div className="portal__meta">
                  <p>♡ hair · skincare · preworkout</p>
                  <h2 className="wordmark wordmark--portal">4[you]2</h2>
                </div>
              </a>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark wordmark--footer" href="#top">fourtee2</a>
        <nav aria-label="Footer navigation">
          <a className="nav-wordmark" href="#travel">fourtee2travel</a>
          <a href="#music">4[music]2</a>
          <a href="#you">4[you]2</a>
        </nav>
        <p>© 2026 <span className="wordmark wordmark--copyright">fourtee2</span></p>
      </footer>
    </div>
  );
}
