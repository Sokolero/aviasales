const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
  // entry
  entry: './src/index.js',

  // mode
  mode: 'development',

  // output
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  // loaders
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/, use: [ 'babel-loader' ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
    ]
  },

  // plugins
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ],

  // dev server configuration
  devServer: {
    port: 3000,
  },
};
