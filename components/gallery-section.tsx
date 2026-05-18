import { getArtworks } from "@/lib/db";
import { GallerySectionClient } from "./gallery-section-client";

export async function GallerySection() {
  const artworks = (await getArtworks()).slice(0, 6);
  return <GallerySectionClient artworks={artworks} />;
}
