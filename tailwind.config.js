/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/dlc/SuperHumanizer.tsx",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        surface: '#1e293b',
        primary: '#3b82f6',
        text: '#f8fafc',
        textMuted: '#94a3b8',
      }
    },
  },
  plugins: [],
}
