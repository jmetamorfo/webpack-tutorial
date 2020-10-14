const path = require('path');
const common = require('./webpack.config');
const merge = require('webpack-merge');

module.exports = merge( common, {
  mode: 'production',
  devtool: 'none',
  output: {
    filename: '[name].bundle.[contentHash].js',
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/"
  }
});
