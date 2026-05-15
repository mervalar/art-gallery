"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type StrapiArtwork, getImageUrl } from "@/lib/strapi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function GallerySectionClient({ artworks }: { artworks: StrapiArtwork[] }) {
  return (
    <section id="gallery" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
            Featured Collection
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            Curated Artworks
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Explore our handpicked selection of extraordinary pieces from
            emerging and established artists worldwide.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {artworks.map((artwork) => (
            <motion.div
              key={artwork.documentId}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg bg-card cursor-pointer"
            >
              <Link href={`/artworks/${artwork.documentId}`}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  {getImageUrl(artwork.image) && (
                    <Image
                      src={getImageUrl(artwork.image)}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500" />
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
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/artworks">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border border-border hover:border-accent text-sm tracking-wider uppercase transition-colors duration-300"
            >
              View All Artworks
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
