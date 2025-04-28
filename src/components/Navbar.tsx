"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-asphalt-black bg-opacity-90 backdrop-blur-md shadow-lg"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Left side: Logo */}
      <Link
        href="/"
        className="text-street-yellow font-graffiti text-3xl tracking-wider"
      >
        ThriftHood
      </Link>

      {/* Right side: Nav links */}
      <div className="flex gap-8 text-lg font-body">
        <Link
          href="/drops"
          className="hover:text-electric-blue transition duration-300 underline-offset-8 hover:underline"
        >
          Drops
        </Link>
        <Link
          href="/about"
          className="hover:text-spray-red transition duration-300 underline-offset-8 hover:underline"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="hover:text-toxic-green transition duration-300 underline-offset-8 hover:underline"
        >
          Contact
        </Link>
      </div>
    </motion.nav>
  );
}
