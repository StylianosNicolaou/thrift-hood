import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "asphalt-black": "#1B1B1B",
        "street-yellow": "#FFD600",
        "spray-red": "#FF4747",
        "electric-blue": "#00BFFF",
        "toxic-green": "#39FF14",
        "concrete-gray": "#F5F5F5",
      },
      backgroundImage: {
        texture: "url('/graffiti-texture.jpg')",
        noise: "url('/background-noise.png')",
      },
      fontFamily: {
        heading: ["Bebas Neue", "Anton", "sans-serif"],
        body: ["Poppins", "Outfit", "sans-serif"],
        graffiti: ["Permanent Marker", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
