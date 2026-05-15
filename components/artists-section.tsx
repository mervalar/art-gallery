"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Instagram, Globe } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const artists = [
  {
    id: 1,
    name: "Isabella Chen",
    specialty: "Abstract Expressionism",
    bio: "Known for her bold use of color and emotional depth, Isabella creates works that explore the boundaries between chaos and harmony.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    works: 47,
    instagram: "#",
    website: "#",
  },
  {
    id: 2,
    name: "Marcus Webb",
    specialty: "Contemporary Sculpture",
    bio: "Marcus transforms industrial materials into thought-provoking sculptures that question our relationship with technology.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    works: 32,
    instagram: "#",
    website: "#",
  },
  {
    id: 3,
    name: "Sofia Martinez",
    specialty: "Mixed Media",
    bio: "Combining traditional techniques with digital elements, Sofia creates immersive experiences that blur reality and imagination.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    works: 58,
    instagram: "#",
    website: "#",
  },
  {
    id: 4,
    name: "James Liu",
    specialty: "Oil Painting",
    bio: "A master of light and shadow, James captures fleeting moments with a classical technique refined by modern sensibility.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    works: 89,
    instagram: "#",
    website: "#",
  },
  {
    id: 5,
    name: "Emma Stone",
    specialty: "Installation Art",
    bio: "Emma creates immersive environments that invite viewers to become part of the artwork, challenging conventional gallery spaces.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    works: 23,
    instagram: "#",
    website: "#",
  },
];

export function ArtistsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % artists.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + artists.length) % artists.length);
  };

  const getVisibleArtists = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(artists[(currentIndex + i) % artists.length]);
    }
    return visible;
  };

  return (
    <section id="artists" className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
              Meet Our Artists
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">
              Artist Spotlight
            </h2>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-border hover:border-accent flex items-center justify-center transition-colors duration-300"
              aria-label="Previous artist"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-border hover:border-accent flex items-center justify-center transition-colors duration-300"
              aria-label="Next artist"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Artists Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getVisibleArtists().map((artist, index) => (
              <motion.div
                key={`${artist.id}-${currentIndex}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group text-center"
              >
                {/* Profile Image */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-border group-hover:border-accent transition-colors duration-500">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Artist Info */}
                <h3 className="text-xl font-serif text-foreground mb-1">
                  {artist.name}
                </h3>
                <p className="text-sm text-accent mb-4">{artist.specialty}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                  {artist.bio}
                </p>

                {/* Stats & Links */}
                <div className="flex items-center justify-center gap-6">
                  <span className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">{artist.works}</span>{" "}
                    Works
                  </span>
                  <div className="flex gap-3">
                    <motion.a
                      href={artist.instagram}
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 rounded-full border border-border hover:border-accent flex items-center justify-center transition-colors duration-300"
                      aria-label={`${artist.name} Instagram`}
                    >
                      <Instagram className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={artist.website}
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 rounded-full border border-border hover:border-accent flex items-center justify-center transition-colors duration-300"
                      aria-label={`${artist.name} Website`}
                    >
                      <Globe className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {artists.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-accent"
                  : "bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Go to artist ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
