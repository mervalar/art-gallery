"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, X, Upload } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type ArticleFormData = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string | null;
  category?: string;
  readTime?: string | null;
  date?: Date | string;
  image?: string | null;
  author?: string | null;
  authorImage?: string | null;
  featured?: boolean;
  published?: boolean;
};

const CATEGORIES = ["Art News", "Artist Spotlight", "Exhibition", "Art History", "Collecting", "Market Trends", "Interviews", "Opinion"];

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function toDateInputValue(d?: Date | string) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toISOString().split("T")[0];
}

export function ArticleForm({ article }: { article?: ArticleFormData }) {
  const router = useRouter();
  const isEdit = !!article?.id;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(article?.image ?? "");
  const [showImageInput, setShowImageInput] = useState(!article?.image);

  const [form, setForm] = useState({
    title: article?.title ?? "",
    slug: article?.slug ?? "",
    excerpt: article?.excerpt ?? "",
    content: article?.content ?? "",
    category: article?.category ?? "",
    readTime: article?.readTime ?? "",
    date: toDateInputValue(article?.date),
    author: article?.author ?? "",
    authorImage: article?.authorImage ?? "",
    featured: article?.featured ?? false,
    published: article?.published ?? false,
  });

  function set(field: string, value: string | boolean) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !isEdit) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = { ...form, image: imageUrl || null, authorImage: form.authorImage || null };
    const url = isEdit ? `/api/admin/articles/${article!.id}` : "/api/admin/articles";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/articles");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/articles" className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif">{isEdit ? "Edit Article" : "New Article"}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{isEdit ? "Update article content" : "Write a new magazine article"}</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <h2 className="font-serif text-base mb-1">Content</h2>

            <Field label="Title *">
              <input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                required
                placeholder="Article title"
                className="input-field"
              />
            </Field>

            <Field label="Slug *">
              <input
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                required
                placeholder="article-slug"
                className="input-field font-mono text-xs"
              />
            </Field>

            <Field label="Excerpt">
              <textarea
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                rows={3}
                placeholder="Short summary shown in listings..."
                className="input-field resize-none"
              />
            </Field>

            <Field label="Content">
              <textarea
                value={form.content}
                onChange={(e) => set("content", e.target.value)}
                rows={14}
                placeholder="Full article content..."
                className="input-field resize-y"
              />
            </Field>
          </div>

          {/* Author */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <h2 className="font-serif text-base mb-1">Author</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Author Name">
                <input
                  value={form.author}
                  onChange={(e) => set("author", e.target.value)}
                  placeholder="Author name"
                  className="input-field"
                />
              </Field>
              <Field label="Author Image URL">
                <input
                  value={form.authorImage}
                  onChange={(e) => set("authorImage", e.target.value)}
                  placeholder="https://..."
                  className="input-field"
                />
              </Field>
            </div>
          </div>

          {/* Cover image */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-serif text-base mb-4">Cover Image</h2>
            {imageUrl && !showImageInput ? (
              <div className="relative">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                  <Image src={imageUrl} alt="Cover" fill className="object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => { setImageUrl(""); setShowImageInput(true); }}
                  className="absolute top-2 right-2 p-1.5 bg-background/80 rounded-lg hover:bg-background transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Paste an image URL below</p>
                </div>
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                  className="input-field"
                />
                {imageUrl && (
                  <button type="button" onClick={() => setShowImageInput(false)} className="text-xs text-accent hover:underline">
                    Preview image
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <h2 className="font-serif text-base mb-1">Settings</h2>

            <Field label="Category *">
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                required
                className="input-field"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>

            <Field label="Read Time">
              <input
                value={form.readTime}
                onChange={(e) => set("readTime", e.target.value)}
                placeholder="e.g. 5 min read"
                className="input-field"
              />
            </Field>

            <Field label="Publish Date">
              <input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className="input-field"
              />
            </Field>

            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-sm font-medium">Featured</p>
                <p className="text-xs text-muted-foreground">Highlighted in magazine</p>
              </div>
              <button
                type="button"
                onClick={() => set("featured", !form.featured)}
                className={`relative w-11 h-6 rounded-full transition-colors ${form.featured ? "bg-yellow-500" : "bg-muted"}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.featured ? "translate-x-5" : ""}`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-sm font-medium">Published</p>
                <p className="text-xs text-muted-foreground">Visible on the site</p>
              </div>
              <button
                type="button"
                onClick={() => set("published", !form.published)}
                className={`relative w-11 h-6 rounded-full transition-colors ${form.published ? "bg-accent" : "bg-muted"}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.published ? "translate-x-5" : ""}`} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-white rounded-xl text-sm hover:bg-accent/90 transition-colors disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : isEdit ? "Update Article" : "Create Article"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs tracking-wider uppercase text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
