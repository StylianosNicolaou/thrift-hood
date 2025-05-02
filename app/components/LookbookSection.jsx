"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import SectionWrapper from "./SectionWrapper";
import GraffitiText from "./GraffitiText";

// Product data remains the same
const products = [
  {
    id: 1,
    title: "Retro Bombers",
    category: "Jackets",
    image: "/lookbook-bomber.jpg",
    description:
      "Upcycled vintage bomber jackets with custom graffiti tags and patches. Each piece is one-of-a-kind.",
    price: "$120",
    year: "1992",
  },
  {
    id: 2,
    title: "Baggy Cargos",
    category: "Pants",
    image: "/lookbook-cargos.jpg",
    description:
      "Oversized cargo pants with reinforced knees and custom distressing. Perfect for skaters and street artists.",
    price: "$85",
    year: "1995",
  },
  {
    id: 3,
    title: "Printed Tees",
    category: "Tops",
    image: "/lookbook-tees.jpg",
    description:
      "Vintage-inspired graphic tees with nostalgic prints from the 90s. Screen printed by hand.",
    price: "$45",
    year: "1993",
  },
  {
    id: 4,
    title: "Bucket Hats",
    category: "Accessories",
    image: "/lookbook-hats.jpg",
    description:
      "Reversible bucket hats made from reclaimed fabrics. Mix of patterns and textures for maximum impact.",
    price: "$35",
    year: "1997",
  },
];

const LookbookSection = () => {
  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const shelfRef = useRef(null);
  const storeRef = useRef(null);

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Categories for the filter
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    if (storeRef.current) {
      // Apply VHS store ambiance effect
      gsap.to(".vhs-flicker", {
        opacity: () => 0.7 + Math.random() * 0.3,
        duration: 0.2,
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
      });

      // Static TV noise animation for the background
      gsap.to(".static-bg", {
        backgroundPosition: "center center",
        duration: 0.1,
        repeat: -1,
        repeatRefresh: true,
      });
    }
  }, []);

  // Handle opening product detail
  const openProductDetail = (product) => {
    setActiveProduct(product);
    setIsDetailOpen(true);
  };

  return (
    <SectionWrapper id="lookbook" className="bg-thrift-black overflow-hidden">
      {/* VHS Store Background Effects */}
      <div className="absolute inset-0 static-bg opacity-5"></div>
      <div className="vintage-tape-x top-10"></div>

      {/* Store Sign Header */}
      <div className="text-center mb-12 vhs-flicker" ref={storeRef}>
        <div className="inline-block px-6 py-3 bg-thrift-teal border-4 border-black shadow-retro-xl transform -rotate-1 relative">
          <div className="absolute inset-0 bg-static opacity-5 mix-blend-overlay"></div>
          <div className="absolute top-0 left-0 w-full h-2 bg-black opacity-20"></div>
          <GraffitiText
            element="h2"
            className="text-4xl md:text-6xl text-black inline-block relative z-10"
          >
            THRIFT
          </GraffitiText>
          <div className="mt-1 text-black text-xs uppercase tracking-wider font-bold">
            EST. 1991 — BROWSE COLLECTION — MEMBERS ONLY
          </div>
        </div>

        {/* Store Description */}
        <div className="mt-8 bg-thrift-black/80 max-w-2xl mx-auto p-4 border-2 border-thrift-yellow">
          <p className="text-thrift-yellow text-lg font-bold">
            Each piece tells a story. Browse our vintage collection just like
            the old days.
          </p>
        </div>
      </div>

      {/* VHS Shelf */}
      <div ref={shelfRef} className="relative mx-auto max-w-7xl mb-12">
        {/* Shelf top */}
        <div className="h-4 bg-gradient-to-r from-thrift-black via-gray-700 to-thrift-black relative">
          <div className="absolute inset-x-0 h-1 bg-gray-900 top-0"></div>
        </div>

        {/* VHS Tapes Display */}
        <div className="p-6 bg-gray-900/50 min-h-[400px] border-l-2 border-r-2 border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="vhs-tape-container cursor-pointer"
                whileHover={{ y: -20, scale: 1.05, zIndex: 10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openProductDetail(product)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {/* VHS Tape Case */}
                <div className="vhs-tape bg-black border-2 border-gray-700 relative h-64 shadow-retro transform rotate-1 transition-all hover:-rotate-1">
                  {/* VHS Spine Labels */}
                  <div className="absolute left-0 h-full w-3 bg-gradient-to-r from-thrift-red to-thrift-purple"></div>

                  {/* Tape top view */}
                  <div className="h-10 w-full bg-gray-800 border-b-2 border-gray-700 flex items-center justify-between px-2">
                    <div className="text-white font-retro text-xs opacity-50">
                      THRIFTHOOD
                    </div>
                    <div className="text-thrift-yellow font-retro text-xs">
                      {product.year}
                    </div>
                  </div>

                  {/* Tape main body with product image */}
                  <div className="p-2">
                    <div className="relative aspect-[4/3] bg-gray-800 overflow-hidden">
                      {/* Scanlines effect */}
                      <div className="absolute inset-0 bg-scanlines opacity-30 mix-blend-multiply z-10"></div>

                      {/* VHS sticker label on image */}
                      <div className="absolute top-2 right-2 bg-thrift-yellow text-black px-2 py-1 text-xs font-bold uppercase z-20">
                        {product.category}
                      </div>

                      {/* Image */}
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${product.image})` }}
                      ></div>

                      {/* Tracking line */}
                      <div className="absolute w-full h-1 bg-white opacity-20 bottom-10 animate-tracking-line"></div>
                    </div>
                  </div>

                  {/* Tape title label */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-thrift-black to-gray-800 p-2 border-t border-gray-700">
                    <div className="font-retro text-thrift-teal text-sm truncate">
                      {product.title}
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-thrift-red font-bold text-xs">
                        {product.price}
                      </div>
                      <div className="text-white/50 text-xs">PLAY ▶</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Shelf bottom */}
        <div className="h-6 bg-gradient-to-r from-thrift-black via-gray-700 to-thrift-black relative">
          <div className="absolute inset-x-0 h-1 bg-gray-900 bottom-0"></div>
        </div>

        {/* Shelf shadow */}
        <div className="h-4 mx-10 bg-black/40 blur-sm"></div>
      </div>

      {/* Vintage store decoration elements */}
      <div className="text-center mb-12">
        <span className="inline-block bg-thrift-black text-thrift-red px-4 py-1 font-retro border-2 border-thrift-red transform rotate-2">
          BE KIND — REWIND — BEFORE RETURNING
        </span>
      </div>

      {/* Product Detail Modal - VHS Playback Style */}
      <AnimatePresence>
        {isDetailOpen && activeProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDetailOpen(false)}
          >
            <motion.div
              className="bg-thrift-black max-w-5xl w-full overflow-hidden relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* TV Static Background */}
              <div className="absolute inset-0 bg-static opacity-10"></div>

              {/* VCR Controls Top Bar */}
              <div className="bg-gradient-to-r from-gray-900 to-black p-3 border-b-2 border-gray-700 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 rounded-full bg-thrift-red animate-pulse"></div>
                  <div className="text-thrift-teal font-retro">
                    PLAYING: {activeProduct.title}
                  </div>
                </div>
                <div className="text-white font-retro text-sm">
                  RUN TIME: 01:22:03
                </div>
              </div>

              {/* Content Area - TV Screen Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-4 border-gray-800">
                {/* Video Playback Area */}
                <div className="relative aspect-video bg-black overflow-hidden vhs-tracking">
                  {/* Scan lines */}
                  <div className="absolute inset-0 bg-scanlines opacity-40 mix-blend-screen z-10"></div>

                  {/* Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center animate-vhs-flicker"
                    style={{ backgroundImage: `url(${activeProduct.image})` }}
                  ></div>

                  {/* Tape counter */}
                  <div className="absolute top-4 right-4 bg-black/70 px-2 py-1 font-retro text-thrift-teal text-xs">
                    SP 90:25:13
                  </div>

                  {/* Tracking lines */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-1 bg-white/20 z-20"
                      style={{
                        top: `${30 + i * 30}%`,
                        animation: `trackingLine ${
                          1 + i * 0.5
                        }s linear infinite`,
                      }}
                    ></div>
                  ))}
                </div>

                {/* Product Info - VHS Box Art Style */}
                <div className="p-6 bg-gradient-to-b from-gray-900 to-black relative">
                  {/* Product Category */}
                  <div className="inline-block px-3 py-1 bg-thrift-yellow text-black text-sm font-bold mb-4 transform -rotate-2">
                    {activeProduct.category}
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl text-thrift-teal font-graffiti mb-4">
                    {activeProduct.title}
                  </h2>

                  {/* Movie-like info box */}
                  <div className="mb-6 border border-gray-700 p-4 bg-black/50">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">Year:</span>{" "}
                        <span className="text-thrift-yellow">
                          {activeProduct.year}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/60">Price:</span>{" "}
                        <span className="text-thrift-red">
                          {activeProduct.price}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/60">Genre:</span>{" "}
                        <span className="text-thrift-teal">Street</span>
                      </div>
                      <div>
                        <span className="text-white/60">Stock:</span>{" "}
                        <span className="text-thrift-lime">Available</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white mb-6">{activeProduct.description}</p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-thrift-teal text-black px-6 py-2 font-bold uppercase border-2 border-black shadow-retro transform -rotate-1 hover:rotate-0 transition-all">
                      Add to Cart
                    </button>
                    <button
                      className="bg-thrift-red text-white px-6 py-2 font-bold uppercase border-2 border-black shadow-retro transform rotate-1 hover:rotate-0 transition-all"
                      onClick={() => setIsDetailOpen(false)}
                    >
                      Eject
                    </button>
                  </div>
                </div>
              </div>

              {/* VCR Controls */}
              <div className="bg-gradient-to-r from-gray-900 to-black p-3 border-t-2 border-gray-700 flex justify-center space-x-6">
                {[].map((control) => (
                  <button
                    key={control}
                    className={`font-retro text-xs px-3 py-1 border border-gray-600 ${
                      control === "EJECT"
                        ? "bg-thrift-red text-white"
                        : "bg-black text-gray-400 hover:text-thrift-teal"
                    }`}
                    onClick={() =>
                      control === "EJECT" && setIsDetailOpen(false)
                    }
                  >
                    {control}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="vintage-tape-x bottom-10"></div>
    </SectionWrapper>
  );
};

export default LookbookSection;
