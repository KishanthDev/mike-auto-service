import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [function ({ addUtilities }) {
    addUtilities({
      ".no-scrollbar": {
        /* Hide scrollbar for WebKit */
        "-ms-overflow-style": "none", /* IE and Edge */
        "scrollbar-width": "none", /* Firefox */
      },
      ".no-scrollbar::-webkit-scrollbar": {
        display: "none",
      },
    });
  },
  heroui()
],
};

module.exports = config;
