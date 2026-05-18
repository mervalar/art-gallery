import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const artwork = await prisma.artwork.findUnique({ where: { id } });
  if (!artwork) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(artwork);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { title, artist, price, category, image, description, year, medium, dimensions, availability, published } = body;

  if (!title || !artist || !price || !category) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const artwork = await prisma.artwork.update({
    where: { id },
    data: { title, artist, price, category, image, description, year, medium, dimensions, availability, published },
  });

  return NextResponse.json(artwork);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.pageView.deleteMany({ where: { artworkId: id } });
  await prisma.artwork.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
