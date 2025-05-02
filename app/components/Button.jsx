"use client";
import { motion } from "framer-motion";

const Button = ({ children, variant = "primary", onClick, className = "" }) => {
  const variants = {
    primary:
      "bg-neon-green text-black border-2 border-black hover:bg-black hover:text-neon-green font-bold shadow-retro",
    secondary:
      "bg-black text-neon-pink border-2 border-neon-pink hover:bg-neon-pink hover:text-black font-bold shadow-retro",
    thrift:
      "bg-vintage-red text-white border-2 border-black hover:bg-black hover:text-vintage-red font-bold shadow-retro-sm",
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${variants[variant]} px-6 py-2 text-md tracking-wide uppercase transition-all duration-300 font-bold transform rotate-1 skew-x-1 ${className}`}
      whileHover={{ scale: 1.05, rotate: -1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
