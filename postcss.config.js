
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-assets')({
      loadPaths: ['images/']
    }),
  ],
};
