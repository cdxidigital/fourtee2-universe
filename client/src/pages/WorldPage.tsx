import { findWorld, galaxyRelationships } from "@/lib/galaxy";
import { getWorldMaterial, ambienceUrls } from "@/lib/worldMaterial";
import { worldSystems } from "@/lib/worldSystems";
import { Link, useRoute } from "wouter";
import { useEffect, useRef, useState, useMemo } from "react";
import { Volume2, VolumeX, ArrowLeft, Info, Activity } from "lucide-react";

export default function WorldPage() {
  const [, params] = useRoute("/worlds/:slug");
  const world = params?.slug ? findWorld(params.slug) : undefined;
  const material = world ? getWorldMaterial(world.id) : undefined;
  
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isAudioEnabled && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.error("Audio playback failed:", err);
        setAudioError(true);
        setIsAudioEnabled(false);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isAudioEnabled]);

  if (!world || !material) return <main className="world-view"><p>WORLD SIGNAL NOT FOUND.</p><Link href="/?galaxy=1">RETURN TO GALAXY</Link></main>;

  const connections = galaxyRelationships.filter(link => link.source === world.id || link.target === world.id);
  const ambienceUrl = ambienceUrls[material.ambience];
  const systems = useMemo(() => worldSystems[world.id] || [], [world.id]);
  const [activeSystemId, setActiveSystemId] = useState<string | null>(null);

  return (
    <main className="world-view" style={{ "--world-accent": world.color } as React.CSSProperties}>
      <header className="world-view__rail">
        <Link className="wordmark" href="/?galaxy=1">fourtee2</Link>
        <p className="world-view__path"><span className="wordmark">fourtee2</span> / worlds / {world.id}</p>
        <div className="world-view__actions">
          {audioError ? (
            <span className="audio-toggle opacity-40 cursor-not-allowed">
              <VolumeX size={12} />
              <span>SIGNAL UNAVAILABLE</span>
            </span>
          ) : (
            <button 
              onClick={() => setIsAudioEnabled(!isAudioEnabled)} 
              className="audio-toggle"
              aria-label={isAudioEnabled ? "Disable ambient sound" : "Enable ambient sound"}
            >
              {isAudioEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
              <span>{isAudioEnabled ? "SIGNAL ACTIVE" : "SIGNAL MUTED"}</span>
            </button>
          )}
          <Link href="/?galaxy=1" className="back-link"><ArrowLeft size={12} /> GALAXY</Link>
        </div>
      </header>

      <audio 
        ref={audioRef} 
        src={ambienceUrl} 
        loop 
        onError={() => {
          console.error("Audio failed to load:", ambienceUrl);
          setAudioError(true);
          setIsAudioEnabled(false);
        }}
      />

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
          <p>PRODUCT SYSTEMS & INFRASTRUCTURE</p>
          <span>{systems.length} ACTIVE MODULES</span>
        </div>
        <div className="systems-grid">
          {systems.map((system, index) => (
            <article 
              key={system.id} 
              className={`system-card system-card--interactive ${activeSystemId === system.id ? "is-active" : ""}`}
              onClick={() => setActiveSystemId(activeSystemId === system.id ? null : system.id)}
            >
              <div className="system-card__top">
                <span className="system-card__index">{String(index + 1).padStart(2, "0")}</span>
                <Activity size={10} className="system-card__icon" />
              </div>
              <h2 className="system-card__title">{system.title}</h2>
              <p className="system-card__description">{system.description}</p>
              
              <div className="system-card__footer">
                <button className="system-card__action">
                  {system.actionLabel}
                </button>
                {activeSystemId === system.id && (
                  <div className="system-card__detail animate-in fade-in slide-in-from-top-2 duration-300">
                    <Info size={10} />
                    <span>{system.detail}</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="world-view__nodes">
          <div className="section-header">
            <p>CORE NODES</p>
            <span>{world.children.length} REGISTERED ENTITIES</span>
          </div>
          <div className="nodes-list">
            {world.children.map((child, idx) => (
              <span key={child} className="node-tag">
                <small>{String(idx + 1).padStart(2, "0")}</small>
                {child}
              </span>
            ))}
          </div>
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
