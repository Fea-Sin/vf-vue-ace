const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(webpackBaseConfig, {
  mode: "production",
  devtool: "source-map",
  context: path.join(__dirname, ".."),
  entry: {
    index: "./src/index",
  },
  output: {
    path: path.resolve(__dirname, "../lib"),
    publicPath: "/dist/",
    filename: "[name].min.js",
    library: "VFAce",
    libraryTarget: "umd",
  },
  plugins: [new CleanWebpackPlugin()],
});
