import { prisma } from "@/lib/prisma";
import { AnalyticsClient } from "./analytics-client";

export const dynamic = "force-dynamic";

async function getAnalyticsData() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [totalViews, last30, last7, recentViews] = await Promise.all([
    prisma.pageView.count(),
    prisma.pageView.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.pageView.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.pageView.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      orderBy: { createdAt: "asc" },
      select: { createdAt: true, path: true },
    }),
  ]);

  // Build 30-day chart
  const byDay: Record<string, number> = {};
  recentViews.forEach((v: { createdAt: Date; path: string }) => {
    const day = v.createdAt.toISOString().split("T")[0];
    byDay[day] = (byDay[day] ?? 0) + 1;
  });
  const chart: { date: string; views: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    chart.push({ date: key, views: byDay[key] ?? 0 });
  }

  // Top pages
  const pathCounts: Record<string, number> = {};
  recentViews.forEach((v: { createdAt: Date; path: string }) => { pathCounts[v.path] = (pathCounts[v.path] ?? 0) + 1; });
  const topPages = Object.entries(pathCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([path, count]) => ({ path, count }));

  return { totalViews, last30, last7, chart, topPages };
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();
  return <AnalyticsClient data={data} />;
}
