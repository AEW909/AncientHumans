import { selfAssessmentItems } from "@/data/defaultStudentWork";
import { getHomininBySlug, hominins } from "@/data/hominins";
import type { MockReportData } from "@/types/report";
import type { StudentWork } from "@/types/studentWork";

const defaultFocusSlug = "homo-erectus";
const defaultComparisonSlug = "neanderthals";

export type ReportReadiness = {
  missingItems: string[];
  status: "complete" | "incomplete";
};

export function createReportDataFromStudentWork(work: StudentWork): MockReportData {
  const chosen = getHomininBySlug(work.student.chosenGroupSlug) ?? getHomininBySlug(defaultFocusSlug) ?? hominins[0];
  const comparison = getComparisonGroup(work.student.comparisonGroupSlug, chosen.slug);

  return {
    student: {
      name: withFallback(work.student.name, "Student name not entered"),
      className: withFallback(work.student.className, "Class not entered"),
      date: withFallback(work.student.date, "Date not entered"),
      chosenGroupSlug: chosen.slug,
      comparisonGroupSlug: comparison.slug,
    },
    articleTitle: withFallback(work.finalReport.title, "Why Human Evolution Is Not a Ladder"),
    oneSentenceJudgement: withFallback(
      work.finalReport.oneSentenceJudgement,
      "Add your one-sentence judgement in section 10 of the web quest.",
    ),
    importanceAnswer: withFallback(
      work.research.importance,
      `${chosen.displayName} matters because ${chosen.bigIdea.toLowerCase()}`,
    ),
    evidence: {
      fossils: withFallback(work.evidence.fossils, chosen.evidence),
      tools: withFallback(work.evidence.tools, "Add tool or artefact evidence from your research notes."),
      dna: withFallback(work.evidence.dna, "Add DNA evidence if it exists for this group, or explain why it is limited."),
      archaeology: withFallback(work.evidence.archaeology, "Add archaeological evidence such as sites, traces, tools or behaviour evidence."),
      strongest: withFallback(work.evidence.strongest, "Choose the strongest evidence from your notes and explain why it is reliable."),
      limitations: withFallback(work.evidence.limitations, withFallback(work.research.uncertainty, chosen.uncertainty)),
    },
    life: {
      keyFeature: withFallback(work.life.keyFeature, chosen.bodyPlan),
      featureUsefulness: withFallback(work.life.featureUsefulness, chosen.lifestyle),
      likelyEnvironment: withFallback(work.life.likelyEnvironment, withFallback(work.research.livedWhere, chosen.location)),
      survivalPressure: withFallback(work.life.survivalPressure, "Add one survival pressure or environmental challenge from your research."),
    },
    comparison: {
      similarities: withFallback(work.comparison.similarities, "Add similarities between your focus group, Homo sapiens and your comparison group."),
      differences: withFallback(work.comparison.differences, "Add differences between the three groups without ranking them as better or worse."),
      mostSimilar: withFallback(work.comparison.mostSimilar, "Add which two groups seem most similar and explain your evidence."),
      mostDifferent: withFallback(work.comparison.mostDifferent, "Add which group seems most different and explain your evidence."),
    },
    timeline: {
      overlapAnswer: withFallback(
        joinAnswers(work.timeline.sapiensOverlap, work.timeline.groupOverlap),
        "Add overlap evidence showing that several human groups existed at the same time.",
      ),
      ladderChallenge: withFallback(work.timeline.ladderChallenge, "Explain why overlap makes a straight ladder model misleading."),
      branchingTree: withFallback(work.timeline.branchingTree, "Explain why a branching tree is a better model for human evolution."),
      geographyAnswer: withFallback(work.timeline.geography, "Add how different places and separated populations challenge a single straight-line story."),
    },
    finalAnswer: withFallback(
      work.finalReport.finalAnswer,
      "Write your final evaluation in section 10 of the web quest. Use evidence from your focus group, Homo sapiens and your comparison group.",
    ),
    reflection: {
      checklist: getCheckedLabels(work),
      mostInteresting: withFallback(work.reflection.mostInteresting, "Add the most interesting thing you learned in section 11."),
      stillDebated: withFallback(work.reflection.stillDebated, "Add one question scientists still debate in section 11."),
      improvementTarget: withFallback(work.reflection.improvementTarget, "Add one improvement target in section 11."),
    },
  };
}

export function getReportReadiness(work: StudentWork): ReportReadiness {
  const missingItems = [
    [work.student.name, "student name"],
    [work.student.className, "class"],
    [work.student.date, "date"],
    [work.student.chosenGroupSlug, "focus species"],
    [work.student.comparisonGroupSlug, "comparison species"],
    [work.research.importance, "why the focus species matters"],
    [work.evidence.strongest, "strongest evidence"],
    [work.life.keyFeature, "life/adaptation feature"],
    [work.comparison.similarities, "comparison similarities"],
    [work.timeline.ladderChallenge, "timeline ladder challenge"],
    [work.finalReport.finalAnswer, "final written answer"],
    [work.finalReport.oneSentenceJudgement, "one-sentence judgement"],
    [work.reflection.mostInteresting, "reflection"],
  ]
    .filter(([value]) => !hasText(value))
    .map(([, label]) => label);

  return {
    missingItems,
    status: missingItems.length === 0 ? "complete" : "incomplete",
  };
}

function getComparisonGroup(slug: string, chosenSlug: string) {
  const selected = getHomininBySlug(slug);

  if (selected && selected.slug !== chosenSlug && selected.slug !== "homo-sapiens") {
    return selected;
  }

  return hominins.find((group) => group.slug !== chosenSlug && group.slug === defaultComparisonSlug)
    ?? hominins.find((group) => group.slug !== chosenSlug && group.slug !== "homo-sapiens")
    ?? hominins[0];
}

function getCheckedLabels(work: StudentWork) {
  const checked = selfAssessmentItems
    .filter((item) => work.reflection.checklist[item.id])
    .map((item) => item.label);

  return checked.length > 0 ? checked : ["Complete the self-assessment checklist in section 11."];
}

function joinAnswers(...answers: string[]) {
  return answers.filter(hasText).join(" ");
}

function withFallback(value: string, fallback: string) {
  return hasText(value) ? value.trim() : fallback;
}

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
