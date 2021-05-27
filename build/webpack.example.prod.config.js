const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(webpackBaseConfig, {
  mode: "production",
  devtool: "source-map",
  context: path.join(__dirname, ".."),
  entry: {
    main: "./example/main",
    venders: ["vue"],
  },
  output: {
    path: path.join(__dirname, "..", "example/dist/assets"),
    publicPath: "assets/",
    filename: "[name].[hash:7].bundle.js",
    chunkFilename: "[name].[hash:7].bundle.js",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: path.join(__dirname, "..", "example/dist/index.html"),
      favicon: path.join(__dirname, "..", "public/favicon.ico"),
    }),
    new CleanWebpackPlugin(),
  ],
});
