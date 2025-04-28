import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}", // 👈 Notice src/app
    "./src/app/components/**/*.{ts,tsx}", // 👈 Components too
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        asphalt: "#1B1B1B",
        streetYellow: "#FFD600",
        sprayRed: "#FF4747",
        electricBlue: "#00BFFF",
        toxicGreen: "#39FF14",
        concreteGray: "#F5F5F5",
      },
      fontFamily: {
        graffiti: ["Bebas Neue", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
      },
      backgroundImage: {
        "graffiti-wall": "url('/images/graffiti-wall-texture.jpg')",
      },
    },
  },
  plugins: [],
};

export default config;
