"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight">
              House of Frame
              <br />
              <span className="italic text-primary text-3xl md:text-4xl">Art Gallery</span>
            </h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                <span className="text-foreground font-medium">HOUSE OF FRAME</span> art gallery was founded in 2024 by young Rwandan digital artist <span className="text-foreground font-medium">RUZINDANA JULES</span>.
              </p>
              <p>
                Founded on deep respect for Craftsmanship and storytelling, we believe every artwork deserves a frame that enhances its presence and preserves its value. We specialize in transforming moments, ideas, and emotions into powerful visual experiences through creative photography, digital manipulation, and artistic storytelling.
              </p>
              <p>
                Our gallery was built to celebrate contemporary visual culture — where photography meets imagination. From fashion editorials and portrait photography to conceptual digital artwork, we create pieces that blend creativity, emotion, and modern aesthetics. Every project is carefully crafted to capture identity, mood, and artistic expression in a unique and timeless way.
              </p>
              <p>
                At House of Frame, we believe digital art is more than editing images — it is about creating visual stories that inspire, connect, and leave lasting impressions. Through exhibitions, collaborations, and creative productions, we aim to support emerging talent while pushing the boundaries of photography and digital design.
              </p>
              <p>
                HOUSE OF FRAME art gallery is a refined space dedicated to the celebration of art, creativity and visual storytelling. We believe that art is more than an object — it is an experience, a voice and reflection of culture and identity. We elevate each piece to its fullest expression, allowing art to speak with clarity and purpose.
              </p>
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 pt-8 border-t border-border"
            >
              <p className="text-lg md:text-xl font-serif text-foreground italic leading-snug">
                &ldquo;At HOUSE OF FRAME we don&apos;t just display —<br />
                we give it a place to belong.&rdquo;
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Logo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center lg:sticky lg:top-32"
          >
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-[#f0efeb] flex items-center justify-center p-8 shadow-2xl">
              <Image
                src="/logo.jpeg"
                alt="House of Frame Art Gallery"
                fill
                className="object-contain p-8"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
