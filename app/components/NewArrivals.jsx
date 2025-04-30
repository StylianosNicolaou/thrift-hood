"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";

// Mock new arrivals data - replace with your actual products
const newArrivals = [
  {
    id: 1,
    title: "Acid Wash Denim Jacket",
    category: "Jackets",
    price: "$95",
    image: "/assets/new-arrivals/denim-jacket.jpg",
    date: "3 days ago",
    sold: false,
    badge: "fresh find",
  },
  {
    id: 2,
    title: "Neon Windbreaker",
    category: "Outerwear",
    price: "$78",
    image: "/assets/new-arrivals/windbreaker.jpg",
    date: "5 days ago",
    sold: false,
    badge: "rare",
  },
  {
    id: 3,
    title: "Vintage Band Tee",
    category: "T-Shirts",
    price: "$45",
    image: "/assets/new-arrivals/band-tee.jpg",
    date: "1 week ago",
    sold: true,
    badge: "sold",
  },
  {
    id: 4,
    title: "High-Top Sneakers",
    category: "Footwear",
    price: "$110",
    image: "/assets/new-arrivals/sneakers.jpg",
    date: "3 days ago",
    sold: false,
    badge: "fresh find",
  },
  {
    id: 5,
    title: "Baggy Track Pants",
    category: "Bottoms",
    price: "$65",
    image: "/assets/new-arrivals/track-pants.jpg",
    date: "2 days ago",
    sold: false,
    badge: "fresh find",
  },
  {
    id: 6,
    title: "Graphic Hoodie",
    category: "Hoodies",
    price: "$85",
    image: "/assets/new-arrivals/hoodie.jpg",
    date: "1 week ago",
    sold: false,
    badge: "one left",
  },
];

export default function NewArrivalsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [direction, setDirection] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Refs for animations
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  // Scroll-driven animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const isInView = useInView(sectionRef, { amount: 0.2, once: false });
  const isCarouselInView = useInView(carouselRef, { amount: 0.5, once: false });

  // Parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [50, -30]);

  // Handle autoplay and progress bar
  useEffect(() => {
    if (isAutoplay && !isHovering) {
      timerRef.current = setInterval(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % newArrivals.length);
      }, 4000);

      // Progress bar animation
      const intervalTime = 4000;
      const updateTime = 50;
      const steps = intervalTime / updateTime;

      progressRef.current = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 100 / steps;
        });
      }, updateTime);
    }

    return () => {
      clearInterval(timerRef.current);
      clearInterval(progressRef.current);
    };
  }, [isAutoplay, isHovering, newArrivals.length]);

  // Reset progress when slide changes
  useEffect(() => {
    setLoadingProgress(0);
  }, [activeIndex]);

  // Functions to control carousel
  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? newArrivals.length - 1 : prev - 1));
    setIsAutoplay(false);
  };

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % newArrivals.length);
    setIsAutoplay(false);
  };

  const goToSlide = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsAutoplay(false);
  };

  // Animation variants for slides
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        bounce: 0.2,
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="new-arrivals"
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden bg-gradient-to-b from-neutral-900 to-black"
    >
      {/* Background elements */}
      <motion.div
        className="absolute inset-0 z-0 opacity-50"
        style={{ y: bgY }}
      >
        {/* Retro patterns */}
        <div className="absolute inset-0 bg-[url('/assets/textures/pattern-zigzag.svg')] bg-repeat opacity-5"></div>

        {/* Mixtape background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{
            opacity: isInView ? 0.15 : 0,
            scale: isInView ? 1 : 0.9,
            rotate: isInView ? 0 : -5,
          }}
          transition={{ duration: 1.2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140%] max-w-[2400px]"
        >
          <Image
            src="/assets/images/mixtape-outline.png"
            alt="Mixtape outline"
            width={2000}
            height={1200}
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-[2000px] relative z-10">
        {/* Section heading */}
        <motion.div
          style={{ y: titleY }}
          className="max-w-2xl mx-auto mb-20 md:mb-28 lg:mb-36 text-center"
        >
          {/* New Arrivals Title with VHS rewind effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block"
          >
            <motion.div
              className="relative"
              initial={{ filter: "blur(8px)" }}
              animate={{
                filter: isInView ? "blur(0px)" : "blur(8px)",
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-6xl md:text-7xl lg:text-9xl font-chineseRocks text-white">
                New Arrivals
              </h2>

              {/* Tape reel animation indicator */}
              <motion.div
                className="absolute -right-20 -top-16 w-16 h-16 md:w-20 md:h-20"
                animate={{ rotate: isAutoplay ? 360 : 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 rounded-full border-4 border-yellow-400 opacity-70"></div>
                  <div className="absolute inset-[25%] rounded-full bg-yellow-400"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-400"></div>
                </div>
              </motion.div>

              {/* Play/Pause controls */}
              <motion.div
                className="absolute -left-20 -top-14 flex space-x-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <button
                  onClick={() => setIsAutoplay(!isAutoplay)}
                  className="w-14 h-14 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 transition-colors duration-300 rounded-full"
                >
                  {isAutoplay ? (
                    <span className="w-4 h-8 bg-white rounded-sm"></span>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </motion.div>
            </motion.div>

            {/* TV Static animation during initial load */}
            <motion.div
              className="absolute inset-0 bg-static mix-blend-multiply"
              initial={{ opacity: 1 }}
              animate={{ opacity: isInView ? 0 : 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            ></motion.div>

            {/* Glitch line */}
            <motion.div
              className="absolute left-0 right-0 h-[3px] bg-cyan-400 mix-blend-screen"
              initial={{ top: 0, opacity: 0 }}
              animate={{
                top: isInView ? ["0%", "100%", "0%"] : "0%",
                opacity: isInView ? [0, 1, 0] : 0,
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 5,
                delay: 1,
              }}
            ></motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 20,
            }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-pink-400 mt-6 text-xl md:text-2xl lg:text-3xl"
          >
            Just dropped! Fresh vintage finds every week
          </motion.p>
        </motion.div>

        {/* Carousel section */}
        <div
          ref={carouselRef}
          className="max-w-7xl mx-auto relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Carousel display */}
          <div className="relative bg-neutral-900/80 backdrop-blur-sm p-6 md:p-10 lg:p-12 border border-white/10 shadow-neon rounded-sm">
            {/* CD/Record player animated decoration */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: isCarouselInView ? 0.8 : 0,
                x: isCarouselInView ? 0 : -50,
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -left-24 -top-24 w-40 h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 hidden lg:block"
            >
              <div className="relative h-full w-full">
                <Image
                  src="/assets/images/vinyl-record.png"
                  alt="Vinyl Record"
                  width={200}
                  height={200}
                  className="absolute inset-0 w-full h-full"
                />
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  <Image
                    src="/assets/images/record-grooves.png"
                    alt="Record Grooves"
                    width={200}
                    height={200}
                    className="w-full h-full opacity-60"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Carousel main content */}
            <div className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[650px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  {/* Product showcase - Grid for desktop, stack for mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-8 md:gap-12 lg:gap-16">
                    {/* Product image */}
                    <div className="relative overflow-hidden rounded-sm aspect-square md:aspect-auto">
                      {/* VHS effect overlay */}
                      <div className="absolute inset-0 vhs-effect opacity-20 z-10 pointer-events-none"></div>

                      {/* Badge */}
                      <div
                        className={`absolute top-4 left-4 z-20 px-4 py-2 uppercase text-sm md:text-base font-bold 
                        ${
                          newArrivals[activeIndex].sold
                            ? "bg-red-500 text-white"
                            : "bg-yellow-400 text-black"
                        }`}
                      >
                        {newArrivals[activeIndex].badge}
                      </div>

                      {/* Timestamp */}
                      <div className="absolute bottom-4 right-4 z-20 bg-black/70 backdrop-blur-sm text-white px-3 py-2 text-sm font-mono">
                        {newArrivals[activeIndex].date}
                      </div>

                      {/* Main product image */}
                      <div className="relative h-full w-full">
                        <Image
                          src={newArrivals[activeIndex].image}
                          alt={newArrivals[activeIndex].title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Product details */}
                    <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="text-base md:text-lg lg:text-xl font-medium text-pink-400 mb-3 uppercase">
                          {newArrivals[activeIndex].category}
                        </div>

                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                          {newArrivals[activeIndex].title}
                        </h3>

                        <div className="flex items-end mb-8">
                          <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-lime-400">
                            {newArrivals[activeIndex].price}
                          </span>
                          {newArrivals[activeIndex].sold && (
                            <span className="ml-4 text-red-500 font-medium text-xl">
                              SOLD OUT
                            </span>
                          )}
                        </div>

                        <p className="text-white/80 mb-10 leading-relaxed text-lg md:text-xl lg:text-2xl">
                          Authentic vintage piece from the 90s. Each item we
                          source is carefully selected for quality and style.
                          This rare find captures the essence of the golden era
                          of streetwear.
                        </p>

                        <div className="space-y-5">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`w-full py-4 font-bold uppercase text-xl ${
                              newArrivals[activeIndex].sold
                                ? "bg-neutral-700 text-white/50 cursor-not-allowed"
                                : "bg-lime-400 text-black"
                            }`}
                            disabled={newArrivals[activeIndex].sold}
                          >
                            {newArrivals[activeIndex].sold
                              ? "Sold Out"
                              : "Add to Cart"}
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full py-4 border border-white/30 text-white font-medium uppercase text-xl"
                          >
                            View Details
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation controls */}
            <div className="flex justify-between items-center mt-8">
              {/* Previous button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-7 md:w-7"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>

              {/* Dot indicators with colored tape effect */}
              <div className="flex items-center space-x-3">
                {newArrivals.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="group relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-4 h-12 md:w-4 md:h-14 lg:w-5 lg:h-16 relative ${
                        activeIndex === index
                          ? "bg-lime-400"
                          : "bg-white/30 group-hover:bg-white/50"
                      } transition-colors duration-200`}
                      style={{
                        transform: `rotate(${Math.random() * 10 - 5}deg)`,
                      }}
                    >
                      {/* Tape texture */}
                      <div className="absolute inset-0 bg-[url('/assets/textures/tape.png')] bg-cover opacity-30 mix-blend-overlay"></div>
                    </motion.div>
                  </button>
                ))}
              </div>

              {/* Next button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-7 md:w-7"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Autoplay progress indicator */}
            {isAutoplay && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-pink-500"
                  style={{ width: `${loadingProgress}%` }}
                ></motion.div>
              </div>
            )}
          </div>

          {/* Carousel counter in cassette style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isCarouselInView ? 1 : 0,
              y: isCarouselInView ? 0 : 20,
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -right-8 -bottom-8 md:right-10 md:bottom-10 bg-black border border-neutral-700 rounded-sm overflow-hidden w-28 h-16 md:w-32 md:h-20 flex items-center justify-center"
          >
            <div className="text-white font-mono flex text-lg md:text-xl">
              <span>0{activeIndex + 1}</span>
              <span className="mx-2">/</span>
              <span>0{newArrivals.length}</span>
            </div>

            {/* Tape window effect */}
            <div className="absolute inset-[1px] border border-neutral-800 bg-gradient-to-t from-neutral-900 to-black"></div>
            <div className="absolute inset-y-0 left-1 w-1 bg-neutral-800"></div>
            <div className="absolute inset-y-0 right-1 w-1 bg-neutral-800"></div>
          </motion.div>
        </div>

        {/* Bottom CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isCarouselInView ? 1 : 0,
            y: isCarouselInView ? 0 : 30,
          }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-24 md:mt-32 lg:mt-40 text-center"
        >
          <div className="inline-block">
            <a href="#shop" className="group relative">
              <span className="relative z-10 inline-flex items-center px-10 py-4 md:px-12 md:py-5 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-bold uppercase tracking-wider text-xl md:text-2xl lg:text-3xl">
                Shop All New Arrivals
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-7 md:w-7 ml-3 group-hover:translate-x-1 transition-transform duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              {/* Neon glow effect */}
              <span className="absolute -inset-2 bg-pink-500/20 blur-md group-hover:bg-pink-500/30 transition-all duration-300"></span>

              {/* Graffiti decoration */}
              <div className="absolute -bottom-6 -right-10 w-20 h-20 md:w-24 md:h-24 rotate-12">
                <Image
                  src="/assets/textures/spray/10.png"
                  alt="Spray decoration"
                  width={100}
                  height={100}
                  className="w-full h-full opacity-70"
                />
              </div>
            </a>
          </div>
        </motion.div>
      </div>

      {/* CSS for custom effects */}
      <style jsx global>{`
        .shadow-neon {
          box-shadow: 0 0 30px rgba(255, 0, 255, 0.1),
            0 0 50px rgba(0, 255, 255, 0.05);
        }

        .bg-static {
          background-image: url("/assets/textures/static.gif");
          background-size: cover;
        }

        .vhs-effect::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(
            transparent 40%,
            rgba(0, 255, 255, 0.1) 45%,
            rgba(255, 0, 255, 0.1) 50%,
            transparent 55%
          );
          background-size: 100% 300%;
          animation: vhs-track 8s linear infinite;
        }

        @keyframes vhs-track {
          0% {
            background-position: 0 0%;
          }
          100% {
            background-position: 0 300%;
          }
        }
      `}</style>
    </section>
  );
}
