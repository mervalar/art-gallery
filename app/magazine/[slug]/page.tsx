export const dynamic = "force-dynamic";

import { getArticleBySlug, getArticles } from "@/lib/db";
import { notFound } from "next/navigation";
import { ArticleDetail } from "./article-detail";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([
    getArticleBySlug(slug),
    getArticles(),
  ]);

  if (!article) notFound();

  const relatedArticles = allArticles
    .filter((a: { category: string; slug: string }) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 2);

  return <ArticleDetail article={article} relatedArticles={relatedArticles} />;
}
