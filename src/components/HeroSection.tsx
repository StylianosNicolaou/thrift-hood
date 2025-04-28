"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-noise bg-blend-overlay bg-opacity-20">
      {/* Spray texture background overlay */}
      <div className="absolute inset-0 z-0 opacity-30">
        <img
          src="/graffiti-texture.jpg"
          alt="Graffiti Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Hero Content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-6xl md:text-8xl font-heading text-street-yellow drop-shadow-lg leading-tight">
          URBAN CHAOS <br /> THRIFT<span className="text-spray-red">HOOD</span>{" "}
          STYLE
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-concrete-gray">
          Streetwear born from graffiti, raised by the city.
        </p>
      </motion.div>
    </section>
  );
}
