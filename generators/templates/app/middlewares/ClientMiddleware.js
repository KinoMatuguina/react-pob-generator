/*
* ClientMiddleware.js
*/

'use strict';

import requestPromise from 'superagent-bluebird-promise';
import changeCase from 'change-case';


export default class ClientMiddleware {
  static handleResponse(response, successCB, errorCB) {

    const status = response.status || response.statusCode;
    console.log(`STATUS ${status}`);
    if (status && !response.error && status >= 200 && status < 300) {
      console.log("OK response");
      successCB && successCB(response);
    } else {
      console.log("Response with errors");
      let errorMessages = this.handleErrorResponse(response);
      errorCB && errorCB(errorMessages);
    }
  }
  static parseErrors(errObjArray) {

    let parsed = [];

    if (errObjArray && errObjArray.map && errObjArray.length > 0) {

      parsed = errObjArray.map((obj) => {
        let fieldName = changeCase.titleCase(obj.field);
        let message = obj.defaultMessage;

        return `${fieldName} ${message}`;
      });
    }

    console.log("PARSED");
    console.log(parsed);
    return parsed;

  }
  static handleErrorResponse(errRes) {
    let errorMessages;
    console.log("HANDLE ERROR RESPONSE");
    console.log(errRes);

    let body = errRes.body;

    if(body && body.error && body.error.map && body.error.length > 0) {
      errorMessages = this.parseErrors(body.error);
    } else if(body && body.error && body.error.messages) {
      errorMessages = body.error.messages;
    } else if(body && body.error && body.error.code) {
      if(body.error.code === "ECONNREFUSED") {
        errorMessages = [ "Service is unavailable at the moment. Please try again later."]
      }
    } else if(body && body.error && body.error.errors) {
      errorMessages = _.map(body.error.errors, (error) => {
        return error.defaultMessage;
      });
    } else if(body && body.error && body.error.error && typeof body.error.error === 'string') {
      errorMessages = [ body.error.error ]
    }

    return errorMessages;
  }
  static upload (url, fieldName, file, progressCB, successCB, errorCB) {

    console.log(`FIELDNAME ${fieldName}`);
    console.log("FILE");
    console.log(file.mimetype);
    console.log(file.type)

    requestPromise
      .post(url)
      .accept('application/json')
      .withCredentials()
      .field('mimetype', file.mimetype)
      .attach('file', file, 'tmp-upload-file.jpg')
      .on('progress', (e) => {
        console.log(`${e.loaded} of ${e.total} uploaded.`)
        progressCB && progressCB(e.loaded, e.total);
      })
      .promise()
      .then((res) => {

        this.handleResponse(res, successCB, errorCB);

      })
      .catch((errRes) => {
        console.log("ClientMiddleware error");

        let errorMessages = this.handleErrorResponse(errRes);

        errorCB && errorCB(errorMessages);
      });
  }
  static post(url, postObj, successCB, errorCB) {
    requestPromise
      .post(url)
      .accept('application/json')
      .withCredentials()
      .send(postObj)
      .promise()
      .then((res) => {

          this.handleResponse(res, successCB, errorCB);
      })
      .catch((errRes) => {
        console.log("ClientMiddleware error");

        let errorMessages = this.handleErrorResponse(errRes);

        errorCB && errorCB(errorMessages);
      });
  }
  static get(url, queryObj, successCB, errorCB) {
    requestPromise
      .get(url)
      .accept('application/json')
      .withCredentials()
      .query(queryObj)
      .promise()
      .then((res) => {

          this.handleResponse(res, successCB, errorCB);
      })
      .catch((errRes) => {
        console.log("ClientMiddleware error");

        let errorMessages = this.handleErrorResponse(errRes);

        errorCB && errorCB(errorMessages);
      });
  }
  static put(url, putObj, successCB, errorCB) {
    requestPromise
      .put(url)
      .accept('application/json')
      .withCredentials()
      .send(putObj)
      .promise()
      .then((res) => {
        this.handleResponse(res, successCB, errorCB);
      })
      .catch((errRes) => {
        console.log("ClientMiddleware error");

        let errorMessages = this.handleErrorResponse(errRes);

        errorCB && errorCB(errorMessages);
      });
  }
  static delete(url, id, successCB, errorCB) {

    let deleteUrl = `${url}${id}`;

    if (url.slice(-1) !== '/') {
      deleteUrl = `${url}/${id}`;
    }

    requestPromise
      .delete(deleteUrl)
      .accept('application/json')
      .withCredentials()
      .promise()
      .then((res) => {
        this.handleResponse(res, successCB, errorCB);
      })
      .catch((errRes) => {
        console.log("ClientMiddleware error");

        let errorMessages = this.handleErrorResponse(errRes);

        errorCB && errorCB(errorMessages);
      });
  }
}
