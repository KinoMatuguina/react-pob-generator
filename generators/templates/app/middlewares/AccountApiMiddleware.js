'use strict';

import ServerConfig from '../config/ServerConfig';
import rp from 'request-promise';

export default function AccountApiMiddleware (req, res, next) {

  const consulClient = req.app.consulClient;
  const accountEndpoint = ServerConfig.serverApiEndpoints.account;
  const isConsulEnabled = ServerConfig.consul.enabled;

  let clientId = "6b6495b6-a13d-4821-b693-3a5a6d1dd8fa";
  let funcCd = "FR3100";
  let Del = false;
  let reqUrl = accountEndpoint;

  if (req.session && req.session.user && req.session.user.id) {
    clientId = req.session.user.id
  }
  // console.log(consulClient)
  // console.log(isConsulEnabled)

  //build the url
  console.log(req.path);
  // console.log(req.query.id);
  if (req.path === "/findWithModelPaginated") {
    console.log(reqUrl)
    reqUrl = `${req.path}?page=${req.query.page}&limit=${req.query.limit}&sort=${req.query.sort}&dir=${req.query.dir}`
    console.log(reqUrl)
  }
  //START own account endpoint
  if (req.url === "/findAccountsByClientIdAndIsOwn") {
    reqUrl = `${req.url}/${clientId}/true`;
  //END own account endpoint

  }

  if (req.path === "/findByIdAndIsDel") {
    console.log(reqUrl);
    reqUrl = `${req.path}/${req.query.id}/${Del}`;
  }

  if(req.path === "/findAllowedDestAcctsByClientIdFuncCdSrcTypeIdDestIsOwn") {
    let srcTypeId = "";
    let destIsOwn = true;

    if (typeof req.query !== 'undefined' && req.query) {
      if (typeof req.query.srcTypeId !== 'undefined') {
        srcTypeId = req.query.srcTypeId;
      }
      if (typeof req.query.destIsOwn !== 'undefined') {
        destIsOwn = req.query.destIsOwn;
      }
    }

    reqUrl = `${reqUrl}account${req.path}/${clientId}/${funcCd}/${srcTypeId}/${destIsOwn}`;
  }

  if(req.url === "/findAllowedAcctTypesByFuncCd/") {
    reqUrl = `${reqUrl}/accountType/findAllowedAcctTypesByFuncCd/${funcCd}`;
  }

  if (consulClient && isConsulEnabled) {

    let key = ServerConfig.consul.keys.account;
    consulClient.kv.get(key)
      .then ((result) => {
        console.log("ConsulMiddleware result");
        // console.log(result)
        if (result && result.Value) {

          let options = {
              method: req.method,
              uri: result.Value + reqUrl,
              headers: req.headers,
              body: req.body,
              resolveWithFullResponse: true,
              json: true
          };

          rp(options)
            .then((response) => {
              // console.log(response);
              res.send(response.body);
            })
            .catch((err) => {
              console.log("AccountApiMiddleware");
              console.error(err);
              res.send(err);
            });

        } else {
          console.error("ConsulMiddleware: key/value pair not found");

          let options = {
              method: req.method,
              uri: result.Value + req.url,
              headers: req.headers,
              body: req.body,
              resolveWithFullResponse: true,
              json: true
          };

          rp(options)
            .then((response) => {
              // console.log(response);
              res.send(response);
            })
            .catch((err) => {
              console.log("AccountApiMiddleware");
              console.error(err);
              res.send(err);
            });
        }

      })
      .catch ((error) => {
        console.error(error);
      });

  } else {
    console.error("Consul client not initialized");
    let options = {
        method: req.method,
        uri: reqUrl,
        headers: req.headers,
        body: req.body,
        resolveWithFullResponse: true,
        json: true
    };

    rp(options)
      .then((response) => {
        // console.log(response);
        let status = response.statusCode || response.status;
        res.status(status).send(response.body);
      })
      .catch((err) => {
        console.log("AccountApiMiddleware");
        console.error(err);
        let status = err.statusCode || err.status || 500;

        if (err.message && err.message.indexOf("ECONNREFUSED") !== -1) {
          res.status(status).send({
            error: {
              code: "ECONNREFUSED"
            }
          });
        } else {
          res.status(status).send(err);
        }

      });
  }
  
}
