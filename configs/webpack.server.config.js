const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const distPath = path.resolve('./dist');

module.exports = {
  context: path.resolve('./src'),
  entry: {
    app: './server/index.js'
  },
  output: {
    path: distPath,
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /(\.jsx?$)/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: [
            [ "css-modules-transform", {
              "preprocessCss": path.resolve("./processSass"),
              "generateScopedName": "[local]__[hash:6]",
              "extensions": [".css", ".scss"]
            }]
          ]
        }
      }
    ]
  },
  target: 'node',
  externals: [nodeExternals()]
};
