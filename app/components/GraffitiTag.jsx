"use client";
import { motion } from "framer-motion";

export default function GraffitiTag({ src, delay = 0, className = "" }) {
  return (
    <motion.img
      src={src}
      alt="Graffiti"
      initial={{ x: -100, opacity: 0, rotate: -10 }}
      animate={{ x: 0, opacity: 1, rotate: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`absolute ${className} w-24 h-auto pointer-events-none`}
    />
  );
}
