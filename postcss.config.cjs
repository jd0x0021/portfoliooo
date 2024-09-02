module.exports = {
  plugins: {
    '@csstools/postcss-global-data': {
      files: ['src/reset.module.css', 'src/global.module.css'],
    },
    'postcss-custom-media': {},
  },
};
