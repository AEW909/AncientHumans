export type MisconceptionChoice = "" | "true" | "false" | "partly-true";

export type StudentDetailsWork = {
  name: string;
  className: string;
  date: string;
  chosenGroupSlug: string;
  comparisonGroupSlug: string;
};

export type MisconceptionResponse = {
  id: string;
  statement: string;
  choice: MisconceptionChoice;
  explanation: string;
};

export type GuidedResearchWork = {
  livedWhen: string;
  livedWhere: string;
  body: string;
  lifestyle: string;
  evidence: string;
  importance: string;
  uncertainty: string;
};

export type EvidenceDossierWork = {
  fossils: string;
  tools: string;
  dna: string;
  archaeology: string;
  strongest: string;
  limitations: string;
};

export type LifeAdaptationsWork = {
  keyFeature: string;
  featureUsefulness: string;
  likelyEnvironment: string;
  likelyLifestyle: string;
  survivalPressure: string;
};

export type BigIdeasWork = {
  selectedIdea: "" | "fire" | "language" | "culture";
  bigIdeaResponse: string;
  languageLearning: string;
  fireCooking: string;
  conceptConnection: string;
};

export type ComparisonWork = {
  similarities: string;
  differences: string;
  mostSimilar: string;
  mostDifferent: string;
  conclusion: string;
};

export type TimelineWork = {
  sapiensOverlap: string;
  groupOverlap: string;
  ladderChallenge: string;
  branchingTree: string;
  geography: string;
};

export type FinalReportWork = {
  title: string;
  introduction: string;
  earlyEvidence: string;
  laterEvidence: string;
  overlapAndUncertainty: string;
  conclusion: string;
  finalAnswer: string;
  oneSentenceJudgement: string;
};

export type SelfAssessmentWork = {
  checklist: Record<string, boolean>;
  mostInteresting: string;
  stillDebated: string;
  improvementTarget: string;
};

export type StudentWork = {
  schemaVersion: number;
  createdAt: string;
  updatedAt: string | null;
  student: StudentDetailsWork;
  misconceptions: MisconceptionResponse[];
  research: GuidedResearchWork;
  evidence: EvidenceDossierWork;
  life: LifeAdaptationsWork;
  bigIdeas: BigIdeasWork;
  comparison: ComparisonWork;
  timeline: TimelineWork;
  finalReport: FinalReportWork;
  reflection: SelfAssessmentWork;
};

export type StudentWorkProgress = {
  completedFields: number;
  requiredFields: number;
  percent: number;
  completedSections: string[];
};
