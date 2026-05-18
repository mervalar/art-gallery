"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Filter, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

type Artwork = {
  id: string;
  title: string;
  artist: string;
  price: string;
  category: string;
  image: string | null;
  availability: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

type Props = {
  artworks: Artwork[];
  categories: string[];
};

export function ArtworksClient({ artworks, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredArtworks =
    selectedCategory === "All"
      ? artworks
      : artworks.filter((a) => a.category === selectedCategory);

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
            <span className="text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
              Our Collection
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              All Artworks
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Explore our complete collection of extraordinary pieces from
              emerging and established artists worldwide. Each work has been
              carefully curated to inspire and captivate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 lg:px-12 mb-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground"
            >
              Showing {filteredArtworks.length} artwork
              {filteredArtworks.length !== 1 ? "s" : ""}
            </motion.p>

            {/* Desktop Filters */}
            <div className="hidden md:flex flex-wrap gap-3">
              {categories.map((category, index) => (
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

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-full text-sm"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 p-4 bg-card rounded-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Filter by Category</span>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowFilters(false);
                    }}
                    className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-colors duration-300 rounded-full ${
                      selectedCategory === category
                        ? "bg-foreground text-background"
                        : "border border-border"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Artworks Grid */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={selectedCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredArtworks.map((artwork) => (
              <motion.div key={artwork.id} variants={itemVariants}>
                <Link href={`/artworks/${artwork.id}`}>
                  <div className="group relative overflow-hidden rounded-lg bg-card cursor-pointer">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {artwork.image && (
                        <Image
                          src={artwork.image}
                          alt={artwork.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Availability Badge */}
                      <div
                        className={`absolute top-4 right-4 px-3 py-1 text-xs tracking-wider uppercase rounded-full ${
                          artwork.availability === "Available"
                            ? "bg-accent/20 text-accent border border-accent/30"
                            : artwork.availability === "On Hold"
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {artwork.availability}
                      </div>

                      {/* Glow Border */}
                      <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500" />

                      {/* Hover Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-xs tracking-[0.2em] uppercase text-accent mb-2">
                          {artwork.category}
                        </span>
                        <h3 className="text-xl font-serif text-foreground mb-1">
                          {artwork.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          by {artwork.artist}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-medium text-foreground">
                            {artwork.price}
                          </span>
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium"
                          >
                            View
                            <ArrowUpRight className="w-4 h-4" />
                          </motion.span>
                        </div>
                      </div>
                    </div>

                    {/* Mobile-visible info */}
                    <div className="p-4 lg:hidden">
                      <span className="text-xs tracking-[0.2em] uppercase text-accent mb-1 block">
                        {artwork.category}
                      </span>
                      <h3 className="text-lg font-serif text-foreground mb-1">
                        {artwork.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        by {artwork.artist}
                      </p>
                      <span className="text-base font-medium text-foreground">
                        {artwork.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
