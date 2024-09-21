/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          '350': '#00edd0'
        },
        blue: {
          '350': '#0091C8'
        },
        primary: '#000000',
        secondary: '#F90200',
        alert: {
          error: '#FCCA46',
          claim: '#3DA5D9',
          delivered: {
            '1': '#C7E30E',
            '2': '#06D6A0'
          },
          packed: '#674189',
          dispatched: '#1D272E',
          canceled: '#EF233C'
        }
      }
    },
  },
  plugins: [require('daisyui')],
}

