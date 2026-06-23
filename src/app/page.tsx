import Image from "next/image";
import Link from "next/link";
import { hominins } from "@/data/hominins";
import { SpeciesCard } from "@/components/species/SpeciesCard";

export default function HomePage() {
  const featured = hominins.find((hominin) => hominin.slug === "homo-erectus") ?? hominins[0];

  return (
    <div className="deep-time-wash text-paper">
      <section className="relative isolate overflow-hidden bg-midnight text-paper">
        <Image
          src="/assets/covers/ancient-human-relatives-cover.png"
          alt="Ancient Human Relatives cover artwork"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-78 saturate-[0.92]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/72 to-midnight/18" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-midnight to-transparent" />
        <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl content-center gap-10 px-5 py-16 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-6xl font-black uppercase leading-none text-paper md:text-8xl">
              Ancient Human Relatives
            </h1>
            <p className="mt-6 max-w-2xl text-2xl font-semibold leading-9 text-paper/90">
              A web quest into the branching human family tree.
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-paper/78">
              Explore fossils, tools, DNA and debate to understand why human evolution is best seen as a branching story, not a straight ladder.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                className="rounded-full bg-gold px-6 py-3 text-base font-black text-midnight transition hover:bg-paper focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-gold"
                href="/species"
              >
                Browse the human relatives
              </Link>
              <a
                className="rounded-full border border-paper/40 px-6 py-3 text-base font-black text-paper transition hover:bg-paper/10 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-paper"
                href="#first-poster"
              >
                View a poster
              </a>
            </div>
          </div>
          <div id="first-poster" className="hidden self-end lg:block">
            <SpeciesCard hominin={featured} />
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-heading text-4xl font-black uppercase text-paper">Many branches. Overlapping timelines.</h2>
            <p className="mt-4 text-lg leading-8 text-paper/72">
              The first stage of this web quest is a museum-style browser for nine hominin groups. Each profile highlights evidence, uncertainty and why the group matters.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Fact title="9" body="Hominin profiles including one extension case." />
            <Fact title="4+" body="Evidence types: fossils, tools, DNA and archaeology." />
            <Fact title="1" body="Core question about the branching human family tree." />
          </div>
        </div>
      </section>
    </div>
  );
}

function Fact({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-white/10 bg-black/24 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur">
      <p className="font-heading text-4xl font-black text-gold">{title}</p>
      <p className="mt-2 leading-6 text-paper/72">{body}</p>
    </div>
  );
}
