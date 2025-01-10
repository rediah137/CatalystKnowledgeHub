/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cms: {
          purple: '#662D91',
          teal: '#00A99D'
        }
      },
    },
  },
  plugins: [],
};