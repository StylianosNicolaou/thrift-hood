"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import GraffitiTag from "./GraffitiTag";

export default function HeroSection() {
  // Mouse tracking for 3D effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Parallax transformations
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const frameScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Mouse tracking for 3D effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate rotation based on mouse position
  const rotateX = useTransform(
    useMotionValue(mousePosition.y),
    [-300, 300],
    [5, -5]
  );
  const rotateY = useTransform(
    useMotionValue(mousePosition.x),
    [-300, 300],
    [-5, 5]
  );

  // Letter animation for title
  const titleChars = "THRIFTHOOD".split("");
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + i * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-black flex items-center"
    >
      {/* Animated Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none noise-animation"></div>

      {/* Layered Background with Advanced Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ perspective: 1000, y: backgroundY }}
      >
        {/* Base texture */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/textures/grunge/010.jpg')",
            filter: "contrast(1.1)",
          }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{
            scale: { duration: 30, repeat: Infinity, repeatType: "reverse" },
            opacity: { duration: 1.5 },
          }}
        />

        {/* Spray texture with parallax movement */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: "url('/assets/textures/spray/15.png')" }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 20, opacity: 0.4 }}
          transition={{
            y: { duration: 20, repeat: Infinity, repeatType: "reverse" },
            opacity: { duration: 2, delay: 0.5 },
          }}
        />

        {/* Drip texture with horizontal movement */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center mix-blend-lighten"
          style={{ backgroundImage: "url('/assets/textures/drip/45.png')" }}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 20, opacity: 0.25 }}
          transition={{
            x: { duration: 25, repeat: Infinity, repeatType: "reverse" },
            opacity: { duration: 2.5, delay: 1 },
          }}
        />

        {/* Atmospheric color gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-orange-700/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2, delay: 1.2 }}
        />
      </motion.div>

      {/* Floating Particle Effects */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-yellow-300/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -200 - 100],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 0.8, 0],
              scale: [0, Math.random() * 2 + 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Enhanced Graffiti Tags with Reveal Animation */}
      <AnimatePresence>
        <GraffitiTag
          src="/assets/textures/grunge/200.png"
          alt="Graffiti Tag 1"
          className="top-[10%] left-[5%] rotate-[-10deg]"
          delay={0.4}
          size="w-40 h-auto md:w-52 lg:w-64"
          animation={{
            initial: { opacity: 0, scale: 0.8, x: -50 },
            animate: { opacity: 0.8, scale: 1, x: 0 },
            transition: { duration: 0.8, type: "spring", bounce: 0.4 },
          }}
        />
        <GraffitiTag
          src="/assets/textures/spray/50.png"
          alt="Graffiti Tag 2"
          className="bottom-[15%] right-[5%] rotate-[15deg]"
          delay={0.7}
          size="w-44 h-auto md:w-56 lg:w-72"
          animation={{
            initial: { opacity: 0, scale: 0.8, x: 50 },
            animate: { opacity: 0.85, scale: 1, x: 0 },
            transition: { duration: 0.8, type: "spring", bounce: 0.4 },
          }}
        />
        <GraffitiTag
          src="/assets/textures/drip/30.png"
          alt="Graffiti Tag 3"
          className="top-1/3 right-[20%] rotate-[5deg]"
          delay={1.1}
          size="w-32 h-auto md:w-44 lg:w-60"
          animation={{
            initial: { opacity: 0, scale: 0.8, y: 50 },
            animate: { opacity: 0.75, scale: 1, y: 0 },
            transition: { duration: 0.8, type: "spring", bounce: 0.4 },
          }}
        />
      </AnimatePresence>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-[2000px] h-full mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center w-full">
          {/* Left Column: Interactive 3D Frame */}
          <div className="order-2 md:order-1 flex justify-center">
            <motion.div
              className="relative w-72 h-72 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] perspective-effect"
              style={{
                rotateX,
                rotateY,
                scale: frameScale,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                duration: 1.5,
                delay: 0.5,
                bounce: 0.3,
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              {/* Dynamic glow effect */}
              <motion.div
                className="absolute -inset-8 bg-gradient-to-br from-yellow-400/30 via-orange-500/20 to-pink-500/30 rounded-lg blur-xl"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                  scale: [0.98, 1.02, 0.98],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              />

              {/* Frame with enhanced borders */}
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 frame-vignette pointer-events-none z-10"></div>

                {/* Frame Borders with texture */}
                <div className="frame-top absolute top-0 left-0 w-full h-8"></div>
                <div className="frame-bottom absolute bottom-0 left-0 w-full h-8"></div>
                <div className="frame-left absolute top-0 left-0 h-full w-8"></div>
                <div className="frame-right absolute top-0 right-0 h-full w-8"></div>

                {/* Animated Inner Image */}
                <motion.div
                  className="absolute inset-10"
                  animate={{
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                >
                  <Image
                    src="/assets/images/hero-large.png"
                    alt="Featured Vintage Streetwear"
                    fill
                    className="object-cover rounded-md"
                    priority
                    sizes="(max-width: 768px) 280px, (max-width: 1200px) 450px, 520px"
                    style={{ transform: "translateZ(20px)" }}
                  />
                </motion.div>

                {/* Grain texture overlay */}
                <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay"></div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Animated Headline and CTA */}
          <motion.div
            className="order-1 md:order-2 text-center md:text-left max-w-lg md:max-w-xl"
            style={{ y: titleY }}
          >
            {/* Animated title with letter-by-letter reveal */}
            <div className="overflow-hidden mb-6">
              <h1 className="text-6xl md:text-7xl lg:text-9xl font-chineseRocks text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-yellow-200 to-orange-400 drop-shadow-glow">
                {titleChars.map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Subtitle with animated underline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-pink-400 font-bold text-xl md:text-2xl lg:text-3xl uppercase tracking-widest text-shadow-neon relative z-10 mb-10"
            >
              <span className="relative">
                90s STREETWEAR + VINTAGE REVIVAL
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-pink-400/60"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 2 }}
                />
              </span>
            </motion.p>

            {/* Enhanced CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <motion.button
                className="btn-torn relative px-10 py-5 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {/* Button background with texture */}
                <span className="absolute inset-0 bg-lime-400 rounded-sm torn-button"></span>

                {/* Button glow effect on hover */}
                <span className="absolute -inset-[2px] bg-lime-300 rounded-sm torn-button-border opacity-0 group-hover:opacity-70 transition-opacity duration-300"></span>

                {/* Button text with animated arrow */}
                <span className="relative z-10 font-bold text-black uppercase tracking-wider text-xl lg:text-2xl flex items-center">
                  <span>Skate in Action</span>
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Improved Scroll Indicator with Pulse Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <motion.span
          className="text-sm text-white mb-2 uppercase tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <motion.div
          className="relative"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="absolute -inset-2 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background:
                "radial-gradient(circle, rgba(250,250,250,0.3) 0%, rgba(250,250,250,0) 70%)",
            }}
          />
          <Image
            src="/assets/icons/arrow-down.svg"
            width={32}
            height={32}
            alt="Scroll Down"
            className="relative z-10"
          />
        </motion.div>
      </motion.div>

      {/* CSS for custom effects */}
      <style jsx global>{`
        .noise-animation {
          background-image: url("/assets/textures/noise.png");
          animation: noise 0.5s steps(2) infinite;
        }

        @keyframes noise {
          0% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-5%, -5%);
          }
          20% {
            transform: translate(-10%, 5%);
          }
          30% {
            transform: translate(5%, -10%);
          }
          40% {
            transform: translate(-5%, 15%);
          }
          50% {
            transform: translate(-10%, 5%);
          }
          60% {
            transform: translate(15%, 0);
          }
          70% {
            transform: translate(0, 10%);
          }
          80% {
            transform: translate(-15%, 0);
          }
          90% {
            transform: translate(10%, 5%);
          }
          100% {
            transform: translate(5%, 0);
          }
        }

        .text-shadow-neon {
          text-shadow: 0 0 12px rgba(255, 105, 180, 0.6);
        }

        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(252, 211, 77, 0.5));
        }

        .perspective-effect {
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .torn-button,
        .torn-button-border {
          clip-path: polygon(
            0% 15%,
            5% 0%,
            95% 0%,
            100% 10%,
            100% 90%,
            95% 100%,
            5% 100%,
            0% 85%
          );
        }

        .frame-vignette {
          background: radial-gradient(
            circle at center,
            transparent 70%,
            rgba(0, 0, 0, 0.8) 100%
          );
        }

        .frame-top,
        .frame-bottom,
        .frame-left,
        .frame-right {
          background-image: url("/assets/textures/grunge-frame/20.png");
          background-size: cover;
          opacity: 0.85;
        }

        .frame-top {
          transform: rotateZ(0deg);
        }
        .frame-bottom {
          transform: rotateZ(180deg);
        }
        .frame-left {
          transform: rotateZ(90deg);
        }
        .frame-right {
          transform: rotateZ(-90deg);
        }

        .bg-grain {
          background-image: url("/assets/textures/grain.png");
          background-repeat: repeat;
        }
      `}</style>
    </section>
  );
}
