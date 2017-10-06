const webpack = require('webpack');
const path = require('path');
const autoprefix = require('autoprefix');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const publicPath = path.resolve('./public');
const NODE_ENV = process.env;

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/browser.js'
  ],
  output: {
    path: publicPath,
    publicPath: '/assets',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]__[hash:6]'
            }
          },
          "sass-loader"
        ]
      }
    ]
  }
};

// use: [
//   ExtractTextPlugin('style'),
//   "css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
//   "sass-loader"
// ]
