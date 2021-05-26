const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(webpackBaseConfig, {
  mode: "development",
  devtool: "eval-source-map",
  context: path.join(__dirname, ".."),
  entry: {
    main: "./example/main",
  },
  output: {
    path: path.join(__dirname, "..", "example/dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "..", "example"),
    compress: true,
    hot: true,
    historyApiFallback: true,
    open: true,
    port: 5090,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
    new HtmlWebpackPlugin({
      template: "example/index.html",
    }),
  ],
});
