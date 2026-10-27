/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#08090b',
          surface: '#111319',
          card: '#161922',
          elevated: '#1e222e'
        },
        pika: {
          yellow: '#ffd83a',
          gold: '#ff9f0a',
          accent: '#ffb703',
          dark: '#08090b',
          muted: '#8e95a5'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(255, 216, 58, 0.3)',
        'glow-subtle': '0 0 20px -3px rgba(255, 216, 58, 0.15)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.8)',
      }
    },
  },
  plugins: [],
}
