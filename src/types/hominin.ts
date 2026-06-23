export type HomininKind = "core" | "extension";

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
  imageCaption: string;
};
