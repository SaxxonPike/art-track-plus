// Import webpack module
var webpack = require("webpack");
// Import open browser plugin
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
//Import path module
const path = require('path');

const babelOptions = {
    "presets": [
        "react",
        [
            "es2015",
            {
                "modules": false
            }
        ],
        "es2016"
    ]
};

module.exports = {
    entry: "./src/index.tsx", //set entry file
    // Resolve to output directory and set file
    output: {
        path: path.resolve("dist/assets"),
        filename: "bundle.js",
        publicPath: "assets"
    },
    // Add Url param to open browser plugin
    plugins: [new OpenBrowserPlugin({url: 'http://localhost:3000'})],
    // Set dev-server configuration
    devServer: {
        inline: true,
        contentBase: './dist',
        port: 3000
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    // Add babel-loader to transpile js and jsx files
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
                options: babelOptions
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}
