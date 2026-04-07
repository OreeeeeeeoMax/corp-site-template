/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './sites/**/*.html',
    './src/components/**/*.html',
    './index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif SC"', 'serif'],
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
