"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@artvault.com",
    href: "mailto:contact@artvault.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (212) 555-0198",
    href: "tel:+12125550198",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "148 West 57th Street, New York, NY 10019",
    href: "https://maps.google.com",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    await new Promise((r) => setTimeout(r, 800));
    console.log(data);
    setSubmitted(true);
    reset();
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="container mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs tracking-[0.3em] uppercase text-accent border border-accent/30 rounded-full px-4 py-2 bg-accent/5 mb-6"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6"
          >
            Contact <span className="text-primary italic">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl mx-auto text-muted-foreground text-lg leading-relaxed"
          >
            Whether you&apos;re interested in acquiring a piece, commissioning an artwork, or simply want to learn more, we&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 flex flex-col gap-8"
            >
              <div>
                <h2 className="text-2xl font-serif mb-2">Visit the Gallery</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our gallery is open Tuesday through Sunday, 10am – 7pm. Private viewings are available by appointment.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={label === "Address" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <span className="text-xs tracking-wider uppercase text-muted-foreground block mb-1">
                        {label}
                      </span>
                      <span className="text-foreground group-hover:text-accent transition-colors">
                        {value}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs tracking-wider uppercase text-muted-foreground mb-3">
                  Opening Hours
                </p>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tue – Fri</span>
                    <span className="text-foreground">10:00 – 19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sat – Sun</span>
                    <span className="text-foreground">11:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday</span>
                    <span className="text-foreground">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center gap-6 py-16 px-8 bg-card rounded-2xl border border-border"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif mb-2">Message Sent</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-sm">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm tracking-wider uppercase text-accent hover:underline underline-offset-4 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-card rounded-2xl border border-border p-8 lg:p-10 flex flex-col gap-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs tracking-wider uppercase text-muted-foreground">
                        Full Name
                      </label>
                      <input
                        {...register("name")}
                        placeholder="Your name"
                        className="bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                      />
                      {errors.name && (
                        <span className="text-xs text-red-400">{errors.name.message}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs tracking-wider uppercase text-muted-foreground">
                        Email Address
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="your@email.com"
                        className="bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                      />
                      {errors.email && (
                        <span className="text-xs text-red-400">{errors.email.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-wider uppercase text-muted-foreground">
                      Subject
                    </label>
                    <input
                      {...register("subject")}
                      placeholder="How can we help?"
                      className="bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.subject && (
                      <span className="text-xs text-red-400">{errors.subject.message}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-wider uppercase text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={6}
                      placeholder="Tell us about your inquiry..."
                      className="bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                    {errors.message && (
                      <span className="text-xs text-red-400">{errors.message.message}</span>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background rounded-full text-sm tracking-wider uppercase font-medium transition-opacity disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
