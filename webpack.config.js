const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  context: path.resolve(__dirname),
  entry: "./src/index.js",
  mode: "production",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "/"
  },
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    watchContentBase: true,
    progress: true,
    contentBase: path.join(__dirname, "dist"),
    writeToDisk: true,
    overlay: true,
    historyApiFallback: true // on 404 load publicPath => for BrowserRouter on refresh
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
    modules: ["node_modules"]
  },
  module: {
    rules: [
      {
        test: /\(.js|.jsx?$/,
        loader: require.resolve("babel-loader"),
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      },
      {
        loader: require.resolve("file-loader"),
        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.css$/],
        options: {
          name: "static/media/[name].[hash:8].[ext]",
          esModule: false
          //   fix problem with img [object Module] in browser
        }
      }
    ]
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          enforce: true,
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "assets", "index.html"),
      title: "Web-React-CRM",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        keepClosingSlash: true,
        minifyURLs: true
      }
    }),
    new UglifyJsPlugin({
      parallel: true
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
