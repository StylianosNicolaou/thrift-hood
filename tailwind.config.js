module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        chinese: ['"Chinese Rocks"', "sans-serif"],
      },
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        neonGreen: "#39FF14",
        hotPink: "#FF007F",
        electricBlue: "#00BFFF",
        mustardYellow: "#FFD700",
        brightRed: "#FF2400",
      },
    },
  },
  plugins: [],
};
