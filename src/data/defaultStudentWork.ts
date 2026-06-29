import type { MisconceptionResponse, StudentWork } from "@/types/studentWork";

export const STUDENT_WORK_SCHEMA_VERSION = 1;

export const misconceptionPrompts = [
  {
    id: "humans-from-monkeys",
    statement: "Humans and living monkeys are connected through common ancestry.",
  },
  {
    id: "evolution-better",
    statement: "Evolution can produce traits that fit a particular environment.",
  },
  {
    id: "straight-line",
    statement: "The human family tree can be shown as one simple line.",
  },
  {
    id: "neanderthals-unintelligent",
    statement: "Neanderthals had behaviours that can be investigated using evidence.",
  },
  {
    id: "bigger-brains",
    statement: "Brain size is one useful clue when comparing ancient human relatives.",
  },
  {
    id: "sapiens-overlap",
    statement: "Homo sapiens overlapped in time with other human species.",
  },
] as const;

export const selfAssessmentItems = [
  {
    id: "three-relatives",
    label: "Described at least three ancient human relatives.",
  },
  {
    id: "dates",
    label: "Used dates and approximate time periods.",
  },
  {
    id: "evidence",
    label: "Included fossil, tool, DNA or archaeological evidence.",
  },
  {
    id: "not-straight-line",
    label: "Explained why human evolution is not a straight line.",
  },
  {
    id: "uncertainty",
    label: "Included uncertainty or scientific debate.",
  },
  {
    id: "big-idea",
    label: "Used one big idea such as fire, language or culture where it fitted the evidence.",
  },
  {
    id: "vocabulary",
    label: "Used scientific vocabulary correctly.",
  },
  {
    id: "judgement",
    label: "Written a clear final judgement.",
  },
] as const;

export function createDefaultStudentWork(now = new Date().toISOString()): StudentWork {
  return {
    schemaVersion: STUDENT_WORK_SCHEMA_VERSION,
    createdAt: now,
    updatedAt: null,
    student: {
      name: "",
      className: "",
      date: "",
      chosenGroupSlug: "",
      comparisonGroupSlug: "",
    },
    misconceptions: createDefaultMisconceptions(),
    research: {
      livedWhen: "",
      livedWhere: "",
      body: "",
      lifestyle: "",
      evidence: "",
      importance: "",
      uncertainty: "",
    },
    evidence: {
      fossils: "",
      tools: "",
      dna: "",
      archaeology: "",
      strongest: "",
      limitations: "",
    },
    life: {
      keyFeature: "",
      featureUsefulness: "",
      likelyEnvironment: "",
      likelyLifestyle: "",
      survivalPressure: "",
    },
    bigIdeas: {
      selectedIdea: "",
      bigIdeaResponse: "",
      languageLearning: "",
      fireCooking: "",
      conceptConnection: "",
    },
    comparison: {
      similarities: "",
      differences: "",
      mostSimilar: "",
      mostDifferent: "",
      conclusion: "",
    },
    timeline: {
      sapiensOverlap: "",
      groupOverlap: "",
      ladderChallenge: "",
      branchingTree: "",
      geography: "",
    },
    finalReport: {
      title: "",
      introduction: "",
      earlyEvidence: "",
      laterEvidence: "",
      overlapAndUncertainty: "",
      conclusion: "",
      finalAnswer: "",
      oneSentenceJudgement: "",
    },
    reflection: {
      checklist: Object.fromEntries(selfAssessmentItems.map((item) => [item.id, false])),
      mostInteresting: "",
      stillDebated: "",
      improvementTarget: "",
    },
  };
}

function createDefaultMisconceptions(): MisconceptionResponse[] {
  return misconceptionPrompts.map((prompt) => ({
    id: prompt.id,
    statement: prompt.statement,
    choice: "",
    explanation: "",
  }));
}
