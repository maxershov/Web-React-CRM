const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname),
    entry: './src/index.js',
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
        chunkFilename: "[name].bundle.js",
        publicPath: '/'
    },
    devServer: {
        port: 8080,
        open: 'chrome',
        hot: true,
        compress: true,
        watchContentBase: true,
        progress: true,
        contentBase: path.join(__dirname, 'dist'),
        writeToDisk: true,
        historyApiFallback: true, // on 404 load publicPath => for BrowserRouter on refresh
    },
    resolve: {
        extensions: ['.jsx','.js', '.json'],
        modules: ['node_modules'],
    },
    module: {
        rules: [
            {
                test: /\(.js|.jsx?$/,
                loader: require.resolve('babel-loader'),
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/,
                loader: ['style-loader','css-loader']
              },
            {
                loader: require.resolve('file-loader'),
                exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.css$/],
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                    esModule: false,
                    //   fix problem with img [object Module] in browser
                },
            },
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'assets', 'index.html'),
        title: "Web-React-CRM",
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            keepClosingSlash: true,
            minifyURLs: true,
          }
    }), new UglifyJsPlugin({
        parallel: true,
    })]
};