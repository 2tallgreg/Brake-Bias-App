/** @type {import('tailwindcss').Config} */
module.exports = {
  // The 'darkMode' property is used by next-themes to control the theme
  darkMode: 'class',

  // This is the most important part. It tells Tailwind where to look for classes.
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './js/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      // Here you can extend the default Tailwind theme.
      // For example, referencing colors from your globals.css or theme.css
      colors: {
        'accent': 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
      },
      backgroundColor: {
        'primary': 'var(--bg-primary)',
        'secondary': 'var(--bg-secondary)',
      },
      textColor: {
        'primary': 'var(--text-primary)',
        'secondary': 'var(--text-secondary)',
      },
      borderColor: {
        'default': 'var(--border)',
      }
    },
  },
  plugins: [],
};