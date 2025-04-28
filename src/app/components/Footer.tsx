"use client";
import { motion } from "framer-motion";
import React from "react";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#1B1B1B] text-white pt-16 pb-8">
      {/* Sticker Bomb Texture */}
      <div className="absolute inset-0 bg-sticker-wall-pattern opacity-10 pointer-events-none" />

      {/* Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Left: Links */}
        <div className="mb-8 md:mb-0">
          <ul className="space-y-3 text-lg">
            <li>
              <a
                href="#about"
                className="hover:text-[#FFD600] transition-colors graffiti-font"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#collections"
                className="hover:text-[#FFD600] transition-colors graffiti-font"
              >
                Collections
              </a>
            </li>
            <li>
              <a
                href="#community"
                className="hover:text-[#FFD600] transition-colors graffiti-font"
              >
                Community
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-[#FFD600] transition-colors graffiti-font"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Social Icons */}
        <div className="flex space-x-6">
          <motion.a
            href="https://instagram.com"
            whileHover={{ scale: 1.2 }}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-[#FF4747] hover:text-white transition-colors"
          >
            <FaInstagram />
          </motion.a>
          <motion.a
            href="https://tiktok.com"
            whileHover={{ scale: 1.2 }}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-[#00BFFF] hover:text-white transition-colors"
          >
            <FaTiktok />
          </motion.a>
          <motion.a
            href="https://facebook.com"
            whileHover={{ scale: 1.2 }}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-[#39FF14] hover:text-white transition-colors"
          >
            <FaFacebookF />
          </motion.a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="relative text-center text-sm text-gray-500 mt-12">
        © 2025 ThriftHood.cy | Built for the Streets 🛹🎨
      </div>
    </footer>
  );
};

export default Footer;
