var config = require("config");


const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const writeFilePlugin = require("write-file-webpack-plugin");

const extraPlugins = []

extraPlugins.forEach( plugin => config.webpackConfig.plugins.push(plugin))

module.exports = Object.assign({},
  config.webpackConfig,
  {watch: false}
);
