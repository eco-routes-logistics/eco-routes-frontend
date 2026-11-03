/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';

// Design tokens live as CSS variables in src/index.css (light under :root, dark under .dark).
// Values are space-separated RGB channels so opacity modifiers like bg-primary/10 keep working.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: token('color-primary'),
          hover: token('color-primary-hover'),
          subtle: token('color-primary-subtle'),
          // Legacy alias still used by pages not yet migrated
          dark: token('color-primary-hover'),
        },
        surface: {
          DEFAULT: token('color-surface'),
          raised: token('color-surface-raised'),
          sunken: token('color-surface-sunken'),
        },
        line: token('color-border'),
        ink: {
          DEFAULT: token('color-text-primary'),
          secondary: token('color-text-secondary'),
          muted: token('color-text-muted'),
        },
        success: { DEFAULT: token('color-success'), subtle: token('color-success-subtle') },
        warning: { DEFAULT: token('color-warning'), subtle: token('color-warning-subtle') },
        danger: { DEFAULT: token('color-danger'), subtle: token('color-danger-subtle') },
        info: { DEFAULT: token('color-info'), subtle: token('color-info-subtle') },

        // Legacy names from the old CDN config, kept until admin/client pages are migrated
        'background-light': '#f6f6f8',
        'background-dark': '#101622',
        'card-dark': '#1a2230',
        'surface-dark': '#1a202c',
        rejected: '#dc2626',
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1.25rem',
      },
      boxShadow: {
        raised: '0 1px 2px rgb(16 24 20 / 0.06), 0 1px 3px rgb(16 24 20 / 0.04)',
        overlay: '0 12px 32px rgb(16 24 20 / 0.12)',
      },
    },
  },
  plugins: [forms({ strategy: 'class' })],
};
