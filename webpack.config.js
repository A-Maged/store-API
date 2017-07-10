var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: "./views/index.jsx",

    output: {
        path: __dirname + "/public/assets/js/",
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
};