import { hominins } from "@/data/hominins";
import { SpeciesGrid } from "@/components/species/SpeciesGrid";

export const metadata = {
  title: "Browse Hominin Groups | Ancient Human Relatives",
};

export default function SpeciesPage() {
  const core = hominins.filter((hominin) => hominin.kind === "core");
  const extension = hominins.filter((hominin) => hominin.kind === "extension");

  return (
    <div className="deep-time-wash fossil-noise min-h-screen text-paper">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,166,107,0.16),transparent_34rem)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <p className="font-heading text-lg font-black uppercase tracking-[0.28em] text-gold">Evidence gallery</p>
          <h1 className="mt-3 max-w-5xl font-heading text-5xl font-black uppercase leading-none md:text-7xl">
            Explore the branching human family tree
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-paper/78">
            These groups are presented as related branches with overlapping histories. They are not a ranking and not a straight line toward modern humans.
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:pb-24">
        <div className="mb-9 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="font-heading text-4xl font-black uppercase text-paper">Core groups</h2>
            <p className="mt-2 max-w-xl text-paper/68">Eight profiles for the main web quest sequence, staged as evidence from different branches rather than steps on a ladder.</p>
          </div>
        </div>
        <SpeciesGrid hominins={core} />
      </section>

      <section className="relative mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="mb-7 border-l-4 border-rust bg-black/28 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur">
          <h2 className="font-heading text-4xl font-black uppercase text-rust">Extension case</h2>
          <p className="mt-2 max-w-3xl text-paper/75">
            Homo naledi is included as an extension profile because it raises difficult questions about anatomy, behaviour and classification.
          </p>
        </div>
        <SpeciesGrid hominins={extension} />
      </section>
    </div>
  );
}
