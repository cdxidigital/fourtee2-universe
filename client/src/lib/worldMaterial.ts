import { galaxyWorlds } from "./galaxy";

export type WorldMaterial = {
  fieldNote: string;
  observation: string;
  visualDirection: string;
  imageUrl: string;
  ambience: "orbital" | "frequency" | "ritual" | "archive";
};

export const ambienceUrls = {
  orbital: "/manus-storage/fourtee2-orbital-ambience_04c648e8.mp3",
  frequency: "/manus-storage/fourtee2-frequency-ambience_36a74de2.mp3",
  ritual: "/manus-storage/fourtee2-ritual-ambience_9e4385d0.mp3",
  archive: "/manus-storage/fourtee2-orbital-ambience_04c648e8.mp3", // Archive uses orbital fallback
};

export const worldMaterials: Record<string, WorldMaterial> = {
  travel: {
    fieldNote: "Route intelligence begins with a human preference, then resolves the world around it.",
    observation: "01 // Routes reframed through price, place and pace.",
    visualDirection: "night flight paths crossing a luminous earth horizon",
    imageUrl: "/manus-storage/fourtee2-world-travel_3f870899.jpg",
    ambience: "orbital",
  },
  music: {
    fieldNote: "A living listening field for transmissions that keep the night in motion.",
    observation: "02 // Frequency held beyond the visible spectrum.",
    visualDirection: "cobalt signal waves over a deep violet analogue studio",
    imageUrl: "/manus-storage/fourtee2-world-music_f77e7de8.jpg",
    ambience: "frequency",
  },
  you: {
    fieldNote: "A quieter system for restoring attention, energy and the rituals that hold a day together.",
    observation: "03 // The body is a planet with its own weather.",
    visualDirection: "violet light passing across an abstract resting form",
    imageUrl: "/manus-storage/fourtee2-world-you_5732f4d1.jpg",
    ambience: "ritual",
  },
  cinevo: {
    fieldNote: "Private media, remembered properly: a personal archive that stays close to its owner.",
    observation: "04 // Memory becomes a system when it can be returned to.",
    visualDirection: "blue projection glow across shelves in a midnight home cinema",
    imageUrl: "/manus-storage/fourtee2-world-cinevo_a03173f3.jpg",
    ambience: "archive",
  },
  cdxi: {
    fieldNote: "Identity, operation and venture thinking arranged as one precise creative practice.",
    observation: "05 // The signal becomes useful when it can be built.",
    visualDirection: "electric violet drafting table with editorial papers and light traces",
    imageUrl: "/manus-storage/fourtee2-world-cdxi_ad7d9748.jpg",
    ambience: "frequency",
  },
  fleshsesh: {
    fieldNote: "An embodied culture world where study, presence and creative confidence meet.",
    observation: "06 // Connection begins before language reaches the surface.",
    visualDirection: "soft crimson stage haze around abstract moving silhouettes",
    imageUrl: "/manus-storage/fourtee2-world-fleshsesh_6478d344.jpg",
    ambience: "ritual",
  },
  fourtee2digital: {
    fieldNote: "Digital products and intelligent systems shaped with the clarity of an enduring identity.",
    observation: "07 // Technology should feel like an extension of intention.",
    visualDirection: "cyan interface reflections across a dark architectural surface",
    imageUrl: "/manus-storage/fourtee2-world-fourtee2digital_e9036778.jpg",
    ambience: "frequency",
  },
  fourtee2labs: {
    fieldNote: "A boundary field for prototypes, research and the futures worth making tangible.",
    observation: "08 // An experiment is a question allowed to acquire form.",
    visualDirection: "amber research light above a constellation of material studies",
    imageUrl: "/manus-storage/fourtee2-world-fourtee2labs_a68788c2.jpg",
    ambience: "orbital",
  },
  "origin-atlas": {
    fieldNote: "A mapping practice for first principles, hidden structures and the routes between them.",
    observation: "09 // Every system leaves a trace of where it started.",
    visualDirection: "golden cartographic contour lines suspended in dark space",
    imageUrl: "/manus-storage/fourtee2-world-origin-atlas_872d7af0.jpg",
    ambience: "archive",
  },
  "pastificio-amadeo": {
    fieldNote: "Craft and hospitality gathered around the long rituals of place, pasta and conversation.",
    observation: "10 // A table can be a complete geography.",
    visualDirection: "warm amber pasta atelier at dusk with flour in the air",
    imageUrl: "/manus-storage/fourtee2-world-pastificio-amadeo_3f58482d.jpg",
    ambience: "ritual",
  },
  "primo-pools": {
    fieldNote: "Water, landscape and built form considered as one clear horizon for living outdoors.",
    observation: "11 // Still water redraws the architecture around it.",
    visualDirection: "moonlit pool surface reflecting modern stone and palm silhouettes",
    imageUrl: "/manus-storage/fourtee2-world-primo-pools_8ded5ff0.jpg",
    ambience: "orbital",
  },
  "sinorgy-models": {
    fieldNote: "Talent and visual culture in orbit around collaboration, intention and evolving image-making.",
    observation: "12 // A presence can carry an entire atmosphere.",
    visualDirection: "fuchsia editorial light tracing an abstract fashion silhouette",
    imageUrl: "/manus-storage/fourtee2-world-sinorgy_5df7c6dd.jpg",
    ambience: "ritual",
  },
  "cosmic-blueprint": {
    fieldNote: "A future mythology laboratory for pattern, symbol and the systems beneath the obvious.",
    observation: "13 // Meaning accelerates when the constellation becomes visible.",
    visualDirection: "magenta astronomical diagrams floating above black vellum",
    imageUrl: "/manus-storage/fourtee2-world-cosmic-blueprint_693443b2.jpg",
    ambience: "archive",
  },
  "unknown-object": {
    fieldNote: "A signal still becoming itself. Its designation will arrive when the conditions are right.",
    observation: "14 // Classification withheld. Curiosity remains active.",
    visualDirection: "a single pink anomaly emerging from an uncharted star field",
    imageUrl: "/manus-storage/fourtee2-world-unknown-object_e43a1d7c.jpg",
    ambience: "orbital",
  },
};

export function getWorldMaterial(worldId: string) {
  return worldMaterials[worldId];
}

export function hasCompleteWorldMaterial() {
  return galaxyWorlds.every(world => Boolean(worldMaterials[world.id]?.fieldNote && worldMaterials[world.id]?.imageUrl));
}
