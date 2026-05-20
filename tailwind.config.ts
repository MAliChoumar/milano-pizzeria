import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      // ─── Brand Colors ────────────────────────────────────────────────────
      colors: {
        brand: {
          bg:      '#050505',
          bg2:     '#0d0d0d',
          bg3:     '#141414',
          bg4:     '#1c1c1c',
          bg5:     '#222222',
          white:   '#F5F5F5',
          white2:  '#e0e0e0',
          muted:   '#888888',
          faint:   '#555555',
          green:   '#6DA544',
          green2:  '#8bc34a',
          red:     '#D62828',
          gold:    '#c9a84c',
          gold2:   '#e8c97e',
          border:  'rgba(255,255,255,0.07)',
          border2: 'rgba(255,255,255,0.14)',
          glass:   'rgba(255,255,255,0.04)',
          glass2:  'rgba(255,255,255,0.08)',
        },
        // shadcn/ui compatibility
        border: 'hsl(var(--border))',
        input:  'hsl(var(--input))',
        ring:   'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      // ─── Typography ──────────────────────────────────────────────────────
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(52px, 8vw, 96px)',  { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(40px, 6vw, 72px)',  { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(30px, 4vw, 52px)',  { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(22px, 3vw, 36px)',  { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'heading-lg': ['clamp(18px, 2.5vw, 28px)', { lineHeight: '1.2' }],
        'heading-md': ['clamp(16px, 2vw, 22px)',   { lineHeight: '1.25' }],
        'label': ['11px', { lineHeight: '1.4', letterSpacing: '0.12em', fontWeight: '600' }],
      },

      // ─── Spacing ─────────────────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
      },

      // ─── Border Radius ───────────────────────────────────────────────────
      borderRadius: {
        lg:   'var(--radius)',
        md:   'calc(var(--radius) - 2px)',
        sm:   'calc(var(--radius) - 4px)',
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
        '5xl': '2rem',
      },

      // ─── Shadows ─────────────────────────────────────────────────────────
      boxShadow: {
        'luxury':       '0 32px 64px rgba(0,0,0,0.8)',
        'luxury-sm':    '0 16px 32px rgba(0,0,0,0.6)',
        'glow-green':   '0 0 60px rgba(109,165,68,0.3)',
        'glow-red':     '0 0 60px rgba(214,40,40,0.3)',
        'glow-gold':    '0 0 60px rgba(201,168,76,0.3)',
        'glass':        '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        'card':         '0 4px 24px rgba(0,0,0,0.6)',
        'elevated':     '0 24px 48px rgba(0,0,0,0.7)',
      },

      // ─── Blur ────────────────────────────────────────────────────────────
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },

      // ─── Animations ──────────────────────────────────────────────────────
      keyframes: {
        'accordion-down':   { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up':     { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-in':          { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-in-up':       { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'fade-in-left':     { from: { opacity: '0', transform: 'translateX(-40px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        'fade-in-right':    { from: { opacity: '0', transform: 'translateX(40px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        'float':            { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        'float-slow':       { '0%,100%': { transform: 'translateY(0) rotate(0deg)' }, '50%': { transform: 'translateY(-12px) rotate(3deg)' } },
        'pulse-glow':       { '0%,100%': { boxShadow: '0 0 20px rgba(109,165,68,0.4)' }, '50%': { boxShadow: '0 0 60px rgba(109,165,68,0.8)' } },
        'shimmer':          { from: { backgroundPosition: '-200% center' }, to: { backgroundPosition: '200% center' } },
        'ticker':           { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'slide-in-bottom':  { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
        'scale-in':         { from: { transform: 'scale(0.9)', opacity: '0' }, to: { transform: 'scale(1)', opacity: '1' } },
        'spin-slow':        { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        'steam':            { '0%,100%': { opacity: '0', transform: 'translateY(0) scaleX(1)' }, '50%': { opacity: '0.7', transform: 'translateY(-20px) scaleX(1.3)' } },
        'blink':            { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
      },
      animation: {
        'accordion-down':  'accordion-down 0.2s ease-out',
        'accordion-up':    'accordion-up 0.2s ease-out',
        'fade-in':         'fade-in 0.6s ease both',
        'fade-in-up':      'fade-in-up 0.8s ease both',
        'fade-in-left':    'fade-in-left 0.8s ease both',
        'float':           'float 6s ease-in-out infinite',
        'float-slow':      'float-slow 8s ease-in-out infinite',
        'pulse-glow':      'pulse-glow 3s ease-in-out infinite',
        'shimmer':         'shimmer 3s linear infinite',
        'ticker':          'ticker 25s linear infinite',
        'slide-in-bottom': 'slide-in-bottom 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        'scale-in':        'scale-in 0.4s cubic-bezier(0.175,0.885,0.32,1.275)',
        'spin-slow':       'spin-slow 20s linear infinite',
        'steam':           'steam 3s ease-in-out infinite',
        'blink':           'blink 2s ease-in-out infinite',
      },

      // ─── Screens ─────────────────────────────────────────────────────────
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
        '3xl': '1600px',
      },

      // ─── Background Images ───────────────────────────────────────────────
      backgroundImage: {
        'gradient-radial':        'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':         'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer-gradient':       'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        'hero-gradient':          'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(109,165,68,0.08) 0%, transparent 60%)',
        'card-gradient':          'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0))',
        'green-glow':             'radial-gradient(circle, rgba(109,165,68,0.15), transparent 60%)',
        'gold-shimmer':           'linear-gradient(135deg, #c9a84c, #e8c97e, #c9a84c)',
      },

      // ─── Transitions ─────────────────────────────────────────────────────
      transitionTimingFunction: {
        'spring':     'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'luxury':     'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'sharp':      'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },

      // ─── Z-Index ─────────────────────────────────────────────────────────
      zIndex: {
        'nav':      '100',
        'dropdown': '200',
        'modal':    '300',
        'toast':    '400',
        'floating': '500',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addUtilities, theme }: any) {
      addUtilities({
        '.glass': {
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '0.5px solid rgba(255,255,255,0.08)',
        },
        '.glass-md': {
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '0.5px solid rgba(255,255,255,0.12)',
        },
        '.glass-strong': {
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '0.5px solid rgba(255,255,255,0.18)',
        },
        '.text-gradient-gold': {
          background: 'linear-gradient(135deg, #c9a84c, #e8c97e, #c9a84c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        '.text-gradient-green': {
          background: 'linear-gradient(135deg, #6DA544, #8bc34a)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        '.scrollbar-none': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': 'rgba(255,255,255,0.1) transparent',
        },
      });
    },
  ],
};

export default config;
