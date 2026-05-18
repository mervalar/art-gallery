import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ArtworksTable } from "./artworks-table";

export const dynamic = "force-dynamic";

export default async function AdminArtworksPage() {
  const artworks = await prisma.artwork.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif">Artworks</h1>
          <p className="text-sm text-muted-foreground mt-1">{artworks.length} total artworks</p>
        </div>
        <Link
          href="/admin/artworks/new"
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Artwork
        </Link>
      </div>

      <ArtworksTable artworks={artworks} />
    </div>
  );
}
