/**
* {{ properCase name }}Middleware.js
*/

'use strict';

import ServerConfig from '../config/ServerConfig';
import rp from 'request-promise';

const {{ properCase name }}Middleware = function(req, res, next) {

  const consulClient = req.app.consulClient;
  const apiHost = ServerConfig.apiHost;
  const isConsulEnabled = ServerConfig.consul.isConsulEnabled;

  if (consulClient && isConsulEnabled) {

    let key = ServerConfig.consul.keys.apiHost;
    consulClient.kv.get(key)
      .then ((result) => {
        console.log("ConsulMiddleware result");
        console.log(result)
        if (result && result.Value) {

          /*
          * sample request using consul value
          */

          // let options = {
          //     method: req.method,
          //     uri: result.Value + req.url,
          //     headers: req.headers,
          //     body: req.body,
          //     resolveWithFullResponse: true,
          //     json: true
          // };
          //
          // rp(options)
          //   .then((response) => {
          //     console.log(response);
          //     res.send(response);
          //   })
          // .catch((err) => {
          //   console.log("{{ properCase name }}Middleware");
          //   console.error(err);
          //   let status = err.statusCode || err.status || 500;
          //
          //   if (err.message && err.message.indexOf("ECONNREFUSED") !== -1) {
          //     res.status(status).send({
          //       error: {
          //         code: "ECONNREFUSED"
          //       }
          //     });
          //   } else {
          //     res.status(status).send(err);
          //   }
          //
          // });

        } else {
          console.error("ConsulMiddleware: key/value pair not found");

          /*
          * sample request using value from ServerConfig.js
          */

          // let options = {
          //     method: req.method,
          //     uri: apiHost + req.url,
          //     headers: req.headers,
          //     body: req.body,
          //     resolveWithFullResponse: true,
          //     json: true
          // };
          //
          // rp(options)
          //   .then((response) => {
          //     console.log(response);
          //     res.send(response);
          //   })
          // .catch((err) => {
          //   console.log("{{ properCase name }}Middleware");
          //   console.error(err);
          //   let status = err.statusCode || err.status || 500;
          //
          //   if (err.message && err.message.indexOf("ECONNREFUSED") !== -1) {
          //     res.status(status).send({
          //       error: {
          //         code: "ECONNREFUSED"
          //       }
          //     });
          //   } else {
          //     res.status(status).send(err);
          //   }
          //
          // });
        }

      })
      .catch ((error) => {
        console.error(error);
      });

  } else {
    console.error("Consul client not initialized");

    /*
    * sample request using value from ServerConfig.js
    */

    // let options = {
    //     method: req.method,
    //     uri: apiHost + req.url,
    //     headers: req.headers,
    //     body: req.body,
    //     resolveWithFullResponse: true,
    //     json: true
    // };
    //
    // rp(options)
    //   .then((response) => {
    //     console.log(response);
    //     let status = response.statusCode || response.status;
    //     res.status(status).send(response.body);
    //   })
    //   .catch((err) => {
    //     console.log("{{ properCase name }}Middleware");
    //     console.error(err);
    //     let status = err.statusCode || err.status || 500;
    //
    //     if (err.message && err.message.indexOf("ECONNREFUSED") !== -1) {
    //       res.status(status).send({
    //         error: {
    //           code: "ECONNREFUSED"
    //         }
    //       });
    //     } else {
    //       res.status(status).send(err);
    //     }
    //
    //   });
  }


}


export default {{ properCase name }}Middleware;
