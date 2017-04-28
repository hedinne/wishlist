/* eslint-disable global-require*/
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-assets')({
      loadPaths: ['static/images/'],
    }),
  ],
};
