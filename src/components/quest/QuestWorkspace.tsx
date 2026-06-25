"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { bigIdeasPageContent, evolutionaryIdeas } from "@/data/evolutionaryIdeas";
import { hominins } from "@/data/hominins";
import { selfAssessmentItems } from "@/data/defaultStudentWork";
import { stimulusAssets, type StimulusAsset } from "@/data/stimulusAssets";
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
  { key: "misconceptions", label: "Baseline" },
  { key: "introChoose", label: "Intro + choose" },
  { key: "investigate", label: "Investigate" },
  { key: "bigIdeas", label: "Fire + language" },
  { key: "comparison", label: "Compare" },
  { key: "timeline", label: "Model check" },
  { key: "finalReport", label: "Report" },
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
  const workbenchRef = useRef<HTMLElement | null>(null);

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

  function moveStep(direction: -1 | 1) {
    setActiveStep((step) => Math.max(0, Math.min(sections.length - 1, step + direction)));
    scrollToWorkbench();
  }

  function scrollToWorkbench() {
    window.requestAnimationFrame(() => {
      const workbenchTop = workbenchRef.current?.getBoundingClientRect().top ?? 0;
      const targetTop = window.scrollY + workbenchTop - 84;

      window.scrollTo({
        behavior: "smooth",
        top: Math.max(0, targetTop),
      });
    });
  }

  function isStepComplete(key: (typeof sections)[number]["key"]) {
    if (!work || !progress) {
      return false;
    }

    if (key === "details") {
      return [work.student.name, work.student.className, work.student.date].every(hasText);
    }

    if (key === "introChoose") {
      return [work.student.chosenGroupSlug, work.student.comparisonGroupSlug].every(isResearchHomininSlug);
    }

    if (key === "investigate") {
      return [work.research.body, work.research.lifestyle, work.evidence.strongest].every(hasText);
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
          src={chosen?.activityWideImage ?? "/assets/covers/human-family-header-clean.png"}
          alt={chosen?.activityWideCaption ?? "Ancient human relatives header artwork"}
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

      <section className="quest-workbench" ref={workbenchRef}>
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
          {activeStep === 2 && <IntroChooseStep updateWork={updateWork} work={work} />}
          {activeStep === 3 && <InvestigateStep updateWork={updateWork} work={work} />}
          {activeStep === 4 && <BigIdeasStep updateWork={updateWork} work={work} />}
          {activeStep === 5 && <ComparisonStep updateWork={updateWork} work={work} />}
          {activeStep === 6 && <TimelineStep updateWork={updateWork} work={work} />}
          {activeStep === 7 && <FinalReportStep updateWork={updateWork} work={work} />}
          {activeStep === 8 && <ReflectionStep updateWork={updateWork} work={work} />}

          <div className="quest-navigation">
            <button disabled={activeStep === 0} onClick={() => moveStep(-1)} type="button">
              Back
            </button>
            <button disabled={activeStep === sections.length - 1} onClick={() => moveStep(1)} type="button">
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
      <div className="quest-baseline-note">
        <strong>Baseline check</strong>
        <p>
          Answer from memory and instinct first. Later, the reflection will ask you to look back at these ideas and decide
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

function IntroChooseStep({ work, updateWork }: StepProps) {
  return (
    <>
      <ProjectIntroStep />
      <ChooseGroupStep updateWork={updateWork} work={work} />
    </>
  );
}

function ProjectIntroStep() {
  return (
    <QuestSection
      eyebrow="Intro"
      title="Intro + choose your branch"
      intro="You will research one ancient human relative, compare it with Homo sapiens and another branch, then turn your evidence into a magazine-style field report."
    >
      <div className="quest-video-feature quest-video-feature-stacked">
        <div>
          <p className="quest-kicker">Big picture</p>
          <h3>Watch for branches, overlap and uncertainty</h3>
          <p>
            This introduction gives the broad human-origins story. As you watch, notice when several human groups exist
            at the same time and when evidence is incomplete or debated.
          </p>
        </div>
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          src="https://www.youtube.com/embed/dGiQaabX3_o"
          title="Kurzgesagt: What Happened Before History? Human Origins"
        />
      </div>
      <div className="quest-project-map">
        <article>
          <span>01</span>
          <strong>Choose a focus branch</strong>
          <p>Open field notes, compare options and pick one ancient human relative to investigate in depth.</p>
        </article>
        <article>
          <span>02</span>
          <strong>Gather evidence</strong>
          <p>Use images, information sheets, species pages and trusted external sites to record careful notes.</p>
        </article>
        <article>
          <span>03</span>
          <strong>Compare three branches</strong>
          <p>Compare your focus branch with Homo sapiens and one other ancient relative using evidence for each branch.</p>
        </article>
        <article>
          <span>04</span>
          <strong>Publish the report</strong>
          <p>Your saved answers feed an 8-page magazine-style field report that can be saved as a PDF.</p>
        </article>
      </div>
      <div className="quest-wide-art" aria-label="Different paths, one human story">
        <Image
          src="/assets/covers/different-paths-footer-clean.png"
          alt="Different paths, one human story landscape banner"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <StimulusStrip assets={[stimulusAssets.footprintTrackway, stimulusAssets.stoneTools, stimulusAssets.ancientDna, stimulusAssets.branchingTimeline]} />
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
                onClick={() => updateWork((current) => ({
                  ...current,
                  student: {
                    ...current.student,
                    chosenGroupSlug: group.slug,
                    comparisonGroupSlug: current.student.comparisonGroupSlug === group.slug ? "" : current.student.comparisonGroupSlug,
                  },
                }))}
                type="button"
              >
                Focus
              </button>
              <button
                className={work.student.comparisonGroupSlug === group.slug ? "quest-pill-active" : ""}
                disabled={work.student.chosenGroupSlug === group.slug}
                onClick={() => updateWork((current) => ({
                  ...current,
                  student: {
                    ...current.student,
                    comparisonGroupSlug: current.student.chosenGroupSlug === group.slug ? current.student.comparisonGroupSlug : group.slug,
                  },
                }))}
                type="button"
              >
                {work.student.chosenGroupSlug === group.slug ? "Focus branch" : "Compare"}
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
          onSelectComparison={() => updateWork((current) => ({
            ...current,
            student: {
              ...current.student,
              comparisonGroupSlug: current.student.chosenGroupSlug === inspectedGroup.slug ? current.student.comparisonGroupSlug : inspectedGroup.slug,
            },
          }))}
          onSelectFocus={() => updateWork((current) => ({
            ...current,
            student: {
              ...current.student,
              chosenGroupSlug: inspectedGroup.slug,
              comparisonGroupSlug: current.student.comparisonGroupSlug === inspectedGroup.slug ? "" : current.student.comparisonGroupSlug,
            },
          }))}
        />
      )}
    </QuestSection>
  );
}

function InvestigateStep({ work, updateWork }: StepProps) {
  const chosen = hominins.find((group) => group.slug === work.student.chosenGroupSlug);

  return (
    <QuestSection
      eyebrow="Investigate"
      title="Look, behave, how we know"
      intro="Use your species page, information sheet and trusted research sites to answer the three investigation prompts for your focus branch."
    >
      <ResearchLaunchPad group={chosen} />
      {chosen && <QuestResourceRow group={chosen} />}
      {chosen && (
        <div className="quest-investigate-grid">
          <article>
            <div>
              <Image src={chosen.figureImage ?? chosen.posterImage} alt={chosen.figureCaption ?? chosen.imageCaption} fill sizes="260px" className="object-cover" />
            </div>
            <p className="quest-kicker">Look</p>
            <h3>{chosen.researchPrompts.look.heading}</h3>
            <p>{chosen.researchPrompts.look.prompt}</p>
            <TextArea
              label="Your look notes"
              limit={textLimits.research}
              value={work.research.body}
              onChange={(value) => updateWork((current) => ({
                ...current,
                life: { ...current.life, keyFeature: value },
                research: { ...current.research, body: value },
              }))}
            />
          </article>
          <article>
            <div>
              <Image src={chosen.activityImage ?? chosen.cultureImage ?? chosen.posterImage} alt={chosen.activityCaption ?? chosen.cultureCaption ?? chosen.imageCaption} fill sizes="260px" className="object-cover" />
            </div>
            <p className="quest-kicker">Behave</p>
            <h3>{chosen.researchPrompts.behave.heading}</h3>
            <p>{chosen.researchPrompts.behave.prompt}</p>
            <TextArea
              label="Your behaviour notes"
              limit={textLimits.research}
              value={work.research.lifestyle}
              onChange={(value) => updateWork((current) => ({
                ...current,
                life: {
                  ...current.life,
                  featureUsefulness: value,
                  likelyLifestyle: value,
                  survivalPressure: value,
                },
                research: { ...current.research, lifestyle: value },
              }))}
            />
          </article>
          <article>
            <div>
              <Image src={chosen.madeImage ?? chosen.vignetteImage ?? chosen.posterImage} alt={chosen.madeCaption ?? chosen.vignetteCaption ?? chosen.imageCaption} fill sizes="260px" className="object-cover" />
            </div>
            <p className="quest-kicker">Evidence</p>
            <h3>{chosen.researchPrompts.evidence.heading}</h3>
            <p>{chosen.researchPrompts.evidence.prompt}</p>
            <TextArea
              label="Your evidence notes"
              limit={textLimits.evidence}
              value={work.evidence.strongest}
              onChange={(value) => updateWork((current) => ({
                ...current,
                evidence: {
                  ...current.evidence,
                  archaeology: value,
                  fossils: value,
                  limitations: value,
                  strongest: value,
                },
                research: {
                  ...current.research,
                  evidence: value,
                  importance: value,
                  uncertainty: value,
                },
              }))}
            />
          </article>
        </div>
      )}
      {!chosen && (
        <div className="quest-choice-brief">
          <strong>Choose your focus branch first</strong>
          <p>Use the previous step to select one ancient human relative as your focus. The investigation prompts will then appear here.</p>
        </div>
      )}
    </QuestSection>
  );
}

function BigIdeasStep({ work, updateWork }: StepProps) {
  return (
    <QuestSection
      eyebrow="Big Ideas"
      title="Fire and language"
      intro={bigIdeasPageContent.pageIntro}
    >
      <div className="quest-big-idea-grid">
        {evolutionaryIdeas.map((idea) => (
          <article className="quest-big-idea-card quest-big-idea-card-active" key={idea.id}>
            <div>
              <Image src={idea.asset.src} alt={idea.asset.alt} fill sizes="220px" className="object-cover" />
            </div>
            <p className="quest-kicker">Shared threshold idea</p>
            <h3>{idea.title}</h3>
            <p>{idea.body}</p>
            <p><strong>Evidence angle:</strong> {idea.evidence}</p>
            <p><strong>Thinking prompt:</strong> {idea.prompt}</p>
          </article>
        ))}
      </div>
      <FieldStack columns>
        <TextArea
          label="Fire thinking"
          limit={textLimits.comparison}
          value={work.bigIdeas.fireCooking}
          onChange={(value) => updateWork((current) => ({ ...current, bigIdeas: { ...current.bigIdeas, fireCooking: value } }))}
        />
        <TextArea
          label="Language thinking"
          limit={textLimits.comparison}
          value={work.bigIdeas.languageLearning}
          onChange={(value) => updateWork((current) => ({ ...current, bigIdeas: { ...current.bigIdeas, languageLearning: value } }))}
        />
        <TextArea
          label="Fire and language side by side"
          limit={textLimits.comparison}
          value={work.bigIdeas.conceptConnection}
          onChange={(value) => updateWork((current) => ({ ...current, bigIdeas: { ...current.bigIdeas, conceptConnection: value } }))}
        />
      </FieldStack>
      <div className="quest-choice-brief">
        <strong>Evidence contrast</strong>
        <p>{bigIdeasPageContent.closing}</p>
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
    <QuestSection
      eyebrow="Comparison"
      title="Compare three branches"
      intro="Use Homo sapiens as the fixed reference point, then compare it with your focus group and one extra branch. Look for shared traits and differences, using evidence for each group."
    >
      {chosen && <QuestResourceRow group={chosen} />}
      <div className="quest-compare-briefings">
        {comparisonGroups.length > 0 ? comparisonGroups.map((group) => (
          <MiniBriefing group={group} key={group.slug} />
        )) : (
          <div className="quest-choice-brief">
            <strong>Choose your groups first</strong>
            <p>Go back to section 03, open a few field notes, then select one focus group and one comparison group.</p>
          </div>
        )}
      </div>
      {needsThirdBranch && (
        <div className="quest-choice-brief">
          <strong>Choose a third branch</strong>
          <p>
            Homo sapiens is already included as the reference species. Go back to section 03 and choose two ancient
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
  const chosen = hominins.find((group) => group.slug === work.student.chosenGroupSlug);

  return (
    <QuestSection eyebrow="Timeline and overlap" title="Many humans, shared time" intro="Use overlap and geography to decide which model best fits the evidence.">
      <div className="quest-timeline-stimulus">
        <div>
          <Image
            src="/assets/report/back-cover-branches.png"
            alt="Branching human evolution visual prompt"
            fill
            sizes="420px"
            className="object-cover"
          />
        </div>
        <article>
          <p className="quest-kicker">Model check</p>
          <h3>Line or branching tree?</h3>
          <p>
            Use dates, overlap, places and uncertainty to decide whether the evidence fits a simple sequence or a
            branching family tree. Open this visual as a prompt if you want a larger view.
          </p>
          <a href="/assets/report/back-cover-branches.png" target="_blank" rel="noreferrer">Open prompt poster</a>
        </article>
      </div>
      {chosen && <QuestResourceRow group={chosen} />}
      <StimulusStrip assets={[stimulusAssets.branchingTimeline, stimulusAssets.footprintTrackway, stimulusAssets.ancientDna]} compact />
      <FieldStack columns>
        <TextArea label="Which groups existed at similar times?" limit={textLimits.comparison} value={work.timeline.sapiensOverlap} onChange={(value) => updateWork((current) => ({ ...current, timeline: { ...current.timeline, sapiensOverlap: value } }))} />
        <TextArea label="What overlap or uncertainty can you find?" limit={textLimits.comparison} value={work.timeline.groupOverlap} onChange={(value) => updateWork((current) => ({ ...current, timeline: { ...current.timeline, groupOverlap: value } }))} />
        <TextArea label="What would a single-line model explain well or badly?" limit={textLimits.comparison} value={work.timeline.ladderChallenge} onChange={(value) => updateWork((current) => ({ ...current, timeline: { ...current.timeline, ladderChallenge: value } }))} />
        <TextArea label="What would a branching tree explain well or badly?" limit={textLimits.comparison} value={work.timeline.branchingTree} onChange={(value) => updateWork((current) => ({ ...current, timeline: { ...current.timeline, branchingTree: value } }))} />
        <TextArea label="How do different places affect the story?" limit={textLimits.comparison} value={work.timeline.geography} onChange={(value) => updateWork((current) => ({ ...current, timeline: { ...current.timeline, geography: value } }))} />
      </FieldStack>
    </QuestSection>
  );
}

function FinalReportStep({ work, updateWork }: StepProps) {
  return (
    <QuestSection eyebrow="Final article" title="Evaluate the branching tree model" intro="Use evidence from at least three ancient human relatives. Add language, learning, fire or cooking only where the evidence makes it relevant.">
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
          <div className="quest-species-actions">
            <button className={isFocus ? "quest-pill-active" : ""} disabled={group.slug === "homo-sapiens"} onClick={onSelectFocus} type="button">
              {isFocus ? "Focus selected" : "Use as focus"}
            </button>
            <button className={isComparison ? "quest-pill-active" : ""} disabled={group.slug === "homo-sapiens" || isFocus} onClick={onSelectComparison} type="button">
              {group.slug === "homo-sapiens" ? "Always included" : isFocus ? "Focus branch" : isComparison ? "Comparison selected" : "Use as comparison"}
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
          <p>Go back to section 03 and choose a human relative. This section will then show the right images, information sheet and research starting points.</p>
          <ResearchSitesPanel compact />
        </div>
      </div>
    );
  }

  return (
    <div className="quest-research-launch">
      <div className="quest-research-poster">
        <Image
          src={group.cultureImage ?? group.activityImage ?? group.vignetteImage ?? group.posterImage}
          alt={group.cultureCaption ?? group.activityCaption ?? group.vignetteCaption ?? group.imageCaption}
          fill
          sizes="320px"
          className="object-cover"
        />
      </div>
      <div>
        <p className="quest-kicker">Research launchpad</p>
        <h3>{group.displayName}</h3>
        <p>{group.hook}</p>
        <p className="quest-asset-note">{group.cultureCaption ?? "Use this image as a stimulus for discussion, then connect your ideas to evidence."}</p>
        <div className="quest-handout-callout">
          Ask your teacher for the printed information sheet if you want to annotate evidence by hand.
        </div>
      </div>
    </div>
  );
}

function QuestResourceRow({ group }: { group: Hominin }) {
  return (
    <div className="quest-resource-row">
      <a href={group.posterImage} target="_blank" rel="noreferrer">Information sheet</a>
      <a href={`/species/${group.slug}`} target="_blank" rel="noreferrer">Species page</a>
      {(group.sourceLinks ?? researchLinks).map((link) => (
        <a href={link.href} key={link.href} target="_blank" rel="noreferrer">{link.label}</a>
      ))}
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

function StimulusStrip({ assets, compact = false }: { assets: StimulusAsset[]; compact?: boolean }) {
  return (
    <div className={compact ? "quest-stimulus-strip quest-stimulus-strip-compact" : "quest-stimulus-strip"} aria-label="Evidence stimulus images">
      {assets.map((asset) => (
        <figure key={asset.src}>
          <Image src={asset.src} alt={asset.alt} fill sizes={compact ? "120px" : "180px"} className="object-cover" />
          <figcaption>{asset.label}</figcaption>
        </figure>
      ))}
    </div>
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

function TextArea({ label, limit, onChange, rows = 2, value }: { label: string; limit: number; onChange: (value: string) => void; rows?: number; value: string }) {
  const remaining = limit - value.length;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  return (
    <label className="quest-field">
      <span>{label}</span>
      <textarea ref={textareaRef} maxLength={limit} onChange={(event) => onChange(event.target.value)} rows={rows} value={value} />
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
