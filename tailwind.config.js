module.exports = {
  purge: {
    mode: 'all',
    preserveHtmlElements: false,
    content: ['./resources/**/*.{edge,ts,scss}'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        discord: {
          DEFAULT: '#7289da',
          gray: '#2C2F33',
          light: '#8ea1e1',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
