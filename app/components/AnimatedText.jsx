"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

const AnimatedText = ({
  children,
  element = "h2",
  className = "",
  delay = 0,
  staggerDelay = 0.05,
  animation = "chars", // words, chars, or lines
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current && typeof window !== "undefined") {
      let splitText;
      let targets;

      // Only use SplitText on client-side
      try {
        splitText = new SplitText(textRef.current, {
          type:
            animation === "words"
              ? "words"
              : animation === "chars"
              ? "chars"
              : "lines",
        });

        targets =
          animation === "words"
            ? splitText.words
            : animation === "chars"
            ? splitText.chars
            : splitText.lines;

        gsap.from(targets, {
          opacity: 0,
          y: 15,
          stagger: staggerDelay,
          duration: 0.8,
          ease: "power3.out",
          delay,
        });
      } catch (error) {
        // Fallback for any errors with SplitText
        gsap.from(textRef.current, {
          opacity: 0,
          y: 15,
          duration: 0.8,
          ease: "power3.out",
          delay,
        });
      }
    }
  }, [children, animation, delay, staggerDelay]);

  const Tag = element;

  return (
    <Tag ref={textRef} className={className}>
      {children}
    </Tag>
  );
};

export default AnimatedText;
