import type { MockReportData } from "@/types/report";

export const mockReport: MockReportData = {
  student: {
    name: "Amina Patel",
    className: "Year 11 Biology",
    date: "23 June 2026",
    chosenGroupSlug: "neanderthals",
    comparisonGroupSlug: "homo-floresiensis",
  },
  articleTitle: "Why Human Evolution Is Not a Ladder",
  oneSentenceJudgement:
    "Human evolution is best understood as a branching tree because several human groups overlapped, adapted in different ways and left different kinds of evidence.",
  importanceAnswer:
    "Neanderthals matter because they show that Homo sapiens were not the only skilled and intelligent humans. Fossils, tools and DNA suggest a close relative with complex behaviour, not a failed step before us.",
  evidence: {
    fossils:
      "Many Neanderthal fossils have been found across Europe and western Asia, including skulls, jaws and skeletons that show stocky bodies, large brains and cold-adapted features.",
    tools:
      "Stone tools and prepared-core techniques suggest careful planning. Evidence from some sites also points to skilled hunting, fire use and varied raw materials.",
    dna:
      "Ancient DNA shows that Neanderthals interbred with Homo sapiens, and many people alive today still carry a small amount of Neanderthal ancestry.",
    archaeology:
      "Cave sites, hearths, animal bones and possible symbolic objects help scientists build a richer picture of Neanderthal life.",
    strongest:
      "DNA is especially powerful because it directly shows overlap and interbreeding, which strongly challenges a simple ladder model.",
    limitations:
      "The evidence is uneven because some sites preserve fossils and DNA better than others. Scientists still debate why Neanderthals disappeared.",
  },
  life: {
    keyFeature: "A stocky body shape with strong limbs and a broad chest.",
    featureUsefulness:
      "This may have helped conserve heat in Ice Age environments and supported close-range hunting in difficult landscapes.",
    likelyEnvironment:
      "Evidence suggests Neanderthals lived across varied Ice Age habitats, including open steppe, woodland edges and cave landscapes.",
    survivalPressure:
      "Changing climates, competition, small population sizes and contact with Homo sapiens may all have affected survival.",
  },
  comparison: {
    similarities:
      "Neanderthals and Homo sapiens both made tools, used fire and likely had complex social lives. Homo floresiensis also used tools, showing that small body size did not prevent technology.",
    differences:
      "Neanderthals were strongly built and cold-adapted, Homo sapiens spread globally, and Homo floresiensis followed a very different island pathway with a small body and brain.",
    mostSimilar:
      "Neanderthals and Homo sapiens seem most similar because they were close relatives, overlapped in time and interbred.",
    mostDifferent:
      "Homo floresiensis appears most different because island evolution produced a very small body plan rather than a larger, more modern-looking form.",
  },
  timeline: {
    overlapAnswer:
      "Neanderthals, Denisovans, Homo floresiensis and Homo naledi overlapped with Homo sapiens or lived close to the time our species existed.",
    ladderChallenge:
      "If several human groups existed at the same time, they cannot be arranged as simple steps leading to us.",
    branchingTree:
      "A branching tree is better because different groups adapted to different places, some interbred, and some are known mainly from DNA or unusual fossil evidence.",
    geographyAnswer:
      "Geography also challenges the ladder model. Different human relatives lived across Africa, Europe and Asia, sometimes in separated regions at similar times, so the story is about many populations in different places rather than one line in one place.",
  },
  finalAnswer:
    "Human evolution is best understood as a branching tree, not a straight ladder. A ladder suggests that one species simply changed into the next, ending with Homo sapiens. The evidence does not support that idea. Australopithecus afarensis shows that walking upright evolved before large brains, so early human evolution was not just a march toward modern intelligence. Neanderthals show an even clearer challenge to the ladder model because they overlapped with Homo sapiens and interbred with them. They were skilled hunters and toolmakers, not a failed version of modern humans. Homo floresiensis also challenges simple assumptions because it had a very small body and brain but still used stone tools on an island. These examples show that different human relatives followed different evolutionary pathways. Some branches overlapped, some ended, and one branch survives today. Based on current evidence, Homo sapiens are the only surviving human species, not the goal that evolution was always trying to reach.",
  reflection: {
    checklist: [
      "Described at least three ancient human relatives.",
      "Used dates and approximate time periods.",
      "Included fossil, tool, DNA or archaeological evidence.",
      "Explained why human evolution is not a straight line.",
      "Included uncertainty or scientific debate.",
    ],
    mostInteresting:
      "The most surprising point was that DNA can show contact between groups even when the fossil record is incomplete.",
    stillDebated:
      "Scientists still debate exactly why Neanderthals disappeared and how different causes may have combined.",
    improvementTarget:
      "I would add more precise examples from individual fossil sites and compare more than one type of evidence.",
  },
};
