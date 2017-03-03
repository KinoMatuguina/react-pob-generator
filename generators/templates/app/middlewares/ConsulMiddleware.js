'use strict';

import ServerConfig from '../config/ServerConfig';
import prettyjson from 'prettyjson';

const ConsulMiddleware = function(req, res, next) {

  console.log(`REQUEST URL: ${req.url}`);

  const consulClient = req.app.consulClient;
  // console.log(req.app);
  if (consulClient) {

    if (req.url || req.url === "") {

      // console.log(req.url);
      
      let key = "";
      if (req.url === "/loadMenu") {
        key = ServerConfig.consul.keys.globalMenu;
      }

      // console.log(consulClient.kv.get(key));

      // console.log(consulClient.kv.get(key));
      consulClient.kv.get(key)
        .then ((result) => {
          console.log("ConsulMiddleware result");
          // console.log(result);
          // console.log(prettyjson.render(result.Value));
          if (result && result.Value) {
            res.status(200).send(JSON.parse(result.Value));
          } else {

            console.error("ConsulMiddleware: key/value pair not found");
            res.status(500).send({
              status: 500,
              message: 'Internal server error'
            });
          }

        })
        .catch ((error) => {
          console.error(error);
          res.status(500).send({
            status: 500,
            message: 'Internal server error'
          });
        });

    } else {
      res.status(400).send({
        status: 400,
        message: "Cannot find url"
      });
    }
  } else {
    console.error("Consul client not initialized");
    res.status(400).send({
      message: "Internal server error"
    });
  }

  // next();

}


export default ConsulMiddleware;
