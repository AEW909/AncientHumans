import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-midnight/75 text-paper backdrop-blur-xl print:hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link className="font-heading text-xl font-black uppercase tracking-wide text-paper drop-shadow" href="/">
          Ancient Human Relatives
        </Link>
        <div className="flex items-center gap-3 text-sm font-semibold">
          <Link className="rounded-full px-3 py-2 text-paper/80 transition hover:bg-white/10 hover:text-paper focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gold" href="/species">
            Browse groups
          </Link>
          <Link className="rounded-full px-3 py-2 text-paper/80 transition hover:bg-white/10 hover:text-paper focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gold" href="/report-preview">
            Report preview
          </Link>
        </div>
      </nav>
    </header>
  );
}
