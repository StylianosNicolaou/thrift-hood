"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "./SectionWrapper";
import GraffitiText from "./GraffitiText";
import Button from "./Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection = () => {
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const staticRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;
    const video = videoRef.current;
    const staticEl = staticRef.current;

    if (image && staticEl) {
      // VHS glitch effect
      gsap.to(staticEl, {
        opacity: () => Math.random() * 0.4 + 0.1,
        duration: 0.2,
        repeat: -1,
        ease: "none",
      });

      // Image distortion effect
      gsap
        .timeline({
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
        .to(image, {
          scale: 1.1,
          rotation: 3,
          duration: 1,
        });
    }
  }, []);

  return (
    <SectionWrapper
      id="about"
      className="bg-gradient-to-b from-black to-vintage-purple pattern-cross"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className="animate-in order-2 md:order-1 text-white">
          <div className="inline-block px-3 py-1 bg-vintage-red text-white border border-white transform -rotate-2 mb-4">
            <p className="text-xs uppercase tracking-widest font-bold">
              Who We Are
            </p>
          </div>

          <GraffitiText
            element="h2"
            className="text-3xl md:text-5xl mb-8 tracking-normal"
            color="text-neon-green"
          >
            Stay Raw. Stay Recycled. Stay Hood.
          </GraffitiText>

          <div className="space-y-6 vintage-tear-edges bg-black/40 p-6 border border-white">
            <p className="text-base font-bold text-neon-pink mb-6 leading-relaxed">
              ThriftHood.cy is a movement: for the skaters, the creators, the
              outsiders, and the rule-breakers. We remix the raw with the
              refined — blending torn textures, retro prints, graffiti tags, and
              nostalgic grit into a visual identity that's loud, unapologetic,
              and real.
            </p>

            <p className="text-base text-white mb-8 leading-relaxed">
              We breathe new life into forgotten fits and make the old feel
              fresh again. Our style is a perfect storm of thrift store
              treasures and street culture chaos. Every piece tells a story of
              rebellion and resurrection.
            </p>
          </div>

          <div className="mt-8">
            <Button variant="thrift">Join The Movement</Button>
          </div>
        </div>

        <div className="animate-in order-1 md:order-2 relative">
          <div className="aspect-[4/5] relative overflow-hidden border-4 border-white transform rotate-2 shadow-retro-xl">
            {/* VHS static effect overlay */}
            <div
              ref={staticRef}
              className="absolute inset-0 bg-static opacity-20 mix-blend-overlay z-10"
            ></div>

            {/* TV scan lines effect */}
            <div className="absolute inset-0 bg-scanlines opacity-30 z-20"></div>

            {/* Tracking lines effect */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-2 bg-white opacity-10 z-30"
                  style={{
                    top: `${Math.floor(Math.random() * 100)}%`,
                    animation: `trackingLine ${
                      Math.random() * 2 + 1
                    }s linear infinite`,
                  }}
                ></div>
              ))}
            </div>

            <div
              ref={imageRef}
              className="absolute inset-0 bg-[url('/about-thrift.jpg')] bg-cover bg-center z-0"
            ></div>

            {/* Date stamp in corner */}
            <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 text-neon-orange font-mono text-sm z-40">
              REC ● 90:12:31
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
