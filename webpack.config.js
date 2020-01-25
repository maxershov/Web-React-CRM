const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const myLocalHost = require("./host");

module.exports = {
  context: path.resolve(__dirname),
  entry: ["@babel/polyfill", "./src/index.js"],
  mode: "production",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/"
  },
  devServer: {
    host: myLocalHost.host,
    port: 8080,
    open: true,
    hot: true,
    writeToDisk: true,
    compress: true,
    watchContentBase: true,
    progress: true,
    contentBase: path.join(__dirname, "dist"),
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
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: "postcss.config.js"
              }
            }
          }
        ]
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
      chunks: "all"
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
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/, /^\.\/es$/),
    new UglifyJsPlugin({
      parallel: true
    }),
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin()
  ]
};
