const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

async function strapiGet<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${STRAPI_URL}/api${endpoint}`);
  url.searchParams.set("populate", "*");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Strapi ${res.status}: ${endpoint} — ${text}`);
  }
  const json = await res.json();
  return json.data;
}

export type StrapiImage = { url: string };

export type StrapiArtwork = {
  id: number;
  documentId: string;
  title: string;
  artist: string;
  price: string;
  category: string;
  image: StrapiImage | null;
  description: string;
  year: string;
  medium: string;
  dimensions: string;
  availabiliy: "Available" | "Reserved" | "Sold";
};

export type StrapiArticle = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown[];
  category: string;
  readTime: string;
  date: string;
  image: StrapiImage | null;
  author: string;
  authorImage: StrapiImage | null;
  featured: boolean;
};

export function getImageUrl(image: StrapiImage | null | undefined): string {
  if (!image?.url) return "";
  return image.url.startsWith("http") ? image.url : `${STRAPI_URL}${image.url}`;
}

export async function getArtworks(): Promise<StrapiArtwork[]> {
  return strapiGet<StrapiArtwork[]>("/art-galleries", {
    "pagination[pageSize]": "100",
  });
}

export async function getArtwork(documentId: string): Promise<StrapiArtwork | null> {
  try {
    return await strapiGet<StrapiArtwork>(`/art-galleries/${documentId}`);
  } catch {
    return null;
  }
}

export async function getArticles(): Promise<StrapiArticle[]> {
  return strapiGet<StrapiArticle[]>("/articles", {
    "pagination[pageSize]": "100",
  });
}

export async function getArticleBySlug(slug: string): Promise<StrapiArticle | null> {
  const data = await strapiGet<StrapiArticle[]>("/articles", {
    "filters[slug][$eq]": slug,
  });
  return data[0] ?? null;
}
