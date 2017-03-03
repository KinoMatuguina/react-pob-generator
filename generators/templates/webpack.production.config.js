'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var chalk = require('chalk');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var productionConfig = require('./webpack-envs/production.js');

console.log(JSON.stringify(productionConfig));

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/' + productionConfig.APP_CONTEXT
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    fallback: [__dirname, 'node_modules']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true,
        drop_console: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(productionConfig.NODE_ENV),
      'process.env.APP_CONTEXT': JSON.stringify(productionConfig.APP_CONTEXT),
      'process.env.APIHOST': JSON.stringify(productionConfig.APIHOST),
      'process.env.LOGOUT_REDIR': JSON.stringify(productionConfig.LOGOUT_REDIR),
      'process.env.AUTH_PROTECTED ': JSON.stringify(productionConfig.AUTH_PROTECTED)
    }),
    new ProgressBarPlugin({
        format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),
    new CopyWebpackPlugin([
      { from: __dirname + '/node_modules/frontend-react-f4-base-ui/assets', to: __dirname + '/dist' },
      { from: __dirname + '/node_modules/react-select/dist/react-select.css', to: __dirname + '/dist/css'},
      { from: __dirname + '/node_modules/rc-menu/assets/index.css', to: __dirname + '/dist/css/rc-menu.css'},
      { from: __dirname + '/app/assets', to: __dirname + '/dist' }
    ])
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/,
      babelrc: false,
      query: {
        "presets": ["react","es2015","stage-0"],
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
  },
  postcss: [
    require('autoprefixer')
  ]
};
