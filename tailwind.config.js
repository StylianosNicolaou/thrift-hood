/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "thrift-black": "#1B1B1B",
        "street-yellow": "#FFD600",
        "spray-red": "#FF4747",
        "electric-blue": "#00BFFF",
        "toxic-green": "#39FF14",
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        "bebas-neue": ["Bebas Neue", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
        chineseRocks: ["Chinese Rocks", "sans-serif"],
      },
      backgroundImage: {
        grain: "url('/assets/textures/grain.png')",
        noise: "url('/assets/textures/noise.png')",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            opacity: 1,
            filter: "brightness(1)",
          },
          "50%": {
            opacity: 0.8,
            filter: "brightness(1.3)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
