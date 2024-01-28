/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
      },
      colors: {
        "very-dark-gray": "#2b2b2b",
        "dark-gray": "#969696",
      },
      screens: {
        sm: "375px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
      },
      backgroundImage: {
        "bcg-desktop": "url('/backgrounds/pattern-bg-desktop.png')",
        "bcg-mobile": "url('/backgrounds/pattern-bg-mobile.png')",
      },
    },
  },
  plugins: [],
};
