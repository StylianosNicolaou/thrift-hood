import { HeroSection } from "@/components/HeroSection";
import { DropHighlights } from "@/components/DropHighlights";
import { GraffitiDivider } from "@/components/GraffitiDivider";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <GraffitiDivider />
      <DropHighlights />
      <GraffitiDivider />
      <section className="p-8 text-center">
        <h2 className="text-4xl md:text-6xl font-heading text-street-yellow mb-4">
          About ThriftHood
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-concrete-gray">
          ThriftHood.cy is where urban soul collides with rebellious streetwear.
          Born from the alleys, made for the streets.
        </p>
      </section>
    </div>
  );
}
