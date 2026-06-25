import { stimulusAssets, type StimulusAsset } from "./stimulusAssets";

export type EvolutionaryIdea = {
  id: "fire" | "language";
  title: string;
  shortTitle: string;
  body: string;
  evidence: string;
  prompt: string;
  asset: StimulusAsset;
};

export const bigIdeasPageContent = {
  pageIntro:
    "Some of the biggest changes in the human story don't belong to any single species. Fire and language both appear, spread and matter across several branches at once. Pause on them here — not as the things that made one kind of human 'better', but as turning points that changed what was possible, and as two very different puzzles for working out how we know.",
  closing:
    "Put the two side by side. Fire is something you can dig up; language is something you mostly have to reason your way towards. That gap in how confident we can be is the real lesson — two big ideas, two very different kinds of evidence.",
} as const;

export const evolutionaryIdeas: EvolutionaryIdea[] = [
  {
    id: "fire",
    title: "Fire",
    shortTitle: "Fire",
    body:
      "Controlled fire appears tentatively with Homo erectus and more clearly later, with groups such as the Neanderthals. It may have meant cooking (more energy from the same food), warmth, protection from predators, light that stretched the day, and a place for a group to gather.",
    evidence:
      "Fire leaves real traces. Hearths, burnt bone, heated sediment and fire-cracked stone all survive, and scientists can often tell a managed campfire from an accidental wildfire.",
    prompt:
      "Fire turns up with more than one human group, not just the 'latest' one. What does that suggest about treating evolution as a single ladder? And what is the difference between a group that used wildfire when they found it and one that could make fire whenever they wanted?",
    asset: stimulusAssets.hearthFire,
  },
  {
    id: "language",
    title: "Language",
    shortTitle: "Language",
    body:
      "Language is much harder to pin down. It does not fossilise, so there is almost no direct evidence for when or how it began. Scientists look for indirect clues instead: the shape of the throat and a small bone called the hyoid, faint marks the brain leaves inside the skull, genetics, and behaviour like complex tool-making or symbolic objects that may need teaching to pass on.",
    evidence:
      "Where fire leaves ash you can dig up, language leaves almost nothing. Nearly everything we say about it is inference.",
    prompt:
      "If language leaves no fossils, how can scientists argue it existed at all? Which clues feel convincing to you, and which feel like a stretch? Why might we be far less certain about language than about fire?",
    asset: stimulusAssets.ochreBeads,
  },
];

export function getEvolutionaryIdeasForSpecies(_slug: string) {
  return evolutionaryIdeas;
}
