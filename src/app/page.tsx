import HeroSection from "./components/HeroSection";
import FeaturedLookbook from "./components/FeaturedLookbook";
import AboutSection from "./components/AboutSection";
import CommunitySection from "./components/CommunitySection";
import Footer from "./components/Footer";
export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <FeaturedLookbook />
      <AboutSection />
      <CommunitySection />
      <Footer />
    </main>
  );
}
