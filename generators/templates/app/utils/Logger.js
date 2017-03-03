// const winston = require('winston');
const tracer = require('tracer');
const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';

// const Logger = new winston.Logger({
//   level: 'info',
//   transports: [
//     new (winston.transports.Console)({
//       level: logLevel,
//       colorize: true
//     }),
//     new (winston.transports.File)({
//       filename: 'log-file.log',
//       level: logLevel
//     })
//   ]
// });

const Logger = require('tracer').colorConsole({
  level: logLevel,
  format : "{{timestamp}} [{{title}}] [in {{file}}:{{line}}]: {{message}} ",
  preprocess :  function(data){
                    data.title = data.title.toUpperCase();
                }
})


module.exports = Logger;
