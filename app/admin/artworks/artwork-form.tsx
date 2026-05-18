"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type ArtworkFormData = {
  id?: string;
  title?: string;
  artist?: string;
  price?: string;
  category?: string;
  image?: string | null;
  description?: string | null;
  year?: string | null;
  medium?: string | null;
  dimensions?: string | null;
  availability?: string;
  published?: boolean;
};

const CATEGORIES = ["Painting", "Sculpture", "Photography", "Drawing", "Digital Art", "Mixed Media", "Print", "Other"];
const AVAILABILITY = ["Available", "Sold", "On Hold", "Not for Sale"];

export function ArtworkForm({ artwork }: { artwork?: ArtworkFormData }) {
  const router = useRouter();
  const isEdit = !!artwork?.id;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(artwork?.image ?? "");
  const [showImageInput, setShowImageInput] = useState(!artwork?.image);

  const [form, setForm] = useState({
    title: artwork?.title ?? "",
    artist: artwork?.artist ?? "",
    price: artwork?.price ?? "",
    category: artwork?.category ?? "",
    description: artwork?.description ?? "",
    year: artwork?.year ?? "",
    medium: artwork?.medium ?? "",
    dimensions: artwork?.dimensions ?? "",
    availability: artwork?.availability ?? "Available",
    published: artwork?.published ?? false,
  });

  function set(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = { ...form, image: imageUrl || null };
    const url = isEdit ? `/api/admin/artworks/${artwork!.id}` : "/api/admin/artworks";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/artworks");
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
        <Link href="/admin/artworks" className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif">{isEdit ? "Edit Artwork" : "New Artwork"}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{isEdit ? "Update artwork details" : "Add a new artwork to your gallery"}</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main fields */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <h2 className="font-serif text-base mb-1">Details</h2>

            <Field label="Title *">
              <input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                required
                placeholder="Artwork title"
                className="input-field"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Artist *">
                <input
                  value={form.artist}
                  onChange={(e) => set("artist", e.target.value)}
                  required
                  placeholder="Artist name"
                  className="input-field"
                />
              </Field>
              <Field label="Price *">
                <input
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  required
                  placeholder="e.g. $12,000"
                  className="input-field"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Year">
                <input
                  value={form.year}
                  onChange={(e) => set("year", e.target.value)}
                  placeholder="e.g. 2024"
                  className="input-field"
                />
              </Field>
              <Field label="Medium">
                <input
                  value={form.medium}
                  onChange={(e) => set("medium", e.target.value)}
                  placeholder="e.g. Oil on canvas"
                  className="input-field"
                />
              </Field>
            </div>

            <Field label="Dimensions">
              <input
                value={form.dimensions}
                onChange={(e) => set("dimensions", e.target.value)}
                placeholder="e.g. 60 × 80 cm"
                className="input-field"
              />
            </Field>

            <Field label="Description">
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={5}
                placeholder="Artwork description..."
                className="input-field resize-none"
              />
            </Field>
          </div>

          {/* Image */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-serif text-base mb-4">Image</h2>
            {imageUrl && !showImageInput ? (
              <div className="relative">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                  <Image src={imageUrl} alt="Artwork" fill className="object-contain" />
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
                  placeholder="https://example.com/image.jpg"
                  className="input-field"
                />
                {imageUrl && (
                  <button
                    type="button"
                    onClick={() => setShowImageInput(false)}
                    className="text-xs text-accent hover:underline"
                  >
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

            <Field label="Availability">
              <select
                value={form.availability}
                onChange={(e) => set("availability", e.target.value)}
                className="input-field"
              >
                {AVAILABILITY.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </Field>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-sm font-medium">Published</p>
                <p className="text-xs text-muted-foreground">Visible on the gallery</p>
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
            {saving ? "Saving..." : isEdit ? "Update Artwork" : "Create Artwork"}
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
