"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { hominins } from "@/data/hominins";
import { selfAssessmentItems } from "@/data/defaultStudentWork";
import {
  calculateStudentWorkProgress,
  loadStudentWork,
  resetStudentWork,
  saveStudentWork,
} from "@/lib/studentWorkStorage";
import type { Hominin } from "@/types/hominin";
import type { MisconceptionChoice, StudentWork } from "@/types/studentWork";

type SaveState = {
  label: string;
  tone: "idle" | "saved" | "error";
};

const textLimits = {
  short: 200,
  research: 400,
  evidence: 400,
  comparison: 350,
  judgement: 180,
  final: 1800,
  reflection: 300,
};

const sections = [
  { key: "details", label: "Details" },
  { key: "misconceptions", label: "Starter" },
  { key: "choose", label: "Choose" },
  { key: "research", label: "Research" },
  { key: "evidence", label: "Evidence" },
  { key: "life", label: "Life" },
  { key: "sapiens", label: "Sapiens" },
  { key: "comparison", label: "Compare" },
  { key: "timeline", label: "Timeline" },
  { key: "finalReport", label: "Article" },
  { key: "reflection", label: "Reflect" },
] as const;

const researchHominins = hominins.filter((group) => group.slug !== "homo-sapiens");
const sapiens = hominins.find((group) => group.slug === "homo-sapiens");

const researchLinks = [
  {
    href: "https://humanorigins.si.edu/",
    label: "Smithsonian Human Origins",
  },
  {
    href: "https://www.nhm.ac.uk/discover/human-evolution.html",
    label: "Natural History Museum",
  },
  {
    href: "https://australian.museum/learn/science/human-evolution/",
    label: "Australian Museum",
  },
] as const;

export function QuestWorkspace() {
  const [work, setWork] = useState<StudentWork | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [saveState, setSaveState] = useState<SaveState>({ label: "Loading saved work", tone: "idle" });
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadStudentWork();
    setWork(loaded.work);
    setHasHydrated(true);
    setSaveState({
      label: loaded.source === "saved" ? formatSavedLabel(loaded.work.updatedAt) : "Ready to start",
      tone: loaded.source === "saved" ? "saved" : "idle",
    });
  }, []);

  useEffect(() => {
    if (!work || !hasHydrated) {
      return;
    }

    setSaveState({ label: "Saving...", tone: "idle" });
    const saveTimer = window.setTimeout(() => {
      const result = saveStudentWork(work);
      setSaveState(
        result.ok
          ? { label: formatSavedLabel(result.savedAt), tone: "saved" }
          : { label: result.error ?? "Could not save", tone: "error" },
      );
    }, 350);

    return () => window.clearTimeout(saveTimer);
  }, [hasHydrated, work]);

  const progress = useMemo(() => work ? calculateStudentWorkProgress(work) : null, [work]);
  const chosen = hominins.find((group) => group.slug === work?.student.chosenGroupSlug);

  function updateWork(updater: (current: StudentWork) => StudentWork) {
    setWork((current) => current ? updater(current) : current);
  }

  function handleReset() {
    const confirmed = window.confirm("This will delete saved work from this browser. Continue?");

    if (!confirmed) {
      return;
    }

    setWork(resetStudentWork());
    setActiveStep(0);
    setSaveState({ label: "Work reset", tone: "idle" });
  }

  function isStepComplete(key: (typeof sections)[number]["key"]) {
    if (!work || !progress) {
      return false;
    }

    if (key === "details") {
      return [work.student.name, work.student.className, work.student.date].every(hasText);
    }

    if (key === "choose") {
      return [work.student.chosenGroupSlug, work.student.comparisonGroupSlug].every(isResearchHomininSlug);
    }

    if (key === "sapiens") {
      return true;
    }

    return progress.completedSections.includes(key);
  }

  if (!work || !progress) {
    return (
      <main className="quest-shell">
        <div className="quest-loading">Preparing web quest...</div>
      </main>
    );
  }

  return (
    <main className="quest-shell">
      <section className="quest-hero">
        <Image
          src={chosen?.activityWideImage ?? "/assets/covers/ancient-human-relatives-cover.png"}
          alt={chosen?.activityWideCaption ?? "Ancient Human Relatives cover artwork"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="quest-hero-wash" />
        <div className="quest-hero-content">
          <p className="quest-kicker">Guided web quest</p>
          <h1>Build your field report</h1>
          <p>
            Research ancient human relatives, weigh the evidence and shape your answers into a magazine-style report.
          </p>
          <div className="quest-progress-card">
            <span>{progress.percent}% complete</span>
            <div>
              <i style={{ width: `${progress.percent}%` }} />
            </div>
          </div>
        </div>
      </section>

      <section className="quest-workbench">
        <aside className="quest-side-panel">
          <div className="quest-save-panel">
            <span className={`quest-save-dot quest-save-${saveState.tone}`} />
            <strong>{saveState.label}</strong>
            <button type="button" onClick={handleReset}>Reset</button>
          </div>
          <nav aria-label="Web quest sections" className="quest-step-list">
            {sections.map((section, index) => {
              const isComplete = isStepComplete(section.key);

              return (
              <button
                className={index === activeStep ? "quest-step-active" : ""}
                key={`${section.label}-${index}`}
                onClick={() => setActiveStep(index)}
                type="button"
                aria-current={index === activeStep ? "step" : undefined}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <b>{section.label}</b>
                {isComplete && <i aria-label="Section complete">Done</i>}
              </button>
              );
            })}
          </nav>
          {activeStep !== 1 && <ResearchSitesPanel compact />}
        </aside>

        <div className="quest-panel">
          {activeStep === 0 && <StudentDetailsStep updateWork={updateWork} work={work} />}
          {activeStep === 1 && <MisconceptionsStep updateWork={updateWork} work={work} />}
          {activeStep === 2 && <ChooseGroupStep updateWork={updateWork} work={work} />}
          {activeStep === 3 && <GuidedResearchStep updateWork={updateWork} work={work} />}
          {activeStep === 4 && <EvidenceStep updateWork={updateWork} work={work} />}
          {activeStep === 5 && <LifeStep updateWork={updateWork} work={work} />}
          {activeStep === 6 && <SapiensBridgeStep />}
          {activeStep === 7 && <ComparisonStep updateWork={updateWork} work={work} />}
          {activeStep === 8 && <TimelineStep updateWork={updateWork} work={work} />}
          {activeStep === 9 && <FinalReportStep updateWork={updateWork} work={work} />}
          {activeStep === 10 && <ReflectionStep updateWork={updateWork} work={work} />}

          <div className="quest-navigation">
            <button disabled={activeStep === 0} onClick={() => setActiveStep((step) => Math.max(0, step - 1))} type="button">
              Back
            </button>
            <button disabled={activeStep === sections.length - 1} onClick={() => setActiveStep((step) => Math.min(sections.length - 1, step + 1))} type="button">
              Next
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function StudentDetailsStep({ work, updateWork }: StepProps) {
  return (
    <QuestSection
      eyebrow="Student details"
      title="Set up your investigation"
      intro="These details will later appear on the cover of your field report."
    >
      <div className="quest-field-grid">
        <TextInput label="Name" value={work.student.name} onChange={(value) => updateWork((current) => ({ ...current, student: { ...current.student, name: value } }))} />
        <TextInput label="Class" value={work.student.className} onChange={(value) => updateWork((current) => ({ ...current, student: { ...current.student, className: value } }))} />
        <TextInput label="Date" placeholder="24 June 2026" value={work.student.date} onChange={(value) => updateWork((current) => ({ ...current, student: { ...current.student, date: value } }))} />
      </div>
    </QuestSection>
  );
}

function MisconceptionsStep({ work, updateWork }: StepProps) {
  return (
    <QuestSection
      eyebrow="Starter"
      title="Record your first thoughts"
      intro="Before you research, capture what you already think. These are not final answers: you will revisit them in the reflection."
    >
      <div className="quest-video-feature">
        <div>
          <p className="quest-kicker">Before you begin</p>
          <h3>Watch for branches, overlap and uncertainty</h3>
          <p>
            This Kurzgesagt introduction is useful for the big picture. As you watch, look for evidence that human
            evolution was not a neat line of improvement.
          </p>
        </div>
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          src="https://www.youtube.com/embed/dGiQaabX3_o"
          title="Kurzgesagt: What Happened Before History? Human Origins"
        />
      </div>
      <div className="quest-baseline-note">
        <strong>Baseline check</strong>
        <p>
          Answer from memory and instinct first. Later, section 11 will ask you to look back at these ideas and decide
          what changed after looking at the evidence.
        </p>
      </div>
      <div className="quest-misconception-list">
        {work.misconceptions.map((item, index) => (
          <div className="quest-question-card" key={item.id}>
            <h3>{item.statement}</h3>
            <div className="quest-segmented">
              {(["true", "false", "partly-true"] as MisconceptionChoice[]).map((choice) => (
                <button
                  className={item.choice === choice ? "quest-choice-active" : ""}
                  key={choice}
                  onClick={() => updateWork((current) => ({
                    ...current,
                    misconceptions: current.misconceptions.map((response, responseIndex) => responseIndex === index ? { ...response, choice } : response),
                  }))}
                  type="button"
                >
                  {formatChoice(choice)}
                </button>
              ))}
            </div>
            <TextArea
              label="Explanation"
              limit={textLimits.short}
              value={item.explanation}
              onChange={(value) => updateWork((current) => ({
                ...current,
                misconceptions: current.misconceptions.map((response, responseIndex) => responseIndex === index ? { ...response, explanation: value } : response),
              }))}
            />
          </div>
        ))}
      </div>
    </QuestSection>
  );
}

function ChooseGroupStep({ work, updateWork }: StepProps) {
  const [inspectedSlug, setInspectedSlug] = useState<string | null>(null);
  const inspectedGroup = hominins.find((group) => group.slug === inspectedSlug);

  return (
    <QuestSection
      eyebrow="Research focus"
      title="Choose your branches"
      intro="Explore the ancient human relatives first. Homo sapiens will appear later as the fixed reference species."
    >
      <div className="quest-choice-brief">
        <strong>How to choose well</strong>
        <p>
          Pick a focus group that gives you something interesting to argue about: strong evidence, a surprising body
          plan, overlap with Homo sapiens, or a scientific debate. Choose two ancient human relatives: one main focus
          and one extra branch to compare.
        </p>
      </div>
      <div className="quest-source-reminder">
        Extra research sites are available in the side panel and again when you start building your species profile.
      </div>
      <div className="quest-species-picker">
        {researchHominins.map((group) => (
          <article className="quest-species-option" key={group.id}>
            <button className="quest-species-image-button" onClick={() => setInspectedSlug(group.slug)} type="button">
              <Image src={group.figureImage ?? group.posterImage} alt={group.figureCaption ?? group.imageCaption} fill sizes="180px" className="object-cover" />
              <span>Open field notes</span>
            </button>
            <h3>{group.displayName}</h3>
            <p>{group.dateRange}</p>
            <p>{group.hook}</p>
            {group.kind === "extension" && <small>Extension case</small>}
            <div className="quest-species-actions">
              <button
                className={work.student.chosenGroupSlug === group.slug ? "quest-pill-active" : ""}
                onClick={() => updateWork((current) => ({ ...current, student: { ...current.student, chosenGroupSlug: group.slug } }))}
                type="button"
              >
                Focus
              </button>
              <button
                className={work.student.comparisonGroupSlug === group.slug ? "quest-pill-active" : ""}
                onClick={() => updateWork((current) => ({ ...current, student: { ...current.student, comparisonGroupSlug: group.slug } }))}
                type="button"
              >
                Compare
              </button>
            </div>
          </article>
        ))}
      </div>
      {inspectedGroup && (
        <SpeciesFieldNote
          group={inspectedGroup}
          isComparison={work.student.comparisonGroupSlug === inspectedGroup.slug}
          isFocus={work.student.chosenGroupSlug === inspectedGroup.slug}
          onClose={() => setInspectedSlug(null)}
          onSelectComparison={() => updateWork((current) => ({ ...current, student: { ...current.student, comparisonGroupSlug: inspectedGroup.slug } }))}
          onSelectFocus={() => updateWork((current) => ({ ...current, student: { ...current.student, chosenGroupSlug: inspectedGroup.slug } }))}
        />
      )}
    </QuestSection>
  );
}

function GuidedResearchStep({ work, updateWork }: StepProps) {
  const chosen = hominins.find((group) => group.slug === work.student.chosenGroupSlug);

  return (
    <QuestSection eyebrow="Guided research" title="Build the species profile" intro="Use cautious scientific wording and focus on evidence rather than certainty.">
      <ResearchLaunchPad group={chosen} />
      <FieldStack>
        <TextArea label="When did this group live?" limit={textLimits.research} value={work.research.livedWhen} onChange={(value) => updateWork((current) => ({ ...current, research: { ...current.research, livedWhen: value } }))} />
        <TextArea label="Where did this group live or where was it found?" limit={textLimits.research} value={work.research.livedWhere} onChange={(value) => updateWork((current) => ({ ...current, research: { ...current.research, livedWhere: value } }))} />
        <TextArea label="What was its body like?" limit={textLimits.research} value={work.research.body} onChange={(value) => updateWork((current) => ({ ...current, research: { ...current.research, body: value } }))} />
        <TextArea label="How may it have lived?" limit={textLimits.research} value={work.research.lifestyle} onChange={(value) => updateWork((current) => ({ ...current, research: { ...current.research, lifestyle: value } }))} />
        <TextArea label="What evidence do scientists have?" limit={textLimits.research} value={work.research.evidence} onChange={(value) => updateWork((current) => ({ ...current, research: { ...current.research, evidence: value } }))} />
        <TextArea label="Why does this group matter?" limit={textLimits.research} value={work.research.importance} onChange={(value) => updateWork((current) => ({ ...current, research: { ...current.research, importance: value } }))} />
        <TextArea label="What is still debated or uncertain?" limit={textLimits.research} value={work.research.uncertainty} onChange={(value) => updateWork((current) => ({ ...current, research: { ...current.research, uncertainty: value } }))} />
      </FieldStack>
    </QuestSection>
  );
}

function EvidenceStep({ work, updateWork }: StepProps) {
  const chosen = hominins.find((group) => group.slug === work.student.chosenGroupSlug);

  return (
    <QuestSection eyebrow="Evidence dossier" title="How do we know?" intro="Separate fossils, tools, DNA and archaeological clues from interpretation.">
      {chosen && (
        <div className="quest-evidence-strip">
          <Image src={chosen.madeImage ?? chosen.posterImage} alt={chosen.madeCaption ?? chosen.imageCaption} fill sizes="360px" className="object-cover" />
          <div>
            <p className="quest-kicker">Evidence prompt</p>
            <h3>{chosen.knownFor}</h3>
            <p>{chosen.evidence}</p>
            <a href={chosen.posterImage} target="_blank" rel="noreferrer">Open the information sheet</a>
          </div>
        </div>
      )}
      <FieldStack columns>
        <TextArea label="Fossil evidence" limit={textLimits.evidence} value={work.evidence.fossils} onChange={(value) => updateWork((current) => ({ ...current, evidence: { ...current.evidence, fossils: value } }))} />
        <TextArea label="Tool evidence" limit={textLimits.evidence} value={work.evidence.tools} onChange={(value) => updateWork((current) => ({ ...current, evidence: { ...current.evidence, tools: value } }))} />
        <TextArea label="DNA evidence" limit={textLimits.evidence} value={work.evidence.dna} onChange={(value) => updateWork((current) => ({ ...current, evidence: { ...current.evidence, dna: value } }))} />
        <TextArea label="Other archaeology" limit={textLimits.evidence} value={work.evidence.archaeology} onChange={(value) => updateWork((current) => ({ ...current, evidence: { ...current.evidence, archaeology: value } }))} />
        <TextArea label="Strongest evidence" limit={textLimits.evidence} value={work.evidence.strongest} onChange={(value) => updateWork((current) => ({ ...current, evidence: { ...current.evidence, strongest: value } }))} />
        <TextArea label="Limitations of the evidence" limit={textLimits.evidence} value={work.evidence.limitations} onChange={(value) => updateWork((current) => ({ ...current, evidence: { ...current.evidence, limitations: value } }))} />
      </FieldStack>
    </QuestSection>
  );
}

function LifeStep({ work, updateWork }: StepProps) {
  return (
    <QuestSection eyebrow="Life and adaptations" title="Body, environment and survival" intro="Explain what evidence suggests, and keep possible adaptations cautious.">
      <FieldStack columns>
        <TextArea label="One important physical feature" limit={textLimits.research} value={work.life.keyFeature} onChange={(value) => updateWork((current) => ({ ...current, life: { ...current.life, keyFeature: value } }))} />
        <TextArea label="Why may it have been useful?" limit={textLimits.research} value={work.life.featureUsefulness} onChange={(value) => updateWork((current) => ({ ...current, life: { ...current.life, featureUsefulness: value } }))} />
        <TextArea label="Likely environment" limit={textLimits.research} value={work.life.likelyEnvironment} onChange={(value) => updateWork((current) => ({ ...current, life: { ...current.life, likelyEnvironment: value } }))} />
        <TextArea label="Likely lifestyle" limit={textLimits.research} value={work.life.likelyLifestyle} onChange={(value) => updateWork((current) => ({ ...current, life: { ...current.life, likelyLifestyle: value } }))} />
        <TextArea label="Possible survival pressures" limit={textLimits.research} value={work.life.survivalPressure} onChange={(value) => updateWork((current) => ({ ...current, life: { ...current.life, survivalPressure: value } }))} />
      </FieldStack>
    </QuestSection>
  );
}

function SapiensBridgeStep() {
  if (!sapiens) {
    return null;
  }

  return (
    <QuestSection
      eyebrow="Reference species"
      title="Meet Homo sapiens"
      intro="You do not choose Homo sapiens as a focus group because it is the fixed reference point for the comparison task."
    >
      <div className="quest-sapiens-feature">
        <div className="quest-sapiens-image">
          <Image src={sapiens.activityWideImage ?? sapiens.figureImage ?? sapiens.posterImage} alt={sapiens.activityWideCaption ?? sapiens.figureCaption ?? sapiens.imageCaption} fill sizes="70vw" className="object-cover" />
        </div>
        <div className="quest-sapiens-copy">
          <p className="quest-kicker">Last surviving human species, not the final goal</p>
          <h3>{sapiens.displayName}</h3>
          <p>{sapiens.hook}</p>
          <div className="quest-field-note-grid">
            <FactTile label="When" value={sapiens.dateRange} />
            <FactTile label="Where" value={sapiens.location} />
            <FactTile label="Body" value={sapiens.bodyPlan} />
            <FactTile label="Uncertainty" value={sapiens.uncertainty} />
          </div>
          <div className="quest-choice-brief quest-sapiens-reminder">
            <strong>Use this carefully</strong>
            <p>
              In the next section, compare your focus group with Homo sapiens and your extra branch. Look for shared
              traits and differences without ranking them from worse to better.
            </p>
          </div>
        </div>
      </div>
    </QuestSection>
  );
}

function ComparisonStep({ work, updateWork }: StepProps) {
  const chosen = hominins.find((group) => group.slug === work.student.chosenGroupSlug);
  const comparison = hominins.find((group) => group.slug === work.student.comparisonGroupSlug);
  const comparisonGroups = uniqueHominins([chosen, sapiens, comparison]);
  const needsThirdBranch = comparisonGroups.length < 3;

  return (
    <QuestSection eyebrow="Comparison" title="Three branches, no ranking" intro="Compare your focus group with Homo sapiens and one other group.">
      <div className="quest-compare-briefings">
        {comparisonGroups.length > 0 ? comparisonGroups.map((group) => (
          <MiniBriefing group={group} key={group.slug} />
        )) : (
          <div className="quest-choice-brief">
            <strong>Choose your groups first</strong>
            <p>Go back to section 3, open a few field notes, then select one focus group and one comparison group.</p>
          </div>
        )}
      </div>
      {needsThirdBranch && (
        <div className="quest-choice-brief">
          <strong>Choose a third branch</strong>
          <p>
            Homo sapiens is already included as the reference species. Go back to section 3 and choose two ancient
            human relatives: one focus group and one extra branch for comparison.
          </p>
        </div>
      )}
      <FieldStack columns>
        <TextArea label="Similarities" limit={textLimits.comparison} value={work.comparison.similarities} onChange={(value) => updateWork((current) => ({ ...current, comparison: { ...current.comparison, similarities: value } }))} />
        <TextArea label="Differences" limit={textLimits.comparison} value={work.comparison.differences} onChange={(value) => updateWork((current) => ({ ...current, comparison: { ...current.comparison, differences: value } }))} />
        <TextArea label="Which groups are most similar?" limit={textLimits.comparison} value={work.comparison.mostSimilar} onChange={(value) => updateWork((current) => ({ ...current, comparison: { ...current.comparison, mostSimilar: value } }))} />
        <TextArea label="Which groups are most different?" limit={textLimits.comparison} value={work.comparison.mostDifferent} onChange={(value) => updateWork((current) => ({ ...current, comparison: { ...current.comparison, mostDifferent: value } }))} />
        <TextArea label="What does the comparison suggest?" limit={textLimits.comparison} value={work.comparison.conclusion} onChange={(value) => updateWork((current) => ({ ...current, comparison: { ...current.comparison, conclusion: value } }))} />
      </FieldStack>
    </QuestSection>
  );
}

function TimelineStep({ work, updateWork }: StepProps) {
  return (
    <QuestSection eyebrow="Timeline and overlap" title="Many humans, shared time" intro="Use overlap and geography to challenge a simple ladder model.">
      <FieldStack columns>
        <TextArea label="Which groups overlapped with Homo sapiens?" limit={textLimits.comparison} value={work.timeline.sapiensOverlap} onChange={(value) => updateWork((current) => ({ ...current, timeline: { ...current.timeline, sapiensOverlap: value } }))} />
        <TextArea label="Which groups overlapped with each other?" limit={textLimits.comparison} value={work.timeline.groupOverlap} onChange={(value) => updateWork((current) => ({ ...current, timeline: { ...current.timeline, groupOverlap: value } }))} />
        <TextArea label="Why does this challenge a ladder?" limit={textLimits.comparison} value={work.timeline.ladderChallenge} onChange={(value) => updateWork((current) => ({ ...current, timeline: { ...current.timeline, ladderChallenge: value } }))} />
        <TextArea label="Why is a branching tree better?" limit={textLimits.comparison} value={work.timeline.branchingTree} onChange={(value) => updateWork((current) => ({ ...current, timeline: { ...current.timeline, branchingTree: value } }))} />
        <TextArea label="How does geography matter?" limit={textLimits.comparison} value={work.timeline.geography} onChange={(value) => updateWork((current) => ({ ...current, timeline: { ...current.timeline, geography: value } }))} />
      </FieldStack>
    </QuestSection>
  );
}

function FinalReportStep({ work, updateWork }: StepProps) {
  return (
    <QuestSection eyebrow="Final article" title="Evaluate the branching tree model" intro="Use evidence from at least three ancient human relatives.">
      <FieldStack>
        <TextInput label="Article title" value={work.finalReport.title} onChange={(value) => updateWork((current) => ({ ...current, finalReport: { ...current.finalReport, title: value } }))} />
        <TextArea label="Final written answer" limit={textLimits.final} rows={12} value={work.finalReport.finalAnswer} onChange={(value) => updateWork((current) => ({ ...current, finalReport: { ...current.finalReport, finalAnswer: value } }))} />
        <TextArea label="One-sentence judgement" limit={textLimits.judgement} value={work.finalReport.oneSentenceJudgement} onChange={(value) => updateWork((current) => ({ ...current, finalReport: { ...current.finalReport, oneSentenceJudgement: value } }))} />
      </FieldStack>
    </QuestSection>
  );
}

function ReflectionStep({ work, updateWork }: StepProps) {
  return (
    <QuestSection eyebrow="Reflection" title="Check and improve" intro="Review the evidence standard before the report is connected in the next stage.">
      <div className="quest-starter-review">
        <p className="quest-kicker">Return to your first thoughts</p>
        <h3>What changed since section 02?</h3>
        <div>
          {work.misconceptions.map((item) => (
            <article key={item.id}>
              <strong>{item.statement}</strong>
              <span>{item.choice ? formatChoice(item.choice) : "Not answered yet"}</span>
              <p>{item.explanation || "No initial explanation recorded yet."}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="quest-checklist">
        {selfAssessmentItems.map((item) => (
          <label key={item.id}>
            <input
              checked={work.reflection.checklist[item.id] ?? false}
              onChange={(event) => updateWork((current) => ({
                ...current,
                reflection: {
                  ...current.reflection,
                  checklist: {
                    ...current.reflection.checklist,
                    [item.id]: event.target.checked,
                  },
                },
              }))}
              type="checkbox"
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
      <FieldStack columns>
        <TextArea label="Most interesting thing learned" limit={textLimits.reflection} value={work.reflection.mostInteresting} onChange={(value) => updateWork((current) => ({ ...current, reflection: { ...current.reflection, mostInteresting: value } }))} />
        <TextArea label="One thing scientists still debate" limit={textLimits.reflection} value={work.reflection.stillDebated} onChange={(value) => updateWork((current) => ({ ...current, reflection: { ...current.reflection, stillDebated: value } }))} />
        <TextArea label="Improvement target" limit={textLimits.reflection} value={work.reflection.improvementTarget} onChange={(value) => updateWork((current) => ({ ...current, reflection: { ...current.reflection, improvementTarget: value } }))} />
      </FieldStack>
      <div className="quest-next-stage-note">
        <strong>Next step</strong>
        <p>Your saved answers now feed the magazine report preview. Open it, check what is missing, then download or save the report as a PDF.</p>
        <Link href="/report-preview" onClick={() => saveStudentWork(work)}>Preview and download report</Link>
      </div>
    </QuestSection>
  );
}

function SpeciesFieldNote({
  group,
  isComparison,
  isFocus,
  onClose,
  onSelectComparison,
  onSelectFocus,
}: {
  group: Hominin;
  isComparison: boolean;
  isFocus: boolean;
  onClose: () => void;
  onSelectComparison: () => void;
  onSelectFocus: () => void;
}) {
  return (
    <div className="quest-modal-backdrop" role="presentation" onClick={onClose}>
      <section aria-modal="true" className="quest-field-note-modal" role="dialog" onClick={(event) => event.stopPropagation()}>
        <button className="quest-modal-close" onClick={onClose} type="button">Close</button>
        <div className="quest-field-note-image">
          <Image src={group.activityWideImage ?? group.figureImage ?? group.posterImage} alt={group.activityWideCaption ?? group.figureCaption ?? group.imageCaption} fill sizes="70vw" className="object-cover" />
        </div>
        <div className="quest-field-note-copy">
          <p className="quest-kicker">{group.kind === "extension" ? "Extension field note" : `Core group ${group.number}`}</p>
          <h3>{group.displayName}</h3>
          <p>{group.subtitle}</p>
          <dl>
            <div>
              <dt>When</dt>
              <dd>{group.dateRange}</dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>{group.location}</dd>
            </div>
            <div>
              <dt>Known for</dt>
              <dd>{group.knownFor}</dd>
            </div>
          </dl>
          <div className="quest-field-note-grid">
            <FactTile label="Body" value={group.bodyPlan} />
            <FactTile label="Life" value={group.lifestyle} />
            <FactTile label="Evidence" value={group.evidence} />
            <FactTile label="Uncertainty" value={group.uncertainty} />
          </div>
          <div className="quest-link-row">
            <a href={`/species/${group.slug}`} target="_blank" rel="noreferrer">Open full species page</a>
            <a href={group.posterImage} target="_blank" rel="noreferrer">Open information sheet</a>
          </div>
          <div className="quest-species-actions">
            <button className={isFocus ? "quest-pill-active" : ""} disabled={group.slug === "homo-sapiens"} onClick={onSelectFocus} type="button">
              {isFocus ? "Focus selected" : "Use as focus"}
            </button>
            <button className={isComparison ? "quest-pill-active" : ""} disabled={group.slug === "homo-sapiens"} onClick={onSelectComparison} type="button">
              {group.slug === "homo-sapiens" ? "Always included" : isComparison ? "Comparison selected" : "Use as comparison"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ResearchLaunchPad({ group }: { group?: Hominin }) {
  if (!group) {
    return (
      <div className="quest-research-launch">
        <div>
          <p className="quest-kicker">Research launchpad</p>
          <h3>Choose a focus group first</h3>
          <p>Go back to section 3 and choose a human relative. This section will then show the right images, information sheet and research starting points.</p>
          <ResearchSitesPanel compact />
        </div>
      </div>
    );
  }

  return (
    <div className="quest-research-launch">
      <div className="quest-research-poster">
        <Image src={group.posterImage} alt={group.imageCaption} fill sizes="320px" className="object-cover" />
      </div>
      <div>
        <p className="quest-kicker">Research launchpad</p>
        <h3>{group.displayName}</h3>
        <p>{group.hook}</p>
        <div className="quest-link-row">
          <a href={group.posterImage} target="_blank" rel="noreferrer">Open the full information sheet</a>
          <a href={`/species/${group.slug}`} target="_blank" rel="noreferrer">Use the app species page</a>
          {researchLinks.map((link) => (
            <a href={link.href} key={link.href} target="_blank" rel="noreferrer">{link.label}</a>
          ))}
        </div>
        <div className="quest-handout-callout">
          Ask your teacher for the printed information sheet if you want to annotate evidence by hand.
        </div>
      </div>
    </div>
  );
}

function ResearchSitesPanel({ compact = false }: { compact?: boolean }) {
  return (
    <aside className={compact ? "quest-source-panel quest-source-panel-compact" : "quest-source-panel"}>
      <p className="quest-kicker">Trusted research sites</p>
      <h3>{compact ? "Research sites" : "Open a source in a new tab"}</h3>
      <p>
        Use these alongside the information sheets. Look for dates, locations, evidence and uncertainty rather than
        copying whole sentences.
      </p>
      <div className="quest-source-links">
        {researchLinks.map((link) => (
          <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
            <span>{link.label}</span>
            <small>New tab</small>
          </a>
        ))}
      </div>
    </aside>
  );
}

function MiniBriefing({ group }: { group: Hominin }) {
  return (
    <article className="quest-mini-briefing">
      <div>
        <Image src={group.figureImage ?? group.posterImage} alt={group.figureCaption ?? group.imageCaption} fill sizes="220px" className="object-cover" />
      </div>
      <p className="quest-kicker">{group.kind === "extension" ? "Extension" : `Group ${group.number}`}</p>
      <h3>{group.displayName}</h3>
      <p>{group.bigIdea}</p>
      <dl>
        <div>
          <dt>When</dt>
          <dd>{group.dateRange}</dd>
        </div>
        <div>
          <dt>Evidence</dt>
          <dd>{group.evidence}</dd>
        </div>
      </dl>
    </article>
  );
}

function FactTile({ label, value }: { label: string; value: string }) {
  return (
    <article>
      <strong>{label}</strong>
      <p>{value}</p>
    </article>
  );
}

type StepProps = {
  work: StudentWork;
  updateWork: (updater: (current: StudentWork) => StudentWork) => void;
};

function QuestSection({ children, eyebrow, intro, title }: { children: ReactNode; eyebrow: string; intro: string; title: string }) {
  return (
    <section>
      <p className="quest-kicker">{eyebrow}</p>
      <h2 className="quest-section-title">{title}</h2>
      <p className="quest-section-intro">{intro}</p>
      {children}
    </section>
  );
}

function FieldStack({ children, columns = false }: { children: ReactNode; columns?: boolean }) {
  return <div className={columns ? "quest-field-stack quest-field-stack-columns" : "quest-field-stack"}>{children}</div>;
}

function TextInput({ label, onChange, placeholder, type = "text", value }: { label: string; onChange: (value: string) => void; placeholder?: string; type?: string; value: string }) {
  return (
    <label className="quest-field">
      <span>{label}</span>
      <input onChange={(event) => onChange(event.target.value)} placeholder={placeholder} type={type} value={value} />
    </label>
  );
}

function TextArea({ label, limit, onChange, rows = 5, value }: { label: string; limit: number; onChange: (value: string) => void; rows?: number; value: string }) {
  const remaining = limit - value.length;

  return (
    <label className="quest-field">
      <span>{label}</span>
      <textarea maxLength={limit} onChange={(event) => onChange(event.target.value)} rows={rows} value={value} />
      <small className={remaining < 40 ? "quest-limit-warn" : ""}>{remaining} characters remaining</small>
    </label>
  );
}

function formatChoice(choice: MisconceptionChoice) {
  if (choice === "partly-true") {
    return "Partly true";
  }

  return choice.charAt(0).toUpperCase() + choice.slice(1);
}

function formatSavedLabel(savedAt: string | null) {
  if (!savedAt) {
    return "Saved";
  }

  return `Saved ${new Date(savedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

function hasText(value: string) {
  return value.trim().length > 0;
}

function isResearchHomininSlug(value: string) {
  return researchHominins.some((group) => group.slug === value);
}

function uniqueHominins(groups: Array<Hominin | undefined>) {
  const seen = new Set<string>();

  return groups.filter((group): group is Hominin => {
    if (!group || seen.has(group.slug)) {
      return false;
    }

    seen.add(group.slug);
    return true;
  });
}
