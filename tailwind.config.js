/** @type {import('tailwindcss').Config} */
const tailwindTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...tailwindTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
