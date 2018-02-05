const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

const APP_DIR = path.resolve(__dirname, '../src');

var config = {
  entry: APP_DIR + '/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
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
          { loader: 'css-loader', options: { importLoaders: 1 } }
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
  ],
};

module.exports = config;
