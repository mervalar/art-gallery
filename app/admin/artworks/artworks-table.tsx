"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Search } from "lucide-react";

type Artwork = {
  id: string;
  title: string;
  artist: string;
  category: string;
  price: string;
  availability: string;
  published: boolean;
  createdAt: Date;
};

export function ArtworksTable({ artworks }: { artworks: Artwork[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = artworks.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.artist.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/artworks/${id}`, { method: "DELETE" });
    router.refresh();
    setDeleting(null);
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search artworks..."
            className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-muted-foreground font-normal">Title</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-muted-foreground font-normal hidden md:table-cell">Artist</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-muted-foreground font-normal hidden lg:table-cell">Category</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-muted-foreground font-normal hidden lg:table-cell">Price</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-muted-foreground font-normal hidden xl:table-cell">Availability</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-muted-foreground font-normal">Status</th>
              <th className="text-right px-6 py-3 text-xs uppercase tracking-wider text-muted-foreground font-normal">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-muted-foreground">
                  {search ? "No artworks match your search" : "No artworks yet"}
                </td>
              </tr>
            ) : (
              filtered.map((a) => (
                <tr key={a.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium truncate max-w-[200px]">{a.title}</td>
                  <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{a.artist}</td>
                  <td className="px-6 py-4 text-muted-foreground hidden lg:table-cell">{a.category}</td>
                  <td className="px-6 py-4 hidden lg:table-cell">{a.price}</td>
                  <td className="px-6 py-4 hidden xl:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      a.availability === "Available"
                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                        : a.availability === "Sold"
                        ? "border-red-500/30 bg-red-500/10 text-red-400"
                        : "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                    }`}>
                      {a.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      a.published
                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                        : "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                    }`}>
                      {a.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/artworks/${a.id}/edit`}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(a.id, a.title)}
                        disabled={deleting === a.id}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-muted-foreground hover:text-red-400 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
