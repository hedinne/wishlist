const path = require('path');
const combineLoaders = require('webpack-combine-loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, '/client/src/app.jsx'),
  ],

  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
  },

  module: {

    rules: [{

      test: /\.jsx?$/,
      include: path.join(__dirname, '/client/src'),
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
      },
    }, {

      test: /\.scss$/,
      loader: combineLoaders([{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[emoji]',
        },
      }, {
        loader: 'postcss-loader',
      }, {
        loader: 'sass-loader',
      }]),
    }, {
      test: /\.(jpg|png)$/,
      loader: 'url-loader',
      options: {
        limit: 25000,
      },
    }],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/src/template/index.html',
    }),
  ],
};
