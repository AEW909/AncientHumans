import Image from "next/image";
import Link from "next/link";
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
  return (
    <article className="deep-time-wash fossil-noise min-h-screen text-paper">
      <section className="relative mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
        <div className="relative overflow-hidden rounded-md border border-white/10 bg-midnight shadow-[0_40px_110px_rgba(0,0,0,0.45)]">
          <Image
            src={hominin.posterImage}
            alt={hominin.imageCaption}
            width={1200}
            height={1500}
            priority
            className="h-full w-full object-cover saturate-[0.92]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 via-transparent to-midnight/20" />
          {hominin.kind === "extension" ? (
            <span className="absolute left-4 top-4 bg-rust px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-paper">
              Extension case
            </span>
          ) : null}
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex flex-wrap gap-4 text-sm font-bold uppercase tracking-[0.16em]">
            <Link className="text-gold hover:text-paper" href="/quest">
              Return to web quest
            </Link>
            <Link className="text-paper/70 hover:text-paper" href="/species">
              Back to all groups
            </Link>
          </div>
          <p className="font-heading text-lg font-black uppercase tracking-[0.22em] text-gold">
            Group {String(hominin.number).padStart(2, "0")}
          </p>
          <h1 className="mt-3 font-heading text-5xl font-black uppercase leading-none text-paper md:text-7xl">
            {hominin.scientificName ? <i>{hominin.displayName}</i> : hominin.displayName}
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-semibold leading-8 text-paper/76">{hominin.subtitle}</p>
          <p className="mt-6 max-w-2xl border-l-4 border-gold pl-5 text-2xl font-bold leading-9 text-paper">
            {hominin.hook}
          </p>

          <dl className="mt-8 grid gap-4 md:grid-cols-3">
            {facts.map(([label, key]) => (
              <div className="border border-white/10 bg-black/24 p-4 backdrop-blur" key={label}>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-gold/80">{label}</dt>
                <dd className="mt-2 text-sm font-semibold leading-6 text-paper/84">{hominin[key]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-black/28">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-10 md:grid-cols-3 lg:px-8">
          <InfoPanel title="Big idea" body={hominin.bigIdea} tone="gold" />
          <InfoPanel title="Evidence" body={hominin.evidence} tone="teal" />
          <InfoPanel title="Uncertainty" body={hominin.uncertainty} tone="rust" />
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-6 px-5 py-12 md:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-heading text-3xl font-black uppercase text-paper">Body and Lifestyle</h2>
          <p className="mt-4 leading-7 text-paper/74">{hominin.bodyPlan}</p>
          <p className="mt-4 leading-7 text-paper/74">{hominin.lifestyle}</p>
        </div>
        <div className="border border-gold/30 bg-midnight/70 p-6 text-paper shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Field report note</p>
          <blockquote className="mt-4 font-heading text-3xl font-black leading-tight">
            {hominin.pullQuote}
          </blockquote>
          <p className="mt-5 leading-7 text-paper/80">{hominin.reportCaption}</p>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-black/30">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-heading text-sm font-black uppercase tracking-[0.22em] text-gold">Visual evidence set</p>
            <h2 className="mt-2 font-heading text-4xl font-black uppercase leading-none text-paper">
              Images to compare and question
            </h2>
            <p className="mt-4 leading-7 text-paper/74">
              These images give more context than the field-note pop-up. Treat reconstructions as interpretations and
              use the captions to separate evidence from inference.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <ImageStudyCard
              caption={hominin.figureCaption ?? hominin.imageCaption}
              label="Figure"
              src={hominin.figureImage ?? hominin.posterImage}
            />
            <ImageStudyCard
              caption={hominin.activityCaption ?? hominin.lifestyle}
              label="Behaviour"
              src={hominin.activityImage ?? hominin.posterImage}
            />
            <ImageStudyCard
              caption={hominin.madeCaption ?? hominin.evidence}
              label="Made / Evidence"
              src={hominin.madeImage ?? hominin.vignetteImage ?? hominin.posterImage}
            />
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-6 px-5 py-12 md:grid-cols-[1fr_1fr] lg:px-8">
        <div className="border-l-4 border-teal bg-paper/95 p-6 text-navy">
          <h2 className="font-heading text-3xl font-black uppercase">Use this in your report</h2>
          <ul className="mt-5 space-y-3 font-semibold leading-7 text-navy/78">
            <li>Use the date range to check whether this branch overlapped with other human relatives.</li>
            <li>Use the location to think about geography, isolation and different environments.</li>
            <li>Use the uncertainty statement to avoid writing as if scientists know everything for certain.</li>
          </ul>
        </div>
        <div className="border-l-4 border-rust bg-paper/95 p-6 text-navy">
          <h2 className="font-heading text-3xl font-black uppercase">Questions to ask</h2>
          <ul className="mt-5 space-y-3 font-semibold leading-7 text-navy/78">
            <li>Which evidence is direct, and which part is interpretation?</li>
            <li>What would change if new fossils, DNA or archaeological evidence were found?</li>
            <li>How does this group challenge the idea of a simple ladder?</li>
          </ul>
        </div>
      </section>
    </article>
  );
}

function InfoPanel({ title, body, tone }: { title: string; body: string; tone: "gold" | "teal" | "rust" }) {
  const toneClass = {
    gold: "border-gold",
    teal: "border-teal",
    rust: "border-rust",
  }[tone];

  return (
    <div className={`border-t-4 ${toneClass} bg-paper/95 p-5 text-navy shadow-[0_24px_80px_rgba(0,0,0,0.22)]`}>
      <h2 className="font-heading text-2xl font-black uppercase text-navy">{title}</h2>
      <p className="mt-3 leading-7 text-navy/80">{body}</p>
    </div>
  );
}

function ImageStudyCard({ caption, label, src }: { caption: string; label: string; src: string }) {
  return (
    <article className="overflow-hidden border border-white/10 bg-midnight/74 shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
      <div className="relative aspect-[4/3]">
        <Image src={src} alt={caption} fill sizes="33vw" className="object-cover object-top" />
      </div>
      <div className="p-5">
        <p className="font-heading text-xs font-black uppercase tracking-[0.2em] text-gold">{label}</p>
        <p className="mt-3 text-sm font-semibold leading-6 text-paper/76">{caption}</p>
      </div>
    </article>
  );
}
