import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { SaveSignalButton } from "@/components/SaveSignalButton";

/** fourtee2travel public archive: published records are managed through the private archive command console. */
export default function TravelArchive() {
  const { user } = useAuth();
  const archive = trpc.archive.listPublished.useQuery();
  return (
    <main className="travel-archive">
      <header className="platform-rail">
        <a href="/" className="wordmark">fourtee2</a>
        <p>fourtee2travel / PUBLIC FIELD ARCHIVE</p>
        <nav><a href="/travel">RETURN TO TRAVEL</a>{user?.role === "admin" && <a href="/archive/command">COMMAND</a>}</nav>
      </header>
      <section className="travel-archive__hero">
        <p className="section-label">DESTINATION FIELD NOTES / PUBLISHED</p>
        <h1>Places worth<br /><span>holding onto.</span></h1>
        <p>Destination notes curated through fourtee2travel. Each entry gives you a route, an atmosphere, and a reason to go.</p>
        <a className="platform-action" href="/travel">PLAN A TRIP <b>↗</b></a>
      </section>
      <section className="archive-records">
        {archive.isLoading && <p className="archive-state">SCANNING PUBLISHED COORDINATES</p>}
        {archive.data?.map((note, index) => (
          <article className="archive-record" key={note.id}>
            <div className="archive-record__index">{String(index + 1).padStart(2, "0")}</div>
            <div><p>{note.city.toUpperCase()} / {note.country.toUpperCase()}</p><h2>{note.title}</h2><span>{note.latitude}° / {note.longitude}°</span></div>
            <blockquote>{note.note}</blockquote>
            <SaveSignalButton signal={{ signalType: "destination", portal: "travel", sourceId: `destination-${note.id}`, title: note.title, subtitle: `${note.city}, ${note.country}`, href: "/travel" }} />
          </article>
        ))}
        {!archive.isLoading && !archive.data?.length && <div className="archive-state archive-state--empty"><p>DESTINATION ARCHIVE / COMING SOON</p><h2>The first destination<br />note is on its way.</h2><span>In the meantime, use fourtee2travel to begin planning your next trip.</span>{user?.role === "admin" ? <a className="platform-action" href="/archive/command">ADD A DESTINATION NOTE <b>↗</b></a> : <a className="platform-action" href="/travel">PLAN A TRIP <b>↗</b></a>}</div>}
      </section>
    </main>
  );
}
