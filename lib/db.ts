import { prisma } from "./prisma";

export async function getArtworks() {
  return prisma.artwork.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getArtwork(id: string) {
  return prisma.artwork.findUnique({ where: { id } });
}

export async function getArticles() {
  return prisma.article.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });
}

export async function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({ where: { slug, published: true } });
}
