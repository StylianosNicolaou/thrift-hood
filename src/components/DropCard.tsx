"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type DropCardProps = {
  drop: {
    id: string;
    title: string;
    image: string;
  };
};

export function DropCard({ drop }: DropCardProps) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-asphalt-black border-2 border-concrete-gray shadow-lg hover:shadow-2xl transition-shadow duration-300"
      whileHover={{ scale: 1.03 }}
    >
      {/* Drop Image */}
      <div className="relative w-full h-60 md:h-80 overflow-hidden">
        <Image
          src={drop.image}
          alt={drop.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Drop Title */}
      <div className="p-4 flex flex-col gap-2 text-center">
        <h3 className="text-2xl font-heading text-street-yellow group-hover:text-electric-blue transition-colors duration-300">
          {drop.title}
        </h3>
        <p className="text-sm text-concrete-gray/70">
          Drop #{drop.id.toString().padStart(2, "0")}
        </p>
      </div>

      {/* Graffiti splash hover effect */}
      <motion.div className="absolute inset-0 z-10 bg-spray-red opacity-0 group-hover:opacity-10 transition duration-500" />
    </motion.div>
  );
}
