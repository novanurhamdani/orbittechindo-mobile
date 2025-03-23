/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-Regular", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
      },
      colors: {
        "dark-blue": "#03071E",
        "dark-purple": "#370617",
        "dark-red": "#6A040F",
        red: "#9D0208",
        "bright-red": "#D00000",
        "orange-red": "#DC2F02",
        orange: "#E85D04",
        "light-orange": "#F48C06",
        gold: "#FAA307",
        yellow: "#FFBA08",
      },
    },
  },
  plugins: [],
};
