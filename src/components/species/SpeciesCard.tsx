import Image from "next/image";
import Link from "next/link";
import type { Hominin } from "@/types/hominin";

type SpeciesCardProps = {
  hominin: Hominin;
};

export function SpeciesCard({ hominin }: SpeciesCardProps) {
  const heroImage = hominin.figureImage ?? hominin.activityImage ?? hominin.cultureImage ?? hominin.posterImage;
  const heroCaption = hominin.figureCaption ?? hominin.activityCaption ?? hominin.cultureCaption ?? hominin.imageCaption;
  const evidenceImage = hominin.cultureImage ?? hominin.madeImage ?? hominin.vignetteImage ?? hominin.activityImage;
  const evidenceCaption = hominin.cultureCaption ?? hominin.madeCaption ?? hominin.vignetteCaption ?? hominin.activityCaption;

  return (
    <Link
      className="species-browse-card group relative flex h-full min-h-[36rem] overflow-hidden rounded-md bg-midnight shadow-[0_30px_90px_rgba(0,0,0,0.38)] transition duration-300 hover:-translate-y-2 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-gold"
      href={`/species/${hominin.slug}`}
    >
      <div className="species-browse-figure absolute inset-0 bg-navy">
        <Image
          src={heroImage}
          alt={heroCaption}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top opacity-95 saturate-[0.9] transition duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
      </div>
      {evidenceImage ? (
        <div className="species-browse-evidence" aria-hidden="true">
          <Image
            src={evidenceImage}
            alt={evidenceCaption ?? ""}
            fill
            sizes="11rem"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="species-browse-wash absolute inset-0" />
      <div className="relative flex flex-1 flex-col justify-between p-5 text-paper">
        <div className="flex items-start justify-between gap-3">
          <span className="border-b-2 border-gold pb-1 font-heading text-4xl font-black leading-none text-gold">
            {String(hominin.number).padStart(2, "0")}
          </span>
          {hominin.kind === "extension" ? (
            <span className="bg-rust px-3 py-1 text-xs font-black uppercase tracking-wide text-paper shadow-lg">
              Extension
            </span>
          ) : null}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold/90">{hominin.dateRange}</p>
          <h2 className="mt-2 font-heading text-3xl font-black leading-none text-paper drop-shadow">
            {hominin.scientificName ? <i>{hominin.displayName}</i> : hominin.displayName}
          </h2>
          <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-paper/70">{hominin.location}</p>
          <p className="mt-4 max-w-sm text-base font-semibold leading-6 text-paper/86">{hominin.hook}</p>
          <span className="mt-5 inline-flex border-t border-paper/25 pt-3 text-sm font-black uppercase tracking-[0.16em] text-paper">
            View evidence profile
          </span>
        </div>
      </div>
    </Link>
  );
}
