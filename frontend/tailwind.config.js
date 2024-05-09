/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        in: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        libre: ['"Playfair Display"', 'serif'],
        roboto: ['"Roboto"', 'sans-serif'],
        slab: ['"Roboto Slab"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        playfair: ['"Playfair"', 'serif'],
      },
      gridTemplateColumns: {
        'custom-2': '75% 25%', 
      },
    },
  },
  plugins: [],
}
