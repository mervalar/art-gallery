"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Eye, TrendingUp, Calendar, BarChart2 } from "lucide-react";

type Props = {
  data: {
    totalViews: number;
    last30: number;
    last7: number;
    chart: { date: string; views: number }[];
    topPages: { path: string; count: number }[];
  };
};

function fmt(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function AnalyticsClient({ data }: Props) {
  const { totalViews, last30, last7, chart, topPages } = data;
  const maxCount = Math.max(...topPages.map((p) => p.count), 1);

  const cards = [
    { label: "All Time Views", value: totalViews, icon: Eye, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Last 30 Days", value: last30, icon: Calendar, color: "text-accent", bg: "bg-accent/10" },
    { label: "Last 7 Days", value: last7, icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Daily Avg (30d)", value: last30 > 0 ? Math.round(last30 / 30) : 0, icon: BarChart2, color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  // Only show every 5th label to avoid crowding
  const tickFormatter = (value: string, index: number) => (index % 5 === 0 ? fmt(value) : "");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Page view statistics for your gallery</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs tracking-wider uppercase text-muted-foreground">{c.label}</p>
              <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center`}>
                <c.icon className={`w-4 h-4 ${c.color}`} />
              </div>
            </div>
            <p className="text-3xl font-serif">{c.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h2 className="font-serif mb-6">Views — Last 30 Days</h2>
        {last30 === 0 ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
            No page views recorded yet. Add the tracking snippet to your public pages.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chart} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={tickFormatter}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                labelFormatter={fmt}
                cursor={{ fill: "hsl(var(--muted))" }}
              />
              <Bar dataKey="views" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Top pages */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-serif">Top Pages (last 30 days)</h2>
        </div>
        {topPages.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">No data yet</p>
        ) : (
          <div className="divide-y divide-border">
            {topPages.map((p) => (
              <div key={p.path} className="flex items-center gap-4 px-6 py-3">
                <p className="text-sm font-mono text-muted-foreground truncate flex-1">{p.path}</p>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden hidden sm:block">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${(p.count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-10 text-right">{p.count}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
