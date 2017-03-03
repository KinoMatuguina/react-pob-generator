/**
* ClientLogger.js
*/

import { JL } from 'jsnlog';

export default class ClientLogger {

  constructor(loggerName, defaultAjaxUrl) {
    this.JL = JL;
    this.loggerName = loggerName;
    this.JL.setOptions({
        "defaultAjaxUrl": defaultAjaxUrl
    });
  }

  error(message) {
    const loggerName = this.loggerName
    this.JL(loggerName).error(message);
  }
  warn(message) {
    const loggerName = this.loggerName
    this.JL(loggerName).warn(message);
  }
  debug(message) {
    const loggerName = this.loggerName
    this.JL(loggerName).debug(message);
  }
  info(message) {
    const loggerName = this.loggerName
    this.JL(loggerName).info(message);
  }
}
