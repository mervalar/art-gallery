import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(article);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { title, slug, excerpt, content, category, readTime, date, image, author, authorImage, featured, published } = body;

  if (!title || !category || !slug) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const conflict = await prisma.article.findFirst({ where: { slug, NOT: { id } } });
  if (conflict) return NextResponse.json({ error: "Slug already in use" }, { status: 409 });

  const article = await prisma.article.update({
    where: { id },
    data: { title, slug, excerpt, content, category, readTime, date: date ? new Date(date) : undefined, image, author, authorImage, featured, published },
  });

  return NextResponse.json(article);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.pageView.deleteMany({ where: { articleId: id } });
  await prisma.article.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
