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
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f9e4b8",
          secondary: "#c3a5e5",
          accent: "#a0ff47",
          neutral: "#2b2839",
          "base-100": "#342f41",
          info: "#7995d2",
          success: "#167e75",
          warning: "#f4c11a",
          error: "#e33564",
        },
      },
      "light",
      "dark",
    ],
  },
};
