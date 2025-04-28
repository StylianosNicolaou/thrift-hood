"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import SprayDrips from "./SprayDrips"; // 👈 Import

const PageTransitionOverlay: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="fixed top-0 left-0 w-full h-full origin-left z-50 bg-[url('/images/spray-texture.png')] bg-cover bg-center flex justify-center items-end"
        >
          {/* DRIPS AFTER SPRAY */}
          <SprayDrips />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransitionOverlay;
