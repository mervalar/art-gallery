export const dynamic = "force-dynamic";

import { getArtworks } from "@/lib/db";
import { categories } from "@/lib/data";
import { ArtworksClient } from "./artworks-client";

export default async function ArtworksPage() {
  const artworks = await getArtworks();
  return <ArtworksClient artworks={artworks} categories={categories} />;
}
