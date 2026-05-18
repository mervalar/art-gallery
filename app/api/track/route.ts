import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { path, artworkId, articleId, referer } = await req.json();
    if (!path) return NextResponse.json({ ok: false }, { status: 400 });

    await prisma.pageView.create({
      data: {
        path,
        artworkId: artworkId || null,
        articleId: articleId || null,
        referer: referer || null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
