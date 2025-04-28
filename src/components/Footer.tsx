"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative bg-asphalt-black bg-texture text-concrete-gray mt-16 p-8 overflow-hidden">
      {/* Stickers Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="/stickers-overlay.png"
          alt="Stickers Overlay"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Footer Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Brand Name */}
        <Link
          href="/"
          className="text-street-yellow font-graffiti text-3xl tracking-wide"
        >
          ThriftHood
        </Link>

        {/* Social Icons */}
        <div className="flex gap-8 mt-4">
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-spray-red transition"
          >
            Instagram
          </Link>
          <Link
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-electric-blue transition"
          >
            TikTok
          </Link>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-toxic-green transition"
          >
            Facebook
          </Link>
        </div>

        {/* Small note */}
        <p className="text-sm text-concrete-gray/70 mt-6">
          © {new Date().getFullYear()} ThriftHood.cy — All Rights Reserved
        </p>
      </motion.div>
    </footer>
  );
}
