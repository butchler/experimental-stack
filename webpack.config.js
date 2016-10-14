var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    resolve: {
      root: __dirname + '/src',
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            // Run imported CSS through PostCSS so we can use Autoprefixer.
            { test: /\.css$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') }
        ]
    },
    plugins: [
        // Extract all imported CSS and put it in a separate file.
        new ExtractTextPlugin('bundle.css')
    ],
    postcss: [
        // Use Autoprefixer to automatically insert prefixes for newer CSS
        // features to support the last 2 versions of all browsers.
        autoprefixer({ browsers: ['last 2 versions'] })
    ]
};
