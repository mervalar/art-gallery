import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ArtworkForm } from "../../artwork-form";

export const dynamic = "force-dynamic";

export default async function EditArtworkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artwork = await prisma.artwork.findUnique({ where: { id } });
  if (!artwork) notFound();

  return <ArtworkForm artwork={artwork} />;
}
