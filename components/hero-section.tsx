"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/background.png"
        alt="Art gallery background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Gradient overlay — dark at top and bottom, lighter in center */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80" />
      {/* Extra central darkening so text pops */}
      <div className="absolute inset-0 bg-background/40" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-block px-5 py-2 text-xs tracking-[0.4em] uppercase text-accent border border-accent/40 rounded-full bg-accent/10 backdrop-blur-sm">
            Contemporary Art Gallery
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-6 text-white drop-shadow-lg"
        >
          Where Art Meets
          <br />
          <span className="text-primary italic">Vision</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-20 h-px bg-accent mx-auto mb-8"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-xl mx-auto text-base md:text-lg text-white/80 mb-12 leading-relaxed"
        >
          Discover exceptional contemporary artworks and immerse yourself in the
          world of modern art through our curated exhibitions.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/artworks">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-full text-sm tracking-widest uppercase font-medium shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-shadow"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
          <Link href="/magazine">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-8 py-4 border border-white/30 text-white rounded-full text-sm tracking-widest uppercase backdrop-blur-sm hover:border-white/60 hover:bg-white/5 transition-all"
            >
              Read Magazine
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-white/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
