"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax and scroll-based animations
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 1, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.2, 0.8], [100, 0, -50]);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8],
    [0.8, 1, 1.1]
  );

  // Refs for staggered animations
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: false, amount: 0.5 });

  // Background elements refs
  const bgRef = useRef(null);
  const bgInView = useInView(bgRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden bg-black"
      id="about"
    >
      {/* Background textures and elements */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        {/* Bottom texture */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: bgInView ? 0.2 : 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-purple-900/30 to-transparent"
        />

        {/* Animated pattern */}
        <motion.div
          style={{
            backgroundImage: "url('/assets/textures/grunge/020.jpg')",
            backgroundSize: "cover",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: bgInView ? 0.15 : 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 mix-blend-overlay"
        />

        {/* Street art elements */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: bgInView ? 0 : -100, opacity: bgInView ? 0.7 : 0 }}
          transition={{ duration: 1, delay: 0.4, type: "spring" }}
          className="absolute -left-10 top-1/4 w-44 h-56 md:w-60 md:h-72 lg:w-80 lg:h-96"
        >
          <Image
            src="/assets/textures/stickers/03.png"
            alt="Street art element"
            fill
            className="object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: bgInView ? 0 : 100, opacity: bgInView ? 0.7 : 0 }}
          transition={{ duration: 1, delay: 0.6, type: "spring" }}
          className="absolute -right-5 top-2/3 w-40 h-48 md:w-56 md:h-64 lg:w-72 lg:h-80"
        >
          <Image
            src="/assets/textures/stickers/07.png"
            alt="Street art element"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* Retro cassette tape decoration */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
        className="absolute -bottom-10 -left-10 w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 rotate-12 opacity-60 pointer-events-none"
      >
        <Image
          src="/assets/images/cassette-tape.png"
          alt="Retro Cassette Tape"
          fill
          className="object-contain"
        />
      </motion.div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-[2000px] relative z-10">
        {/* Section heading with animated underline */}
        <div
          ref={headingRef}
          className="flex flex-col items-center mb-24 md:mb-32 lg:mb-40"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: headingInView ? 1 : 0,
              y: headingInView ? 0 : 20,
            }}
            transition={{ duration: 0.7 }}
            className="relative inline-block"
          >
            <h2 className="text-5xl md:text-6xl lg:text-8xl text-white font-chineseRocks relative z-10">
              Our Story
            </h2>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: headingInView ? "100%" : "0%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-3 left-0 h-[4px] bg-gradient-to-r from-pink-500 via-yellow-300 to-lime-400"
            />

            {/* Graffiti spray decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: headingInView ? 0.7 : 0,
                scale: headingInView ? 1 : 0.7,
              }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -top-6 -right-12 -z-10 w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
            >
              <Image
                src="/assets/textures/spray/05.png"
                alt="Spray decoration"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 lg:gap-32 items-center max-w-[1800px] mx-auto">
          {/* Content column with fade up staggered paragraphs */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="order-2 md:order-1"
          >
            <div className="space-y-8">
              {/* Paragraphs with staggered animation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  y: isInView ? 0 : 30,
                }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <p className="text-white/90 text-xl md:text-2xl lg:text-3xl leading-relaxed">
                  <span className="text-yellow-300 font-bold text-2xl md:text-3xl lg:text-4xl">
                    THRIFTHOOD
                  </span>{" "}
                  was born in 2018 when a group of skaters and vintage
                  enthusiasts joined forces to rescue forgotten 90s streetwear
                  treasures from obscurity.
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 0.3 : 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="absolute -left-6 -top-3 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                >
                  <Image
                    src="/assets/textures/quotes/01.png"
                    alt="Quote decoration"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  y: isInView ? 0 : 30,
                }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-white/90 text-xl md:text-2xl lg:text-3xl leading-relaxed"
              >
                What started as a small collection in a downtown basement has
                evolved into a curated marketplace preserving the authenticity
                of vintage streetwear culture while making it accessible to a
                new generation.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  y: isInView ? 0 : 30,
                }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-white/90 text-xl md:text-2xl lg:text-3xl leading-relaxed"
              >
                Each piece in our collection tells a story – from legendary
                skate brands and hip-hop merch to one-of-a-kind custom pieces
                that capture the raw energy of 90s street culture.
              </motion.p>
            </div>

            {/* Values chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20,
              }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 mt-12"
            >
              {["Authentic", "Sustainable", "Original", "Rare Finds"].map(
                (value, i) => (
                  <motion.span
                    key={value}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: isInView ? 1 : 0,
                      scale: isInView ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500/20 to-purple-600/20 
                          border border-pink-500/40 rounded-sm text-pink-300 text-base md:text-lg lg:text-xl font-medium"
                  >
                    {value}
                  </motion.span>
                )
              )}
            </motion.div>
          </motion.div>

          {/* Image collage */}
          <motion.div
            style={{ scale: imageScale }}
            className="order-1 md:order-2 relative"
          >
            <div className="relative h-[450px] md:h-[550px] lg:h-[700px] w-full max-w-3xl mx-auto">
              {/* Main image */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -5 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  y: isInView ? 0 : 30,
                  rotate: isInView ? 0 : -5,
                }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                className="absolute z-20 top-0 right-0 w-[85%] h-[65%] shadow-xl"
              >
                <div className="relative w-full h-full overflow-hidden border-8 border-white">
                  <Image
                    src="/assets/images/about-main.jpg"
                    alt="Vintage Streetwear Collection"
                    fill
                    className="object-cover"
                  />

                  {/* Scratched overlay */}
                  <div className="absolute inset-0 bg-scratch opacity-20 mix-blend-overlay"></div>

                  {/* Polaroid style label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white py-3 px-4">
                    <p className="text-black text-base md:text-lg lg:text-xl font-handwriting">
                      Summer Collection '23
                    </p>
                  </div>
                </div>

                {/* Decorative tape */}
                <div className="absolute -top-5 right-12 w-20 h-10 bg-yellow-400/80 rotate-12"></div>
              </motion.div>

              {/* Secondary image */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: 5 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  y: isInView ? 0 : 30,
                  rotate: isInView ? 0 : 5,
                }}
                transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                className="absolute z-10 bottom-0 left-0 w-[75%] h-[60%] shadow-xl"
              >
                <div className="relative w-full h-full overflow-hidden border-8 border-white">
                  <Image
                    src="/assets/images/about-secondary.jpg"
                    alt="Vintage Store Interior"
                    fill
                    className="object-cover"
                  />

                  {/* Scratched overlay */}
                  <div className="absolute inset-0 bg-scratch opacity-20 mix-blend-overlay"></div>

                  {/* Polaroid style label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white py-3 px-4">
                    <p className="text-black text-base md:text-lg lg:text-xl font-handwriting">
                      Our First Shop
                    </p>
                  </div>
                </div>

                {/* Decorative tape */}
                <div className="absolute -top-5 left-16 w-20 h-10 bg-lime-400/80 -rotate-6"></div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                animate={{
                  opacity: isInView ? 0.9 : 0,
                  rotate: isInView ? 0 : -10,
                }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute z-30 -bottom-8 right-16 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
              >
                <Image
                  src="/assets/textures/stickers/15.png"
                  alt="Decorative sticker"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 40,
          }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="relative mt-28 md:mt-36 lg:mt-44 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-8 md:mb-10">
              Join our community of vintage enthusiasts
            </h3>

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="inline-block relative"
            >
              <a
                href="#collection"
                className="relative inline-block px-10 py-5 md:px-12 md:py-6 overflow-hidden group"
              >
                {/* Button background with animated gradient */}
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 group-hover:from-pink-500 group-hover:to-orange-500 transition-all duration-700"></span>

                {/* Button border */}
                <span className="absolute inset-0 border-2 border-white/20"></span>

                {/* Button text */}
                <span className="relative z-10 font-bold uppercase tracking-wider text-xl md:text-2xl lg:text-3xl text-white group-hover:text-white transition-colors duration-300 flex items-center">
                  Explore Collection
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 ml-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </motion.svg>
                </span>

                {/* Animated corner accents */}
                <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></span>
                <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></span>
                <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></span>
                <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></span>
              </a>
            </motion.div>
          </div>

          {/* Decorative year mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
            animate={{
              opacity: isInView ? 0.9 : 0,
              scale: isInView ? 1 : 0.5,
              rotate: isInView ? 0 : -5,
            }}
            transition={{ duration: 0.7, delay: 1.1, type: "spring" }}
            className="absolute -right-4 md:right-16 lg:right-24 bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full bg-yellow-400/80 flex items-center justify-center transform rotate-12">
                <span className="text-black font-bold text-base md:text-lg lg:text-xl">
                  EST. 2018
                </span>
              </div>
              <div className="absolute inset-[3px] rounded-full border-3 border-dashed border-black/50"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* CSS for custom effects */}
      <style jsx global>{`
        .bg-scratch {
          background-image: url("/assets/textures/scratches.png");
          background-size: cover;
        }

        .font-handwriting {
          font-family: "Permanent Marker", cursive;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
