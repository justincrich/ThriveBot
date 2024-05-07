/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      '2xl': { max: '1419px' },
      // => @media (max-width: 1419px) { ... }
      xl: { max: '1179px' },
      // => @media (max-width: 1179px) { ... }
      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }
      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }
      sm: { max: '480px' },
      // => @media (max-width: 480px) { ... }
    },
    extend: {
      colors: {
        accent: {
          primary: '#FFD531',
          muted: '#F5F0DB',
          secondary: '#67913F',
        },
        status: {
          danger: '#F44336',
          dangerDark: '#EF9A9A',
          warning: '#ffc107',
          warningDark: '#fff3cd',
          success: '#155724',
          successDark: '#d4edda',
          info: '#004085',
          infoDark: '#cce5ff',
        },
        primary: '#211A0A',
        muted: '#A17D1C',
        inverted: '#fff',
        accentText: '#67913F',
        accentMuted: '#A17D1C',
        bgPrimary: '#FAF7F0',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({
        html: {
          '@apply text-[1rem]': {},
        },
        body: {
          '@apply bg-bgPrimary text-[1rem] leading-6 -tracking-[.01em] text-primary antialiased':
            {},
        },
      })
      addComponents({
        '.h1': {
          '@apply text-6xl font-bold -tracking-[.025em]': {},
        },
        '.h2': {
          '@apply text-5xl font-bold -tracking-[.025em]': {},
        },
        '.h3': {
          '@apply text-4xl font-bold -tracking-[.045em]': {},
        },
        '.h4': {
          '@apply text-3xl font-bold -tracking-[.02em]': {},
        },
        '.h5': {
          '@apply text-2xl font-semibold -tracking-[.03em]': {},
        },
        '.h6': {
          '@apply text-xl font-semibold -tracking-[.03em]': {},
        },
        '.title1': {
          '@apply text-[1.5rem] leading-9 font-semibold -tracking-[.03em]': {},
        },
        '.title2': {
          '@apply text-[1.375rem] leading-9 font-semibold -tracking-[.03em]':
            {},
        },
        '.body1': {
          '@apply text-[1.5rem] leading-9 -tracking-[.03em]': {},
        },
        '.body1S': {
          '@apply text-[1.375rem] leading-7 -tracking-[.02em]': {},
        },
        '.body2': {
          '@apply text-[1.0625rem] leading-6 -tracking-[.01em]': {},
        },
        '.base1': {
          '@apply text-[1rem] leading-6 font-medium -tracking-[.03em]': {},
        },
        '.base2': {
          '@apply text-[0.875rem] leading-6 font-medium -tracking-[.02em]': {},
        },
        '.caption1': {
          '@apply text-[0.75rem] leading-5 font-medium -tracking-[.03em]': {},
        },
        '.caption2': {
          '@apply text-[0.6875rem] leading-4 font-medium -tracking-[.01em]': {},
        },
        '.link': {
          '@apply text-primary underline font-bold': {},
        },
      })
    }),
  ],
}
