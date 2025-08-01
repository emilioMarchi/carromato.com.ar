/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'false',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'ipadpro': { 'raw': '(min-width: 1024px) and (min-height: 1366px)' },
      },
    },
  },
  plugins: [],
};
