/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  prefix: 'tw-', // prefix for tailwind classes
  theme: {
    extend: {
      screens: {
        'x-sm': { max: '425px' }
      },
      height: {
        header: 'var(--header-content__height)',
        main: 'var(--main-content__height)',
        footer: 'var(--footer-content__height)'
      },
      fontSize: {
        p: 'clamp(1rem, 2vw, 2.25rem)'
      },
      colors: {
        grey: {
          DEFAULT: '#333639',
          100: '#808080',
          200: '#f7f5ef'
        },
        green: {
          DEFAULT: '#36ad6a'
        }
      }
    }
  },
  plugins: []
}
