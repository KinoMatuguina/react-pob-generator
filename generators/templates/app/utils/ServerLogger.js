/**
* WinstonLogger.js
*/

const winston = require('winston');
const isDeveloping = process.env.NODE_ENV !== 'production';
const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
const moment = require('moment');

// SERVER LOGGER
var LOGGER;
if (isDeveloping) {
	LOGGER = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
      timestamp: function() {
        return Date.now();
      },
      formatter: function(options) {
        return moment(options.timestamp()).format('YYYY/MM/DD HH:mm:ss.SSS') +' '+ options.level.toUpperCase() + ' : '+ (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    })
    ]
  });
} else {
	LOGGER = new (winston.Logger)({
	  transports: [
	    new (winston.transports.File)({
	      name: 'info-file',
	      filename: 'filelog-info.log',
	      level: 'info'
	    }),
	    new (winston.transports.File)({
	      name: 'error-file',
	      filename: 'filelog-error.log',
	      level: 'error'
	    })
	  ]
	});
}


// modified jsnlog-nodejs to use winston logger
// source: https://github.com/mperdeck/jsnlog-nodejs/blob/master/index.js

// Attempts to deserialize the passed in string as a JSON object.
// If this fails somehow, returns the string itself.
// Otherwise, returns the deserialized object.
var safeDeserialise = function (s) {
    try {
        return JSON.parse(s);
    } catch (e) {
        return s;
    }
};

const ClientLogHandler = function(logger, logJson) {
    var receivedRequestId = logJson.r;
    var nbrLogEntries = logJson.lg.length;
    var i = 0;

    for (i = 0; i < nbrLogEntries; i++) {
        var receivedLogEntry = logJson.lg[i];
        var loggerName = receivedLogEntry.n;
        var logLevel = receivedLogEntry.l;

        // Build object to log through the server side jsnlog.
        var newLogEntry = {

            // If on the client an object was logged, that will now live in the
            // logEntry as a JSON string. Deserialize it, so when the log entry is
            // logged to for example Mongo, user is able to search on individual fields
            // in the logged object.
            clientMessage: safeDeserialise(receivedLogEntry.m),
						loggerName: loggerName,
            requestId: receivedRequestId,
            clientTimestamp: new Date(receivedLogEntry.t)
        };

				var winstonLogLevel = 'info';
				switch(logLevel) {
					case 6000:
						winstonLogLevel = 'error';
						break;
					case 5000:
						winstonLogLevel = 'error';
						break;
					case 4000:
						winstonLogLevel = 'warn';
						break;
					case 3000:
						winstonLogLevel = 'info';
						break;
					case 2000:
						winstonLogLevel = 'debug';
						break;
					default:
						winstonLogLevel = 'info';
				}

				logger.log(winstonLogLevel, newLogEntry);
    }
}

module.exports = {
	LOGGER: LOGGER,
	ClientLogHandler: ClientLogHandler
}
