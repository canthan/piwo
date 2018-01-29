const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

const BUILD_DIR = path.resolve(__dirname, '../dist');
const APP_DIR = path.resolve(__dirname, '../src');

var config = {
  entry: APP_DIR + '/index.tsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(js?|jsx?)/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.(css?)/,
        include: APP_DIR,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } }/* ,
          'postcss-loader' */
        ]
      },
      {
        test: /\.(scss?)/,
        include: APP_DIR,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings 
        }, {
          loader: "css-loader" // translates CSS into CommonJS 
        }, {
          loader: "sass-loader" // compiles Sass to CSS 
        }]
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    // new CheckerPlugin()
  ],
  devServer: {
    inline: true,
    port: 3000,
  },
};

module.exports = config;