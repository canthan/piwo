const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});
const path = require('path');
const webpack = require('webpack');

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
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new CopyWebpackPlugin([
      {
        context: 'src',
        from: {
          glob: 'assets/**/*',
          dot: true
        },
        to: '',
      },
    ], {
        ignore: ['.gitkeep'],
        debug: 'warning'
      }),
  ],
};

module.exports = config;
