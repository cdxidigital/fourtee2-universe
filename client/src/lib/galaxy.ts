export type CelestialType = "planet" | "moon" | "satellite" | "asteroid";
export type WorldStatus = "ACTIVE" | "BUILDING" | "EXPLORING" | "TESTING" | "LAUNCHING" | "ARCHIVED";

export type GalaxyWorld = {
  id: string;
  name: string;
  type: CelestialType;
  status: WorldStatus;
  category: "travel" | "media" | "personal" | "creative" | "technology" | "research" | "experimental";
  description: string;
  url: string;
  x: number;
  y: number;
  scale: number;
  color: string;
  children: string[];
  keywords: string[];
};

export type GalaxyRelationship = {
  source: string;
  target: string;
  relationshipType: "BUILT BY" | "CONNECTED TO" | "PART OF" | "POWERED BY" | "EXPERIMENTING WITH";
};

export const galaxyWorlds: GalaxyWorld[] = [
  { id: "travel", name: "fourtee2travel", type: "planet", status: "ACTIVE", category: "travel", description: "A one-stop travel intelligence world for routes, stays and every travel priority.", url: "/travel", x: 71, y: 30, scale: 1.26, color: "#e3af5d", children: ["route intelligence", "field notes", "signal board"], keywords: ["travel", "routes", "flights", "stays", "value", "luxury"] },
  { id: "music", name: "4[music]2", type: "planet", status: "ACTIVE", category: "media", description: "Selected transmissions, ambient listening modes and a living frequency field.", url: "/music", x: 28, y: 28, scale: 1.16, color: "#8c7cff", children: ["selected playlist", "frequency field", "signal queue"], keywords: ["music", "sound", "playlist", "media", "frequency"] },
  { id: "you", name: "4[you]2", type: "planet", status: "BUILDING", category: "personal", description: "A personal world for ritual, care, energy and everyday performance.", url: "/you", x: 75, y: 68, scale: 1.08, color: "#bd77ed", children: ["ritual field", "care protocols", "performance signals"], keywords: ["you", "ritual", "care", "personal", "energy"] },
  { id: "cinevo", name: "cinevo", type: "planet", status: "BUILDING", category: "technology", description: "Your personal media universe: a private library, shared on your terms.", url: "/worlds/cinevo", x: 31, y: 72, scale: 1.2, color: "#54c9ec", children: ["server", "library", "profiles"], keywords: ["media", "server", "technology", "library"] },
  { id: "cdxi", name: "cdxi", type: "planet", status: "ACTIVE", category: "creative", description: "A creative and venture operating world for identity, systems and ideas in motion.", url: "/worlds/cdxi", x: 58, y: 18, scale: 1.02, color: "#a77bf4", children: ["ventures", "identity systems", "operating platform"], keywords: ["creative", "venture", "brand", "design"] },
  { id: "fleshsesh", name: "fleshsesh", type: "planet", status: "ACTIVE", category: "creative", description: "A cinematic learning and culture world built around embodiment, performance and connection.", url: "/worlds/fleshsesh", x: 16, y: 54, scale: .92, color: "#e47ebc", children: ["academy", "sessions", "culture"], keywords: ["creative", "education", "culture", "performance"] },
  { id: "fourtee2digital", name: "fourtee2digital", type: "planet", status: "ACTIVE", category: "technology", description: "Digital products, intelligent systems and brand experiences built for the next field.", url: "/worlds/fourtee2digital", x: 86, y: 48, scale: .94, color: "#5ac4e8", children: ["products", "AI systems", "digital experiences"], keywords: ["technology", "digital", "AI", "products"] },
  { id: "fourtee2labs", name: "fourtee2 labs", type: "planet", status: "EXPLORING", category: "research", description: "Research, prototypes and experiments at the edge of the fourtee2 field.", url: "/worlds/fourtee2labs", x: 48, y: 82, scale: 1.02, color: "#eab75e", children: ["prototypes", "research", "experiments"], keywords: ["research", "labs", "AI", "experiments"] },
  { id: "origin-atlas", name: "origin atlas", type: "planet", status: "EXPLORING", category: "research", description: "A growing atlas of origin, pattern, systems and the routes between them.", url: "/worlds/origin-atlas", x: 52, y: 35, scale: .78, color: "#dfb15c", children: ["atlas", "research index", "field mapping"], keywords: ["research", "atlas", "mapping", "origins"] },
  { id: "pastificio-amadeo", name: "pastificio amadeo", type: "moon", status: "ACTIVE", category: "creative", description: "A hospitality and food world where craft, place and ritual converge.", url: "/worlds/pastificio-amadeo", x: 83, y: 23, scale: .62, color: "#de9871", children: ["hospitality", "pasta", "place"], keywords: ["food", "hospitality", "creative", "place"] },
  { id: "primo-pools", name: "primo pools", type: "moon", status: "ACTIVE", category: "creative", description: "A built-environment world for water, form and outdoor living.", url: "/worlds/primo-pools", x: 11, y: 24, scale: .6, color: "#60c5dd", children: ["design", "build", "outdoor living"], keywords: ["pools", "design", "built environment"] },
  { id: "sinorgy-models", name: "sinorgy models", type: "satellite", status: "BUILDING", category: "creative", description: "A satellite for talent, visual culture and evolving creative practice.", url: "/worlds/sinorgy-models", x: 15, y: 77, scale: .52, color: "#dd7fc6", children: ["talent", "visual culture", "collaboration"], keywords: ["models", "talent", "creative", "culture"] },
  { id: "cosmic-blueprint", name: "cosmic blueprint", type: "asteroid", status: "TESTING", category: "experimental", description: "An experimental signal for esoteric systems, pattern work and future mythology.", url: "/worlds/cosmic-blueprint", x: 92, y: 78, scale: .48, color: "#ec67c0", children: ["signals", "pattern systems", "experiments"], keywords: ["cosmic", "blueprint", "experimental", "systems"] },
  { id: "unknown-object", name: "unidentified object", type: "asteroid", status: "EXPLORING", category: "experimental", description: "Signal detected. Classification pending. A future world is moving into orbit.", url: "/worlds/unknown-object", x: 40, y: 58, scale: .47, color: "#e362b5", children: ["prototype", "signal pending", "future launch"], keywords: ["unknown", "experimental", "prototype", "future"] },
];

export const galaxyRelationships: GalaxyRelationship[] = [
  { source: "travel", target: "fourtee2digital", relationshipType: "POWERED BY" },
  { source: "music", target: "fleshsesh", relationshipType: "CONNECTED TO" },
  { source: "you", target: "fleshsesh", relationshipType: "CONNECTED TO" },
  { source: "cinevo", target: "fourtee2digital", relationshipType: "BUILT BY" },
  { source: "cdxi", target: "fourtee2labs", relationshipType: "EXPERIMENTING WITH" },
  { source: "origin-atlas", target: "fourtee2labs", relationshipType: "PART OF" },
  { source: "cosmic-blueprint", target: "origin-atlas", relationshipType: "EXPERIMENTING WITH" },
  { source: "sinorgy-models", target: "fleshsesh", relationshipType: "CONNECTED TO" },
];

export const currentMissions = [
  { worldId: "cinevo", status: "BUILDING", detail: "Private media platform development" },
  { worldId: "fourtee2labs", status: "EXPLORING", detail: "AI systems and future interfaces" },
  { worldId: "travel", status: "ACTIVE", detail: "Travel intelligence and route discovery" },
  { worldId: "music", status: "ACTIVE", detail: "Selected transmission field" },
] as const;

export function findWorld(id: string) {
  return galaxyWorlds.find(world => world.id === id);
}

export function searchWorlds(query: string) {
  const term = query.trim().toLowerCase();
  if (!term) return galaxyWorlds;
  return galaxyWorlds.filter(world => [world.name, world.description, world.category, world.status, ...world.keywords].join(" ").toLowerCase().includes(term));
}
