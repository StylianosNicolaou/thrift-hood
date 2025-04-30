"use client";

import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import LookbookSection from "./components/LookbookSection";
import NewArrivalsSection from "./components/NewArrivals";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <HeroSection />
      <AboutSection />
      <LookbookSection />
      <NewArrivalsSection />
      <ContactSection />
    </main>
  );
}
