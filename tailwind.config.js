/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');


module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '0.75em': '0.75em',
        '1em': '1em',
        '2em': '2em',
        '3em': '3em',
        '4em': '4em'
      },
      fontSize: {
        '6xl': '2.5rem',
        '7xl': '3.5rem',
        '8xl': '4rem',
        '9xl': '5rem',
        '10xl': '5.5rem',
      },
      width: {
        'screen': '90rem',
      },
      colors: {
        primary: colors.purple,
        secondary: colors.orange,
        neutral: colors.gray,
        gray: colors.gray,
        emerald: colors.emerald,
        white: colors.white,
        red: colors.red,
        yellow: '#FCD25A',
        bg: '#F9FAFC',
        sidebar: '#F5F5F4',
      }
    },
  },
  plugins: [
    
  ],
  mode: 'jit',
  important: true,
}
