import { findWorld, galaxyRelationships } from "@/lib/galaxy";
import { getWorldMaterial, ambienceUrls } from "@/lib/worldMaterial";
import { Link, useRoute } from "wouter";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, ArrowLeft } from "lucide-react";

export default function WorldPage() {
  const [, params] = useRoute("/worlds/:slug");
  const world = params?.slug ? findWorld(params.slug) : undefined;
  const material = world ? getWorldMaterial(world.id) : undefined;
  
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isAudioEnabled && audioRef.current) {
      audioRef.current.play().catch(err => console.error("Audio playback failed:", err));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isAudioEnabled]);

  if (!world || !material) return <main className="world-view"><p>WORLD SIGNAL NOT FOUND.</p><Link href="/?galaxy=1">RETURN TO GALAXY</Link></main>;

  const connections = galaxyRelationships.filter(link => link.source === world.id || link.target === world.id);
  const ambienceUrl = ambienceUrls[material.ambience];

  return (
    <main className="world-view" style={{ "--world-accent": world.color } as React.CSSProperties}>
      <header className="world-view__rail">
        <Link className="wordmark" href="/?galaxy=1">fourtee2</Link>
        <p className="world-view__path"><span className="wordmark">fourtee2</span> / worlds / {world.id}</p>
        <div className="world-view__actions">
          <button 
            onClick={() => setIsAudioEnabled(!isAudioEnabled)} 
            className="audio-toggle"
            aria-label={isAudioEnabled ? "Disable ambient sound" : "Enable ambient sound"}
          >
            {isAudioEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            <span>{isAudioEnabled ? "SIGNAL ACTIVE" : "SIGNAL MUTED"}</span>
          </button>
          <Link href="/?galaxy=1" className="back-link"><ArrowLeft size={12} /> GALAXY</Link>
        </div>
      </header>

      <audio ref={audioRef} src={ambienceUrl} loop />

      <section className="world-view__hero">
        <div className="world-view__visual">
          <img src={material.imageUrl} alt={world.name} className="world-view__image" />
          <div className="world-view__overlay" />
        </div>
        
        <div className="world-view__content">
          <div className="world-view__header">
            <p className="world-view__meta">{world.type.toUpperCase()} / {world.status} / {world.category}</p>
            <h1 className={world.name.includes("fourtee2") ? "wordmark" : ""}>{world.name}</h1>
          </div>
          
          <div className="world-view__editorial">
            <blockquote className="world-view__observation">{material.observation}</blockquote>
            <div className="world-view__field-note">
              <p>{material.fieldNote}</p>
            </div>
          </div>
          
          <a href="#systems" className="world-view__scroll">INSPECT SYSTEMS <b>↓</b></a>
        </div>
      </section>

      <section id="systems" className="world-view__systems">
        <div className="section-header">
          <p>SYSTEMS IN ORBIT</p>
          <span>{world.children.length} ACTIVE NODES</span>
        </div>
        <div className="systems-grid">
          {world.children.map((child, index) => (
            <article key={child} className="system-card">
              <span className="system-card__index">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="system-card__title">{child}</h2>
              <p className="system-card__status">{world.status} / LINKED TO {world.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="world-view__connections">
        <div className="section-header">
          <p>RELATIONSHIPS</p>
          <span>NETWORK MAPPING</span>
        </div>
        <div className="connections-list">
          {connections.length ? connections.map(link => (
            <div key={`${link.source}-${link.target}`} className="connection-item">
              <span className="connection-item__id">{link.source === world.id ? link.target : link.source}</span>
              <b className="connection-item__type">{link.relationshipType}</b>
            </div>
          )) : <span className="connection-item connection-item--none">NO EXTERNAL PATHS LOCKED</span>}
        </div>
      </section>

      <footer className="world-view__footer">
        <p>END OF WORLD VIEW</p>
        <Link className="wordmark" href="/?galaxy=1">fourtee2</Link>
        <Link href="/?galaxy=1" className="text-[10px] tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity">RETURN TO GALAXY ↑</Link>
      </footer>
    </main>
  );
}
