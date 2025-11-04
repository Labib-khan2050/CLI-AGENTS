import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark neon theme
        brand: {
          50: '#e0f0ff', 
          100: '#b3d9ff', 
          200: '#80c2ff', 
          300: '#4da6ff', 
          400: '#2693ff', 
          500: '#0080ff', // Rich neon blue primary
          600: '#0066cc', 
          700: '#004d99', 
          800: '#003366', 
          900: '#001a33',
        },
        // CLI Studio dark theme
        'cli-bg-primary': '#0a0a0f', // Almost black
        'cli-bg-secondary': '#12121a', // Dark grey
        'cli-bg-tertiary': '#1a1a24', // Lighter dark grey
        'cli-border-color': 'rgba(0, 128, 255, 0.3)', // Neon blue border
        'cli-text-primary': '#e0e0ff', // Light text
        'cli-text-secondary': '#9090c0', // Secondary text
        'cli-text-tertiary': '#6060a0', // Tertiary text
        'cli-accent': '#0080ff', // Rich neon blue accent
        'cli-glow': 'rgba(0, 128, 255, 0.5)', // Neon glow effect
      },
    },
  },
  plugins: [],
}
export default config
