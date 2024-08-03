const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = (env) => {
  const isProduction = env.mode === "production";
  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/new.ts",
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      static: "./dist",
      port: 3001,
      open: true,
      hot: !isProduction,  // Включаем HMR только в режиме разработки
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        title: "Development",
        template: "./src/index.pug",
        filename: "index.html",
      }),
      ...(isProduction ? [] : [new webpack.HotModuleReplacementPlugin()]),
    ],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
    },
    optimization: {
      minimize: isProduction,
      minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.pug$/,
          use: ["pug-loader"],
        },
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
  };
};