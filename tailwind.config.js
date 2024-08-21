import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      xlarge: '1.5rem',
      mega: '3rem',
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        hoverOpacity: 0.7,
        radius: {
          small: '0.5rem',
          medium: '0.625rem',
          large: '0.75rem',
        },
        fontSize: {
          tiny: '0.75rem',
          small: '0.875rem',
          medium: '1rem',
          large: '1.125rem',
        },
        boxShadow: { small: '0px 4px 24px rgba(0, 0, 0, 0.05)' },
      },
      themes: {
        light: {
          colors: {
            background: '#FFFFFF',
            foreground: '#2D2D2E',
            primary: {
              '50': '#e8fef3',
              '100': '#c6fdde',
              '200': '#93f9c6',
              '300': '#4df0a9',
              '400': '#1ad086',
              '500': '#01ab6c',
              '600': '#009963',
              '700': '#006e4a',
              '800': '#00593c',
              '900': '#004731',
              '950': '#00291e',
              foreground: '#FFFFFF',
              DEFAULT: '#01AB6C',
            },
            secondary: {
              '50': '#f5f5f6',
              '100': '#e6e6e7',
              '200': '#cacaca',
              '300': '#afb0b1',
              '400': '#878889',
              '500': '#6c6d6e',
              '600': '#5c5d5e',
              '700': '#4e4f50',
              '800': '#444446',
              '900': '#3c3c3d',
              '950': '#2d2d2e',
              foreground: '#FFFFFF',
              DEFAULT: '#2d2d2e',
            },
            danger: {
              '50': '#fef2f2',
              '100': '#fde8e6',
              '200': '#fbd0d0',
              '300': '#f8a9aa',
              '400': '#f3797c',
              '500': '#ea4f57',
              '600': '#d52939',
              '700': '#b41c2f',
              '800': '#971a2e',
              '900': '#811a2e',
              '950': '#480913',
              foreground: '#FFFFFF',
              DEFAULT: '#EA4F57',
            },
          },
        },
      },
    }),
  ],
}
