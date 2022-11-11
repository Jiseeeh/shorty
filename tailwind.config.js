/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        rngTheme: {
          primary: "#ed7bb0",
          secondary: "#d85bb7",
          accent: "#8fbce0",
          neutral: "#221B32",
          "base-100": "#EAEBF6",
          info: "#84C5F1",
          success: "#26BA90",
          warning: "#B9940E",
          error: "#FB567C",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
