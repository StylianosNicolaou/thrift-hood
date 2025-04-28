"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function GraffitiDivider() {
  return (
    <motion.div
      className="relative w-full h-32 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Noise */}
      <div className="absolute inset-0 bg-noise opacity-10" />

      {/* Spray Paint Image */}
      <Image
        src="/graffiti-texture.jpg"
        alt="Graffiti Divider"
        fill
        className="object-cover opacity-30 blur-sm"
      />

      {/* Splatter Layer */}
      <motion.div
        className="absolute inset-0 bg-spray-red opacity-5 mix-blend-overlay"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}
