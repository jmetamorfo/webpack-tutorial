const path = require('path');
const common = require('./webpack.config');
const merge = require('webpack-merge');


module.exports = merge(common, {
  mode: 'none',
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  devtool: 'none',
  devServer: {
    contentBase: path.join(__dirname, '../dist')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/"
  }
});
