/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(300px,1fr))",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],

          primary: "#2a7ca3",

          secondary: "#36d30a",

          accent: "#4ecdfc",

          neutral: "#2d2834",

          "base-100": "#fafafa",

          info: "#8fcae6",

          success: "#186d4e",

          warning: "#ac7c0c",

          error: "#df5049",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          primary: "#d3c5f9",

          secondary: "#56f754",

          accent: "#ffa17c",

          neutral: "#1e2633",

          "base-100": "#2e333e",

          info: "#53b3d0",

          success: "#1abc84",

          warning: "#b17d0b",

          error: "#f52963",
        },
      },
      "light",
      "dark",
    ],
  },
};
