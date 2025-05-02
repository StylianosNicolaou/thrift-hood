import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import LookbookSection from "./components/LookbookSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <LookbookSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
