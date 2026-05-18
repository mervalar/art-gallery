"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  readTime: string | null;
  date: Date | string;
  image: string | null;
  featured: boolean;
};

function formatDate(date: Date | string) {
  try {
    return format(new Date(date), "MMM d, yyyy");
  } catch {
    return "";
  }
}

export function MagazineSectionClient({ articles }: { articles: Article[] }) {
  const featuredArticle = articles.find((a) => a.featured) ?? articles[0];
  const otherArticles = articles.filter((a) => a.id !== featuredArticle?.id).slice(0, 3);

  if (articles.length === 0) return null;

  return (
    <section id="magazine" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
              Editorial
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">The Magazine</h2>
          </div>
          <Link
            href="/magazine"
            className="text-sm tracking-wider uppercase text-muted-foreground hover:text-accent transition-colors flex items-center gap-2"
          >
            View all articles
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Magazine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Article */}
          {featuredArticle && (
            <Link href={`/magazine/${featuredArticle.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative lg:row-span-2 overflow-hidden rounded-xl bg-card cursor-pointer h-full"
              >
                <div className="relative h-full min-h-[500px]">
                  {featuredArticle.image ? (
                    <Image
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-muted" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="inline-block w-fit px-3 py-1 text-xs tracking-wider uppercase text-accent border border-accent/30 rounded-full bg-accent/10 mb-4">
                      {featuredArticle.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mb-4 leading-tight">
                      {featuredArticle.title}
                    </h3>
                    {featuredArticle.excerpt && (
                      <p className="text-muted-foreground mb-6 leading-relaxed max-w-xl">
                        {featuredArticle.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{formatDate(featuredArticle.date)}</span>
                        {featuredArticle.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {featuredArticle.readTime}
                          </span>
                        )}
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 45 }}
                        className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          )}

          {/* Other Articles */}
          <div className="flex flex-col gap-6">
            {otherArticles.map((article, index) => (
              <Link key={article.id} href={`/magazine/${article.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group flex flex-col sm:flex-row gap-6 p-6 rounded-xl bg-card hover:bg-card/80 transition-colors duration-300 cursor-pointer"
                >
                  <div className="relative w-full sm:w-48 h-48 sm:h-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    {article.image && (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-xs tracking-wider uppercase text-accent mb-2">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-serif text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatDate(article.date)}</span>
                      {article.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
