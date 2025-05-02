"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import SectionWrapper from "./SectionWrapper";
import GraffitiText from "./GraffitiText";
import FlipCard from "./FlipCard";

const products = [
  {
    id: 1,
    title: "Retro Bombers",
    category: "Jackets",
    image: "/lookbook-bomber.jpg",
    description:
      "Upcycled vintage bomber jackets with custom graffiti tags and patches. Each piece is one-of-a-kind.",
  },
  {
    id: 2,
    title: "Baggy Cargos",
    category: "Pants",
    image: "/lookbook-cargos.jpg",
    description:
      "Oversized cargo pants with reinforced knees and custom distressing. Perfect for skaters and street artists.",
  },
  {
    id: 3,
    title: "Printed Tees",
    category: "Tops",
    image: "/lookbook-tees.jpg",
    description:
      "Vintage-inspired graphic tees with nostalgic prints from the 90s. Screen printed by hand.",
  },
  {
    id: 4,
    title: "Bucket Hats",
    category: "Accessories",
    image: "/lookbook-hats.jpg",
    description:
      "Reversible bucket hats made from reclaimed fabrics. Mix of patterns and textures for maximum impact.",
  },
];

const LookbookSection = () => {
  const [activeProduct, setActiveProduct] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      // Random rotation for each product card
      gsap.set(gridRef.current.querySelectorAll(".product-card"), {
        rotation: () => Math.random() * (3 - -3) + -3,
      });

      // Floating animation
      gsap.to(gridRef.current.querySelectorAll(".product-card"), {
        y: "+=10",
        duration: 1.5,
        ease: "power1.inOut",
        stagger: {
          each: 0.2,
          from: "random",
          repeat: -1,
          yoyo: true,
        },
      });
    }
  }, []);

  return (
    <SectionWrapper
      id="lookbook"
      className="bg-black pattern-checker"
      bgPattern="pattern-checker"
    >
      <div className="vintage-tape-x top-10"></div>

      <div className="text-center mb-12">
        <div className="inline-block px-3 py-1 bg-neon-orange text-black border-2 border-black transform rotate-2 mb-4">
          <p className="text-sm uppercase tracking-widest font-bold">
            The Collection
          </p>
        </div>

        <GraffitiText
          element="h2"
          className="text-3xl md:text-5xl mb-8 inline-block"
          color="text-neon-pink"
        >
          Chaotic Vintage LOOKBOOK
        </GraffitiText>

        <p className="text-neon-green text-lg max-w-2xl mx-auto font-bold mb-8">
          Each piece tells a story. Dive into our collection of upcycled
          streetwear that blends 90s nostalgia with modern edge.
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="product-card"
            onClick={() => setActiveProduct(product)}
            whileHover={{ scale: 1.05, rotate: 0 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-white border-4 border-black shadow-retro overflow-hidden cursor-pointer relative">
              <div className="absolute top-0 right-0 bg-neon-green text-black px-3 py-1 font-bold text-sm uppercase z-10 transform rotate-3 shadow-retro-sm">
                {product.category}
              </div>

              <div className="aspect-square overflow-hidden relative">
                <div className="absolute inset-0 bg-scanlines opacity-30 mix-blend-multiply z-10"></div>
                <div
                  className="w-full h-full bg-cover bg-center transform hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>
              </div>

              <div className="p-4 bg-vintage-purple text-white">
                <h3 className="text-xl font-graffiti">{product.title}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wide text-neon-green font-bold">
                    Click to flip
                  </span>
                  <span className="text-xs">→</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProduct(null)}
          >
            <motion.div
              className="bg-vintage-yellow max-w-4xl w-full border-4 border-black shadow-retro-xl overflow-hidden"
              initial={{ y: 50, opacity: 0, rotate: -3 }}
              animate={{ y: 0, opacity: 1, rotate: 3 }}
              exit={{ y: 50, opacity: 0, rotate: -3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-0 relative">
                  <div className="absolute inset-0 bg-scanlines opacity-40 mix-blend-multiply z-10"></div>
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${activeProduct.image})` }}
                  ></div>
                </div>
                <div className="p-8 bg-pattern-dots">
                  <div className="bg-neon-pink inline-block px-3 py-1 text-black font-bold mb-4 transform -rotate-2">
                    {activeProduct.category}
                  </div>
                  <h2 className="text-3xl font-graffiti mb-4 text-black">
                    {activeProduct.title}
                  </h2>
                  <p className="text-black font-bold mb-8">
                    {activeProduct.description}
                  </p>
                  <div className="flex space-x-4">
                    <button className="bg-black text-thrift-teal px-6 py-2 font-bold uppercase border-2 border-thrift-teal shadow-retro transform -rotate-1">
                      Shop Now
                    </button>
                    <button
                      className="bg-white text-black px-6 py-2 font-bold uppercase border-2 border-black shadow-retro transform rotate-1"
                      onClick={() => setActiveProduct(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
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
