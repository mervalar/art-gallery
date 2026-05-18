"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, X, Facebook, Linkedin, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  gallery: [
    { name: "Collection", href: "#" },
    { name: "Exhibitions", href: "#" },
    { name: "New Arrivals", href: "#" },
    { name: "Commission", href: "#" },
  ],
  magazine: [
    { name: "Culture", href: "#" },
    { name: "Interviews", href: "#" },
    { name: "Exhibitions", href: "#" },
    { name: "Inspiration", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Artists", href: "#artists" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ],
  support: [
    { name: "Contact", href: "#contact" },
    { name: "FAQ", href: "#" },
    { name: "Shipping", href: "#" },
    { name: "Returns", href: "#" },
  ],
};

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "X", icon: X, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <span className="text-xl font-serif tracking-[0.15em] uppercase text-foreground leading-none">
                House <span className="text-accent text-xs tracking-[0.3em]">of</span> Frame
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-8">
              A refined space dedicated to the celebration of art, creativity and visual storytelling — founded in 2024 by RUZINDANA JULES.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <a
                href="mailto:Houseofframe026@gmail.com"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <Mail className="w-4 h-4 text-accent shrink-0" />
                Houseofframe026@gmail.com
              </a>
              <a
                href="tel:+250787620213"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <Phone className="w-4 h-4 text-accent shrink-0" />
                +250 787 620 213
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                Kigali, Rwanda
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full border border-border hover:border-accent hover:bg-accent/10 flex items-center justify-center transition-colors duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Gallery */}
            <div>
              <h3 className="text-sm font-medium tracking-wider uppercase text-foreground mb-4">
                Gallery
              </h3>
              <ul className="space-y-3">
                {footerLinks.gallery.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Magazine */}
            <div>
              <h3 className="text-sm font-medium tracking-wider uppercase text-foreground mb-4">
                Magazine
              </h3>
              <ul className="space-y-3">
                {footerLinks.magazine.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-medium tracking-wider uppercase text-foreground mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-medium tracking-wider uppercase text-foreground mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Bottom Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} House of Frame Art Gallery. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="group flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Visit Gallery
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
