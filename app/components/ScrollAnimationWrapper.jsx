"use client";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const ScrollAnimationWrapper = ({
  children,
  type = "wear-in", // wear-in, graffiti, glitch, vhs-track
  className = "",
  threshold = 0.1, // when animation begins (0-1)
  duration = 1.5, // animation duration in seconds
  staggerChildren = 0.1, // delay between children
}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Track if we've passed the threshold
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > threshold && !isInView) {
      setIsInView(true);
    }
  });

  // For the progress-based animations
  const progress = useTransform(scrollYProgress, [threshold, 0.7], [0, 1]);

  // For graffiti animation - controls the spray painting effect
  const sprayProgress = useTransform(scrollYProgress, [threshold, 0.5], [0, 1]);
  const sprayOpacity = useTransform(sprayProgress, [0, 0.2, 1], [0, 0.7, 1]);
  const sprayScale = useTransform(sprayProgress, [0, 0.3, 1], [0, 1.2, 1]);

  // For VHS tracking effect - more severe at beginning, normalizes as you scroll
  const trackingOffset = useTransform(
    scrollYProgress,
    [threshold, 0.5],
    [20, 0]
  );

  // Handle animation completion
  useEffect(() => {
    if (isInView && !isAnimationComplete) {
      const timer = setTimeout(() => {
        setIsAnimationComplete(true);
      }, duration * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, isAnimationComplete, duration]);

  // Variants for different animation types
  const renderAnimation = () => {
    switch (type) {
      case "wear-in":
        return (
          <motion.div
            ref={ref}
            className={`${className} relative overflow-hidden`}
          >
            {/* Original content */}
            <motion.div
              style={{
                filter: isInView
                  ? `url(#distress-filter-${Math.floor(Math.random() * 3)})`
                  : "none",
                opacity: useTransform(progress, [0, 0.4, 1], [0.3, 0.7, 1]),
              }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>

            {/* SVG Filters */}
            <svg width="0" height="0" className="absolute">
              <filter id="distress-filter-0">
                <feTurbulence
                  baseFrequency="0.05"
                  numOctaves="2"
                  seed={Math.random() * 100}
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  scale={isInView ? 0 : 10}
                />
              </filter>
              <filter id="distress-filter-1">
                <feTurbulence
                  baseFrequency="0.1"
                  numOctaves="3"
                  seed={Math.random() * 100}
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  scale={isInView ? 0 : 15}
                />
              </filter>
              <filter id="distress-filter-2">
                <feTurbulence
                  baseFrequency="0.07"
                  numOctaves="2"
                  seed={Math.random() * 100}
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  scale={isInView ? 0 : 8}
                />
              </filter>
            </svg>
          </motion.div>
        );

      case "graffiti":
        return (
          <motion.div ref={ref} className={`${className} relative`}>
            {/* Content with mask */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.2 }}
            >
              {children}
            </motion.div>

            {/* Spray paint effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                opacity: sprayOpacity,
                scale: sprayScale,
                backgroundColor: "transparent",
                backgroundImage: `radial-gradient(
                  circle at center,
                  rgba(193, 255, 0, 0.7) 0%,
                  rgba(193, 255, 0, 0.5) 20%,
                  rgba(193, 255, 0, 0.2) 40%,
                  transparent 70%
                )`,
              }}
            />

            {/* Drip effects */}
            {isInView &&
              [...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 bg-thrift-lime z-5 rounded-b-md"
                  style={{
                    left: `${10 + i * 18}%`,
                    top: "90%",
                    height: 0,
                  }}
                  animate={{
                    height: ["0px", `${Math.floor(Math.random() * 30 + 20)}px`],
                    top: ["90%", "100%"],
                  }}
                  transition={{
                    duration: Math.random() * 1.5 + 1,
                    delay: 0.2 + i * 0.1,
                    ease: "easeOut",
                  }}
                />
              ))}
          </motion.div>
        );

      case "glitch":
        return (
          <motion.div
            ref={ref}
            className={`${className} relative overflow-hidden`}
            initial={{ filter: "hue-rotate(0deg)" }}
            animate={
              isInView
                ? {
                    filter: [
                      "hue-rotate(0deg)",
                      "hue-rotate(90deg)",
                      "hue-rotate(0deg)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 0.2,
              repeat: 2,
              repeatType: "mirror",
              ease: "linear",
            }}
          >
            {/* Glitched content with RGB shift */}
            <motion.div className="relative">
              {children}

              {/* Red channel */}
              <motion.div
                className="absolute inset-0 text-red-500 mix-blend-screen opacity-50"
                style={{ color: "rgba(255,0,0,0.5)" }}
                animate={
                  isInView
                    ? {
                        x: [0, -5, 3, 0, 2, 0],
                        y: [0, 2, -1, 0, 1, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  repeat: 1,
                  repeatType: "mirror",
                }}
              >
                {children}
              </motion.div>

              {/* Blue channel */}
              <motion.div
                className="absolute inset-0 text-blue-500 mix-blend-screen opacity-50"
                style={{ color: "rgba(0,0,255,0.5)" }}
                animate={
                  isInView
                    ? {
                        x: [0, 5, -3, 0, -2, 0],
                        y: [0, -2, 1, 0, -1, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  repeat: 1,
                  repeatType: "mirror",
                }}
              >
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
        );

      case "vhs-track":
        return (
          <motion.div
            ref={ref}
            className={`${className} relative overflow-hidden`}
          >
            {/* Main content */}
            <motion.div
              style={{
                y: isInView ? 0 : trackingOffset,
              }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 15,
              }}
            >
              {children}
            </motion.div>

            {/* VHS Tracking lines */}
            {isInView &&
              [...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-[2px] bg-white opacity-30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: 0,
                  }}
                  animate={{
                    y: [0, -200, 200, 0],
                    opacity: [0.3, 0.5, 0.3, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: "linear",
                    repeat: Math.floor(Math.random() * 2),
                    repeatType: "mirror",
                  }}
                />
              ))}
          </motion.div>
        );

      default:
        return (
          <div ref={ref} className={className}>
            {children}
          </div>
        );
    }
  };

  return renderAnimation();
};

export default ScrollAnimationWrapper;
