const path = require('path');
const combineLoaders = require('webpack-combine-loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, '/client/src/App.jsx'),
  ],

  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  module: {

    rules: [{

      test: /\.jsx?$/,
      include: path.join(__dirname, '/client/src'),
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: [
          ['env', {
            targets: {
              browsers: ['last 2 versions', 'safari >= 7'],
            },
          }],
          'react',
        ],
      },
    }, {

      test: /\.scss$/,
      include: path.join(__dirname, '/client/src'),
      loader: combineLoaders([{
        loader: 'classnames-loader',
      }, {
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[hash:base64:5]',
          includePaths: [
            'client/src/styles',
            './client/src/styles',
          ],
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
      template: 'static/template/index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: './static/images/fav2.png',
      prefix: 'icons-[hash]/',
      emitStats: false,
      statsFilename: 'iconstats-[hash:6].json',
      persistentCache: true,
      inject: true,
      background: '#fff',
      title: 'Wishlist',

      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: false,
        windows: false,
      },
    }),
  ],
};
