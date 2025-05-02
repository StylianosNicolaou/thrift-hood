/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik", "ui-sans-serif", "system-ui"],
        graffiti: ["Permanent Marker", "cursive"],
        retro: ["VT323", "monospace"],
      },
      colors: {
        // New ThriftHood color scheme
        "thrift-teal": "#00e5e8",
        "thrift-purple": "#7e22ce",
        "thrift-yellow": "#faff00",
        "thrift-red": "#ff0055",
        "thrift-blue": "#0022ff",
        "thrift-black": "#121212",
        "thrift-lime": "#c1ff00",

        // Original colors kept for backward compatibility
        "neon-green": "#39ff14",
        "neon-pink": "#ff2a6d",
        "neon-orange": "#ff7f11",
        "vintage-purple": "#251351",
        "vintage-red": "#ce1126",
        "vintage-yellow": "#ffd100",
      },
      backgroundColor: {
        static: "#000",
      },
      backgroundImage: {
        scanlines: "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%)",
        "vhs-static":
          "url('data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')",
        "gradient-90s":
          "linear-gradient(45deg, var(--thrift-purple) 0%, var(--thrift-red) 50%, var(--thrift-teal) 100%)",
        "gradient-vaporwave":
          "linear-gradient(to right, var(--thrift-purple) 0%, var(--thrift-teal) 100%)",
      },
      boxShadow: {
        retro: "4px 4px 0px #000000",
        "retro-sm": "2px 2px 0px #000000",
        "retro-xl": "8px 8px 0px #000000",
        neon: "0 0 5px var(--thrift-teal), 0 0 10px var(--thrift-teal)",
      },
      animation: {
        glitch: "glitchText 0.2s ease-in-out infinite",
        "tracking-line": "trackingLine 2s linear infinite",
        "vhs-flicker": "vhs-flicker 4s infinite",
        "price-tag-swing": "price-tag-swing 4s ease-in-out infinite",
      },
      keyframes: {
        glitchText: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        trackingLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        vhsFlicker: {
          "0%": { opacity: "0.9" },
          "5%": { opacity: "0.5" },
          "10%": { opacity: "0.9" },
          "75%": { opacity: "0.9" },
          "80%": { opacity: "0.5" },
          "85%": { opacity: "0.9" },
          "100%": { opacity: "0.9" },
        },
        priceTagSwing: {
          "0%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
          "100%": { transform: "rotate(-3deg)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/aspect-ratio"),
  ],
};
