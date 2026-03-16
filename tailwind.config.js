/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          main: '#0a0a0c',
          secondary: '#0f0f13',
        },
        primary: {
          DEFAULT: '#3b82f6',
          glow: 'rgba(59, 130, 246, 0.5)',
        },
        secondary: {
          DEFAULT: '#8b5cf6',
          glow: 'rgba(139, 92, 246, 0.5)',
        },
        text: {
          primary: '#f8fafc',
          secondary: '#94a3b8',
          muted: '#64748b',
        }
      },
      borderRadius: {
        'lg': '16px',
        'md': '12px',
      },
      animation: {
        'float': 'float 20s infinite ease-in-out alternate',
        'pulse-slow': 'pulse 4s infinite alternate',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(5%, 5%) scale(1.1)' },
        }
      }
    },
  },
  plugins: [],
}
