const { resolve } = require('path');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    devtool: 'cheap-module-eval-source-map',

    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './main.js',
        './assets/scss/main.scss',
    ],

    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/',
    },

    context: resolve(__dirname, 'app'),

    devServer: {
        hot: true,
        historyApiFallback: true,
        contentBase: resolve(__dirname, 'build'),
        publicPath: '/',
        host: '0.0.0.0',
        disableHostCheck: true,
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                loaders: [
                    'babel-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            query: {
                                sourceMap: false,
                            },
                        },
                    ],
                }),
            },
            { test: /\.(png|jpg)$/, use: 'url-loader?limit=15000' },
            { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' },
        ],
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            test: /\.js$/,
            options: {
                eslint: {
                    configFile: resolve(__dirname, '.eslintrc'),
                    cache: false,
                    failOnWarning: false,
                    failOnError: false,
                    emitWarning: true,
                    rules: {
                        'no-underscore-dangle': 'off',
                    },
                },
            },
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true }),
        new CopyWebpackPlugin([
            { from: './sw.js', to: 'sw.js' },
        ], {
            ignore: [],
            copyUnmodified: false,
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new webpack.HotModuleReplacementPlugin({ multistep: false }),
    ],
};

module.exports = config;
