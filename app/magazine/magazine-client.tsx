"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Search, X } from "lucide-react";
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
  category: string;
  readTime: string | null;
  date: Date | string;
  image: string | null;
  author: string | null;
  authorImage: string | null;
  featured: boolean;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } as const,
};

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  try {
    return format(new Date(date), "MMM d, yyyy");
  } catch {
    return String(date);
  }
}

type Props = {
  articles: Article[];
  articleCategories: string[];
};

export function MagazineClient({ articles, articleCategories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.excerpt ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles.find((a) => a.featured);
  const otherArticles = filteredArticles.filter((a) => !a.featured);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-accent mb-4 block">Editorial</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">The Magazine</h1>
            <p className="text-muted-foreground leading-relaxed">
              Dive deep into the world of contemporary art with thoughtful essays, artist interviews,
              exhibition previews, and cultural commentary from our editorial team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-6 lg:px-12 mb-12">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-card border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {articleCategories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs tracking-wider uppercase transition-colors duration-300 rounded-full ${
                    selectedCategory === category
                      ? "bg-foreground text-background"
                      : "border border-border hover:border-accent"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground mt-6">
            Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""}
          </motion.p>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="px-6 lg:px-12 mb-16">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link href={`/magazine/${featuredArticle.slug}`}>
                <article className="group relative overflow-hidden rounded-xl bg-card cursor-pointer">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-80 lg:h-[500px]">
                      {featuredArticle.image && (
                        <Image
                          src={featuredArticle.image}
                          alt={featuredArticle.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <span className="inline-block w-fit px-3 py-1 text-xs tracking-wider uppercase text-accent border border-accent/30 rounded-full bg-accent/10 mb-4">
                        Featured
                      </span>
                      <span className="text-xs tracking-wider uppercase text-muted-foreground mb-4">
                        {featuredArticle.category}
                      </span>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mb-4 leading-tight group-hover:text-accent transition-colors">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{featuredArticle.excerpt}</p>
                      <div className="flex items-center gap-4">
                        {featuredArticle.authorImage && (
                          <Image src={featuredArticle.authorImage} alt={featuredArticle.author ?? ""} width={40} height={40} className="rounded-full" />
                        )}
                        <div>
                          <p className="text-sm text-foreground">{featuredArticle.author}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{formatDate(featuredArticle.date)}</span>
                            {featuredArticle.readTime && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {featuredArticle.readTime}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={selectedCategory + searchQuery}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {otherArticles.map((article) => (
              <motion.div key={article.id} variants={itemVariants}>
                <Link href={`/magazine/${article.slug}`}>
                  <article className="group h-full flex flex-col overflow-hidden rounded-xl bg-card cursor-pointer">
                    <div className="relative h-56 overflow-hidden">
                      {article.image && (
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 45 }}
                        className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                    <div className="flex-1 p-6 flex flex-col">
                      <span className="text-xs tracking-wider uppercase text-accent mb-3">{article.category}</span>
                      <h3 className="text-xl font-serif text-foreground mb-3 group-hover:text-accent transition-colors leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center gap-3 pt-4 border-t border-border">
                        {article.authorImage && (
                          <Image src={article.authorImage} alt={article.author ?? ""} width={32} height={32} className="rounded-full" />
                        )}
                        <div className="flex-1">
                          <p className="text-xs text-foreground">{article.author}</p>
                        </div>
                        {article.readTime && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filteredArticles.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
