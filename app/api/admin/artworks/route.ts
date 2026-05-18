export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getAdminUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const search = searchParams.get("search") ?? "";
  const skip = (page - 1) * limit;

  const where = search
    ? { OR: [{ title: { contains: search, mode: "insensitive" as const } }, { artist: { contains: search, mode: "insensitive" as const } }] }
    : {};

  const [artworks, total] = await Promise.all([
    prisma.artwork.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } }),
    prisma.artwork.count({ where }),
  ]);

  return NextResponse.json({ artworks, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const session = await getAdminUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, artist, price, category, image, description, year, medium, dimensions, availability, published } = body;

  if (!title || !artist || !price || !category) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const artwork = await prisma.artwork.create({
    data: { title, artist, price, category, image, description, year, medium, dimensions, availability: availability ?? "Available", published: published ?? false },
  });

  return NextResponse.json(artwork, { status: 201 });
}
