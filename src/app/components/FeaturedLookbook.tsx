"use client";
import { motion } from "framer-motion";
import React from "react";

const FeaturedLookbook: React.FC = () => {
  // Example array of featured images
  const featuredImages = [
    "/images/look1.jpg",
    "/images/look2.jpg",
    "/images/look3.jpg",
  ];

  return (
    <section className="relative py-20 bg-[#1B1B1B] text-white">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-noise-pattern opacity-10 pointer-events-none" />

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-extrabold graffiti-font text-center mb-12"
      >
        🔥 Latest Fits
      </motion.h2>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20">
        {featuredImages.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg shadow-lg group"
          >
            <img
              src={src}
              alt={`Look ${index + 1}`}
              className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
            />

            {/* Graffiti Tag on Hover */}
            <div className="absolute top-4 left-4 bg-[#FF4747] text-black font-bold px-3 py-1 rounded graffiti-font text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              FRESH DROP
            </div>
          </motion.div>
        ))}
      </div>

      {/* View Full Lookbook Button */}
      <div className="flex justify-center mt-16">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-[#FFD600] text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform"
          type="button"
        >
          VIEW FULL LOOKBOOK
        </motion.button>
      </div>
    </section>
  );
};

export default FeaturedLookbook;
