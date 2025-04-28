"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Graffiti wipe overlay animation
      gsap.fromTo(
        overlayRef.current,
        { y: "0%" },
        { y: "-100%", duration: 1.2, ease: "power4.inOut" }
      );

      // Animate title with elastic pop
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.6, y: -50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          delay: 0.6,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
        }
      );

      // Animate subtitle with smooth fade up
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, delay: 1, duration: 1, ease: "power3.out" }
      );

      // Animate buttons with stagger and slap
      gsap.fromTo(
        buttonsRef.current?.children,
        { opacity: 0, y: 40, rotate: -10 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          delay: 1.2,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
        }
      );
    }, heroRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center bg-asphalt text-white overflow-hidden px-6 md:px-0"
    >
      {/* Background Noise Texture */}
      <div className="absolute inset-0 bg-noise-pattern opacity-20 pointer-events-none" />

      {/* Graffiti Black Wipe Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-black z-50" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Hero Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-extrabold graffiti-font leading-tight tracking-tight"
        >
          THRIFTHOOD.CY
        </h1>

        {/* Hero Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl text-gray-400 mt-4 max-w-xl"
        >
          Streetwear · Skateboard Culture · Graffiti Aesthetic
        </p>

        {/* Buttons */}
        <div ref={buttonsRef} className="mt-10 flex flex-col md:flex-row gap-6">
          <button
            className="bg-streetYellow text-black font-bold px-8 py-4 rounded-full graffiti-font transition-all duration-300 shadow-md hover:shadow-xl hover:scale-110 hover:rotate-1"
            type="button"
          >
            SEE COLLECTIONS
          </button>

          <button
            className="border-2 border-electricBlue text-electricBlue font-bold px-8 py-4 rounded-full graffiti-font hover:bg-electricBlue hover:text-black transition-all duration-300 shadow-md hover:shadow-xl hover:scale-110 hover:-rotate-1"
            type="button"
          >
            OUR STORY
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
