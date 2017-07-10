const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    // entry: "./views/index.jsx",
    entry: ["./views/index.jsx", './views/sass/style.sass'],

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
            },
           	{
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
          	}

        ]
    },
    plugins: [
        new ExtractTextPlugin({ // define where to save the file
              filename: '../css/style.bundle.css',
              allChunks: true,
            }),
    ]
};