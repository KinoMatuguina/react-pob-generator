'use strict';

import ServerConfig from '../config/ServerConfig';
import rp from 'request-promise';

export default function FundTransferApiMiddleware (req, res, next) {

  console.log(req.session);
  console.log(req.session);
  console.log(req.session);
  console.log(req.session);


  const consulClient = req.app.consulClient;
  const fundtransferEndpoint = ServerConfig.serverApiEndpoints.fundtransfer;
  const isConsulEnabled = ServerConfig.consul.isConsulEnabled;

  let clientId = "6b6495b6-a13d-4821-b693-3a5a6d1dd8fa";
  let funcCd = "FR3100";
  let reqBody = req.body;

  if (req.session && req.session.user && req.session.user.id) {
    clientId = req.session.user.id

  }
  reqBody = { clientId: clientId, fundTransferDtlList: [], ...req.body }

  // reqBody.clientId = clientId;
  // reqBody.fundTransferDtlList = [];

  let reqUrl = fundtransferEndpoint + `fundtransfer${req.url}`;

  if (consulClient && isConsulEnabled) {

    let key = ServerConfig.consul.keys.apiHost;
    consulClient.kv.get(key)
      .then ((result) => {
        console.log("ConsulMiddleware result");
        console.log(result)
        if (result && result.Value) {

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
              console.log(response);
              res.send(response);
            })
            .catch((err) => {
              console.log("FundTransferApiMiddleware");
              console.error(err);
              res.send(err);
            });

        } else {
          console.error("ConsulMiddleware: key/value pair not found");

          let options = {
              method: req.method,
              uri: apiHost + req.url,
              headers: req.headers,
              body: req.body,
              resolveWithFullResponse: true,
              json: true
          };

          rp(options)
            .then((response) => {
              console.log(response);
              res.send(response);
            })
            .catch((err) => {
              console.log("FundTransferApiMiddleware");
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
    console.log(reqUrl);
    console.log(reqBody);
    let options = {
        method: req.method,
        uri: reqUrl,
        headers: req.headers,
        body: reqBody,
        resolveWithFullResponse: true,
        json: true
    };

    rp(options)
      .then((response) => {
        console.log(response);
        let status = response.statusCode || response.status;
        res.status(status).send(response.body);
      })
      .catch((err) => {
        console.log("ServerApiMiddleware");
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

  //  console.log('URL: ' + req.url);

}
