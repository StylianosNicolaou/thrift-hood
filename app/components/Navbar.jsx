"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Lookbook", href: "#lookbook" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-2 bg-thrift-black shadow-retro"
            : "py-4 bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Link href="#home" className="block">
              {/* Circular logo container with VHS effect */}
              <div className="relative bg-glitch rounded-full overflow-hidden border-2 border-white shadow-retro h-14 w-14 md:h-16 md:w-16 flex items-center justify-center">
                {/* Actual logo image - circular */}
                <Image
                  src="/thrifthood_logo.png"
                  alt="ThriftHood.cy Logo"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full animate-vhs-flicker rounded-full"
                  style={{
                    filter: "contrast(1.1) brightness(1.1)",
                    mixBlendMode: "lighten",
                  }}
                />

                {/* Optional: Static noise overlay */}
                <div className="absolute inset-0 bg-static opacity-10 mix-blend-overlay pointer-events-none rounded-full"></div>
              </div>

              {/* Brand name next to logo */}
              <span className="sr-only md:not-sr-only ml-3 inline-block font-graffiti text-xl text-thrift-teal">
                ThriftHood.cy
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Link
                  href={link.href}
                  className="text-thrift-teal font-bold text-md tracking-wide hover:text-thrift-red transition-colors duration-300 uppercase"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              className="bg-thrift-yellow text-thrift-black px-4 py-2 font-bold uppercase border-2 border-black shadow-retro transform rotate-2"
              whileHover={{ scale: 1.1, rotate: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="#shop">Shop</Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-thrift-teal focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative w-8 h-6">
              <motion.span
                className="absolute h-1 w-full bg-thrift-teal rounded transition-all"
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 10 : 0,
                }}
              ></motion.span>
              <motion.span
                className="absolute top-1/2 -mt-0.5 h-1 w-full bg-thrift-teal rounded transition-all"
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
              ></motion.span>
              <motion.span
                className="absolute bottom-0 h-1 w-full bg-thrift-teal rounded transition-all"
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -10 : 0,
                }}
              ></motion.span>
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-thrift-black pt-24 overflow-y-auto pattern-grid"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="container mx-auto px-4 py-12 flex flex-col space-y-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b-2 border-thrift-red pb-4"
                >
                  <Link
                    href={link.href}
                    className="text-3xl text-thrift-teal font-bold tracking-wide block py-2 font-graffiti"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 inline-block"
              >
                <Link
                  href="#shop"
                  className="bg-thrift-yellow text-thrift-black px-6 py-3 text-xl font-bold uppercase border-2 border-white shadow-retro inline-block transform -rotate-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
