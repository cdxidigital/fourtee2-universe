import { useAuth } from "@/_core/hooks/useAuth";

/**
 * fourtee2 Astral Editorial System: cosmic portal layout with Righteous-only
 * fourtee2 wordmarks, IBM Plex Mono interface labels, and cinematic image wells.
 */
export default function Home() {
  // The useAuth hook provides authentication state.
  // To implement login/logout, call logout(), or start login from an event
  // handler: onClick={() => startLogin()} (imported from "@/const"). Never call
  // startLogin() during render (no href={startLogin()}) — it mints a one-time
  // nonce cookie and must run only at the moment of navigation.
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="universe-shell">
      <header className="site-header" aria-label="Primary navigation">
        <a className="wordmark wordmark--nav" href="#top" aria-label="fourtee2 home">
          fourtee2
        </a>
        <nav className="site-nav" aria-label="Universe portals">
          <a href="#signal">THE SIGNAL</a>
          <a className="nav-wordmark" href="/travel">fourtee2travel</a>
          <a href="/music">4[music]2</a>
          <a href="/you">4[you]2</a>
          <a href="/board">BOARD</a>
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

        <section id="signal" className="signal" aria-labelledby="signal-title">
          <div className="signal__orbit" aria-hidden="true">
            <span className="orbit-ring orbit-ring--outer" />
            <span className="orbit-ring orbit-ring--middle" />
            <span className="orbit-ring orbit-ring--inner" />
            <span className="orbit-core" />
            <span className="orbit-satellite" />
            <span className="orbit-star orbit-star--one" />
            <span className="orbit-star orbit-star--two" />
          </div>
          <div className="signal__copy">
            <p className="section-label">00 / THE SIGNAL</p>
            <h2 id="signal-title">Choose a field.<br /><span>Enter the orbit.</span></h2>
            <div className="signal__body">
              <p>Coordinates for places, frequencies and rituals. Keep only what changes the way you move through the day.</p>
              <p>There is no central route. Find a signal. Follow it until the field begins to feel like yours.</p>
            </div>
          </div>
          <dl className="signal__metrics">
            <div><dt>FIELD</dt><dd>World / sound / self</dd></div>
            <div><dt>ORBIT</dt><dd>Perth — everywhere</dd></div>
            <div><dt>MODE</dt><dd>Always becoming</dd></div>
          </dl>
        </section>

        <section id="portals" className="portals" aria-labelledby="portals-title">
          <div className="portals__header">
            <p id="portals-title" className="section-kicker">EXPLORE THE UNIVERSE</p>
            <p className="portals__caption">THREE PORTALS. ONE EXPANDING FIELD.</p>
          </div>
          <div className="portal-grid">
            <article id="travel" className="portal portal--travel">
              <a className="portal__link" href="/travel" aria-label="Explore fourtee2travel">
                <img src="/manus-storage/card-travel_bf8bb539.jpg" alt="Earth at night viewed from space" />
                <div className="portal__wash" aria-hidden="true" />
                <span className="portal__tag">TRAVEL</span>
                <div className="portal__meta">
                  <p>⌁ cheapest · value · luxury</p>
                  <h2 className="wordmark wordmark--portal">fourtee2travel</h2>
                  <span className="portal__enter">ENTER PORTAL <b>→</b></span>
                </div>
              </a>
            </article>

            <article id="music" className="portal portal--music">
              <a className="portal__link" href="/music" aria-label="Explore 4 music 2">
                <img src="/manus-storage/card-music_0929e7cc.jpg" alt="Milky Way over a mountain ridge" />
                <div className="portal__wash" aria-hidden="true" />
                <span className="portal__tag">MUSIC</span>
                <div className="portal__meta">
                  <p>♢ ai-curated suno playlists</p>
                  <h2 className="wordmark wordmark--portal">4[music]2</h2>
                  <span className="portal__enter">ENTER PORTAL <b>→</b></span>
                </div>
              </a>
            </article>

            <article id="you" className="portal portal--you">
              <a className="portal__link" href="/you" aria-label="Explore 4 you 2">
                <img src="/manus-storage/card-you_7c45eb9e.jpg" alt="Dark purple flowing fabric texture" />
                <div className="portal__wash" aria-hidden="true" />
                <span className="portal__tag portal__tag--soon">○ COMING<br />SOON</span>
                <div className="portal__meta">
                  <p>♡ hair · skincare · preworkout</p>
                  <h2 className="wordmark wordmark--portal">4[you]2</h2>
                  <span className="portal__enter">ENTER PORTAL <b>→</b></span>
                </div>
              </a>
            </article>
          </div>
        </section>

        <section className="universe-index" aria-labelledby="index-title">
          <div className="universe-index__intro">
            <p className="section-label">01 / UNIVERSE INDEX</p>
            <h2 id="index-title">Select a field.<br />Begin the scan.</h2>
          </div>
          <div className="index-list">
            <a id="travel-field" href="/travel" className="index-entry index-entry--travel">
              <span className="index-entry__number">01</span>
              <div>
                <h3 className="wordmark">fourtee2travel</h3>
                <p>Any destination. Your priority: cheapest, best value or luxury.</p>
              </div>
              <span className="index-entry__state">OPEN <b>↗</b></span>
            </a>
            <a id="music-field" href="/music" className="index-entry index-entry--music">
              <span className="index-entry__number">02</span>
              <div>
                <h3 className="wordmark">4[music]2</h3>
                <p>Frequencies for roads, rooms and returning memories.</p>
              </div>
              <span className="index-entry__state">OPEN <b>↗</b></span>
            </a>
            <a id="you-field" href="/you" className="index-entry index-entry--you">
              <span className="index-entry__number">03</span>
              <div>
                <h3 className="wordmark">4[you]2</h3>
                <p>Rituals for the energy you carry forward.</p>
              </div>
              <span className="index-entry__state">IN ORBIT <b>↗</b></span>
            </a>
          </div>
        </section>

        <section className="field-notes" aria-labelledby="notes-title">
          <div className="field-notes__constellation" aria-hidden="true">
            <i /><i /><i /><i /><i />
          </div>
          <p className="section-label">02 / FIELD NOTES</p>
          <h2 id="notes-title">Hold the signal.<br /><span>Move differently.</span></h2>
          <p className="field-notes__lede">FIELD NOTE 042 — A route, a sound, a small ritual. Keep the coordinates that alter the atmosphere.</p>
          <a href="#top" className="return-link">RETURN TO ORIGIN <span>↑</span></a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark wordmark--footer" href="#top">fourtee2</a>
        <nav aria-label="Footer navigation">
          <a className="nav-wordmark" href="/travel">fourtee2travel</a>
          <a href="/music">4[music]2</a>
          <a href="/you">4[you]2</a>
        </nav>
        <p>© 2026 <span className="wordmark wordmark--copyright">fourtee2</span></p>
      </footer>
    </div>
  );
}
