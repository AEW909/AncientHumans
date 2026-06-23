import Image from "next/image";
import Link from "next/link";
import type { Hominin } from "@/types/hominin";

type SpeciesCardProps = {
  hominin: Hominin;
};

export function SpeciesCard({ hominin }: SpeciesCardProps) {
  return (
    <Link
      className="group relative flex h-full min-h-[34rem] overflow-hidden rounded-md border border-white/10 bg-midnight shadow-[0_30px_90px_rgba(0,0,0,0.38)] transition duration-300 hover:-translate-y-2 hover:border-gold/60 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-gold"
      href={`/species/${hominin.slug}`}
    >
      <div className="absolute inset-0 bg-navy">
        <Image
          src={hominin.posterImage}
          alt={hominin.imageCaption}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover opacity-90 saturate-[0.92] transition duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/64 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-midnight/80 to-transparent" />
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
          <p className="mt-4 max-w-sm text-base font-semibold leading-6 text-paper/86">{hominin.hook}</p>
          <span className="mt-5 inline-flex border-t border-paper/25 pt-3 text-sm font-black uppercase tracking-[0.16em] text-paper">
            View evidence profile
          </span>
        </div>
      </div>
    </Link>
  );
}
