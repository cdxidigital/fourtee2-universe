import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";

/** fourtee2 Signal Board: authenticated personal coordinates across travel and music. */
export default function SignalBoard() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const signals = trpc.signal.list.useQuery(undefined, { enabled: isAuthenticated });
  const destinations = signals.data?.filter(signal => signal.signalType === "destination") ?? [];
  const playlists = signals.data?.filter(signal => signal.signalType === "playlist") ?? [];

  if (loading) return <div className="platform-loading">CALIBRATING SIGNAL BOARD</div>;

  if (!isAuthenticated) {
    return (
      <main className="signal-board signal-board--locked">
        <p className="section-label">PRIVATE INTERFACE / AUTH REQUIRED</p>
        <h1>Keep the signals<br /><span>that find you.</span></h1>
        <p>Save travel routes and music you want to return to. Your personal board keeps them together in one place.</p>
        <button className="platform-action" type="button" onClick={() => startLogin()}>SIGN IN TO SAVE FAVOURITES <b>↗</b></button>
        <a href="/" className="platform-return">RETURN TO UNIVERSE <b>↑</b></a>
      </main>
    );
  }

  return (
    <main className="signal-board">
      <header className="platform-rail">
        <a href="/" className="wordmark">fourtee2</a>
        <p>MY SAVED ROUTES & MUSIC / {user?.name?.toUpperCase() || "PRIVATE ORBIT"}</p>
        <button type="button" onClick={() => void logout()}>SIGN OUT</button>
      </header>
      <section className="signal-board__hero">
        <p className="section-label">MY COORDINATES / ACTIVE</p>
        <h1>Keep what<br /><span>changes the field.</span></h1>
        <p>Your saved travel routes and music live here. Use the links below to discover more or revisit a favourite.</p>
      </section>
      <section className="signal-board__content">
        <div className="board-group">
          <div className="board-group__header"><p>01 / SAVED TRAVEL ROUTES</p><a href="/travel">FIND A TRIP <b>↗</b></a></div>
          {destinations.length ? <div className="board-list">{destinations.map(signal => <a href={signal.href || "/travel"} key={signal.id}><span>ROUTE</span><div><strong>{signal.title}</strong><p>{signal.subtitle || "Travel field"}</p></div><b>↗</b></a>)}</div> : <p className="board-empty">NO SAVED TRAVEL ROUTES YET. PLAN A TRIP, THEN CHOOSE “SAVE TO MY BOARD”.</p>}
        </div>
        <div className="board-group board-group--music">
          <div className="board-group__header"><p>02 / SAVED MUSIC</p><a href="/music">PLAY MUSIC <b>↗</b></a></div>
          {playlists.length ? <div className="board-list">{playlists.map(signal => <a href={signal.href || "/music"} key={signal.id}><span>PLAY</span><div><strong>{signal.title}</strong><p>{signal.subtitle || "Music field"}</p></div><b>↗</b></a>)}</div> : <p className="board-empty">NO SAVED MUSIC YET. OPEN A LISTENING FIELD, THEN CHOOSE “SAVE TO MY BOARD”.</p>}
        </div>
      </section>
    </main>
  );
}
