/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#16a34a",     // Primary green (buttons, active nav, accents)
        darkgreen: "#0f3d2e",   // Dark green (footer, hero background, CTA banners)
        lightgreen: "#ecfdf5",  // Light green (section backgrounds, badges)
        textdark: "#14532d",    // Text dark
        textmuted: "#6b7280",   // Text muted/gray
        warning: "#f59e0b",     // Warning/orange
        danger: "#ef4444",      // Danger/red
      },
      borderRadius: {
        'card': '12px',
        'pill': '9999px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px -1px rgba(0, 0, 0, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
