"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Lookbook", href: "#lookbook" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { name: "Instagram", href: "#", icon: "instagram" },
    { name: "TikTok", href: "#", icon: "tiktok" },
    { name: "YouTube", href: "#", icon: "youtube" },
    { name: "Twitter", href: "#", icon: "twitter" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-thrift-black text-white py-16 relative overflow-hidden pattern-grid-dense">
      <div className="vintage-tape-x top-0"></div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <motion.div
              className="mb-8 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo container with rings effect */}
              <div className="relative h-24 w-24 overflow-visible">
                {/* Outer ring animation */}
                <motion.div
                  className="absolute -inset-4 rounded-full border-2 border-thrift-red opacity-70"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                ></motion.div>

                {/* Middle ring animation */}
                <motion.div
                  className="absolute -inset-2 rounded-full border-2 border-thrift-teal opacity-70"
                  animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                ></motion.div>

                {/* Actual logo image */}
                <Image
                  src="/thrifthood_logo.png"
                  alt="ThriftHood.cy Logo"
                  width={150}
                  height={150}
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                />

                {/* Static overlay */}
                <div className="absolute inset-0 rounded-full bg-static opacity-10 mix-blend-overlay"></div>
              </div>
            </motion.div>

            <motion.div
              className="mt-8 flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {socialLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="w-10 h-10 flex items-center justify-center bg-thrift-teal border-2 border-black text-black shadow-retro transform hover:scale-110 hover:rotate-12 transition-all duration-300"
                  style={{ transform: `rotate(${(index - 1.5) * 5}deg)` }}
                  aria-label={link.name}
                >
                  <span className="sr-only">{link.name}</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG icons remain the same */}
                    {link.icon === "instagram" && (
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    )}
                    {link.icon === "tiktok" && (
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    )}
                    {link.icon === "youtube" && (
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    )}
                    {link.icon === "twitter" && (
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    )}
                  </svg>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Rest of the footer remains unchanged */}
          <div className="md:col-span-3 md:col-start-8">
            <motion.div
              className="bg-thrift-red inline-block px-3 py-1 text-white font-bold mb-6 transform -rotate-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-sm uppercase tracking-wide">Navigation</h4>
            </motion.div>

            <div className="space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.05 * (index + 1) }}
                  className="transform hover:translate-x-2 transition-transform duration-300"
                >
                  <Link
                    href={link.href}
                    className="text-thrift-teal text-lg font-bold hover:text-thrift-yellow transition-colors duration-300 uppercase"
                  >
                    &#x2192; {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <motion.div
              className="bg-thrift-yellow inline-block px-3 py-1 text-black font-bold mb-6 transform rotate-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-sm uppercase tracking-wide">Contact</h4>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-thrift-red text-lg font-bold">
                @thrifthood.cy
              </p>
              <p className="text-white">
                Private Str, Megaro Mitsi St, Nicosia 1065
              </p>
            </motion.div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center border-t-2 border-white/20">
          <motion.p
            className="text-xs text-thrift-teal font-bold uppercase tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            © {currentYear} ThriftHood.cy | Stay Raw. Stay Recycled. Stay Hood.
          </motion.p>

          <motion.div
            className="mt-4 md:mt-0 flex space-x-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              href="#"
              className="text-xs text-thrift-red hover:text-thrift-teal transition-colors duration-300 font-bold uppercase"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs text-thrift-red hover:text-thrift-teal transition-colors duration-300 font-bold uppercase"
            >
              Terms
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="vintage-tape-x bottom-0 transform rotate-1"></div>
    </footer>
  );
};

export default Footer;
