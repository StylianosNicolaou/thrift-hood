"use client";
import { motion } from "framer-motion";
import React from "react";

const SprayDrips: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 pointer-events-none">
      {/* Example 3 random drips */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 60 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="w-1 bg-[#FF4747] rounded-full"
      />
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 40 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="w-0.5 bg-[#00BFFF] rounded-full"
      />
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 50 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="w-1 bg-[#FFD600] rounded-full"
      />
    </div>
  );
};

export default SprayDrips;
