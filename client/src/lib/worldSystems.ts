export type WorldSystem = {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  detail: string;
};

export const worldSystems: Record<string, WorldSystem[]> = {
  travel: [
    { id: "route-engine", title: "Route Engine", description: "Real-time pathfinding across terrestrial and orbital nodes.", actionLabel: "SIMULATE", detail: "Resolving optimal vectors for 1,400+ destinations." },
    { id: "signal-board", title: "Signal Board", description: "Authenticated personal repository for saved discovery data.", actionLabel: "ACCESS", detail: "Your board is active and synced to current origin." }
  ],
  music: [
    { id: "frequency-mod", title: "Frequency Mod", description: "Adjust the spectral density of the current transmission.", actionLabel: "MODULATE", detail: "Current density: 0.84 spectral units." },
    { id: "queue-manager", title: "Queue Manager", description: "Manage the sequence of incoming audio signals.", actionLabel: "REORDER", detail: "22 tracks in manifest. Sequence optimized." }
  ],
  you: [
    { id: "ritual-timer", title: "Ritual Timer", description: "Timed intervals for restoration and performance protocols.", actionLabel: "START", detail: "20-minute protocol suggested for current energy level." },
    { id: "care-index", title: "Care Index", description: "A library of care signals for biological maintenance.", actionLabel: "BROWSE", detail: "14 active protocols for restoration." }
  ],
  cinevo: [
    { id: "server-status", title: "Server Status", description: "Real-time health of your personal media library.", actionLabel: "PING", detail: "Server online. Latency: 12ms. 4.2TB available." },
    { id: "sharing-key", title: "Sharing Key", description: "Generate temporary access keys for guest observers.", actionLabel: "GENERATE", detail: "New key valid for 24 hours." }
  ],
  cdxi: [
    { id: "venture-pipeline", title: "Venture Pipeline", description: "Active stages of current ideas and systems in motion.", actionLabel: "INSPECT", detail: "3 systems in building phase. 2 in exploration." },
    { id: "brand-governance", title: "Brand Governance", description: "Strict visual and narrative rules for cdxi ventures.", actionLabel: "READ", detail: "Governance version 4.2. Righteous font locked." }
  ],
  fleshsesh: [
    { id: "session-ledger", title: "Session Ledger", description: "History of presence and performance in the academy.", actionLabel: "VIEW", detail: "12 sessions completed. Performance rating: HIGH." },
    { id: "academy-access", title: "Academy Access", description: "Membership protocols for the fleshsesh culture world.", actionLabel: "VERIFY", detail: "Identity verified. All fields accessible." }
  ],
  fourtee2digital: [
    { id: "product-manifest", title: "Product Manifest", description: "Detailed specifications for digital systems and apps.", actionLabel: "DOWNLOAD", detail: "Manifest 2026.4 available in PDF/JSON." },
    { id: "ai-orchestrator", title: "AI Orchestrator", description: "Central management for distributed intelligent systems.", actionLabel: "MONITOR", detail: "4 nodes active. Average response: 420ms." }
  ],
  fourtee2labs: [
    { id: "prototype-bay", title: "Prototype Bay", description: "Live status of experimental interfaces and hardware.", actionLabel: "ENTER", detail: "3 active prototypes undergoing stress testing." },
    { id: "research-feed", title: "Research Feed", description: "Raw signal data from edge-case experiments.", actionLabel: "STREAM", detail: "Receiving 42 packets per second from unknown-object." }
  ],
  "origin-atlas": [
    { id: "map-layer", title: "Map Layer", description: "Toggle between historical and future system routes.", actionLabel: "TOGGLE", detail: "Currently viewing: ORIGIN MAP (Historical)." },
    { id: "pattern-match", title: "Pattern Match", description: "Identify recurring structures across the universe.", actionLabel: "SCAN", detail: "3 structural matches found in cdxi and travel." }
  ],
  "pastificio-amadeo": [
    { id: "menu-archive", title: "Menu Archive", description: "Historical records of seasonal pasta and place rituals.", actionLabel: "RECALL", detail: "Autumn 2025 archive loaded. 12 recipes found." },
    { id: "table-ritual", title: "Table Ritual", description: "Booking protocols for private hospitality experiences.", actionLabel: "RESERVE", detail: "Next available ritual: Friday 19:00." }
  ],
  "primo-pools": [
    { id: "water-signal", title: "Water Signal", description: "Real-time monitoring of water quality and clarity.", actionLabel: "REFRESH", detail: "Clarity: 99.2%. Temp: 24°C. Signal stable." },
    { id: "form-selector", title: "Form Selector", description: "Configure the geometry of a proposed pool system.", actionLabel: "DESIGN", detail: "Selecting: RECTILINEAR HORIZON (Standard)." }
  ],
  "sinorgy-models": [
    { id: "talent-index", title: "Talent Index", description: "Active profiles of collaborators and practitioners.", actionLabel: "SEARCH", detail: "24 active profiles found in visual culture." },
    { id: "collab-portal", title: "Collab Portal", description: "Secure channel for project-specific communication.", actionLabel: "OPEN", detail: "3 active project threads." }
  ],
  "cosmic-blueprint": [
    { id: "symbol-scan", title: "Symbol Scan", description: "Analyze the current signal for future mythology patterns.", actionLabel: "DECODE", detail: "Pattern identified: THE RETURNING CIRCLE." },
    { id: "mythos-log", title: "Mythos Log", description: "Archival records of experimental signal meanings.", actionLabel: "READ", detail: "Log 001: The first signal from unknown-object." }
  ],
  "unknown-object": [
    { id: "signal-trace", title: "Signal Trace", description: "Attempt to map the origin of the unidentified anomaly.", actionLabel: "TRACE", detail: "Origin: UNCHARTED. Distance: 4.2 light-years." },
    { id: "probe-status", title: "Probe Status", description: "Integrity of the exploratory probe sent to the object.", actionLabel: "PING", detail: "Probe active. Hull integrity: 98%." }
  ]
};
