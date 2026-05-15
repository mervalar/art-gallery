import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { GallerySection } from "@/components/gallery-section";
import { MagazineSection } from "@/components/magazine-section";
import { ArtistsSection } from "@/components/artists-section";
import { AboutSection } from "@/components/about-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <GallerySection />
      <MagazineSection />
      <ArtistsSection />
      <AboutSection />
      <NewsletterSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
