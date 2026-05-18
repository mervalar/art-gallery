export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getAdminUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const days = parseInt(searchParams.get("days") ?? "30");

  const since = new Date();
  since.setDate(since.getDate() - days);

  const views = await prisma.pageView.findMany({
    where: { createdAt: { gte: since } },
    orderBy: { createdAt: "asc" },
    select: { createdAt: true, path: true },
  });

  // Group by day
  const byDay: Record<string, number> = {};
  views.forEach((v: { createdAt: Date; path: string }) => {
    const day = v.createdAt.toISOString().split("T")[0];
    byDay[day] = (byDay[day] ?? 0) + 1;
  });

  // Fill missing days
  const chart: { date: string; views: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    chart.push({ date: key, views: byDay[key] ?? 0 });
  }

  // Top pages
  const pathCounts: Record<string, number> = {};
  views.forEach((v: { createdAt: Date; path: string }) => { pathCounts[v.path] = (pathCounts[v.path] ?? 0) + 1; });
  const topPages = Object.entries(pathCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }));

  const total = await prisma.pageView.count();
  const periodTotal = views.length;

  return NextResponse.json({ chart, topPages, total, periodTotal });
}
