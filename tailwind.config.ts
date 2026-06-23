import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#05070D",
        navy: "#081426",
        gold: "#D9A441",
        bone: "#F4EAD7",
        fossil: "#C9A66B",
        teal: "#0E7C7B",
        rust: "#A3402A",
        leaf: "#496B2D",
        stone: "#6E6A5E",
        paper: "#FFF8EA",
      },
      fontFamily: {
        heading: ["Oswald", "Arial Narrow", "Arial", "sans-serif"],
        body: ["Source Sans 3", "Segoe UI", "Arial", "sans-serif"],
      },
      boxShadow: {
        museum: "0 24px 80px rgba(5, 7, 13, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
