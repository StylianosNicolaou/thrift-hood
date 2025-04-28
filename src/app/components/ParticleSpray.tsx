"use client";
import { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticleSpray = () => {
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowParticles(false);
    }, 1500); // 1.5 seconds spray

    return () => clearTimeout(timer);
  }, []);

  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  if (!showParticles) return null;

  return (
    <div className="fixed inset-0 z-50 bg-transparent pointer-events-none">
      <Particles
        id="sprayParticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: {
              value: 150, // ✅ spawn particles immediately
              density: { enable: true, area: 800 },
            },
            color: {
              value: ["#FF4747", "#FFD600", "#00BFFF", "#39FF14"],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.8,
            },
            size: {
              value: { min: 2, max: 4 },
            },
            move: {
              enable: true,
              speed: { min: 30, max: 50 },
              direction: "none", // ❗ random spray
              random: true,
              straight: false,
              outModes: { default: "destroy" }, // particles disappear
            },
            life: {
              duration: {
                sync: true,
                value: 1.5, // particle lives for 1.5s
              },
              count: 1,
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default ParticleSpray;
