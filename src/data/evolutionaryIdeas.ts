export type EvolutionaryIdea = {
  id: "fire" | "language" | "culture";
  title: string;
  shortTitle: string;
  strapline: string;
  body: string;
  evidence: string;
  prompt: string;
  poster: {
    src: string;
    alt: string;
  };
  thumbnail: {
    src: string;
    alt: string;
  };
  clues: string[];
};

export const bigIdeasPageContent = {
  pageIntro:
    "Some of the biggest changes in the human story do not belong to one species. Choose one big idea, inspect the poster, then decide how far it helps explain how ancient human relatives lived, learned and changed.",
  closing:
    "Use your chosen idea carefully. Fire leaves physical traces, language is mostly inferred, and material culture has to be interpreted from objects, burials, art and marks.",
} as const;

export const evolutionaryIdeas: EvolutionaryIdea[] = [
  {
    id: "fire",
    title: "Fire",
    shortTitle: "Fire",
    strapline: "Warmth, food, protection, time to think.",
    body:
      "Fire may have changed the energy budget of human life. It could mean warmth, protection, longer days, cooked food and safer social spaces. The big question is whether those benefits created more time and energy for planning, experimenting, engineering and bigger brains.",
    evidence:
      "Hearths, burnt bone, heated sediment, fire-cracked stone and cooked remains can survive, but scientists still have to decide whether a fire was controlled or natural.",
    prompt:
      "Did fire simply help ancient humans survive, or did it give them the spare time, safety and energy that made more complex thinking possible?",
    poster: {
      src: "/assets/big-ideas/fire.png",
      alt: "Fire poster explaining warmth, cooked food, protection, energy and evidence for controlled fire.",
    },
    thumbnail: {
      src: "/assets/big-ideas/fire-language-culture.png",
      alt: "Three-panel big idea poster showing fire, language and culture.",
    },
    clues: ["warmth and protection", "cooked food and nutrition", "longer days", "energy for bigger brains"],
  },
  {
    id: "language",
    title: "Language",
    shortTitle: "Language",
    strapline: "Words, sounds, meaning, connecting minds.",
    body:
      "As language developed, groups could coordinate, communicate, teach, learn, sing, dance, bond and pass on information. It may have helped people build shared stories, beliefs and plans that no individual could hold alone.",
    evidence:
      "Language does not fossilise. Scientists use indirect clues: hyoid bones, brain areas, genetics, tool complexity, symbols, art and behaviours that seem to need teaching.",
    prompt:
      "Was language the most powerful invention in human history, or is that too hard to prove from indirect evidence?",
    poster: {
      src: "/assets/big-ideas/language.png",
      alt: "Language poster explaining communication, cooperation, teaching, bonding and evidence for language.",
    },
    thumbnail: {
      src: "/assets/big-ideas/fire-language-culture.png",
      alt: "Three-panel big idea poster showing fire, language and culture.",
    },
    clues: ["coordination", "teaching and learning", "dance, song and bonding", "belief systems"],
  },
  {
    id: "culture",
    title: "Culture",
    shortTitle: "Culture",
    strapline: "The things we leave behind tell our story.",
    body:
      "Culture here means material culture: objects, marks, rituals and traditions that leave clues. Burials, jewellery, cave painting, tools and shelters can suggest what people valued, how they belonged, and how they made meaning together.",
    evidence:
      "Objects survive, but their meaning is not automatic. A burial, bead or painting has to be interpreted carefully alongside its site, age, pattern and possible alternatives.",
    prompt:
      "What can cultural artefacts tell us about ancient lives, and where might we be guessing more than the evidence allows?",
    poster: {
      src: "/assets/big-ideas/culture.png",
      alt: "Culture poster explaining burials, jewellery, cave painting, tools, symbols and shared traditions.",
    },
    thumbnail: {
      src: "/assets/big-ideas/fire-language-culture.png",
      alt: "Three-panel big idea poster showing fire, language and culture.",
    },
    clues: ["burials", "jewellery", "cave painting", "symbols and shared traditions"],
  },
];

export function getEvolutionaryIdeasForSpecies(_slug: string) {
  return evolutionaryIdeas;
}
