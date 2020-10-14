const path = require("path"),
  WebpackDevServer = require("webpack-dev-server"),
  webpack = require("webpack"),
  pjson = require("../package.json"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  writeFilePlugin = require('write-file-webpack-plugin'),
  openurl = require("openurl");

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

const config = require("config");

config.webpackConfig.mode = process.env.NODE_ENV;

const protocoll = config.devServer.protocoll || "http",
  hostname = config.devServer.host || "localhost",
  port = config.devServer.port || 80;

const publicPath = "/dist";
var evoHost = config.devServer.evoHost;

const resolve = dir => path.join(__dirname, "..", dir);


config.webpackConfig.entry.main.unshift('webpack/hot/only-dev-server')
config.webpackConfig.entry.main.unshift(`webpack-dev-server/client?${protocoll}://${hostname}:${port}/`)

//[^ + publicPath]: Allrequests starting with the publicpath (/dist) are routed to the dev server
//[*] All requests are routed to the evoHost
//rules are executed from top to bottom
var proxy = {
  [publicPath]: {
    pathRewrite: {
      ["^" + publicPath]: ""
    },
    target: protocoll + "://" + hostname + ":" + port
  },
  "/web/*" : {
    target: protocoll + "://" + hostname + ":" + port
  },
  ["*"]: {
    changeOrigin: true,
    target: evoHost,
  },
};

//needed for the dev server to write the files to the disk
config.webpackConfig.plugins.push(new writeFilePlugin())
config.webpackConfig.plugins.push(new CopyWebpackPlugin([
      {from: "./src/images", to: "." + publicPath + "/images"},
      {from: "./src/fonts", to: "." + publicPath + "/fonts"},
    ]));

config.extraPlugins.forEach( plugin => config.webpackConfig.plugins.push(plugin))

config.webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())


var compiler = webpack(config.webpackConfig);

var server = new WebpackDevServer(compiler, {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "PageSpeed":'off'
  },
  contentBase: resolve("."+publicPath),
  clientLogLevel: "warning",
  compress: true,
  hot:true,
  inline: true,
  port:port,
  proxy: proxy
}).listen(port, hostname, () => {
  console.log(
    "Starting server on " + protocoll + "://" + hostname + ":" + port
  );
  openurl.open(protocoll + "://" + hostname + ":" + port);
})


