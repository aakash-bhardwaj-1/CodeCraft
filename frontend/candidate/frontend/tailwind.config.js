module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          400: '#08AEEA',
        },
        green: {
          300: '#2AF598',
          400: '#85FFBD',
        },
        yellow: {
          200: '#FFFB7D',
        },
      },
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
