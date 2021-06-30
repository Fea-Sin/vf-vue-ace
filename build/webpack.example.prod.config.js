const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    publicPath: "/assets/",
    filename: "js/[name].[hash:7].js",
    chunkFilename: "js/[name].[hash:7].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
      filename: path.join(__dirname, "..", "example/dist/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:7].css",
      chunkFilename: "css/[name].[hash:7].css",
    }),
    new CleanWebpackPlugin(),
  ],
});
