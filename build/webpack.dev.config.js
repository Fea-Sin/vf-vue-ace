const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(webpackBaseConfig, {
  mode: "development",
  devtool: "eval-source-map",
  context: path.join(__dirname, ".."),
  entry: {
    main: "./example/main",
  },
  output: {
    path: path.join(__dirname, "..", "public"),
    publicPath: "/",
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "..", "public"),
    compress: true,
    hot: true,
    historyApiFallback: true,
    open: true,
    port: 5090,
    overlay: true,
    stats: "errors-only",
    // host: "127.0.0.1",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
  ],
});
