var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: { app: './js/app.jsx'},

    // 需要绝对路径
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: [
                    // es2015 需要 module.exports = {}
                    // export default {} 要 require("xxx").default
                    'react',
                    'es2015',
                ]
            },
        }, {
            test: /\.css$/,
            loader: "style!css",
        }]
    },

    plugins: process.env.NODE_ENV === "prod" ? [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ] : []
}
