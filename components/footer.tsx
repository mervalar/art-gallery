"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, Twitter, Facebook, Linkedin, ArrowUpRight } from "lucide-react";

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
  { name: "Twitter", icon: Twitter, href: "#" },
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
              <span className="text-2xl font-serif tracking-wider text-foreground">
                ART<span className="text-accent">VAULT</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-8">
              A premier destination for contemporary art, bridging emerging talent
              and discerning collectors worldwide since 2010.
            </p>
            
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
            © {new Date().getFullYear()} ARTVAULT. All rights reserved.
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
