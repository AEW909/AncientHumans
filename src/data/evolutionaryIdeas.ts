import { stimulusAssets, type StimulusAsset } from "./stimulusAssets";

export type EvolutionaryIdea = {
  id: "language-learning" | "fire-cooking";
  title: string;
  shortTitle: string;
  summary: string;
  evidenceAngle: string;
  caveat: string;
  prompt: string;
  asset: StimulusAsset;
};

export const evolutionaryIdeas: EvolutionaryIdea[] = [
  {
    id: "language-learning",
    title: "Language, learning and tradition",
    shortTitle: "Language and learning",
    summary:
      "Communication matters because useful behaviour can spread through a group. Teaching, imitation and shared memory allow skills to build across generations.",
    evidenceAngle:
      "Look for behaviours that would benefit from shared attention: tool-making routines, coordinated hunting, care for others, symbolic objects and long-distance exchange.",
    caveat:
      "Spoken language does not fossilise, so pupils should write about communication, teaching and social learning rather than claiming exact speech.",
    prompt:
      "How might communication or teaching have helped your focus group survive, make tools or pass on useful behaviour?",
    asset: stimulusAssets.ochreBeads,
  },
  {
    id: "fire-cooking",
    title: "Fire, cooking and energy",
    shortTitle: "Fire and cooking",
    summary:
      "Fire can change survival by providing warmth, protection, light and new ways to process food. Some scientists argue cooking helped humans get more energy from food.",
    evidenceAngle:
      "Look for hearths, charcoal, burnt bones, changed diets and social activity around fires. Cooking is especially useful when discussing energy, digestion and brain evolution.",
    caveat:
      "Fire evidence varies by site and species. Use careful wording such as 'some sites suggest' or 'some scientists argue' rather than treating fire as universal.",
    prompt:
      "Could fire, cooking or shared hearths connect to survival, social life or larger energy-hungry brains in your explanation?",
    asset: stimulusAssets.hearthFire,
  },
];

const speciesIdeaMap: Record<string, EvolutionaryIdea["id"][]> = {
  "australopithecus-afarensis": ["language-learning"],
  "homo-habilis": ["language-learning"],
  "homo-erectus": ["fire-cooking", "language-learning"],
  "homo-heidelbergensis": ["language-learning", "fire-cooking"],
  neanderthals: ["language-learning", "fire-cooking"],
  denisovans: ["language-learning"],
  "homo-floresiensis": ["language-learning"],
  "homo-sapiens": ["language-learning", "fire-cooking"],
  "homo-naledi": ["language-learning"],
};

export function getEvolutionaryIdeasForSpecies(slug: string) {
  const ids = speciesIdeaMap[slug] ?? evolutionaryIdeas.map((idea) => idea.id);

  return evolutionaryIdeas.filter((idea) => ids.includes(idea.id));
}
