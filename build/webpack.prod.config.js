const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const components = require("../components.json");

module.exports = merge(webpackBaseConfig, {
  mode: "production",
  devtool: "source-map",
  context: path.join(__dirname, ".."),
  entry: components,
  output: {
    path: path.resolve(__dirname, "../lib"),
    publicPath: "/dist/",
    filename: "[name].js",
    chunkFilename: "[id].js",
    libraryTarget: "commonjs2",
  },
  externals: {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue",
    },
  },
  optimization: {
    minimize: false,
  },
  plugins: [new CleanWebpackPlugin()],
});
