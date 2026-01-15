const goldenRatio = require("tailwindcss-golden-ratio");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    goldenRatio: {
      useCssVars: false,
    },
  },
  plugins: [goldenRatio],
};
