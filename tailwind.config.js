/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        surface: '#18181b',
        border: '#27272a',
        brand: {
          cyan: '#06b6d4',
          emerald: '#10b981',
        },
        text: {
          primary: '#f4f4f5',
          secondary: '#a1a1aa',
          muted: '#71717a',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      gridTemplateColumns: {
        'bento': 'repeat(auto-fit, minmax(280px, 1fr))',
      }
    },
  },
  plugins: [],
}
