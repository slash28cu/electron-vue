/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'chivo-mono': ['Chivo Mono'],
        'digital-7-mono': ['Digital-7 Mono']
      },
      screens: {
        'xl': '1024px',
        '2xl': '1920px'
     }
    },
  },
  plugins: [],
};
