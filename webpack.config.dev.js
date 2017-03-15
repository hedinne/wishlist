const path = require('path');
const combineLoaders = require('webpack-combine-loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PORT = process.env.PORT || 3001;
const DEVPORT = process.env.DEVPORT || 3000;

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
          importLoaders: 1,
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
  ],

  devServer: {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
      '/api': `http://localhost:${PORT}`,
      '/auth': `http://localhost:${PORT}`,
      '/auth/login': `http://localhost:${PORT}`,
    },
  },
};
