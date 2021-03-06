/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMonitor = require('webpack-monitor');
const myLocalHost = require("./host");

module.exports = {
  context: path.resolve(__dirname),
  mode: "development",
  entry: ["@babel/polyfill", "./src/index.js"],
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "/"
  },
  devServer: {
    host: myLocalHost.host,
    port: 8080,
    open: true,
    hot: true,
    watchContentBase: true,
    progress: true,
    contentBase: path.join(__dirname, "dist"),
    writeToDisk: true,
    overlay: true,
    historyApiFallback: true // on 404 load publicPath => for BrowserRouter on refresh
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
    modules: ["node_modules"],
    "alias": {
      "react": "preact/compat",
      "react-dom": "preact/compat"
    },
  },
  module: {
    rules: [
      {
        test: /\(.js|.jsx?$/,
        loader: require.resolve("babel-loader"),
        exclude: [/node_modules/]
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
            'sass-loader',
        ],
    },{
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            esModule: false
          }
        }]
      },
      {
        loader: require.resolve("file-loader"),
        exclude: [/\.(js|mjs|jsx|ts|tsx|jpe?g|png|gif|svg)$/, /\.html$/, /\.json$/, /\.(sc|c)ss$/],
        options: {
          name: "static/media/[name].[hash:8].[ext]",
          esModule: false
          //   fix problem with img [object Module] in browser
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "assets", "index.html"),
      title: "Web-React-CRM",
      favicon: path.join(__dirname, "src", "assets", "favicon.ico"),
    }),
    new MiniCssExtractPlugin(),
    // new BundleAnalyzerPlugin(),
    // new WebpackMonitor({
    //   capture: true,
    //   launch: true,
    // })
  ]
};
