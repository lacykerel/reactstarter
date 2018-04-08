const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

require('dotenv').config()

const ENV = process.env.APP_ENV;
const isDev = ENV === 'dev';
const isProd = ENV === 'prod';


function setDevTool() {
    if (isDev) {
        return 'inline-source-map';
    } else if (isProd) {
        return 'source-map';
    } else {
        return 'eval-source-map';
    }
}

const config = {
    devtool: setDevTool()
}

if (isProd) {
    config.plugins.push(
        new UglifyJSPlugin(),
        new CopyWebpackPlugin([{
            from: __dirname + '/src/public'
        }])
    );
}

module.exports = config;

module.exports = {
    entry: [
        './src/app/index.js'
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'}, 'postcss-loader'
                ]
               
            }
        ]
    },
    devServer: {
        contentBase: './src/public',
        port: 5000,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};