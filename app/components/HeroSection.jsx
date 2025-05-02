"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import Button from "./Button";
import GraffitiText from "./GraffitiText";

const HeroSection = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a distorted, glitching effect for the background
      gsap.to(imageRef.current, {
        duration: 0.2,
        x: "+=5",
        y: "+=5",
        repeat: -1,
        yoyo: true,
        ease: "none",
        repeatRefresh: true,
      });

      // Animate the VHS tracking lines effect
      gsap.from(".tracking-line", {
        y: -100,
        height: Math.random() * 10 + 5,
        duration: 0.4,
        ease: "power1.inOut",
        stagger: 0.05,
        repeat: -1,
        repeatRefresh: true,
      });

      // Add a floating animation to the logo
      gsap.to(logoRef.current, {
        y: "+=10",
        rotation: "+=3",
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-thrift-black"
    >
      {/* VHS tracking effect lines */}
      <div className="absolute inset-0 overflow-hidden opacity-40 mix-blend-screen">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="tracking-line absolute w-full h-1 bg-white opacity-30"
            style={{ top: `${Math.random() * 100}%` }}
          ></div>
        ))}
      </div>

      <div
        ref={imageRef}
        className="absolute inset-0 bg-[url('/hero-thrift.jpg')] bg-cover bg-center opacity-60 mix-blend-hard-light"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-thrift-purple/30 to-black"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 py-20 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Featured circular logo */}
          <div ref={logoRef} className="relative mx-auto mb-12 z-10">
            <div className="relative flex justify-center">
              {/* Main large circular logo */}
              <div
                className="relative rounded-full overflow-hidden border-4 border-thrift-teal shadow-retro bg-glitch vhs-tracking
                         w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
              >
                <Image
                  src="/thrifthood_logo.png"
                  alt="ThriftHood.cy Logo"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover animate-vhs-flicker"
                  style={{
                    filter: "contrast(1.2) brightness(1.2)",
                    mixBlendMode: "lighten",
                  }}
                />

                {/* Static overlay */}
                <div className="absolute inset-0 bg-static opacity-10 mix-blend-overlay pointer-events-none"></div>
              </div>

              {/* VHS timestamp */}
              <div className="absolute -bottom-2 -right-2 bg-black/80 px-2 py-1 font-retro text-thrift-teal text-sm border border-thrift-teal">
                REC 90:12:31
              </div>

              {/* Decorative tape strips */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-thrift-yellow/60 transform -rotate-6"></div>
              <div className="absolute -bottom-4 left-1/4 w-16 h-8 bg-thrift-red/60 transform rotate-12"></div>
            </div>
          </div>

          {/* Brand tagline */}
          <div className="text-center mb-8">
            <GraffitiText
              element="h2"
              className="text-3xl md:text-4xl lg:text-5xl mb-2"
              color="text-thrift-yellow"
            >
              Vintage Chaos
            </GraffitiText>
            <GraffitiText
              element="h2"
              className="text-3xl md:text-4xl lg:text-5xl"
              color="text-thrift-teal"
            >
              Meets Street Culture
            </GraffitiText>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="vintage-box p-6 bg-black/70 border-2 border-white max-w-2xl mx-auto transform -rotate-1"
          >
            <p className="text-base md:text-lg text-thrift-teal mb-0 font-bold uppercase text-center">
              A visual playground born from the grit of 90s streetwear and the
              spirit of thrift culture. No algorithms. No gloss. Just chaotic
              creativity and pure thrift energy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button variant="primary">Shop the Collection</Button>
            <Button variant="secondary">Join the Movement</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
