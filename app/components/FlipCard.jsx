"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const FlipCard = ({ frontContent, backContent, className = "" }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className={`flip-card cursor-pointer ${className}`}
      onClick={flipCard}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="flip-card-inner relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flip-card-front absolute w-full h-full bg-vintage-yellow border-2 border-black p-4 shadow-retro transform rotate-1 backface-hidden">
          {frontContent}
        </div>
        <div
          className="flip-card-back absolute w-full h-full bg-vintage-purple border-2 border-black p-4 shadow-retro transform rotate-2 backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          {backContent}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FlipCard;
