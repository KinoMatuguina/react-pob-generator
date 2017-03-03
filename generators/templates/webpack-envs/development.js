/**
* development.js
*/

module.exports = {
  PORT: <%= PORT %>,
  NODE_ENV: 'development',
  APP_CONTEXT: '<%= APP_CONTEXT %>',
  CONSUL_HOST: '192.168.1.163',
  APIHOST: 'http://modules.rsb-qa.com',
  FILEUPLOAD_HOST: 'http://192.168.1.97:8086/',
  LOGOUT_REDIR: '/login/',
  AUTH_ERR_REDIR: '/login/',
  BABEL_DISABLE_CACHE: 1,
  SECURITY_LEVEL: 'LOW',
  REDIS_HOT: '192.168.1.163',
  REDIS_PORT: 6379,
  EXPRESS_SESSION_SECRET: '10qpalzm',
  EXPRESS_SESSION_NAME: 'express.sid'
};
