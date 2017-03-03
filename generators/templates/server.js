/**
*	server.js
*/

'use strict';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { setMatchMediaConfig } from './app/utils/matchMedia';
import { fetchData } from './app/utils/fetch';
import { LOGGER, ClientLogHandler } from './app/utils/ServerLogger';
import { JL } from 'jsnlog';
import { jsnlog_nodejs } from 'jsnlog-nodejs'

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.js';

import ServerConfig from './app/config/ServerConfig';
import routes from './app/routes';
import session from 'express-session';

import amqp from 'amqp';

import SocketIo from 'socket.io';
import socketSharedSession from 'express-socket.io-session';

import redis from 'redis';
import redisSession from 'connect-redis';
import Helmet from 'react-helmet';
import consul from 'consul';

import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import multer from 'multer';
import winston from 'winston';
const isDeveloping = ServerConfig.NODE_ENV !== 'production';
const port =  ServerConfig.port;
const appContext = ServerConfig.context;
const authErrorRedirect = ServerConfig.authErrorRedirect;
const app = express();

import {
	BaseMiddlewares,
	BaseStores,
	BaseStateMethods,
	BaseContext,
} from 'frontend-react-f4-base-commons';

import ServerApiMiddleware from './app/middlewares/ServerApiMiddleware';
import LogoutMiddleware from './app/middlewares/LogoutMiddleware';
import ConsulMiddleware from './app/middlewares/ConsulMiddleware';
import FileUploadMiddleware from './app/middlewares/FileUploadMiddleware';
import AccountOpeningMiddleware from './app/middlewares/AccountOpeningMiddleware';
import AccountApiMiddleware from './app/middlewares/AccountApiMiddleware';
import FundTransferApiMiddleware from './app/middlewares/FundTransferApiMiddleware';
import ActivityApiMiddleware from './app/middlewares/ActivityApiMiddleware';

const { AuthStore, UIStore } = BaseStores;
const { initStore, dehydrate} = BaseStateMethods;
const { ContextProvider } = BaseContext;

import injectState from './app/state/injectState';

global.navigator = { userAgent: 'all' };

LOGGER.info(`APPCONTEXT ${appContext}`);
//========================================================
//	some middleware setup
//========================================================

LOGGER.info('Setup Status: Middlewares');

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


// file upload middleware
const uploadStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '/tmp/account-opening-uploads');
	},
	filename: function (req, file, cb) {
		cb(null, Date() + "-" + file.originalname);
	}
});

const multerUpload = multer({ storage: uploadStorage });

//========================================================
//	* Shared session
//	use session middleware with redis as store
//========================================================

LOGGER.info('Setup Status: Shared session');

const redisClient = redis.createClient(ServerConfig.redis.port, ServerConfig.redis.host);

redisClient.on('connect', function() {
    console.log('connected');
});

const redisStore = redisSession(session);

const appSession = session({
  secret: ServerConfig.expressSession.secret,
	name: ServerConfig.expressSession.name,
  store: new redisStore({ host: ServerConfig.redis.host, port: ServerConfig.redis.port, client: redisClient }),
  saveUninitialized: false,
  resave: false,
  cookie: { httpOnly: true }
});

// console.log(redisClient);
// console.log(redisStore);

app.use(appSession);

//check if authenticated
// app.use(function(req, res, next){
// 	console.log('kino 4');
// 	LOGGER.info('Security Level: ' + ServerConfig.securityLevel);
// 	if(ServerConfig.securityLevel === 'HIGH' && !req.session.user) {
// 		res.redirect(authErrorRedirect);
// 		return;
// 	}

// 	next();
// });

//========================================================
// initialize Consul client
//========================================================


LOGGER.info('Setup Status: Consul Client');

const consulClient = consul({
	host: ServerConfig.consul.host,
	post: ServerConfig.consul.port,
	promisify: ServerConfig.consul.promisify
});

app.consulClient = consulClient;

// console.log(app.consulClient);
//========================================================
//	initialize server endpoints
//========================================================


LOGGER.info('Setup Status: Server Endpoints');

JL.setOptions({
    "defaultAjaxUrl": ServerConfig.logs.defaultAjaxUrl
});
//Client Logs endpoint
app.post('/' + appContext + '/*.logger', function (req, res) {
		LOGGER.info(req.body);
    //jsnlog_nodejs(JL, req.body);
		ClientLogHandler(LOGGER, req.body);
		// Send empty response. This is ok, because client side jsnlog does not use response from server.
    res.send('');
});

// LOGOUT - just destroy session
// app.use('/' + appContext + '/logout', LogoutMiddleware);

// consul api endpoints
app.use('/' + appContext + '/cl', ConsulMiddleware);

// app.use('/' + appContext + '/account-list', ConsulMiddleware);

// file upload endpoints
//single
// app.use('/' + appContext + '/api/file', multerUpload.single('file'), FileUploadMiddleware);

// backend api endpoints
// app.use('/' + appContext + '/api', multerUpload.single('file'), AccountOpeningMiddleware);

// account endpoint
app.use('/' + appContext + '/api/account', AccountApiMiddleware);
// activity endpoint
// app.use('/' + appContext + '/api/activity', ActivityApiMiddleware);
// fundtransfer endpoint
// app.use('/' + appContext + '/api/fundtransfer', FundTransferApiMiddleware);

app.use('/' + appContext + '/api', ServerApiMiddleware);


//========================================================
// webpack configuration
//========================================================


LOGGER.info('Setup Status: Webpack');

if (isDeveloping) {
	LOGGER.info("Node Environment: DEVELOPMENT");
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(__dirname + '/dist'));
	app.get('*', reactRouterMiddleware);

} else {
	LOGGER.info("Node Environment: PRODUCTION");
  app.use('/' + appContext, express.static(__dirname + '/dist'));
  // app.get('*', function response(req, res) {
  //   res.sendFile(path.join(__dirname, 'dist/index.html'));
  // });
	app.get('*', reactRouterMiddleware);
}

// error handler
app.use(function(err, req, res, next) {
	LOGGER.error(err.stack);

	let response = { message: err.message };

	if (isDeveloping) {
		response.error = err;
	}

	res.status(500).send(response);
});

function handleRouter(req, res, props) {
  const index = path.join(__dirname + '/app', 'index');

	let user = {
		id: "1",
		name: "Kino Matuguina",
		username: "patrickc",
		invalidLogins: 1
	};

	if (req.session && req.session.user) {
		user = req.session.user;
	}


	const store = initStore({
		app: { ssrLocation: req.url },
		auth: { sessionUser: user }
	}, injectState);

	fetchData(store, props.components, props.params, props.location.query)
		.then(() => setMatchMediaConfig(req))
		.then(() => renderToString(
			<ContextProvider context={{ store }}>
				<RouterContext {...props} />
			</ContextProvider>
		))
		.then((html) => {
      res.status(200).render(index, {
				state: dehydrate(store),
				head: helmet(),
				appContext: appContext,
				root: html,
			});
    });

}

function handleRedirect(res, redirect) {
  res.redirect(302, redirect.pathname + redirect.search);
}

function handleNotFound(res) {
  res.status(404).send('Not Found');
}

function handleError(res, err) {
	LOGGER.error(err);

	let response = { message: err.message };

	if (isDeveloping) {
		response.error = err;
	}

  res.status(500).send(response);
}

function reactRouterMiddleware(req, res) {

  match({ routes, location: req.url },
    (err, redirect, props) => {
      if (err) handleError(res, err);
      else if (redirect) handleRedirect(res, redirect);
      else if (props) handleRouter(req, res, props);
      else handleNotFound(res);
    });
}

//========================================================
// start the server
//========================================================

LOGGER.info('Starting server...');

const server = app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    LOGGER.error(err);
  }
  LOGGER.info('\n');
  LOGGER.info('||===========================================================')
  LOGGER.info('|| 🌎 Listening on port %s.', port)
  LOGGER.info('|| Open up http://0.0.0.0:%s/%s/ in your browser.', port, appContext);
  LOGGER.info('||===========================================================')
  LOGGER.info('\n');
});

//========================================================
// Socket io setup
//========================================================


LOGGER.info('Setup Status: Socket IO');

const io = new SocketIo(server)
io.use(socketSharedSession(appSession, {
	autoSave: true
}));


const socketEvents = require('./socketIO/events')(io);


//========================================================
//	setup AMQP
//========================================================


LOGGER.info('Setup Status: RabbitMQ');

const amqpConnection = amqp.createConnection(ServerConfig.amqp.options);

amqpConnection.on('error', (e) => {
	LOGGER.error("ERROR from amqp: ", e);
});

amqpConnection.on('ready', () => {

	// listen to frontend.queue.[appContext] (binded to frontend.exchange)
	amqpConnection.queue(`ServerConfig.amqp.queueName.${appContext}`, { autoDelete: false }, (queue) => {
		queue.bind(ServerConfig.amqp.exchangeName, '');

		queue.subscribe((message) => {
			LOGGER.debug(`Message received ${appContext}`);
			LOGGER.debug(message);

			redisClient.keys("sess:*", function(error, keys){

				LOGGER.debug(keys);
				if (typeof keys !== 'undefined' && keys && keys.map && keys.length > 0) {

					keys.forEach((key) => {
						redisClient.get(key, function(err, reply) {
						    // reply is null when the key is missing
								const parsedReply = JSON.parse(reply);
								LOGGER.debug(parsedReply['user']);
								LOGGER.debug(parsedReply['socketID']);
								if (typeof parsedReply !== 'undefined' && parsedReply) {
									if (typeof parsedReply.user !== 'undefined' && parsedReply.user) {
										LOGGER.debug("CLIENT ID");
										LOGGER.debug(parsedReply.user);
										if(message.clientId === parsedReply.user.clientId) {
											LOGGER.debug("SENDING TO " + parsedReply.user.clientId);
											io.to(parsedReply.socketID).emit('activity', 'HEY FAGGIT');
										}
									}
								}
						});
					});

				}
			});

		});
	});

});

module.exports = app;
