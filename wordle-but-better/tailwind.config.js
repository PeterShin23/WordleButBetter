/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        flip: 'flip 0.7s ease forwards',
        flipKeep: 'flip 1.2s ease forwards infinite'
      },
      keyframes: {
        flip: {
          '0%, 100%': {
            transform: 'rotateX(0)'
          },
          '45%, 55%': {
            transform: 'rotateX(90deg)'
          }
        }
      },
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animate-delay': (value) => ({
            animationDelay: value,
          }),
        },
        { values: theme('transitionDelay') }
      )
    }),
  ],
}

