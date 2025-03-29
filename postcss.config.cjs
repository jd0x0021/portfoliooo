module.exports = {
  plugins: {
    '@csstools/postcss-global-data': {
      files: ['src/global.module.css', 'src/reset.module.css'],
    },
    'postcss-custom-media': {},
  },
};
