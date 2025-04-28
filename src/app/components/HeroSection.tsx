"use client";
import { motion } from "framer-motion";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-asphalt text-white overflow-hidden px-6 md:px-0">
      {/* Background Noise/Grunge */}
      <div className="absolute inset-0 bg-noise-pattern opacity-20 pointer-events-none" />

      {/* Hero Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold graffiti-font text-center leading-tight tracking-tight"
      >
        THRIFTHOOD.CY
      </motion.h1>

      {/* Hero Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="text-lg md:text-2xl text-center mt-4 text-gray-400 max-w-2xl"
      >
        Streetwear · Skateboard Culture · Graffiti Aesthetic
      </motion.p>

      {/* Hero Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-10 flex flex-col md:flex-row gap-6"
      >
        <button
          className="bg-streetYellow text-black font-bold px-8 py-4 rounded-full graffiti-font hover:scale-105 hover:rotate-1 hover:shadow-lg transition-all duration-300"
          type="button"
        >
          SEE COLLECTIONS
        </button>

        <button
          className="border-2 border-electricBlue text-electricBlue font-bold px-8 py-4 rounded-full graffiti-font hover:bg-electricBlue hover:text-black hover:scale-105 hover:rotate-1 hover:shadow-lg transition-all duration-300"
          type="button"
        >
          OUR STORY
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
