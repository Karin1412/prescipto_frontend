module.exports = {
  content: [
    "./index.html", // File HTML chính
    "./src/**/*.{js,jsx,ts,tsx}", // Các file React trong src
  ],
  theme: {
    extend: {
      fontFamily: {
        worksans: ['"Worksans"', 'sans-serif'],
        raleway: ['"Raleway"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
