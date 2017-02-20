const path = require('path');
const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = 3000;


module.exports = {
  entry: [
    `webpack-dev-server/client?https://localhost:${PORT}`,
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
      loader: combineLoaders([{
        loader: 'react-hot-loader',
      },
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      }]),
    },
    {
      test: /\.scss$/,
      loader: combineLoaders([{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      }, {
        loader: 'postcss-loader',
      }, {
        loader: 'sass-loader',
      }]),
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'server/static/index.html',
    }),
  ],
  devServer: {
    inline: true,
    hot: true,
    contentBase: './build',
    port: PORT,
  },
};
