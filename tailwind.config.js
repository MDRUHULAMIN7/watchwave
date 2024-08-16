/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6f61',
        'primary-dark': '#ff6f61',
        secondary: '#6b5b95',
        'secondary-dark': '#5a4b7f',
        accent: '#4fd5fe',
        background: '#80cbc4',
        background2: '#2c3e54',
        textColor: '#ff3810',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

