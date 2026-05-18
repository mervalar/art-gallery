export const dynamic = "force-dynamic";

import { getArtwork, getArtworks } from "@/lib/db";
import { notFound } from "next/navigation";
import { ArtworkDetail } from "./artwork-detail";

export default async function ArtworkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [artwork, allArtworks] = await Promise.all([
    getArtwork(id),
    getArtworks(),
  ]);

  if (!artwork) notFound();

  const relatedArtworks = allArtworks
    .filter((a: { category: string; id: string }) => a.category === artwork.category && a.id !== artwork.id)
    .slice(0, 3);

  return <ArtworkDetail artwork={artwork} relatedArtworks={relatedArtworks} />;
}
