/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "2xl": { max: "1800px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      // MOBILES
      "3sm": { max: "600px" },
      "2sm": { max: "480px" },
      sm: { max: "360px" },

      // max-heights
      "3sh": { raw: "(max-height: 900px)" },
      "2sh": { raw: "(max-height: 640px)" },
      sh: { raw: "(max-height: 480px)" },
    },
    colors: {
      error: {
        DEFAULT: "var(--error)",
        ls: "var(--error-ls)",
      },
      warning: {
        DEFAULT: "var(--warning)",
        ls: "var(--warning-ls)",
      },
      success: {
        DEFAULT: "var(--success)",
        ls: "var(--success-ls)",
      },

      color1: {
        DEFAULT: "var(--color1)",
        tint: "var(--color1-tint)",
        dark: "var(--color1-dark)",
      },
      color2: {
        DEFAULT: "var(--color2)",
        tint: "var(--color2-tint)",
        dark: "var(--color2-dark)",
      },
      white: {
        DEFAULT: "var(--white)",
      },
      black: {
        DEFAULT: "var(--black)",
      },
      gray: {
        DEFAULT: "var(--gray)",
        ...colors.gray,
      },
    },
    fontFamily: {
      style1: ["Open Sans", "sans-serif"],
      style2: ["Roboto", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false, // <== disable this!
  // },
}
