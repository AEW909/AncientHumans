import { notFound } from "next/navigation";
import { hominins, getHomininBySlug } from "@/data/hominins";
import { SpeciesDetail } from "@/components/species/SpeciesDetail";

type SpeciesDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return hominins.map((hominin) => ({
    slug: hominin.slug,
  }));
}

export async function generateMetadata({ params }: SpeciesDetailPageProps) {
  const { slug } = await params;
  const hominin = getHomininBySlug(slug);

  if (!hominin) {
    return {
      title: "Hominin Not Found",
    };
  }

  return {
    title: `${hominin.displayName} | Ancient Human Relatives`,
    description: hominin.hook,
  };
}

export default async function SpeciesDetailPage({ params }: SpeciesDetailPageProps) {
  const { slug } = await params;
  const hominin = getHomininBySlug(slug);

  if (!hominin) {
    notFound();
  }

  return <SpeciesDetail hominin={hominin} />;
}
