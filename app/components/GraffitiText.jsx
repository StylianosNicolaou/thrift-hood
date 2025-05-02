"use client";
import { motion } from "framer-motion";

const GraffitiText = ({
  children,
  element = "h2",
  className = "",
  color = "text-graffiti-blue",
  splatter = true,
  shadow = true,
}) => {
  const Tag = motion[element] || motion.div;
  const MotionTag = motion(Tag);

  const shadowClass = shadow ? "text-shadow-graffiti" : "";
  const splatterClass = splatter ? "with-splatter" : "";

  return (
    <MotionTag
      className={`font-graffiti ${color} ${shadowClass} ${splatterClass} ${className} transform -rotate-1 relative`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.random() * 0.2,
      }}
    >
      {children}
    </MotionTag>
  );
};

export default GraffitiText;
