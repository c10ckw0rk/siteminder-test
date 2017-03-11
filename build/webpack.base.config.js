const path = require('path');
const vueConfig = require('./vue-loader.config');

module.exports = {
    devtool: '#source-map',
    entry: {
        app: path.resolve(__dirname, '../vue/client-entry.js'),
        vendor: ['vue', 'vue-router', 'superagent']
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.vue'],
        alias: {
            assets: path.resolve(__dirname, '../assets')
        }
    },

    output: {
        path: path.resolve(__dirname, '../server/public'),
        publicPath: '/public/',
        filename: 'client-bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader',
                    options: {
                        sourceMap: true
                    } // creates style nodes from JS strings
                }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    } // translates CSS into CommonJS
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    } // compiles Sass to CSS
                }]
            }
        ]
    }
};
