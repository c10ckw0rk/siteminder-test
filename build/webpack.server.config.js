const webpack = require('webpack');
const base = require('./webpack.base.config');
const path = require('path');

module.exports = Object.assign({}, base, {
    target: 'node',
    devtool: false,
    entry: path.resolve(__dirname, '../vue/server-entry'),
    output: Object.assign({}, base.output, {
        path: path.resolve(__dirname, '../server'),
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    }),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"',
            'global.GENTLY': false
        })
    ]
});
