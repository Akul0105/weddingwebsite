// src/app/page.tsx

import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { VendorCarousel } from "@/components/VendorCarousel";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <VendorCarousel />
      <Footer />
    </main>
  );
}