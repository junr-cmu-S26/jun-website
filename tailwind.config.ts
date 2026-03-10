import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ocean: {
          deep: '#0a1628',
          dark: '#0d2137',
          mid: '#1a3a5c',
          light: '#2a6496',
          foam: '#7eb8d4',
          mist: '#b8d4e8',
          pale: '#e8f4f8',
          sand: '#f5e6c8',
          gold: '#e8b86d',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'wave-1': 'wave 8s ease-in-out infinite',
        'wave-2': 'wave 10s ease-in-out infinite 1s reverse',
        'wave-3': 'wave 12s ease-in-out infinite 2s',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'particle': 'particle 4s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateX(0) scaleY(1)' },
          '50%': { transform: 'translateX(-3%) scaleY(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        particle: {
          '0%': { transform: 'translateY(0) translateX(0) scale(1)', opacity: '0.8' },
          '50%': { transform: 'translateY(-20px) translateX(10px) scale(1.2)', opacity: '0.4' },
          '100%': { transform: 'translateY(-40px) translateX(0) scale(0)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
