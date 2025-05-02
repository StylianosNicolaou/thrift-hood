// app/page.js
import HeroSection from "./components/HeroSection";
import LookbookGallery from "./components/LookbookSection";
import ContactSection from "./components/ContactSection";
import AboutSection from "./components/AboutSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-thrift-black">
      <HeroSection />
      <AboutSection />
      <LookbookGallery />
      <ContactSection />
    </main>
  );
}
