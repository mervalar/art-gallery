"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";
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
  description: string | null;
  year: string | null;
  medium: string | null;
  dimensions: string | null;
  availability: string;
};

type Props = {
  artwork: Artwork;
  relatedArtworks: Artwork[];
};

export function ArtworkDetail({ artwork, relatedArtworks }: Props) {
  const whatsappMessage = `Hi! I'm interested in the artwork "${artwork.title}" by ${artwork.artist} priced at ${artwork.price}. Is it still available?`;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Back Button */}
      <div className="pt-24 px-6 lg:px-12">
        <div className="container mx-auto">
          <Link href="/artworks">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Gallery
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Artwork Detail */}
      <section className="py-12 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-card">
                {artwork.image && (
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              {/* Availability Badge */}
              <div
                className={`absolute top-6 left-6 px-4 py-2 text-xs tracking-wider uppercase rounded-full backdrop-blur-sm ${
                  artwork.availability === "Available"
                    ? "bg-accent/20 text-accent border border-accent/30"
                    : artwork.availability === "On Hold"
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}
              >
                {artwork.availability}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <span className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
                {artwork.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
                {artwork.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                by <span className="text-foreground">{artwork.artist}</span>
              </p>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {artwork.description}
              </p>

              {/* Artwork Info */}
              <div className="grid grid-cols-2 gap-6 mb-8 p-6 bg-card rounded-xl">
                <div>
                  <span className="text-xs tracking-wider uppercase text-muted-foreground block mb-1">Year</span>
                  <span className="text-foreground">{artwork.year ?? "—"}</span>
                </div>
                <div>
                  <span className="text-xs tracking-wider uppercase text-muted-foreground block mb-1">Medium</span>
                  <span className="text-foreground">{artwork.medium ?? "—"}</span>
                </div>
                <div>
                  <span className="text-xs tracking-wider uppercase text-muted-foreground block mb-1">Dimensions</span>
                  <span className="text-foreground">{artwork.dimensions ?? "—"}</span>
                </div>
                <div>
                  <span className="text-xs tracking-wider uppercase text-muted-foreground block mb-1">Price</span>
                  <span className="text-xl font-serif text-accent">{artwork.price}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href={`https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] text-white rounded-full font-medium transition-shadow hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                >
                  <MessageCircle className="w-5 h-5" />
                  Inquire on WhatsApp
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Artworks */}
      {relatedArtworks.length > 0 && (
        <section className="py-16 px-6 lg:px-12 bg-secondary/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-serif">Related Artworks</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArtworks.map((related, index) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/artworks/${related.id}`}>
                    <div className="group relative overflow-hidden rounded-lg bg-card cursor-pointer">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        {related.image && (
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-serif text-foreground mb-1 group-hover:text-accent transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">by {related.artist}</p>
                        <span className="text-base font-medium text-foreground">{related.price}</span>
                      </div>
                    </div>
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
