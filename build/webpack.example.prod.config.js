const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(webpackBaseConfig, {
  mode: "production",
  devtool: "source-map",
  context: path.join(__dirname, ".."),
  entry: {
    main: "./example/main",
  },
  output: {
    path: path.join(__dirname, "..", "example/dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new HtmlWebpackPlugin({
      template: "example/index.html",
    }),
  ],
});
