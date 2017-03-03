#!/usr/bin/env node
var path = require('path');
var fs = require('fs');

var babelrc;

var winston = require('winston');
var { LOGGER } = require('../app/utils/ServerLogger.js');

try {
  babelrc = JSON.parse(fs.readFileSync('./.babelrc'));
} catch (err) {
  LOGGER.error('==>     ERROR: Error parsing your .babelrc. \n' + err);
}

try {
  require('babel-register')(babelrc);
} catch (err) {
  LOGGER.error('Error requiring babel-register: + \n' + err);
}

global.__CLIENT__ = false;
global.__SERVER__ = true;

__DEV__ = process.env.NODE_ENV !== 'production';

if (__DEV__) {
  LOGGER.info('==> Running in development mode...');
} else {
  LOGGER.info('==> Running in production mode...');
}

try {
  require('../server.js');
} catch (err) {
  LOGGER.error("Error requiring server: \n " + err);
}
