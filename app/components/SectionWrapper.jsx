"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SectionWrapper = ({
  children,
  className = "",
  id,
  bgPattern = "pattern-1", // Various 90s patterns: pattern-1, pattern-2, etc.
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (section) {
      gsap.fromTo(
        section.querySelectorAll(".animate-in"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`px-4 py-16 md:py-24 md:px-8 relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className={`absolute inset-0 opacity-10 ${bgPattern}`}></div>
      <div className="max-w-7xl mx-auto relative z-10">{children}</div>
    </motion.section>
  );
};

export default SectionWrapper;
