/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        dark: {
          DEFAULT: '#0B0B14',
          card: '#13131F',
          border: 'rgba(255, 255, 255, 0.05)'
        }
      },
      boxShadow: {
        'glow': '0 0 30px rgba(124, 58, 237, 0.2)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.32)',
      }
    },
  },
  plugins: [],
};