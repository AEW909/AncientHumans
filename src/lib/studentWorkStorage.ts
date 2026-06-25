import {
  STUDENT_WORK_SCHEMA_VERSION,
  createDefaultStudentWork,
  misconceptionPrompts,
  selfAssessmentItems,
} from "@/data/defaultStudentWork";
import type {
  MisconceptionChoice,
  MisconceptionResponse,
  StudentWork,
  StudentWorkProgress,
} from "@/types/studentWork";

export const STUDENT_WORK_STORAGE_KEY = "ancient-human-relatives-student-work";

type LoadStudentWorkResult = {
  source: "default" | "saved";
  work: StudentWork;
};

type SaveStudentWorkResult = {
  ok: boolean;
  savedAt: string | null;
  error?: string;
};

export function loadStudentWork(storage: Storage | null = getBrowserStorage()): LoadStudentWorkResult {
  if (!storage) {
    return { source: "default", work: createDefaultStudentWork() };
  }

  let raw: string | null;

  try {
    raw = storage.getItem(STUDENT_WORK_STORAGE_KEY);
  } catch {
    return { source: "default", work: createDefaultStudentWork() };
  }

  if (!raw) {
    return { source: "default", work: createDefaultStudentWork() };
  }

  try {
    return {
      source: "saved",
      work: normalizeStudentWork(JSON.parse(raw)),
    };
  } catch {
    return { source: "default", work: createDefaultStudentWork() };
  }
}

export function saveStudentWork(
  work: StudentWork,
  storage: Storage | null = getBrowserStorage(),
): SaveStudentWorkResult {
  if (!storage) {
    return { ok: false, savedAt: null, error: "localStorage is not available." };
  }

  const savedAt = new Date().toISOString();
  const normalized = normalizeStudentWork({
    ...work,
    updatedAt: savedAt,
  });

  try {
    storage.setItem(STUDENT_WORK_STORAGE_KEY, JSON.stringify(normalized));
    return { ok: true, savedAt };
  } catch (error) {
    return {
      ok: false,
      savedAt: null,
      error: error instanceof Error ? error.message : "Could not save student work.",
    };
  }
}

export function resetStudentWork(storage: Storage | null = getBrowserStorage()): StudentWork {
  if (storage) {
    try {
      storage.removeItem(STUDENT_WORK_STORAGE_KEY);
    } catch {
      return createDefaultStudentWork();
    }
  }

  return createDefaultStudentWork();
}

export function hasSavedStudentWork(storage: Storage | null = getBrowserStorage()): boolean {
  try {
    return Boolean(storage?.getItem(STUDENT_WORK_STORAGE_KEY));
  } catch {
    return false;
  }
}

export function normalizeStudentWork(value: unknown): StudentWork {
  const fallback = createDefaultStudentWork();

  if (!isRecord(value)) {
    return fallback;
  }

  return {
    schemaVersion: STUDENT_WORK_SCHEMA_VERSION,
    createdAt: readString(value.createdAt, fallback.createdAt),
    updatedAt: readNullableString(value.updatedAt),
    student: {
      name: readNestedString(value.student, "name"),
      className: readNestedString(value.student, "className"),
      date: readNestedString(value.student, "date"),
      chosenGroupSlug: readNestedString(value.student, "chosenGroupSlug"),
      comparisonGroupSlug: readNestedString(value.student, "comparisonGroupSlug"),
    },
    misconceptions: normalizeMisconceptions(value.misconceptions),
    research: {
      livedWhen: readNestedString(value.research, "livedWhen"),
      livedWhere: readNestedString(value.research, "livedWhere"),
      body: readNestedString(value.research, "body"),
      lifestyle: readNestedString(value.research, "lifestyle"),
      evidence: readNestedString(value.research, "evidence"),
      importance: readNestedString(value.research, "importance"),
      uncertainty: readNestedString(value.research, "uncertainty"),
    },
    evidence: {
      fossils: readNestedString(value.evidence, "fossils"),
      tools: readNestedString(value.evidence, "tools"),
      dna: readNestedString(value.evidence, "dna"),
      archaeology: readNestedString(value.evidence, "archaeology"),
      strongest: readNestedString(value.evidence, "strongest"),
      limitations: readNestedString(value.evidence, "limitations"),
    },
    life: {
      keyFeature: readNestedString(value.life, "keyFeature"),
      featureUsefulness: readNestedString(value.life, "featureUsefulness"),
      likelyEnvironment: readNestedString(value.life, "likelyEnvironment"),
      likelyLifestyle: readNestedString(value.life, "likelyLifestyle"),
      survivalPressure: readNestedString(value.life, "survivalPressure"),
    },
    bigIdeas: {
      languageLearning: readNestedString(value.bigIdeas, "languageLearning"),
      fireCooking: readNestedString(value.bigIdeas, "fireCooking"),
      conceptConnection: readNestedString(value.bigIdeas, "conceptConnection"),
    },
    comparison: {
      similarities: readNestedString(value.comparison, "similarities"),
      differences: readNestedString(value.comparison, "differences"),
      mostSimilar: readNestedString(value.comparison, "mostSimilar"),
      mostDifferent: readNestedString(value.comparison, "mostDifferent"),
      conclusion: readNestedString(value.comparison, "conclusion"),
    },
    timeline: {
      sapiensOverlap: readNestedString(value.timeline, "sapiensOverlap"),
      groupOverlap: readNestedString(value.timeline, "groupOverlap"),
      ladderChallenge: readNestedString(value.timeline, "ladderChallenge"),
      branchingTree: readNestedString(value.timeline, "branchingTree"),
      geography: readNestedString(value.timeline, "geography"),
    },
    finalReport: {
      title: readNestedString(value.finalReport, "title"),
      introduction: readNestedString(value.finalReport, "introduction"),
      earlyEvidence: readNestedString(value.finalReport, "earlyEvidence"),
      laterEvidence: readNestedString(value.finalReport, "laterEvidence"),
      overlapAndUncertainty: readNestedString(value.finalReport, "overlapAndUncertainty"),
      conclusion: readNestedString(value.finalReport, "conclusion"),
      finalAnswer: readNestedString(value.finalReport, "finalAnswer"),
      oneSentenceJudgement: readNestedString(value.finalReport, "oneSentenceJudgement"),
    },
    reflection: {
      checklist: normalizeChecklist(value.reflection),
      mostInteresting: readNestedString(value.reflection, "mostInteresting"),
      stillDebated: readNestedString(value.reflection, "stillDebated"),
      improvementTarget: readNestedString(value.reflection, "improvementTarget"),
    },
  };
}

export function calculateStudentWorkProgress(work: StudentWork): StudentWorkProgress {
  const normalized = normalizeStudentWork(work);
  const requiredValues = [
    normalized.student.name,
    normalized.student.className,
    normalized.student.date,
    normalized.student.chosenGroupSlug,
    normalized.student.comparisonGroupSlug,
    ...normalized.misconceptions.flatMap((item) => [item.choice, item.explanation]),
    normalized.research.body,
    normalized.research.lifestyle,
    normalized.evidence.strongest,
    ...Object.values(normalized.bigIdeas),
    ...Object.values(normalized.comparison),
    ...Object.values(normalized.timeline),
    normalized.finalReport.finalAnswer,
    normalized.finalReport.oneSentenceJudgement,
    normalized.reflection.mostInteresting,
    normalized.reflection.stillDebated,
    normalized.reflection.improvementTarget,
  ];
  const completedFields = requiredValues.filter(isCompletedValue).length;
  const completedSections = getCompletedSections(normalized);

  return {
    completedFields,
    requiredFields: requiredValues.length,
    percent: Math.round((completedFields / requiredValues.length) * 100),
    completedSections,
  };
}

function getCompletedSections(work: StudentWork): string[] {
  const sectionChecks: Array<[string, boolean]> = [
    ["student", areCompleted(Object.values(work.student))],
    ["misconceptions", work.misconceptions.every((item) => isCompletedValue(item.choice) && isCompletedValue(item.explanation))],
    ["investigate", areCompleted([work.research.body, work.research.lifestyle, work.evidence.strongest])],
    ["bigIdeas", areCompleted(Object.values(work.bigIdeas))],
    ["comparison", areCompleted(Object.values(work.comparison))],
    ["timeline", areCompleted(Object.values(work.timeline))],
    ["finalReport", areCompleted([work.finalReport.finalAnswer, work.finalReport.oneSentenceJudgement])],
    ["reflection", areCompleted([
      work.reflection.mostInteresting,
      work.reflection.stillDebated,
      work.reflection.improvementTarget,
    ])],
  ];

  return sectionChecks.filter(([, complete]) => complete).map(([section]) => section);
}

function normalizeMisconceptions(value: unknown): MisconceptionResponse[] {
  const savedResponses = Array.isArray(value) ? value.filter(isRecord) : [];

  return misconceptionPrompts.map((prompt) => {
    const saved = savedResponses.find((item) => item.id === prompt.id);

    return {
      id: prompt.id,
      statement: prompt.statement,
      choice: readMisconceptionChoice(saved?.choice),
      explanation: readString(saved?.explanation),
    };
  });
}

function normalizeChecklist(reflection: unknown): Record<string, boolean> {
  const checklist = isRecord(reflection) && isRecord(reflection.checklist) ? reflection.checklist : {};

  return Object.fromEntries(
    selfAssessmentItems.map((item) => [item.id, checklist[item.id] === true]),
  );
}

function getBrowserStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readNestedString(value: unknown, key: string): string {
  return isRecord(value) ? readString(value[key]) : "";
}

function readString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function readNullableString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function readMisconceptionChoice(value: unknown): MisconceptionChoice {
  return value === "true" || value === "false" || value === "partly-true" ? value : "";
}

function isCompletedValue(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function areCompleted(values: unknown[]): boolean {
  return values.every(isCompletedValue);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
