/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      fontFamily: ["Montserrat", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
