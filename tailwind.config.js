/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          metallic: '#D4AF37',
          amber: '#F59E0B',
        },
        cyber: {
          black: '#050508',
          dark: '#0a0a0f',
          surface: '#0f0f17',
          card: '#12121e',
          border: 'rgba(255, 255, 255, 0.1)',
        }
      },
      fontFamily: {
        sans: ['"Prompt"', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Space Grotesk"', '"Prompt"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-red': '0 0 25px rgba(220, 38, 38, 0.45)',
        'glow-red-lg': '0 0 45px rgba(239, 68, 68, 0.55)',
        'glow-gold': '0 0 25px rgba(212, 175, 55, 0.45)',
        'glow-gold-lg': '0 0 45px rgba(245, 158, 11, 0.55)',
      },
      animation: {
        'spin-slow': 'spinBorder 8s linear infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        spinBorder: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.75' },
        }
      }
    },
  },
  plugins: [],
}
