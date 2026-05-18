"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Share2, Bookmark, Twitter, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  readTime: string | null;
  date: Date | string;
  image: string | null;
  author: string | null;
  authorImage: string | null;
  featured: boolean;
};

type Props = {
  article: Article;
  relatedArticles: Article[];
};

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  try {
    return format(new Date(date), "MMM d, yyyy");
  } catch {
    return String(date);
  }
}

export function ArticleDetail({ article, relatedArticles }: Props) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Back Button */}
      <div className="pt-24 px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          <Link href="/magazine">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Magazine
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12 px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 text-xs tracking-wider uppercase text-accent border border-accent/30 rounded-full bg-accent/10 mb-6">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-tight text-balance">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{article.excerpt}</p>
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                {article.authorImage && (
                  <Image src={article.authorImage} alt={article.author ?? ""} width={48} height={48} className="rounded-full" />
                )}
                <div className="text-left">
                  <p className="text-foreground font-medium">{article.author}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{formatDate(article.date)}</span>
                    {article.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          {article.image && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-video rounded-xl overflow-hidden mb-12"
            >
              <Image src={article.image} alt={article.title} fill className="object-cover" priority />
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-invert prose-lg max-w-none mb-12 text-muted-foreground leading-relaxed"
          >
            {article.content && (
              <div className="whitespace-pre-wrap">{article.content}</div>
            )}
          </motion.div>

          {/* Share & Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-t border-b border-border mb-12"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Share this article:</span>
              <div className="flex items-center gap-2">
                {[Twitter, Facebook, Linkedin, Share2].map((Icon, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-accent transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.button>
                ))}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 border border-border hover:border-accent rounded-full transition-colors"
            >
              <Bookmark className="w-4 h-4" />
              Save for later
            </motion.button>
          </motion.div>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-6 p-8 bg-card rounded-xl mb-12"
          >
            {article.authorImage && (
              <Image src={article.authorImage} alt={article.author ?? ""} width={80} height={80} className="rounded-full" />
            )}
            <div className="text-center sm:text-left">
              <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">Written by</p>
              <h3 className="text-xl font-serif text-foreground mb-2">{article.author}</h3>
              <p className="text-sm text-muted-foreground">
                Art critic and cultural commentator based in New York. Contributing editor at ARTVAULT
                with a focus on contemporary art movements and emerging artists.
              </p>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 px-6 lg:px-12 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-serif">Related Articles</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((related, index) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/magazine/${related.slug}`}>
                    <article className="group flex flex-col overflow-hidden rounded-xl bg-card cursor-pointer h-full">
                      <div className="relative h-48 overflow-hidden">
                        {related.image && (
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <span className="text-xs tracking-wider uppercase text-accent mb-2">{related.category}</span>
                        <h3 className="text-lg font-serif text-foreground mb-2 group-hover:text-accent transition-colors">
                          {related.title}
                        </h3>
                        <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {related.readTime}
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
