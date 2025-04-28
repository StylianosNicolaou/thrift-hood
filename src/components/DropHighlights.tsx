"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const drops = [
  { id: 1, title: "Summer Spray 2025", image: "/drops/drop1.jpg" },
  { id: 2, title: "Underground Kings", image: "/drops/drop2.jpg" },
  { id: 3, title: "Electric Chaos", image: "/drops/drop3.jpg" },
  // Add more drop previews here
];

export function DropHighlights() {
  return (
    <section className="py-12 overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-heading text-center text-street-yellow mb-8">
        New Drops
      </h2>

      {/* Swipeable Drops */}
      <motion.div
        className="flex gap-6 px-6 overflow-x-auto pb-4"
        whileTap={{ cursor: "grabbing" }}
      >
        {drops.map((drop) => (
          <motion.div
            key={drop.id}
            className="min-w-[250px] md:min-w-[300px] bg-asphalt-black border-2 border-street-yellow rounded-lg overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={drop.image}
              alt={drop.title}
              width={300}
              height={400}
              className="object-cover w-full h-60"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-graffiti text-electric-blue">
                {drop.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
