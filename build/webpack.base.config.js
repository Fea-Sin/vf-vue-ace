const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          devMode
            ? "style-loader"
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: "/assets/",
                },
              },
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          devMode
            ? "style-loader"
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: "/assets/",
                },
              },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          devMode
            ? "style-loader"
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: "/assets/",
                },
              },
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
      {
        test: /\.(svg|gif|png|jpe?g)(\?\S*)?$/,
        loader: "url-loader",
        options: {
          limit: 200,
          esModule: false,
          outputPath: "images",
        },
      },
      {
        test: /\.(otf|ttf|woff2?|eot)(\?\S*)?$/,
        loader: "file-loader",
        options: {
          esModule: false,
          outputPath: "fonts",
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?\S*)?$/,
        loader: "file-loader",
        options: {
          esModule: false,
          outputPath: "media",
        },
      },
    ],
  },
  resolve: {
    extensions: [".vue", ".js", ".ts", ".tsx", ".jsx"],
    alias: {
      vue: "vue/dist/vue.esm.js",
      "@": path.join(__dirname, "..", "src"),
      "E@": path.join(__dirname, "..", "example"),
    },
  },
  plugins: [new VueLoaderPlugin(), new ProgressBarPlugin()],
};
