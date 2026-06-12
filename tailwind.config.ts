import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        paper: '#f4efe3',
        ink: '#1f2933',
        pine: '#24514b',
        clay: '#b86f52',
        mist: '#d9e4df',
      },
      boxShadow: {
        journal: '0 24px 80px rgba(48, 38, 25, 0.16)',
        ink: '0 18px 50px rgba(31, 41, 51, 0.22)',
      },
      backgroundImage: {
        paper: 'radial-gradient(circle at 15% 15%, rgba(255,255,255,.85), transparent 28%), linear-gradient(135deg, rgba(255,255,255,.55), rgba(244,239,227,.82))',
      },
    },
  },
  plugins: [],
} satisfies Config;
