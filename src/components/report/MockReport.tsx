import Link from "next/link";
import type { ReactNode } from "react";
import { hominins } from "@/data/hominins";
import { coreEvidenceStimuli, getStimuliForSpecies, stimulusAssets } from "@/data/stimulusAssets";
import type { ReportReadiness } from "@/lib/reportData";
import type { Hominin } from "@/types/hominin";
import type { MockReportData } from "@/types/report";
import { ReportKicker, ReportPage, ReportPanel, ReportTitle } from "./ReportPage";

type MockReportProps = {
  report: MockReportData;
  readiness?: ReportReadiness;
  source?: "default" | "saved";
  toolbarActions?: ReactNode;
};

const timelineBars = [
  { slug: "australopithecus-afarensis", start: 0, width: 24 },
  { slug: "homo-habilis", start: 32, width: 18 },
  { slug: "homo-erectus", start: 42, width: 42 },
  { slug: "homo-heidelbergensis", start: 72, width: 18 },
  { slug: "neanderthals", start: 82, width: 13 },
  { slug: "denisovans", start: 77, width: 17 },
  { slug: "homo-floresiensis", start: 88, width: 10 },
  { slug: "homo-sapiens", start: 86, width: 14 },
  { slug: "homo-naledi", start: 84, width: 8 },
];

const geographyRegions = [
  {
    name: "Africa",
    groups: ["A. afarensis", "H. habilis", "H. erectus", "H. heidelbergensis", "H. sapiens", "H. naledi"],
  },
  {
    name: "Europe and western Asia",
    groups: ["Neanderthals", "H. heidelbergensis", "H. sapiens"],
  },
  {
    name: "Central and eastern Asia",
    groups: ["Denisovans", "H. erectus", "H. sapiens"],
  },
  {
    name: "Island Southeast Asia",
    groups: ["H. floresiensis", "H. erectus"],
  },
];

export function MockReport({ report, readiness, source = "saved", toolbarActions }: MockReportProps) {
  const chosen = getRequiredHominin(report.student.chosenGroupSlug);
  const comparison = getRequiredHominin(report.student.comparisonGroupSlug);
  const sapiens = getRequiredHominin("homo-sapiens");

  return (
    <div className="report-preview-shell">
      <ReportToolbar readiness={readiness} source={source} toolbarActions={toolbarActions} />
      <div className="report-document">
        <CoverPage report={report} chosen={chosen} />
        <SpeciesFeaturePage report={report} chosen={chosen} />
        <EvidencePage report={report} chosen={chosen} />
        <AdaptationsPage report={report} chosen={chosen} />
        <ComparisonPage report={report} chosen={chosen} sapiens={sapiens} comparison={comparison} />
        <TimelinePage report={report} chosen={chosen} />
        <FinalArticlePage report={report} />
        <ReflectionPage report={report} chosen={chosen} sapiens={sapiens} comparison={comparison} />
      </div>
    </div>
  );
}

function ReportToolbar({
  readiness,
  source,
  toolbarActions,
}: {
  readiness?: ReportReadiness;
  source: "default" | "saved";
  toolbarActions?: ReactNode;
}) {
  return (
    <div className="report-toolbar print:hidden">
      <div>
        <p className="font-heading text-sm font-black uppercase tracking-[0.22em] text-gold">
          {source === "saved" ? "Saved report preview" : "Empty report preview"}
        </p>
        <h1 className="font-heading text-3xl font-black uppercase text-paper">Magazine field report</h1>
      </div>
      <p className="max-w-xl text-sm leading-6 text-paper/70">
        {readiness?.status === "complete"
          ? "This preview is built from the saved web quest answers in this browser."
          : "This preview uses saved answers where available and placeholders where the web quest is not finished yet."}
      </p>
      <div className="report-toolbar-actions">
        {toolbarActions}
        <Link className="report-toolbar-link" href="/quest">Back to web quest</Link>
      </div>
    </div>
  );
}

function CoverPage({ report, chosen }: { report: MockReportData; chosen: Hominin }) {
  return (
    <ReportPage pageNumber={1} title="Cover" className="report-cover-page">
      <ReportImage
        src="/assets/covers/ancient-human-relatives-cover.png"
        alt="Ancient Human Relatives cover artwork"
        className="report-cover-image"
      />
      <div className="report-cover-fade" />
      <dl className="report-cover-details">
        <div>
          <dt>Student</dt>
          <dd>{report.student.name}</dd>
        </div>
        <div>
          <dt>Class</dt>
          <dd>{report.student.className}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{report.student.date}</dd>
        </div>
        <div>
          <dt>Focus group</dt>
          <dd>{chosen.displayName}</dd>
        </div>
      </dl>
    </ReportPage>
  );
}

function SpeciesFeaturePage({ report, chosen }: { report: MockReportData; chosen: Hominin }) {
  return (
    <ReportPage pageNumber={2} title="Species Feature" className="report-dark-page">
      <div className="report-feature-grid">
        <div className="report-poster-frame">
          <ReportImage
            src={chosen.figureImage ?? chosen.posterImage}
            alt={chosen.figureCaption ?? chosen.imageCaption}
            className="object-cover"
          />
        </div>
        <div>
          <ReportKicker>Species feature / Group {String(chosen.number).padStart(2, "0")}</ReportKicker>
          <h2 className="report-feature-title"><i>{chosen.displayName}</i></h2>
          <p className="report-feature-subtitle">{chosen.subtitle}</p>
          <blockquote className="report-pull-quote">{chosen.pullQuote}</blockquote>
          <div className="report-fact-strip">
            <ReportMiniFact label="Date range" value={chosen.dateRange} />
            <ReportMiniFact label="Location" value={chosen.location} />
            <ReportMiniFact label="Known for" value={chosen.knownFor} />
          </div>
        </div>
      </div>
      <div className="report-two-column">
        <ReportPanel title="Why this group matters" tone="gold">
          <p>{report.importanceAnswer}</p>
        </ReportPanel>
        <ReportPanel title="Big idea" tone="teal">
          <p>{chosen.bigIdea}</p>
        </ReportPanel>
      </div>
    </ReportPage>
  );
}

function EvidencePage({ report, chosen }: { report: MockReportData; chosen: Hominin }) {
  return (
    <ReportPage pageNumber={3} title="Evidence Dossier" className="report-paper-page">
      <ReportKicker>Evidence reviewed</ReportKicker>
      <ReportTitle>Evidence dossier: <i>{chosen.displayName}</i></ReportTitle>
      <div className="report-evidence-banner">
        <ReportImage
          src="/assets/report/evidence-dossier-banner.png"
          alt="Fossil, stone tool, DNA and archaeology evidence graphic"
          className="object-cover"
        />
      </div>
      <ReportStimulusRow assets={getStimuliForSpecies(chosen.slug)} />
      <div className="report-evidence-grid">
        <ReportPanel title="Fossils" tone="gold"><p>{report.evidence.fossils}</p></ReportPanel>
        <ReportPanel title="Tools" tone="teal"><p>{report.evidence.tools}</p></ReportPanel>
        <ReportPanel title="DNA" tone="rust"><p>{report.evidence.dna}</p></ReportPanel>
        <ReportPanel title="Archaeology" tone="navy"><p>{report.evidence.archaeology}</p></ReportPanel>
      </div>
      <div className="report-two-column">
        <ReportPanel title="Strongest evidence" tone="gold"><p>{report.evidence.strongest}</p></ReportPanel>
        <ReportPanel title="Limitations and uncertainty" tone="rust"><p>{report.evidence.limitations}</p><p>{chosen.uncertainty}</p></ReportPanel>
      </div>
    </ReportPage>
  );
}

function AdaptationsPage({ report, chosen }: { report: MockReportData; chosen: Hominin }) {
  const activityImage = chosen.activityWideImage ?? chosen.activityImage;
  const activityCaption = chosen.activityWideCaption ?? chosen.activityCaption;

  return (
    <ReportPage pageNumber={4} title="Life and Adaptations" className="report-dark-page">
      <ReportKicker>Evidence suggests / possible adaptation</ReportKicker>
      <ReportTitle>Life, body and survival</ReportTitle>
      <div className="report-adaptation-layout">
        {activityImage ? (
          <div className="report-activity-frame">
            <ReportImage
              src={activityImage}
              alt={activityCaption ?? `${chosen.displayName} activity scene`}
              className="object-cover"
            />
            <span>{activityCaption ?? `Activity scene: ${chosen.displayName}`}</span>
          </div>
        ) : (
          <div className="report-figure-placeholder">
            <strong>Reviewed figure needed</strong>
            <span>A species-specific illustration should be added for {chosen.displayName} before real report export.</span>
          </div>
        )}
        <div className="report-adaptation-panels">
          <ReportPanel title="Body plan" tone="gold"><p>{chosen.bodyPlan}</p></ReportPanel>
          <ReportPanel title="Key feature" tone="teal"><p>{report.life.keyFeature}</p></ReportPanel>
          <ReportPanel title="Why it may have helped" tone="rust"><p>{report.life.featureUsefulness}</p></ReportPanel>
          <ReportPanel title="Likely environment" tone="navy"><p>{report.life.likelyEnvironment}</p></ReportPanel>
        </div>
      </div>
      <div className="report-environment-strip">
        <strong>Survival pressure:</strong> {report.life.survivalPressure}
      </div>
    </ReportPage>
  );
}

function ComparisonPage({ report, chosen, sapiens, comparison }: { report: MockReportData; chosen: Hominin; sapiens: Hominin; comparison: Hominin }) {
  return (
    <ReportPage pageNumber={5} title="Comparison Spread" className="report-paper-page">
      <ReportKicker>Comparison spread</ReportKicker>
      <ReportTitle>Three branches, no ranking</ReportTitle>
      <div className="report-comparison-grid">
        {[chosen, sapiens, comparison].map((group) => (
          <div className="report-profile-card" key={group.id}>
            {group.madeImage ? (
              <div className="report-profile-image">
                <ReportImage
                  src={group.madeImage}
                  alt={group.madeCaption ?? `${group.displayName} made or evidence image`}
                  className="object-cover"
                />
              </div>
            ) : null}
            <span className="report-profile-number">{String(group.number).padStart(2, "0")}</span>
            <h3>{group.displayName}</h3>
            <p><strong>Dates:</strong> {group.dateRange}</p>
            <p><strong>Place:</strong> {group.location}</p>
            <p><strong>Body:</strong> {group.bodyPlan}</p>
            <p><strong>Uncertainty:</strong> {group.uncertainty}</p>
          </div>
        ))}
      </div>
      <div className="report-two-column">
        <ReportPanel title="Similarities" tone="teal"><p>{report.comparison.similarities}</p></ReportPanel>
        <ReportPanel title="Differences" tone="rust"><p>{report.comparison.differences}</p></ReportPanel>
      </div>
      <div className="report-judgement-row">
        <span>{report.comparison.mostSimilar}</span>
        <span>{report.comparison.mostDifferent}</span>
      </div>
    </ReportPage>
  );
}

function TimelinePage({ report, chosen }: { report: MockReportData; chosen: Hominin }) {
  return (
    <ReportPage pageNumber={6} title="Timeline and Overlap" className="report-dark-page">
      <ReportKicker>Many branches / different places / overlapping timelines</ReportKicker>
      <ReportTitle>Timeline and overlap</ReportTitle>
      <div className="report-geography-grid" aria-label="Broad geographic regions represented in the report">
        {geographyRegions.map((region) => (
          <div key={region.name}>
            <h3>{region.name}</h3>
            <p>{region.groups.join(" / ")}</p>
          </div>
        ))}
      </div>
      <div className="report-timeline">
        {timelineBars.map((bar) => {
          const group = getRequiredHominin(bar.slug);
          return (
            <div className="report-timeline-row" key={bar.slug}>
              <span>{group.displayName}</span>
              <div className="report-timeline-track">
                <div
                  className={group.slug === chosen.slug ? "report-timeline-bar report-timeline-focus" : "report-timeline-bar"}
                  style={{ marginLeft: `${bar.start}%`, width: `${bar.width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="report-timeline-analysis">
        <ReportPanel title="Overlap evidence" tone="gold"><p>{report.timeline.overlapAnswer}</p></ReportPanel>
        <ReportPanel title="Why this challenges a ladder" tone="rust"><p>{report.timeline.ladderChallenge}</p><p>{report.timeline.branchingTree}</p></ReportPanel>
        <ReportPanel title="Geography matters too" tone="teal"><p>{report.timeline.geographyAnswer}</p></ReportPanel>
      </div>
      <ReportStimulusRow assets={[stimulusAssets.branchingTimeline, stimulusAssets.footprintTrackway, stimulusAssets.ancientDna]} compact />
      <p className="report-caution-note">
        Broad regions only: this page shows where evidence places different human relatives.
      </p>
    </ReportPage>
  );
}

function FinalArticlePage({ report }: { report: MockReportData }) {
  return (
    <ReportPage pageNumber={7} title="Final Article" className="report-article-page">
      <div className="report-article-layout">
        <aside>
          <strong>Final judgement</strong>
          <span>{report.oneSentenceJudgement}</span>
          <div className="report-big-ideas-note">
            <b>Big idea to use</b>
            <span>{report.bigIdeas.conceptConnection}</span>
          </div>
        </aside>
        <article>
          <ReportKicker>Final evaluation</ReportKicker>
          <h2>{report.articleTitle}</h2>
          <blockquote>{report.oneSentenceJudgement}</blockquote>
          <p className="report-article-body">{report.finalAnswer}</p>
        </article>
      </div>
    </ReportPage>
  );
}

function ReflectionPage({ report, chosen, sapiens, comparison }: { report: MockReportData; chosen: Hominin; sapiens: Hominin; comparison: Hominin }) {
  const usedImageKeys = new Set([
    chosen.figureImage,
    chosen.activityImage,
    chosen.madeImage,
    sapiens.madeImage,
    comparison.madeImage,
  ].filter(Boolean));

  const unusedImages = hominins.flatMap((group) => [
    group.activityImage
      ? {
          caption: group.activityCaption ?? `${group.displayName} activity scene`,
          group,
          src: group.activityImage,
          type: "did",
        }
      : null,
    group.madeImage
      ? {
          caption: group.madeCaption ?? `${group.displayName} made or evidence image`,
          group,
          src: group.madeImage,
          type: "made",
        }
      : null,
  ])
    .filter((item): item is { caption: string; group: Hominin; src: string; type: string } => Boolean(item))
    .filter((item) => !usedImageKeys.has(item.src))
    .slice(0, 12);

  return (
    <ReportPage pageNumber={8} title="Reflection" className="report-back-page">
      <ReportImage
        src="/assets/report/back-cover-branches.png"
        alt="Branching human evolution back cover artwork"
        className="report-back-image"
      />
      <ReportKicker>Reflection / back cover</ReportKicker>
      <ReportTitle>What the evidence changed</ReportTitle>
      <div className="report-reflection-layout">
        <div className="report-checklist">
          {report.reflection.checklist.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="report-evidence-mosaic">
          {unusedImages.map((image) => (
            <div key={`${image.group.id}-${image.type}`}>
              <ReportImage
                src={image.src}
                alt={image.caption}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="report-reflection-cards">
        <ReportPanel title="Most interesting" tone="gold"><p>{report.reflection.mostInteresting}</p></ReportPanel>
        <ReportPanel title="Still debated" tone="rust"><p>{report.reflection.stillDebated}</p></ReportPanel>
        <ReportPanel title="Improvement target" tone="teal"><p>{report.reflection.improvementTarget}</p></ReportPanel>
      </div>
      <ReportStimulusRow assets={coreEvidenceStimuli} compact />
      <p className="report-closing-statement">
        Human evolution is not a straight road. It is a branching story built from fossils, tools, DNA and debate.
      </p>
    </ReportPage>
  );
}

function ReportMiniFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ReportStimulusRow({ assets, compact = false }: { assets: typeof coreEvidenceStimuli; compact?: boolean }) {
  return (
    <div className={compact ? "report-stimulus-row report-stimulus-row-compact" : "report-stimulus-row"} aria-label="Evidence stimulus objects">
      {assets.map((asset) => (
        <div key={asset.src}>
          <ReportImage src={asset.src} alt={asset.alt} className="object-cover" />
        </div>
      ))}
    </div>
  );
}

function ReportImage({ alt, className = "", src }: { alt: string; className?: string; src: string }) {
  return <img alt={alt} className={`report-fill-image ${className}`} loading="eager" src={src} />;
}

function getRequiredHominin(slug: string) {
  const hominin = hominins.find((group) => group.slug === slug);

  if (!hominin) {
    throw new Error(`Missing hominin data for ${slug}`);
  }

  return hominin;
}
