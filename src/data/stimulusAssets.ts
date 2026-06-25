export type StimulusAsset = {
  alt: string;
  label: string;
  src: string;
};

export const stimulusAssets = {
  ancientDna: {
    alt: "Ancient DNA strand and small bone sample",
    label: "Ancient DNA",
    src: "/assets/stimulus/ancient-dna.png",
  },
  stoneTools: {
    alt: "Stone tool cluster with flakes, core and handaxe",
    label: "Stone tools",
    src: "/assets/stimulus/stone-tools.png",
  },
  fossilFragments: {
    alt: "Fossil jaw, tooth and skull fragments",
    label: "Fossils",
    src: "/assets/stimulus/fossil-fragments.png",
  },
  footprintTrackway: {
    alt: "Fossil footprint trackway in dark sediment",
    label: "Footprints",
    src: "/assets/stimulus/footprint-trackway.png",
  },
  hearthFire: {
    alt: "Small ancient hearth with charcoal and embers",
    label: "Hearth",
    src: "/assets/stimulus/hearth-fire.png",
  },
  ochreBeads: {
    alt: "Ochre pieces, shell beads and pigment-stained stone",
    label: "Ochre and beads",
    src: "/assets/stimulus/ochre-beads.png",
  },
  woodenSpear: {
    alt: "Shaped wooden spear point close-up",
    label: "Worked wood",
    src: "/assets/stimulus/wooden-spear.png",
  },
  cavePassage: {
    alt: "Dark limestone cave passage with warm light",
    label: "Cave context",
    src: "/assets/stimulus/cave-passage.png",
  },
  branchingTimeline: {
    alt: "Branching timeline motif with fossil and map textures",
    label: "Branching story",
    src: "/assets/stimulus/branching-timeline.png",
  },
} satisfies Record<string, StimulusAsset>;

export const coreEvidenceStimuli = [
  stimulusAssets.fossilFragments,
  stimulusAssets.stoneTools,
  stimulusAssets.ancientDna,
  stimulusAssets.cavePassage,
];

export const homeStimuli = [
  stimulusAssets.footprintTrackway,
  stimulusAssets.fossilFragments,
  stimulusAssets.stoneTools,
  stimulusAssets.ancientDna,
  stimulusAssets.branchingTimeline,
];

const speciesStimulusMap: Record<string, StimulusAsset[]> = {
  "australopithecus-afarensis": [
    stimulusAssets.footprintTrackway,
    stimulusAssets.fossilFragments,
    stimulusAssets.branchingTimeline,
  ],
  "homo-habilis": [
    stimulusAssets.stoneTools,
    stimulusAssets.fossilFragments,
    stimulusAssets.branchingTimeline,
  ],
  "homo-erectus": [
    stimulusAssets.stoneTools,
    stimulusAssets.hearthFire,
    stimulusAssets.branchingTimeline,
  ],
  "homo-heidelbergensis": [
    stimulusAssets.woodenSpear,
    stimulusAssets.fossilFragments,
    stimulusAssets.stoneTools,
  ],
  neanderthals: [
    stimulusAssets.hearthFire,
    stimulusAssets.stoneTools,
    stimulusAssets.ochreBeads,
    stimulusAssets.ancientDna,
  ],
  denisovans: [
    stimulusAssets.ancientDna,
    stimulusAssets.cavePassage,
    stimulusAssets.fossilFragments,
  ],
  "homo-floresiensis": [
    stimulusAssets.stoneTools,
    stimulusAssets.fossilFragments,
    stimulusAssets.branchingTimeline,
  ],
  "homo-sapiens": [
    stimulusAssets.ochreBeads,
    stimulusAssets.ancientDna,
    stimulusAssets.hearthFire,
  ],
  "homo-naledi": [
    stimulusAssets.cavePassage,
    stimulusAssets.fossilFragments,
    stimulusAssets.branchingTimeline,
  ],
};

export function getStimuliForSpecies(slug: string) {
  return speciesStimulusMap[slug] ?? coreEvidenceStimuli;
}
