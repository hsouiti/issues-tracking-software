/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
        arvo: ['Arvo', 'serif'],
        pt: ['PT Serif', 'serif'],
      },
    },
  },
  plugins: [],
};
