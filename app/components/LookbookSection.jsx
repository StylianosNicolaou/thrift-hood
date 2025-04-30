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

// Mock data - replace with your actual products
const lookbookItems = [
  {
    id: 1,
    title: "Vintage Windbreaker",
    category: "outerwear",
    year: "1993",
    colors: ["Blue", "Purple", "Yellow"],
    price: "$89",
    image: "/assets/lookbook/windbreaker.jpg",
    alt: "Colorful 90s windbreaker jacket",
  },
  {
    id: 2,
    title: "Classic Skate Tee",
    category: "tops",
    year: "1995",
    colors: ["White", "Black"],
    price: "$45",
    image: "/assets/lookbook/skate-tee.jpg",
    alt: "Vintage skateboard graphic t-shirt",
  },
  {
    id: 3,
    title: "Baggy Cargo Pants",
    category: "bottoms",
    year: "1997",
    colors: ["Khaki", "Black"],
    price: "$65",
    image: "/assets/lookbook/cargo-pants.jpg",
    alt: "Oversized 90s cargo pants",
  },
  {
    id: 4,
    title: "Snapback Cap",
    category: "accessories",
    year: "1992",
    colors: ["Red", "Black"],
    price: "$38",
    image: "/assets/lookbook/snapback.jpg",
    alt: "Vintage snapback cap",
  },
  {
    id: 5,
    title: "Basketball Jersey",
    category: "tops",
    year: "1998",
    colors: ["Red", "White"],
    price: "$78",
    image: "/assets/lookbook/jersey.jpg",
    alt: "90s basketball jersey",
  },
  {
    id: 6,
    title: "Platform Sneakers",
    category: "footwear",
    year: "1996",
    colors: ["White", "Blue"],
    price: "$110",
    image: "/assets/lookbook/sneakers.jpg",
    alt: "90s platform sneakers",
  },
  {
    id: 7,
    title: "Denim Jacket",
    category: "outerwear",
    year: "1994",
    colors: ["Blue", "Black"],
    price: "$95",
    image: "/assets/lookbook/denim-jacket.jpg",
    alt: "90s denim jacket",
  },
  {
    id: 8,
    title: "Track Pants",
    category: "bottoms",
    year: "1995",
    colors: ["Black", "Green"],
    price: "$58",
    image: "/assets/lookbook/track-pants.jpg",
    alt: "90s track pants",
  },
  {
    id: 9,
    title: "Bucket Hat",
    category: "accessories",
    year: "1991",
    colors: ["Yellow", "Blue"],
    price: "$32",
    image: "/assets/lookbook/bucket-hat.jpg",
    alt: "90s bucket hat",
  },
];

// Category filters
const categories = [
  { id: "all", label: "All Items" },
  { id: "tops", label: "Tops" },
  { id: "bottoms", label: "Bottoms" },
  { id: "outerwear", label: "Outerwear" },
  { id: "footwear", label: "Footwear" },
  { id: "accessories", label: "Accessories" },
];

export default function LookbookSection() {
  // State for filtering
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState(lookbookItems);
  const [activeItem, setActiveItem] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Animation and scroll refs
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.8 });
  const isGridInView = useInView(gridRef, { once: false, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [50, -50]);

  // Track mouse position for hover effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Filter items when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredItems(lookbookItems);
    } else {
      setFilteredItems(
        lookbookItems.filter((item) => item.category === activeCategory)
      );
    }
  }, [activeCategory]);

  // Handle item click for detailed view
  const handleItemClick = (item) => {
    setActiveItem(item);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  // Close detailed view
  const closeDetailView = () => {
    setActiveItem(null);
    document.body.style.overflow = ""; // Re-enable scrolling
  };

  return (
    <section
      ref={sectionRef}
      id="lookbook"
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden bg-neutral-900"
    >
      {/* VHS scanlines effect overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none scanlines opacity-10"></div>

      {/* Background elements */}
      <motion.div
        className="absolute inset-0 z-0 opacity-30"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-orange-900/30"></div>
        <div className="absolute inset-0 bg-[url('/assets/textures/grid.png')] bg-repeat opacity-20"></div>

        {/* Retro geometric shapes */}
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: isInView ? 0.6 : 0, rotate: isInView ? 0 : -10 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-[10%] right-[5%] w-96 h-96 md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px]"
        >
          <Image
            src="/assets/shapes/triangle.svg"
            alt="Geometric shape"
            fill
            className="object-contain opacity-30"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: 10 }}
          animate={{ opacity: isInView ? 0.5 : 0, rotate: isInView ? 0 : 10 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-[20%] left-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px]"
        >
          <Image
            src="/assets/shapes/circle.svg"
            alt="Geometric shape"
            fill
            className="object-contain opacity-20"
          />
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-[2000px] relative z-20">
        {/* Section title */}
        <motion.div
          ref={titleRef}
          style={{ y: titleY }}
          className="flex flex-col items-center mb-20 md:mb-28 lg:mb-36"
        >
          {/* Animated title with VHS glitch effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: isTitleInView ? 1 : 0,
              scale: isTitleInView ? 1 : 0.9,
            }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <h2
              className="text-6xl md:text-7xl lg:text-9xl font-chineseRocks text-white glitch-text"
              data-text="Lookbook"
            >
              Lookbook
            </h2>

            {/* Year tag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: isTitleInView ? 1 : 0,
                x: isTitleInView ? 0 : 20,
              }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -top-8 -right-16 rotate-12 bg-yellow-400 text-black py-2 px-4 text-lg font-bold"
            >
              '90-'99
            </motion.div>
          </motion.div>

          {/* Section subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isTitleInView ? 1 : 0,
              y: isTitleInView ? 0 : 20,
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-pink-400 max-w-2xl mx-auto text-center mt-6 text-xl md:text-2xl lg:text-3xl"
          >
            Authentic vintage pieces curated from the golden era of streetwear
          </motion.p>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isTitleInView ? 1 : 0,
              y: isTitleInView ? 0 : 20,
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 flex flex-wrap justify-center gap-4"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isTitleInView ? 1 : 0,
                  scale: isTitleInView ? 1 : 0.8,
                }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-sm border text-base md:text-lg lg:text-xl font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-lime-400 text-black border-lime-400"
                    : "bg-transparent text-white/70 border-white/20 hover:border-white/50"
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Lookbook grid */}
        <motion.div
          ref={gridRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: isGridInView ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Animated TV static when filtering */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-30 bg-static pointer-events-none"
            />
          </AnimatePresence>

          {/* Grid layout with staggered animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10 xl:gap-12"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: isGridInView ? 1 : 0,
                    y: isGridInView ? 0 : 30,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + index * 0.1,
                    type: "spring",
                  }}
                  whileHover={{ scale: 1.03 }}
                  className="group cursor-pointer perspective"
                >
                  {/* Polaroid-style lookbook card */}
                  <div className="bg-white pb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
                    {/* Image wrapper */}
                    <div className="relative h-[320px] md:h-[360px] lg:h-[400px] overflow-hidden mb-6">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.5 }}
                        className="h-full"
                      >
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          className="object-cover"
                        />
                      </motion.div>

                      {/* VHS timestamp overlay */}
                      <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white text-sm px-3 py-1 font-mono">
                        REC 0:00 {item.year}
                      </div>

                      {/* View details button */}
                      <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-sm">
                          <span className="text-white font-medium text-lg">
                            View Details
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Product details */}
                    <div className="px-6">
                      <h3 className="text-black font-bold text-xl md:text-2xl">
                        {item.title}
                      </h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-600 text-base md:text-lg">
                          {item.year}
                        </span>
                        <span className="text-lime-600 font-bold text-lg md:text-xl">
                          {item.price}
                        </span>
                      </div>
                    </div>

                    {/* Decorative yellow corner */}
                    <div className="absolute top-0 right-0 border-t-[30px] border-r-[30px] border-t-yellow-400 border-r-yellow-400 z-10"></div>

                    {/* Tape element */}
                    <div className="absolute -top-3 left-10 w-16 h-5 bg-pink-400/80 rotate-6 z-10"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state message */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32"
            >
              <p className="text-white text-2xl md:text-3xl lg:text-4xl">
                No items found in this category
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="mt-6 text-yellow-400 underline text-lg md:text-xl"
              >
                View all items
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* View more button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isGridInView ? 1 : 0,
            y: isGridInView ? 0 : 30,
          }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex justify-center mt-24 md:mt-32"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/10"></span>
            <span className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-15 -translate-x-full group-hover:animate-shimmer"></span>
            <span className="relative px-10 py-4 md:px-12 md:py-5 bg-white/5 border border-white/20 text-white font-medium uppercase flex items-center text-lg md:text-xl lg:text-2xl">
              <span>View Full Collection</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-7 md:w-7 ml-3"
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
          </motion.button>
        </motion.div>
      </div>

      {/* Custom cursor for product hover */}
      {!activeItem && (
        <motion.div
          className="fixed w-16 h-16 rounded-full pointer-events-none z-50 items-center justify-center text-sm hidden md:flex"
          style={{
            left: cursorPosition.x - 32,
            top: cursorPosition.y - 32,
            backgroundColor: "rgba(132, 204, 22, 0.6)",
            opacity: 0,
          }}
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: 0.8,
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity },
            opacity: { duration: 0.2 },
          }}
        >
          <span className="font-bold text-black">ZOOM</span>
        </motion.div>
      )}

      {/* Detailed view modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-10 bg-black/90 backdrop-blur-md"
            onClick={closeDetailView}
          >
            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-neutral-900 border border-white/20 max-w-6xl w-full mx-auto rounded-sm overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeDetailView}
                className="absolute top-6 right-6 z-30 w-10 h-10 flex items-center justify-center bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300"
              >
                ✕
              </button>

              {/* Modal content grid */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image column */}
                <div className="relative h-[400px] md:h-[600px] lg:h-[700px] bg-neutral-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={activeItem.image}
                      alt={activeItem.alt}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* VHS overlay */}
                  <div className="absolute inset-0 vhs-effect opacity-30 pointer-events-none"></div>

                  {/* Year tag */}
                  <div className="absolute top-6 left-6 bg-yellow-400 text-black py-2 px-4 text-base md:text-lg font-bold">
                    {activeItem.year}
                  </div>
                </div>

                {/* Content column */}
                <div className="p-10 md:p-12 lg:p-16 flex flex-col">
                  <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
                    {activeItem.title}
                  </h3>

                  <div className="mt-3 mb-8">
                    <span className="text-lime-400 text-2xl md:text-3xl lg:text-4xl font-bold">
                      {activeItem.price}
                    </span>
                  </div>

                  {/* Product details */}
                  <div className="space-y-6 text-white/80 flex-grow text-lg md:text-xl">
                    <p>
                      Authentic vintage {activeItem.category} piece from the
                      golden era of 90s streetwear. This rare find features the
                      iconic design elements that defined the decade.
                    </p>

                    <div className="border-t border-white/10 pt-6">
                      <h4 className="text-white text-base md:text-lg font-medium mb-3">
                        Available Colors
                      </h4>
                      <div className="flex gap-3">
                        {activeItem.colors.map((color) => (
                          <span
                            key={color}
                            className="inline-block px-4 py-2 bg-white/5 border border-white/10 text-base rounded-sm"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <h4 className="text-white text-base md:text-lg font-medium mb-3">
                        Condition
                      </h4>
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-yellow-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white/30"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <span className="ml-3 text-base">
                          Excellent vintage condition
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-10 space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-lime-400 text-black font-bold uppercase text-lg md:text-xl"
                    >
                      Add to Cart
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-transparent border border-white/30 text-white font-medium uppercase text-lg"
                    >
                      Save to Wishlist
                    </motion.button>
                  </div>

                  {/* Authenticity badge */}
                  <div className="mt-8 flex items-center justify-center">
                    <div className="flex items-center text-sm text-white/60">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-pink-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Authenticity verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for special effects */}
      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }

        .scanlines::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255, 255, 255, 0.05) 0.5%,
            transparent 1%
          );
          animation: scanlines 0.2s linear infinite;
        }

        @keyframes scanlines {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(15px);
          }
        }

        .bg-static {
          background-image: url("/assets/textures/static.gif");
          background-size: cover;
          mix-blend-mode: overlay;
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

        .glitch-text {
          position: relative;
          text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.5),
            -0.05em 0 0 rgba(0, 255, 255, 0.5);
          animation: glitch 4s infinite;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 rgba(255, 0, 0, 0.5);
          animation: glitch-1 5s infinite linear alternate-reverse;
        }

        .glitch-text::after {
          left: -2px;
          text-shadow: 2px 0 rgba(0, 255, 255, 0.5);
          animation: glitch-2 1s infinite linear alternate-reverse;
        }

        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.5),
              -0.05em 0 0 rgba(0, 255, 255, 0.5);
          }
          14% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.5),
              -0.05em 0 0 rgba(0, 255, 255, 0.5);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.5),
              0.025em 0.05em 0 rgba(0, 255, 255, 0.5);
          }
          49% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.5),
              0.025em 0.05em 0 rgba(0, 255, 255, 0.5);
          }
          50% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.5),
              -0.05em -0.025em 0 rgba(0, 255, 255, 0.5);
          }
          99% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.5),
              -0.05em -0.025em 0 rgba(0, 255, 255, 0.5);
          }
          100% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.5),
              -0.05em 0 0 rgba(0, 255, 255, 0.5);
          }
        }

        @keyframes glitch-1 {
          0% {
            clip-path: inset(20% 0 80% 0);
          }
          20% {
            clip-path: inset(60% 0 1% 0);
          }
          40% {
            clip-path: inset(25% 0 58% 0);
          }
          60% {
            clip-path: inset(54% 0 7% 0);
          }
          80% {
            clip-path: inset(70% 0 12% 0);
          }
          100% {
            clip-path: inset(10% 0 58% 0);
          }
        }

        @keyframes glitch-2 {
          0% {
            clip-path: inset(38% 0 1% 0);
          }
          20% {
            clip-path: inset(93% 0 6% 0);
          }
          40% {
            clip-path: inset(23% 0 15% 0);
          }
          60% {
            clip-path: inset(74% 0 26% 0);
          }
          80% {
            clip-path: inset(67% 0 33% 0);
          }
          100% {
            clip-path: inset(70% 0 13% 0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(15deg);
          }
          100% {
            transform: translateX(100%) skewX(15deg);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .skew-x-15 {
          transform: skewX(15deg);
        }
      `}</style>
    </section>
  );
}
