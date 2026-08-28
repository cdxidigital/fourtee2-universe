import { findWorld, galaxyRelationships } from "@/lib/galaxy";
import { Link, useRoute } from "wouter";

export default function WorldPage() {
  const [, params] = useRoute("/worlds/:slug");
  const world = params?.slug ? findWorld(params.slug) : undefined;

  if (!world) return <main className="world-view"><p>WORLD SIGNAL NOT FOUND.</p><Link href="/?galaxy=1">RETURN TO GALAXY</Link></main>;

  const connections = galaxyRelationships.filter(link => link.source === world.id || link.target === world.id);
  return (
    <main className="world-view" style={{ "--world-accent": world.color } as React.CSSProperties}>
      <header className="world-view__rail"><Link className="wordmark" href="/?galaxy=1">fourtee2</Link><p><span className="wordmark">fourtee2</span> / worlds / {world.id}</p><Link href="/?galaxy=1">RETURN TO GALAXY</Link></header>
      <section className="world-view__hero"><p>{world.type.toUpperCase()} / {world.status} / {world.category}</p><i className="world-view__planet" aria-hidden="true" /><h1 className={world.name.includes("fourtee2") ? "wordmark" : ""}>{world.name}</h1><blockquote>{world.description}</blockquote><a href="#systems">INSPECT SYSTEMS <b>↓</b></a></section>
      <section id="systems" className="world-view__systems"><p>SYSTEMS IN ORBIT</p><div>{world.children.map((child, index) => <article key={child}><span>{String(index + 1).padStart(2, "0")}</span><h2>{child}</h2><small>{world.status} / LINKED TO {world.name}</small></article>)}</div></section>
      <section className="world-view__connections"><p>RELATIONSHIPS</p><div>{connections.length ? connections.map(link => <span key={`${link.source}-${link.target}`}>{link.source === world.id ? link.target : link.source}<b>{link.relationshipType}</b></span>) : <span>NO EXTERNAL PATHS LOCKED</span>}</div></section>
      <footer className="world-view__footer"><p>END OF WORLD VIEW</p><Link className="wordmark" href="/?galaxy=1">fourtee2</Link><Link href="/?galaxy=1">RETURN TO GALAXY ↑</Link></footer>
    </main>
  );
}
