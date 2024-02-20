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
        flipKeep: 'flip 1.2s ease forwards infinite',
        rotate: 'rotation 2s infinite linear',
      },
      keyframes: {
        flip: {
          '0%, 100%': {
            transform: 'rotateX(0)'
          },
          '45%, 55%': {
            transform: 'rotateX(90deg)'
          }
        },
        rotation: {
          '0%': {
            transform: 'rotate(0)'
          },
          '99%': {
            transform: 'rotate(359deg)'
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

