export type HomininKind = "core" | "extension";

export type HomininSourceLink = {
  label: string;
  href: string;
};

export type Hominin = {
  id: string;
  slug: string;
  number: number;
  kind: HomininKind;
  displayName: string;
  scientificName?: string;
  subtitle: string;
  hook: string;
  dateRange: string;
  location: string;
  knownFor: string;
  bodyPlan: string;
  lifestyle: string;
  evidence: string;
  bigIdea: string;
  uncertainty: string;
  pullQuote: string;
  reportCaption: string;
  posterImage: string;
  figureImage?: string;
  figureCaption?: string;
  vignetteImage?: string;
  vignetteCaption?: string;
  madeImage?: string;
  madeCaption?: string;
  activityImage?: string;
  activityCaption?: string;
  activityWideImage?: string;
  activityWideCaption?: string;
  cultureImage?: string;
  cultureCaption?: string;
  learningNotes?: {
    evidenceShows: string[];
    reportUses: string[];
    comparisonClues: string[];
  };
  sourceLinks?: HomininSourceLink[];
  imageCaption: string;
};
