'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var chalk = require('chalk');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var developmentConfig = require('./webpack-envs/development.js');

console.log(JSON.stringify(developmentConfig));

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/' + process.env.APP_CONTEXT
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    fallback: [__dirname, 'node_modules']
  },
  plugins: [
    new ProgressBarPlugin({
        format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),
    new CopyWebpackPlugin([
      { from: __dirname + '/node_modules/frontend-react-f4-base-ui/assets', to: __dirname + '/dist' },
      { from: __dirname + '/node_modules/react-select/dist/react-select.css', to: __dirname + '/dist/css'},
      { from: __dirname + '/node_modules/rc-menu/assets/index.css', to: __dirname + '/dist/css/rc-menu.css'},
      { from: __dirname + '/app/assets', to: __dirname + '/dist' }
    ]),
    // new HtmlWebpackPlugin({
    //   template: 'app/index.tpl.html',
    //   inject: 'body',
    //   filename: 'index.html'
    // }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(developmentConfig.NODE_ENV),
      'process.env.APP_CONTEXT': JSON.stringify(developmentConfig.APP_CONTEXT),
      'process.env.APIHOST': JSON.stringify(developmentConfig.APIHOST),
      'process.env.LOGOUT_REDIR': JSON.stringify(developmentConfig.LOGOUT_REDIR),
      'process.env.AUTH_PROTECTED ': JSON.stringify(developmentConfig.AUTH_PROTECTED)
    })
    //new webpack.DefinePlugin(developmentConfig)
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/,
      babelrc: false,
      query: {
        "presets": ["react","es2015","stage-0","react-hmre"],
        "plugins": ["transform-decorators-legacy", "add-module-exports"]
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" }//,
//    { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
//      loader: "file"
//    }
    ]
  }
};
