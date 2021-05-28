const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

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
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
    ],
  },
  resolve: {
    extensions: [".vue", ".js", ".ts", ".tsx", ".jsx"],
    alias: {
      vue: "vue/dist/vue.esm.js",
      "@": path.join(__dirname, "..", "src"),
    },
  },
  plugins: [new VueLoaderPlugin(), new ProgressBarPlugin()],
};
