import Image from "next/image";
import Link from "next/link";
import { getEvolutionaryIdeasForSpecies } from "@/data/evolutionaryIdeas";
import { getStimuliForSpecies } from "@/data/stimulusAssets";
import type { Hominin } from "@/types/hominin";

type SpeciesDetailProps = {
  hominin: Hominin;
};

const facts = [
  ["Date range", "dateRange"],
  ["Main location", "location"],
  ["Known for", "knownFor"],
] as const;

export function SpeciesDetail({ hominin }: SpeciesDetailProps) {
  const heroImage = hominin.figureImage ?? hominin.posterImage;
  const heroCaption = hominin.figureCaption ?? hominin.imageCaption;
  const stimulusAssets = getStimuliForSpecies(hominin.slug);
  const conceptIdeas = getEvolutionaryIdeasForSpecies(hominin.slug);
  const learningNotes = hominin.learningNotes ?? {
    evidenceShows: [hominin.evidence],
    reportUses: [hominin.bigIdea, hominin.uncertainty],
    comparisonClues: [hominin.reportCaption],
  };
  const imageStudies = [
    {
      caption: hominin.figureCaption ?? hominin.imageCaption,
      detail: hominin.visualPrompts?.figure ?? "Use this reconstruction to look for body proportions, posture and features described in the evidence.",
      label: "Figure",
      src: hominin.figureImage ?? hominin.posterImage,
    },
    {
      caption: hominin.cultureCaption ?? hominin.bigIdea,
      detail: hominin.visualPrompts?.culture ?? "Use this as a stimulus for thinking about social behaviour and the kinds of evidence scientists use to study it.",
      label: "Cultural stimulus",
      src: hominin.cultureImage ?? hominin.activityImage ?? hominin.posterImage,
    },
    {
      caption: hominin.activityCaption ?? hominin.lifestyle,
      detail: hominin.visualPrompts?.activity ?? "Compare this scene with the body and lifestyle notes. Look for links between environment, anatomy and likely behaviour.",
      label: "Behaviour",
      src: hominin.activityImage ?? hominin.posterImage,
    },
    {
      caption: hominin.madeCaption ?? hominin.evidence,
      detail: hominin.visualPrompts?.made ?? "Use this image to identify the evidence type: artefact, trace, fossil clue or broader archaeological context.",
      label: "Made / Evidence",
      src: hominin.madeImage ?? hominin.vignetteImage ?? hominin.posterImage,
    },
  ];

  return (
    <article className="deep-time-wash fossil-noise min-h-screen text-paper">
      <section className="relative isolate min-h-[calc(100vh-73px)] overflow-hidden">
        <Image
          src={heroImage}
          alt={heroCaption}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top saturate-[0.92]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,transparent_0,rgba(5,7,13,0.08)_28%,rgba(5,7,13,0.86)_72%),linear-gradient(90deg,rgba(5,7,13,0.94)_0%,rgba(5,7,13,0.72)_42%,rgba(5,7,13,0.14)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-midnight to-transparent" />
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl content-center px-5 py-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,0.58fr)] lg:px-8">
          <div className="max-w-3xl">
          <div className="mb-6 flex flex-wrap gap-4 text-sm font-bold uppercase tracking-[0.16em]">
            <Link className="text-gold hover:text-paper" href="/quest">
              Return to web quest
            </Link>
            <Link className="text-paper/70 hover:text-paper" href="/species">
              Back to all groups
            </Link>
          </div>
          <p className="font-heading text-lg font-black uppercase tracking-[0.22em] text-gold">
            {hominin.kind === "extension" ? "Extension case" : `Group ${String(hominin.number).padStart(2, "0")}`}
          </p>
          <h1 className="mt-3 font-heading text-5xl font-black uppercase leading-none text-paper drop-shadow-[0_8px_28px_rgba(0,0,0,0.5)] md:text-7xl">
            {hominin.scientificName ? <i>{hominin.displayName}</i> : hominin.displayName}
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-semibold leading-8 text-paper/76">{hominin.subtitle}</p>
          <p className="mt-6 max-w-2xl border-l-4 border-gold pl-5 text-2xl font-bold leading-9 text-paper/95">
            {hominin.hook}
          </p>

          <dl className="mt-8 grid gap-4 md:grid-cols-3">
            {facts.map(([label, key]) => (
              <div className="bg-black/28 p-4 backdrop-blur" key={label}>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-gold/80">{label}</dt>
                <dd className="mt-2 text-sm font-semibold leading-6 text-paper/84">{hominin[key]}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 max-w-xl text-sm font-semibold leading-6 text-paper/54">{heroCaption}</p>
          </div>
        </div>
      </section>

      <section className="relative bg-black/28">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-10 md:grid-cols-3 lg:px-8">
          <LearningPanel title="What the evidence shows" items={learningNotes.evidenceShows} tone="gold" />
          <LearningPanel title="Useful in your report" items={learningNotes.reportUses} tone="teal" />
          <LearningPanel title="Comparison clues" items={learningNotes.comparisonClues} tone="rust" />
        </div>
      </section>

      {learningNotes.ideasToExplore && (
        <section className="relative mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="grid gap-6 bg-midnight/66 p-6 text-paper backdrop-blur lg:grid-cols-[0.42fr_1fr]">
            <div>
              <p className="font-heading text-xs font-black uppercase tracking-[0.2em] text-gold">Ideas scientists discuss</p>
              <h2 className="mt-2 font-heading text-3xl font-black uppercase leading-tight">Credible possibilities</h2>
              <p className="mt-4 font-semibold leading-7 text-paper/72">
                These are useful angles for questioning and comparison. Use careful wording such as
                "some evidence suggests", "one view is", or "scientists debate".
              </p>
            </div>
            <ul className="grid gap-4 md:grid-cols-2">
              {learningNotes.ideasToExplore.map((idea) => (
                <li className="border-l-4 border-gold bg-black/24 p-4 font-semibold leading-7 text-paper/82" key={idea}>
                  {idea}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="relative mx-auto max-w-7xl px-5 pb-10 lg:px-8">
        <div className="species-stimulus-strip" aria-label={`${hominin.displayName} evidence stimulus images`}>
          {stimulusAssets.map((asset) => (
            <figure key={asset.src}>
              <Image src={asset.src} alt={asset.alt} fill sizes="180px" className="object-cover" />
              <figcaption>{asset.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 pb-12 lg:px-8">
        <div className="species-concept-lenses">
          {conceptIdeas.map((idea) => (
            <article key={idea.id}>
              <div>
                <Image src={idea.poster.src} alt={idea.poster.alt} fill sizes="120px" className="object-cover" />
              </div>
              <p className="font-heading text-xs font-black uppercase text-gold">{idea.shortTitle}</p>
              <h2>{idea.title}</h2>
              <p>{idea.body}</p>
              <small>{idea.evidence}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-16">
        <Image
          src={hominin.activityWideImage ?? hominin.activityImage ?? hominin.posterImage}
          alt={hominin.activityWideCaption ?? hominin.activityCaption ?? hominin.imageCaption}
          fill
          sizes="100vw"
          className="object-cover object-top opacity-82"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,13,0.94)_0%,rgba(5,7,13,0.70)_48%,rgba(5,7,13,0.18)_100%),linear-gradient(0deg,rgba(5,7,13,0.92)_0%,transparent_34%,rgba(5,7,13,0.72)_100%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[minmax(0,0.86fr)_minmax(260px,0.58fr)] lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl font-black uppercase leading-none text-paper md:text-6xl">Body and lifestyle</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-paper/82">{hominin.bodyPlan}</p>
            <p className="mt-4 text-lg font-semibold leading-8 text-paper/76">{hominin.lifestyle}</p>
          </div>
          <div className="self-end bg-midnight/74 p-6 text-paper backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Field report note</p>
            <blockquote className="mt-4 font-heading text-3xl font-black leading-tight">
              {hominin.pullQuote}
            </blockquote>
            <p className="mt-5 leading-7 text-paper/80">{hominin.reportCaption}</p>
          </div>
        </div>
      </section>

      <section className="relative bg-black/30">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-heading text-sm font-black uppercase tracking-[0.22em] text-gold">Visual evidence set</p>
            <h2 className="mt-2 font-heading text-4xl font-black uppercase leading-none text-paper">
              Images to compare and question
            </h2>
            <p className="mt-4 leading-7 text-paper/74">
              These images give more context than the field-note pop-up. Scroll through them slowly, treating each one
              as a prompt for close observation and evidence-based questions.
            </p>
          </div>
          <div className="mt-10 grid gap-12">
            {imageStudies.map((study, index) => (
              <ImageStudyCard
                caption={study.caption}
                detail={study.detail}
                feature={index === 0}
                key={study.label}
                label={study.label}
                src={study.src}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-6 px-5 py-12 md:grid-cols-[1fr_1fr] lg:px-8">
        <div className="bg-paper/95 p-6 text-navy">
          <h2 className="font-heading text-3xl font-black uppercase">Fast facts to transfer</h2>
          <dl className="mt-5 space-y-4 font-semibold leading-7 text-navy/78">
            <div>
              <dt className="font-heading text-xs font-black uppercase tracking-[0.16em] text-rust">When</dt>
              <dd>{hominin.dateRange}</dd>
            </div>
            <div>
              <dt className="font-heading text-xs font-black uppercase tracking-[0.16em] text-rust">Where</dt>
              <dd>{hominin.location}</dd>
            </div>
            <div>
              <dt className="font-heading text-xs font-black uppercase tracking-[0.16em] text-rust">Still debated</dt>
              <dd>{hominin.uncertainty}</dd>
            </div>
          </dl>
        </div>
        <div className="bg-paper/95 p-6 text-navy">
          <h2 className="font-heading text-3xl font-black uppercase">Questions to ask</h2>
          <ul className="mt-5 space-y-3 font-semibold leading-7 text-navy/78">
            <li>Which evidence is direct, and what does it help scientists work out?</li>
            <li>What would change if new fossils, DNA or archaeological evidence were found?</li>
            <li>Which parts of this case are strongest, and which parts stay uncertain?</li>
          </ul>
        </div>
      </section>

      {hominin.sourceLinks && (
        <section className="relative mx-auto max-w-7xl px-5 pb-16 lg:px-8">
          <div className="bg-midnight/72 p-6 text-paper backdrop-blur">
            <p className="font-heading text-xs font-black uppercase tracking-[0.2em] text-gold">Trusted sources</p>
            <h2 className="mt-2 font-heading text-3xl font-black uppercase">Check the evidence</h2>
            <p className="mt-3 max-w-3xl font-semibold leading-7 text-paper/72">
              Use these pupil-friendly museum pages to check dates, locations, fossils, tools and debates before you
              write your field report.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {hominin.sourceLinks.map((link) => (
                <a
                  className="bg-paper px-4 py-3 font-heading text-xs font-black uppercase tracking-[0.12em] text-navy transition hover:bg-gold"
                  href={link.href}
                  key={link.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function LearningPanel({ title, items, tone }: { title: string; items: string[]; tone: "gold" | "teal" | "rust" }) {
  const toneClass = {
    gold: "text-gold",
    teal: "text-teal",
    rust: "text-rust",
  }[tone];
  const dotClass = {
    gold: "bg-gold",
    teal: "bg-teal",
    rust: "bg-rust",
  }[tone];

  return (
    <div className="bg-paper/95 p-5 text-navy shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
      <h2 className={`font-heading text-2xl font-black uppercase ${toneClass}`}>{title}</h2>
      <ul className="mt-4 space-y-3 font-semibold leading-7 text-navy/80">
        {items.map((item) => (
          <li className="flex gap-3" key={item}>
            <span className={`mt-2 block size-2 shrink-0 ${dotClass}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ImageStudyCard({
  caption,
  detail,
  feature = false,
  label,
  src,
}: {
  caption: string;
  detail: string;
  feature?: boolean;
  label: string;
  src: string;
}) {
  return (
    <article className="grid items-end gap-5 lg:grid-cols-[minmax(0,1.18fr)_minmax(280px,0.62fr)]">
      <div className={feature ? "relative min-h-[520px] overflow-hidden" : "relative min-h-[390px] overflow-hidden"}>
        <Image src={src} alt={caption} fill sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover object-top" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_0,transparent_46%,rgba(5,7,13,0.56)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-midnight/92 to-transparent" />
      </div>
      <div className="pb-2 lg:pb-8">
        <p className="font-heading text-xs font-black uppercase tracking-[0.2em] text-gold">{label}</p>
        <p className="mt-3 text-lg font-black leading-7 text-paper">{caption}</p>
        <p className="mt-4 text-base font-semibold leading-7 text-paper/70">{detail}</p>
      </div>
    </article>
  );
}
