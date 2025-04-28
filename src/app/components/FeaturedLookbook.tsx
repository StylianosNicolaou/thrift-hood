"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FeaturedLookbook: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const images = [
    "/images/look1.jpg",
    "/images/look2.jpg",
    "/images/look3.jpg",
    "/images/look4.jpg",
    "/images/look5.jpg",
    "/images/look6.jpg",
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(".lookbook-title", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });

      // Animate images
      gsap.from(imagesRef.current, {
        opacity: 0,
        y: 50,
        rotate: (index: number) => Math.random() * 10 - 5,
        stagger: 0.2,
        delay: 0.3,
        duration: 1,
        ease: "power3.out",
      });

      // Animate background graffiti wall slow parallax
      gsap.to(".graffiti-wall-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // smooth scrolling
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-asphalt text-white overflow-hidden"
    >
      {/* Moving Graffiti Wall Background */}
      <div className="absolute inset-0 bg-graffiti-wall bg-cover bg-center opacity-10 graffiti-wall-bg pointer-events-none" />

      {/* Section Title */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 text-center mb-16">
        <h2 className="text-5xl md:text-7xl graffiti-font font-extrabold lookbook-title">
          🛹 FEATURED LOOKBOOK
        </h2>
      </div>

      {/* Image Grid */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-10">
        {images.map((src, index) => (
          <div
            key={index}
            ref={(el) => (imagesRef.current[index] = el)}
            className="relative overflow-hidden rounded-lg shadow-lg group transform-gpu"
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg group transform-gpu">
              <div className="relative w-full h-[400px] overflow-hidden">
                <img
                  src={src}
                  alt={`Look ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-[2deg] group-hover:skew-x-1 group-hover:skew-y-1"
                />
              </div>

              {/* Sticker Frame Hover */}
              <div className="absolute inset-0 border-4 border-dashed border-streetYellow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />

              {/* Graffiti Tag Floating */}
              <div className="absolute top-3 left-3 bg-sprayRed text-black text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 graffiti-font">
                FRESH
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedLookbook;
