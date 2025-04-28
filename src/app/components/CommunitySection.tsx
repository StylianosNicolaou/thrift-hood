"use client";
import { motion } from "framer-motion";
import React, { useMemo } from "react";

const CommunitySection: React.FC = () => {
  const communityImages = [
    "/images/community1.jpg",
    "/images/community2.jpg",
    "/images/community3.jpg",
    "/images/community4.jpg",
    "/images/community5.jpg",
  ];

  // PRE-GENERATE RANDOM ROTATIONS
  const randomRotations = useMemo(
    () => communityImages.map(() => -5 + Math.random() * 10),
    []
  );

  return (
    <section className="relative py-24 bg-asphalt text-white">
      <div className="absolute inset-0 bg-sticker-wall-pattern opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-extrabold graffiti-font mb-12"
        >
          🏙️ THE HOOD CREW
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {communityImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotate: randomRotations[index] }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg shadow-lg group"
            >
              <img
                src={src}
                alt={`Community Member ${index + 1}`}
                className="w-full h-[300px] object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 border-4 border-dashed border-streetYellow rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <button
            type="button"
            className="bg-sprayRed text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform"
          >
            JOIN THE CREW
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
