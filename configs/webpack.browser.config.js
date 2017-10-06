const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const publicPath = path.resolve('./public');

module.exports = {
  context: path.resolve('./src'),
  devtool: 'source-map',
  entry: {
    bundle: './browser.js'
  },
  output: {
    path: publicPath,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
