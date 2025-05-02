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

      // Add a subtle floating animation to the logo
      gsap.to(logoRef.current, {
        y: "+=10",
        duration: 2,
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

      <div className="container mx-auto px-4 md:px-8 relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Logo display in hero section */}
          <div
            ref={logoRef}
            className="relative w-full max-w-md mx-auto mb-12 vhs-tracking"
          >
            <div className="relative h-auto w-full bg-glitch p-4 border-2 border-white shadow-retro transform rotate-1">
              <Image
                src="/thrifthood_logo.png"
                alt="ThriftHood.cy Logo"
                width={600}
                height={250}
                className="w-full h-auto animate-vhs-flicker"
                style={{
                  filter: "contrast(1.2) brightness(1.2)",
                  mixBlendMode: "lighten",
                }}
              />

              {/* Scan line */}
              <div className="absolute left-0 w-full h-[3px] bg-thrift-teal opacity-60 top-1/2 -translate-y-1/2"></div>

              {/* Static overlay */}
              <div className="absolute inset-0 bg-static opacity-10 mix-blend-overlay pointer-events-none"></div>
            </div>

            {/* VHS timestamp */}
            <div className="absolute bottom-0 right-0 bg-black/80 px-2 py-1 font-retro text-thrift-teal text-sm transform translate-y-2 translate-x-2">
              REC 90:12:31
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="vintage-box p-6 bg-black/70 border-2 border-white max-w-2xl transform -rotate-1"
          >
            <p className="text-base md:text-lg text-thrift-teal mb-0 font-bold uppercase">
              A visual playground born from the grit of 90s streetwear and the
              spirit of thrift culture. No algorithms. No gloss. Just chaotic
              creativity and pure thrift energy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-6"
          >
            <Button variant="primary">Shop the Collection</Button>
            <Button variant="secondary">Join the Movement</Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
      >
        <div className="h-16 w-2 bg-thrift-teal mx-auto"></div>
        <div className="mt-2 text-xs uppercase tracking-widest text-thrift-teal font-bold">
          Scroll
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
