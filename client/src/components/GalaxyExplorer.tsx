import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent, type WheelEvent } from "react";
import { useLocation } from "wouter";
import { currentMissions, findWorld, galaxyRelationships, galaxyWorlds, searchWorlds, type GalaxyWorld } from "@/lib/galaxy";

type NavIntent = "map" | "worlds" | "search" | "about" | null;

type GalaxyExplorerProps = {
  navIntent: NavIntent;
  onIntentHandled: () => void;
};

type ViewState = { x: number; y: number; zoom: number };

const starField = Array.from({ length: 58 }, (_, index) => ({
  left: `${(index * 37 + 13) % 100}%`,
  top: `${(index * 61 + 7) % 100}%`,
  opacity: 0.18 + ((index * 17) % 55) / 100,
  size: 1 + (index % 3),
  delay: `${(index % 9) * -1.7}s`,
}));

function Planet({ world, selected, dimmed, onSelect }: { world: GalaxyWorld; selected: boolean; dimmed: boolean; onSelect: (world: GalaxyWorld) => void }) {
  const visualStyle = {
    "--world-x": `${world.x}%`,
    "--world-y": `${world.y}%`,
    "--world-scale": world.scale,
    "--world-color": world.color,
  } as CSSProperties;

  return (
    <button
      type="button"
      className={`galaxy-planet galaxy-planet--${world.type} galaxy-planet--${world.id}${selected ? " is-selected" : ""}${dimmed ? " is-dimmed" : ""}${world.category ? ` is-cat-${world.category}` : ""}`}
      style={visualStyle}
      onClick={event => { event.stopPropagation(); onSelect(world); }}
      onFocus={() => onSelect(world)}
      aria-pressed={selected}
      aria-label={`Inspect ${world.name}, ${world.status.toLowerCase()}, ${world.category}`}
    >
      <span className="galaxy-planet__orbital" aria-hidden="true" />
      <span className="galaxy-planet__body" aria-hidden="true"><i /></span>
      <span className="galaxy-planet__label"><b className={world.name.includes("fourtee2") ? "wordmark" : undefined}>{world.name}</b><small>{world.status}</small></span>
    </button>
  );
}

export default function GalaxyExplorer({ navIntent, onIntentHandled }: GalaxyExplorerProps) {
  const [view, setView] = useState<ViewState>({ x: 0, y: 0, zoom: 1 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [isListOpen, setIsListOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [showConstellations, setShowConstellations] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [departingWorld, setDepartingWorld] = useState<string | null>(null);
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [, setLocation] = useLocation();
  const pointerRef = useRef<Map<number, { x: number; y: number }>>(new Map());

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("fourtee2-tour-seen");
    if (!hasSeenTour) {
      const timer = window.setTimeout(() => setTourStep(0), 1500);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const completeTour = () => {
    setTourStep(null);
    localStorage.setItem("fourtee2-tour-seen", "true");
  };

  const tourSteps = [
    {
      title: "ARRIVAL RITUAL",
      content: "You have entered the fourtee2 universe. A core origin surrounded by a growing ecosystem of ideas and systems.",
      action: "NEXT SIGNAL",
    },
    {
      title: "THE 14 WORLDS",
      content: "Fourteen celestial bodies represent our active ventures, products, and research labs. Each one is a distinct field of intelligence.",
      action: "CONTINUE",
    },
    {
      title: "SEMANTIC INSPECTION",
      content: "Select any world to inspect its current mission, field notes, and orbital systems. Every signal carries meaning.",
      action: "UNDERSTOOD",
    },
    {
      title: "CONSTELLATION VIEWS",
      content: "Use the controls to reveal constellations—grouping worlds by their category: Travel, Creative, Research, and Technology.",
      action: "BEGIN EXPLORATION",
    },
  ];
  const dragRef = useRef<{ x: number; y: number; originX: number; originY: number } | null>(null);
  const pinchRef = useRef<{ distance: number; zoom: number } | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => searchWorlds(query), [query]);
  const matchIds = useMemo(() => new Set(matches.map(world => world.id)), [matches]);
  const selected = selectedId ? findWorld(selectedId) : null;

  useEffect(() => {
    if (!navIntent) return;
    if (navIntent === "map") recenter();
    if (navIntent === "worlds") {
      setSelectedId(null);
      setIsSearchOpen(false);
      setIsAboutOpen(false);
      setIsListOpen(true);
    }
    if (navIntent === "search") {
      setSelectedId(null);
      setIsListOpen(false);
      setIsAboutOpen(false);
      setQuery("");
      setIsSearchOpen(true);
    }
    if (navIntent === "about") {
      setSelectedId(null);
      setIsListOpen(false);
      setIsSearchOpen(false);
      setIsAboutOpen(true);
    }
    onIntentHandled();
  }, [navIntent, onIntentHandled]);

  useEffect(() => {
    if (isSearchOpen) window.setTimeout(() => searchRef.current?.focus(), 50);
  }, [isSearchOpen]);

  function recenter() {
    setView({ x: 0, y: 0, zoom: 1 });
    setSelectedId(null);
  }

  function selectWorld(world: GalaxyWorld) {
    setDepartingWorld(null);
    setSelectedId(world.id);
  }

  function enterWorld(world: GalaxyWorld) {
    setDepartingWorld(world.id);
    setView(current => ({ ...current, zoom: 1.68 }));
    window.setTimeout(() => { setLocation(world.url); }, 520);
  }

  function adjustZoom(delta: number) {
    setView(current => ({ ...current, zoom: Math.min(1.75, Math.max(.64, Number((current.zoom + delta).toFixed(2)))) }));
  }

  function onWheel(event: WheelEvent<HTMLDivElement>) {
    event.preventDefault();
    adjustZoom(event.deltaY > 0 ? -.08 : .08);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointerRef.current.size === 1) dragRef.current = { x: event.clientX, y: event.clientY, originX: view.x, originY: view.y };
    if (pointerRef.current.size === 2) {
      const [a, b] = Array.from(pointerRef.current.values());
      pinchRef.current = { distance: Math.hypot(a.x - b.x, a.y - b.y), zoom: view.zoom };
      dragRef.current = null;
    }
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!pointerRef.current.has(event.pointerId)) return;
    pointerRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointerRef.current.size === 2 && pinchRef.current) {
      const [a, b] = Array.from(pointerRef.current.values());
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      const nextZoom = Math.min(1.75, Math.max(.64, pinchRef.current.zoom * (distance / pinchRef.current.distance)));
      setView(current => ({ ...current, zoom: Number(nextZoom.toFixed(2)) }));
      return;
    }
    if (dragRef.current) {
      const factor = .52;
      setView(current => ({ ...current, x: dragRef.current!.originX + (event.clientX - dragRef.current!.x) * factor, y: dragRef.current!.originY + (event.clientY - dragRef.current!.y) * factor }));
    }
  }

  function onPointerEnd(event: PointerEvent<HTMLDivElement>) {
    pointerRef.current.delete(event.pointerId);
    if (pointerRef.current.size < 2) pinchRef.current = null;
    if (pointerRef.current.size === 0) dragRef.current = null;
  }

  const mapStyle = { transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.zoom})` };
  const worldNameClass = (world: GalaxyWorld) => world.name.includes("fourtee2") ? "wordmark" : undefined;

  return (
    <section id="galaxy" className={`galaxy-explorer${isSearchOpen ? " is-searching" : ""}${highContrast ? " is-high-contrast" : ""}${departingWorld ? " is-departing" : ""}${showConstellations ? " show-constellations" : ""}`} aria-label="fourtee2 galaxy map">
      <div className="galaxy-explorer__topline"><span>GALAXY // 001</span><span>ONE CORE / {galaxyWorlds.length} WORLDS / {galaxyRelationships.length} LINKS</span></div>
      <div className="galaxy-map" onWheel={onWheel} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd}>
        <div className="galaxy-map__noise" aria-hidden="true" />
        <div className="galaxy-map__field" style={mapStyle}>
          {starField.map((star, index) => <i key={index} className="galaxy-star" style={{ left: star.left, top: star.top, opacity: star.opacity, width: star.size, height: star.size, animationDelay: star.delay }} aria-hidden="true" />)}
          <svg className="galaxy-map__links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {galaxyRelationships.map(link => {
              const source = findWorld(link.source);
              const target = findWorld(link.target);
              if (!source || !target) return null;
              const isActive = selected?.id === link.source || selected?.id === link.target;
              return <line key={`${link.source}-${link.target}`} className={isActive ? "is-active" : ""} x1={source.x} y1={source.y} x2={target.x} y2={target.y} />;
            })}
          </svg>
          <button type="button" className={`galaxy-core${!selected ? " is-selected" : ""}`} onClick={recenter} aria-label="Return to fourtee2 core"><span>✦</span><b className="wordmark">fourtee2</b><small>CORE / ORIGIN</small></button>
          {galaxyWorlds.map(world => <Planet key={world.id} world={world} selected={selected?.id === world.id} dimmed={Boolean(query && !matchIds.has(world.id))} onSelect={selectWorld} />)}
          {showConstellations && <div className="galaxy-constellations" aria-hidden="true"><span className="galaxy-constellation galaxy-constellation--tech">TECHNOLOGY</span><span className="galaxy-constellation galaxy-constellation--creative">CREATIVE</span><span className="galaxy-constellation galaxy-constellation--research">RESEARCH</span></div>}
        </div>
      </div>

      <div className="galaxy-controls" aria-label="Galaxy controls">
        <button type="button" onClick={() => adjustZoom(.12)} aria-label="Zoom in">+</button>
        <button type="button" onClick={() => adjustZoom(-.12)} aria-label="Zoom out">−</button>
        <button type="button" onClick={recenter}>⌾ RECENTRE</button>
        <button type="button" onClick={() => setShowConstellations(value => !value)} aria-pressed={showConstellations}>CONSTELLATIONS</button>
        <button type="button" onClick={() => setHighContrast(value => !value)} aria-pressed={highContrast}>CONTRAST</button>
      </div>

      <div className="galaxy-explorer__instruction"><span>DRAG · PINCH · SCROLL · SELECT</span><span>ZOOM {Math.round(view.zoom * 100)}%</span></div>
      <aside className="galaxy-missions" aria-label="Current missions"><p>CURRENTLY IN ORBIT</p>{currentMissions.map(mission => { const world = findWorld(mission.worldId); return world ? <button key={mission.worldId} type="button" onClick={() => selectWorld(world)}><i /><span><b className={worldNameClass(world)}>{world.name}</b><small>{mission.detail}</small></span><em>{mission.status}</em></button> : null; })}</aside>

      {selected && <aside className="world-inspector" aria-live="polite"><button className="world-inspector__close" type="button" onClick={() => setSelectedId(null)} aria-label="Close world preview">×</button><p>{selected.type.toUpperCase()} / {selected.status}</p><h2 className={selected.name.includes("fourtee2") ? "wordmark" : ""}>{selected.name}</h2><span className="world-inspector__category" style={{ "--accent": selected.color } as CSSProperties}>{selected.category}</span><p className="world-inspector__description">{selected.description}</p><dl><div><dt>SYSTEMS</dt><dd>{selected.children.length}</dd></div><div><dt>FIELD</dt><dd>{selected.status}</dd></div></dl><button type="button" className="world-inspector__enter" onClick={() => enterWorld(selected)} disabled={Boolean(departingWorld)}>{departingWorld ? "APPROACHING WORLD" : "EXPLORE WORLD"} <b>→</b></button></aside>}

      {isSearchOpen && <section className="galaxy-overlay" role="dialog" aria-modal="true" aria-label="Search the universe"><button className="galaxy-overlay__close" type="button" onClick={() => setIsSearchOpen(false)}>CLOSE ×</button><p>SEARCH THE UNIVERSE</p><input ref={searchRef} value={query} onChange={event => setQuery(event.target.value)} placeholder="world, product, project, idea..." aria-label="Search worlds" /> <small>{matches.length} SIGNALS MATCHING</small><div>{matches.map(world => <button key={world.id} type="button" onClick={() => { selectWorld(world); setIsSearchOpen(false); }}><i style={{ background: world.color }} /><span className={worldNameClass(world)}>{world.name}</span><em>{world.type} / {world.category}</em></button>)}</div></section>}

      {isListOpen && <section className="galaxy-overlay galaxy-overlay--list" role="dialog" aria-modal="true" aria-label="All worlds"><button className="galaxy-overlay__close" type="button" onClick={() => setIsListOpen(false)}>CLOSE ×</button><p>ALL WORLDS / ACCESSIBLE LIST</p><div>{galaxyWorlds.map((world, index) => <a key={world.id} href={world.url} onFocus={() => selectWorld(world)}><b>{String(index + 1).padStart(2, "0")}</b><span className={worldNameClass(world)}>{world.name}</span><em>{world.type} / {world.status}</em></a>)}</div></section>}

      {isAboutOpen && <section className="galaxy-overlay galaxy-overlay--about" role="dialog" aria-modal="true" aria-label="About fourtee2"><button className="galaxy-overlay__close" type="button" onClick={() => setIsAboutOpen(false)}>CLOSE ×</button><p>ABOUT / TRANSMISSION</p><h2>ONE CORE.<br />MANY WORLDS.</h2><blockquote>fourtee2 is a growing ecosystem of businesses, products, technologies, experiments and ideas.</blockquote><div><span><b>CREATE</b>We build new things.</span><span><b>CONNECT</b>Our worlds influence one another.</span><span><b>EXPLORE</b>We follow ideas wherever they lead.</span></div></section>}

      {tourStep !== null && (
        <div className="tour-overlay">
          <div className="tour-card">
            <span className="tour-card__step">SIGNAL {tourStep + 1} / {tourSteps.length}</span>
            <h2 className="wordmark">{tourSteps[tourStep].title}</h2>
            <p>{tourSteps[tourStep].content}</p>
            <div className="tour-card__actions">
              <button className="tour-card__skip" onClick={completeTour}>SKIP TOUR</button>
              <button 
                className="tour-card__btn tour-card__btn--primary" 
                onClick={() => tourStep < tourSteps.length - 1 ? setTourStep(tourStep + 1) : completeTour()}
              >
                {tourSteps[tourStep].action} →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
