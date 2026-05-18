import { prisma } from "@/lib/prisma";
import { Eye, ImageIcon, FileText, TrendingUp } from "lucide-react";
import Link from "next/link";

async function getStats() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const [artworks, articles, publishedArtworks, publishedArticles, totalViews, monthViews, recentArtworks, recentArticles] =
    await Promise.all([
      prisma.artwork.count(),
      prisma.article.count(),
      prisma.artwork.count({ where: { published: true } }),
      prisma.article.count({ where: { published: true } }),
      prisma.pageView.count(),
      prisma.pageView.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.artwork.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.article.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    ]);
  return { artworks, articles, publishedArtworks, publishedArticles, totalViews, monthViews, recentArtworks, recentArticles };
}

export default async function AdminDashboard() {
  const s = await getStats();

  const cards = [
    { label: "Total Artworks", value: s.artworks, sub: `${s.publishedArtworks} published`, icon: ImageIcon, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Total Articles", value: s.articles, sub: `${s.publishedArticles} published`, icon: FileText, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Page Views (30d)", value: s.monthViews, sub: `${s.totalViews} total all time`, icon: Eye, color: "text-accent", bg: "bg-accent/10" },
    { label: "Growth", value: `+${s.monthViews}`, sub: "visits this month", icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back — here&apos;s what&apos;s happening</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => (
          <div key={c.label} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs tracking-wider uppercase text-muted-foreground">{c.label}</p>
              <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center`}>
                <c.icon className={`w-4 h-4 ${c.color}`} />
              </div>
            </div>
            <p className="text-3xl font-serif mb-1">{c.value}</p>
            <p className="text-xs text-muted-foreground">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Artworks */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-serif">Recent Artworks</h2>
            <Link href="/admin/artworks" className="text-xs text-accent hover:underline underline-offset-2">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-border">
            {s.recentArtworks.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No artworks yet</p>
            ) : (
              s.recentArtworks.map((a: { id: string; title: string; artist: string; category: string; published: boolean }) => (
                <div key={a.id} className="flex items-center justify-between px-6 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.artist} · {a.category}</p>
                  </div>
                  <span className={`ml-3 shrink-0 text-xs px-2 py-0.5 rounded-full border ${
                    a.published ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {a.published ? "Published" : "Draft"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-serif">Recent Articles</h2>
            <Link href="/admin/articles" className="text-xs text-accent hover:underline underline-offset-2">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-border">
            {s.recentArticles.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No articles yet</p>
            ) : (
              s.recentArticles.map((a: { id: string; title: string; author: string | null; category: string; published: boolean }) => (
                <div key={a.id} className="flex items-center justify-between px-6 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.author ?? "—"} · {a.category}</p>
                  </div>
                  <span className={`ml-3 shrink-0 text-xs px-2 py-0.5 rounded-full border ${
                    a.published ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {a.published ? "Published" : "Draft"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
