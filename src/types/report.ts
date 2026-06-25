export type MockReportData = {
  student: {
    name: string;
    className: string;
    date: string;
    chosenGroupSlug: string;
    comparisonGroupSlug: string;
  };
  articleTitle: string;
  oneSentenceJudgement: string;
  importanceAnswer: string;
  evidence: {
    fossils: string;
    tools: string;
    dna: string;
    archaeology: string;
    strongest: string;
    limitations: string;
  };
  life: {
    keyFeature: string;
    featureUsefulness: string;
    likelyEnvironment: string;
    survivalPressure: string;
  };
  bigIdeas: {
    conceptConnection: string;
  };
  comparison: {
    similarities: string;
    differences: string;
    mostSimilar: string;
    mostDifferent: string;
  };
  timeline: {
    overlapAnswer: string;
    ladderChallenge: string;
    branchingTree: string;
    geographyAnswer: string;
  };
  finalAnswer: string;
  reflection: {
    checklist: string[];
    mostInteresting: string;
    stillDebated: string;
    improvementTarget: string;
  };
};
