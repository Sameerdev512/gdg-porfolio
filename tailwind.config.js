/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0B0B0F',
          primary: '#4F9DFF',
          secondary: '#7C5CFF',
          glow: '#22D3EE',
          text: '#F3F4F6',
          muted: '#9CA3AF',
          card: '#111118',
          border: '#1E1E2E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #4F9DFF 0%, #7C5CFF 100%)',
        'gradient-glow': 'linear-gradient(135deg, #4F9DFF 0%, #22D3EE 100%)',
        'gradient-dark': 'linear-gradient(135deg, #111118 0%, #0B0B0F 100%)',
        'gradient-hero': 'radial-gradient(ellipse at 50% 0%, rgba(79,157,255,0.15) 0%, rgba(11,11,15,0) 70%)',
        'gradient-section': 'radial-gradient(ellipse at 0% 50%, rgba(124,92,255,0.08) 0%, transparent 60%)',
      },
      boxShadow: {
        'glow-primary': '0 0 40px rgba(79,157,255,0.3)',
        'glow-secondary': '0 0 40px rgba(124,92,255,0.3)',
        'glow-cyan': '0 0 40px rgba(34,211,238,0.3)',
        'card': '0 4px 32px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 48px rgba(79,157,255,0.15)',
        'glass': '0 8px 32px rgba(0,0,0,0.3)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 0.75s step-end infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
