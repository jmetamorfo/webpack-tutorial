const path = require("path");

const webpack = require("webpack");
const SvgStore = require("webpack-svgstore-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const RemoveStrictPlugin = require( 'remove-strict-webpack-plugin' );

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const devServer = {
  protocoll: "http",
  host : "127.0.0.1",
  port : 8888,
  evoHost: "http://127.0.0.1",
};

const webpackConfig = {
  watch: true,
  target: "web",
  entry:  {
    "main" : ["babel-polyfill","./src/js/main.js"],
  },

  output: {
    path: resolve("dist"),
    filename: "bundle.js",
    publicPath: "/dist/",
  },
  externals: [{"window": "window"}],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options:{
          extractCSS: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use:{
          loader: "babel-loader",
          options: {
            presets: [['env',{
              "targets": {
                "browsers": ["last 2 versions", "ie >= 11"]
              },
              "modules": false
            }],'vue-app']
          },
        },
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)(\?.*)?$/,
        use:[
          {
            loader: "file-loader",
            options: {
              include: [resolve("./src")],
              limit: 1000,
              name: "images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              include: [resolve("./src")],
              limit: 1000,
              name: "fonts/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader"],
        }),
      },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"],
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"],
        }),
      },

    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js", // 'vue/dist/vue.common.js' for webpack 1
      styles: path.resolve(__dirname, "../src/scss/"), // relative to the location of the webpack config file!
    },
  },
  plugins: [
    new SvgStore.Options({
      // svgo options
      svgoOptions: {
        plugins: [
          {removeTitle: true},
        ],
      },
      prefix: "ir-",
    }),
    new ExtractTextPlugin("./css/main.css"),
    new RemoveStrictPlugin(),
    new CopyWebpackPlugin([
      {from: resolve("./src/images"), to: resolve("./dist/images")},
      {from: resolve("./src/fonts"), to: resolve("./dist/fonts")},
      {from: resolve("./src/html"), to: resolve("./dist/html")},
    ]),
  ],
  performance: {
    maxAssetSize: 2000000,
    maxEntrypointSize: 4000000,
    hints: "warning",
  },
};

const extraPlugins = [];

module.exports = {
  webpackConfig, devServer, extraPlugins,
};
