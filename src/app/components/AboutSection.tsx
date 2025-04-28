"use client";
import { motion } from "framer-motion";
import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#1B1B1B] text-white">
      {/* Background Poster Wall */}
      <div className="absolute inset-0 bg-poster-wall-pattern opacity-10 pointer-events-none" />

      {/* Section Content */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 flex flex-col items-center text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-extrabold graffiti-font mb-8"
        >
          🧢 OUR STORY
        </motion.h2>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          viewport={{ once: true }}
          className="text-lg md:text-2xl text-gray-300 leading-relaxed max-w-3xl"
        >
          Born from the cracked sidewalks, skateparks, and graffiti-covered
          alleys of Cyprus, ThriftHood.cy was created for the rebels, the
          misfits, and the creators. We blend streetwear, skateboard culture,
          and raw artistry into every thread — staying true to our urban roots
          while pushing the future of street culture forward.
        </motion.p>

        {/* Learn More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <button
            type="button"
            className="bg-[#00BFFF] text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform"
          >
            LEARN MORE
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
