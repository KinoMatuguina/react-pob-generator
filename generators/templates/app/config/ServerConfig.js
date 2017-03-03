/**
* ServerConfig.js
*/

import { LOGGER } from '../utils/ServerLogger';
let ENV_CONFIG;

if (process.env.NODE_ENV === 'development') {
  ENV_CONFIG = require('../../webpack-envs/development');
} else {
  ENV_CONFIG = require('../../webpack-envs/production');
}

LOGGER.info("ENVIRONMENT CONFIG");
LOGGER.info(ENV_CONFIG);

const NODE_ENV = process.env.NODE_ENV || ENV_CONFIG.NODE_ENV;
const host = process.env.HOST || ENV_CONFIG.HOST || '0.0.0.0';
const apiPort = process.env.APIPORT || ENV_CONFIG.APIPORT;
const port = process.env.PORT || ENV_CONFIG.PORT;
const apiHost = process.env.APIHOST || ENV_CONFIG.APIHOST || 'http://modules.rsb-qa.com:8081/account'; //'http://localhost:3030';
const fileUploadHost = process.env.FILEUPLOAD_HOST || ENV_CONFIG.FILEUPLOAD_HOST || 'http://localhost:3030';
const context = process.env.APP_CONTEXT || ENV_CONFIG.APP_CONTEXT;
const securityLevel = process.env.SECURITY_LEVEL || ENV_CONFIG.SECURITY_LEVEL || 'HIGH';
const consulHost = process.env.CONSUL_HOST || ENV_CONFIG.CONSUL_HOST || '192.168.1.163';
const consulPort = process.env.CONSUL_PORT || ENV_CONFIG.CONSUL_PORT || '8500';
const authErrorRedirect = process.env.AUTH_ERR_REDIR || ENV_CONFIG.AUTH_ERR_REDIR || '/login/';
const redisHost = process.env.REDIS_HOST || ENV_CONFIG.REDIS_HOST || '192.168.1.163';
const redisPort = process.env.REDIST_PORT || ENV_CONFIG.REDIS_PORT || 6379;
const expressSessionSecret = process.env.EXPRESS_SESSION_SECRET || ENV_CONFIG.EXPRESS_SESSION_SECRET || '10qpalzm';
const expressSessionName = process.env.EXPRESS_SESSION_NAME || ENV_CONFIG.EXPRESS_SESSION_NAME || 'express.sid';

LOGGER.info(context);

module.exports = Object.assign({
  NODE_ENV: NODE_ENV,
  host: host,
  port: port,
  apiHost: apiHost,
  fileUploadHost: fileUploadHost,
  apiPort: apiPort,
  context: context,
  securityLevel: securityLevel,
  authErrorRedirect: authErrorRedirect,
  redis: {
    host: redisHost,
    port: redisPort
  },
  expressSession: {
    secret: expressSessionSecret,
    name: expressSessionName
  },
  consul: {
    enabled: true,
    host: consulHost,
    port: consulPort,
    promisify: true,
    keys: {
      globalMenu: 'config/application/global-menu',
      account: 'config/application/frontend-api-host/account',
      fundtransfer: 'config/application/frontend-api-host/fundtransfer',
      fileUploadHost: 'config/application/frontend-api-host/document-service'
    }
  },
  logs: {
    defaultAjaxUrl: "/" + context + "/client.logger"
  },
  serverApiEndpoints: {
    account:  apiHost + ":8081/",
    fundtransfer:   apiHost + ":8080/",
    activity: "http://" + apiHost + ":8083/activity/"
  },
  socketIO: {
    path: context + '/io/socket'
  },
  amqp: {
    queueName: 'frontend.queue',
    exchangeName: 'frontend.exchange',
    options: {
      host: '192.168.1.163',
      port: 5672,
      login: 'guest',
      password: 'guest',
      connectionTimeout: 10000,
      vhost: '/',
      noDelay: true,
      ssl: {
        enabled: false
      }
    }
  }
});
