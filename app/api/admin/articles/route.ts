import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(req: NextRequest) {
  const session = await getAdminUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const search = searchParams.get("search") ?? "";
  const skip = (page - 1) * limit;

  const where = search
    ? { OR: [{ title: { contains: search, mode: "insensitive" as const } }, { author: { contains: search, mode: "insensitive" as const } }] }
    : {};

  const [articles, total] = await Promise.all([
    prisma.article.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } }),
    prisma.article.count({ where }),
  ]);

  return NextResponse.json({ articles, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const session = await getAdminUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, slug: rawSlug, excerpt, content, category, readTime, date, image, author, authorImage, featured, published } = body;

  if (!title || !category) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const slug = rawSlug?.trim() || slugify(title);

  const existing = await prisma.article.findUnique({ where: { slug } });
  if (existing) return NextResponse.json({ error: "Slug already in use" }, { status: 409 });

  const article = await prisma.article.create({
    data: { title, slug, excerpt, content, category, readTime, date: date ? new Date(date) : undefined, image, author, authorImage, featured: featured ?? false, published: published ?? false },
  });

  return NextResponse.json(article, { status: 201 });
}
