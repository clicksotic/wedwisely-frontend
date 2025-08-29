/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],

  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#8B4513',
        error: '#ff6b6b',
        success: '#4ade80',
        warning: '#fbbf24',
      },
      fontFamily: {
        'comfortaa': ['Comfortaa-Regular'],
        'roboto': ['Roboto'],
      },
    },
  },
  plugins: [],
}

