const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'development',
  module: {
    rules: []
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test'
    })
  ],
  devServer: {
    hot: true,
    //contentBase: path.resolve(__dirname, 'dist'),
    port: 7000
  }
};