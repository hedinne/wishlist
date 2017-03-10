const path = require('path');
const combineLoaders = require('webpack-combine-loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const PORT = process.env.PORT || 3000;
const DEVPORT = process.env.DEVPORT || 3001;

module.exports = {
  entry: [
    `webpack-dev-server/client?http://localhost:${DEVPORT}`,
    'webpack/hot/dev-server',
    path.join(__dirname, '/client/src/router.jsx'),
  ],

  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
  },

  module: {

    rules: [{

      test: /\.jsx?$/,
      include: path.join(__dirname, '/client/src'),
      loader: combineLoaders([{
        loader: 'react-hot-loader',
      }, {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      }]),
    }, {

      test: /\.scss$/,
      loader: combineLoaders([{
        loader: 'classnames-loader',
      }, {
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[emoji:3]',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'static/template/index.html',
    }),
    // new FaviconsWebpackPlugin({
    //   logo: './static/images/fav2.png',
    //   prefix: 'icons-[hash]/',
    //   emitStats: false,
    //   statsFilename: 'iconstats-[hash].json',
    //   persistentCache: true,
    //   inject: true,
    //   background: '#fff',
    //   title: 'Wishlist',
    //
    //   icons: {
    //     android: true,
    //     appleIcon: true,
    //     appleStartup: true,
    //     coast: false,
    //     favicons: true,
    //     firefox: true,
    //     opengraph: false,
    //     twitter: false,
    //     yandex: false,
    //     windows: false,
    //   },
    // }),
  ],

  devServer: {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
    },
  },
};
