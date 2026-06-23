import type { Hominin } from "@/types/hominin";
import { SpeciesCard } from "./SpeciesCard";

type SpeciesGridProps = {
  hominins: Hominin[];
};

export function SpeciesGrid({ hominins }: SpeciesGridProps) {
  return (
    <div className="exhibit-grid grid gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-3">
      {hominins.map((hominin) => (
        <SpeciesCard hominin={hominin} key={hominin.id} />
      ))}
    </div>
  );
}
