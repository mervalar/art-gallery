"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const stats = [
  { number: "500+", label: "Artworks" },
  { number: "120", label: "Artists" },
  { number: "45", label: "Exhibitions" },
  { number: "15K", label: "Collectors" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 lg:py-32 bg-secondary/30 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
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
              A Sanctuary for
              <br />
              <span className="italic text-primary">Contemporary Art</span>
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2010, ARTVAULT has established itself as a premier
                destination for contemporary art, bridging the gap between emerging
                talent and discerning collectors worldwide.
              </p>
              <p>
                Our gallery represents a carefully curated roster of artists whose
                work challenges conventions and pushes the boundaries of creative
                expression. From abstract expressionism to digital installations, we
                embrace the full spectrum of contemporary artistic practice.
              </p>
              <p>
                Beyond exhibitions, our magazine and editorial platform provides
                in-depth coverage of the art world, featuring artist interviews,
                critical essays, and coverage of major cultural events.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-12 pt-12 border-t border-border"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <span className="text-3xl md:text-4xl font-serif text-foreground">
                      {stat.number}
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image Grid */}
          <motion.div style={{ y, opacity }} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-64 rounded-xl overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=600&q=80"
                  alt="Gallery interior"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="relative h-64 rounded-xl overflow-hidden mt-8"
              >
                <Image
                  src="https://images.unsplash.com/photo-1577720643272-265f09367456?w=600&q=80"
                  alt="Art exhibition"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative h-64 rounded-xl overflow-hidden col-span-2"
              >
                <Image
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80"
                  alt="Gallery space"
                  fill
                  className="object-cover"
                />
                {/* Glassmorphism overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-background/30 backdrop-blur-md border-t border-foreground/10">
                  <p className="text-sm text-foreground font-medium">
                    Visit our gallery
                  </p>
                  <p className="text-xs text-muted-foreground">
                    123 Art District, New York, NY 10001
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
