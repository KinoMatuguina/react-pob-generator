'use strict';

import ServerConfig from '../config/ServerConfig';
import rp from 'request-promise';

// import request from 'superagent-bluebird-promise';
//import Promise from 'bluebird';

import request from 'superagent';

const FileUploadMiddleware = function(req, res, next) {

  const consulClient = req.app.consulClient;
  const fileUploadHost = ServerConfig.fileUploadHost;
  const isConsulEnabled = ServerConfig.consul.isConsulEnabled;

  // let options = {
  //       method: req.method,
  //       uri: apiHost + req.url,
  //       headers: req.headers,
  //       form: JSON.stringify(req.file),
  //       resolveWithFullResponse: true,
  //       json: true
  //   };
  //   rp(options)
  //     .then((response) => {
  //       // console.log(response);
  //       res.send(response);
  //     })
  //     .catch((err) => {
  //       // console.log("ServerApiMiddleware");
  //       // console.error(err);
  //       res.send(err);
  //     });

  console.log(`FILE UPLOAD HOST: ${fileUploadHost}`);
  console.log(req.body.mimetype);
  console.log(req.file);

  request
    .post(fileUploadHost + req.url)
    .accept('application/json')
    .field('mimetype', req.body.mimetype)
    .attach('file', req.file.path)
    .on('progress', function(e) {
      console.log("UPLOADED");
      console.log(e);
    })
    .end(function(err, result) {

      if (err) {
        console.log("ERROR");
        console.log(err);

        res.send(err);
      } else {

        console.log("SUCCESS");
        console.log(result);

        res.send(result.body);
      }
    });
    // .promise()
    // .then(function(res) {
    //   console.log("SUCCESS");
    //   console.log(res);
    // })
    // .catch(function(err) {
    //   console.log("ERROR");
    //   console.log(err);
    // });

  // Promise
  //   .all([ uploadRequest ])
  //   .then(function() {
  //     console.log('Done');
  //   })
  //   .catch(function() {
  //     console.log('Done with errors');
  //   });

  // if (consulClient && isConsulEnabled) {
  //
  //   let key = ServerConfig.consul.keys.apiHost;
  //   consulClient.kv.get(key)
  //     .then ((result) => {
  //       console.log("ConsulMiddleware result");
  //       console.log(result)
  //       if (result && result.Value) {
  //
  //         req.headers["content-type"] = 'multipart/form-data';
  //         let options = {
  //             method: req.method,
  //             uri: result.Value + req.url,
  //             headers: req.headers,
  //             formData: req.body,
  //             resolveWithFullResponse: true,
  //             json: true
  //         };
  //
  //         rp(options)
  //           .then((response) => {
  //             console.log(response);
  //             res.send(response);
  //           })
  //           .catch((err) => {
  //             console.log("ServerApiMiddleware");
  //             console.error(err);
  //             res.send(err);
  //           });
  //
  //       } else {
  //         console.error("ConsulMiddleware: key/value pair not found");
  //
  //         let options = {
  //             method: req.method,
  //             uri: apiHost + req.url,
  //             headers: req.headers,
  //             form: JSON.stringify(req.file),
  //             resolveWithFullResponse: true,
  //             json: true
  //         };
  //
  //         rp(options)
  //           .then((response) => {
  //             console.log(response);
  //             res.send(response);
  //           })
  //           .catch((err) => {
  //             console.log("ServerApiMiddleware");
  //             console.error(err);
  //             res.send(err);
  //           });
  //       }
  //
  //     })
  //     .catch ((error) => {
  //       console.error(error);
  //     });
  //
  // } else {
  //   console.error("Consul client not initialized");
  //
  //   console.log("REQUEST FILE");
  //   console.log(req.headers);
  //
  //   let options = {
  //       method: req.method,
  //       uri: apiHost + req.url,
  //       headers: req.headers,
  //       form: JSON.stringify(req.file),
  //       resolveWithFullResponse: true,
  //       json: true
  //   };
  //   rp(options)
  //     .then((response) => {
  //       // console.log(response);
  //       res.send(response);
  //     })
  //     .catch((err) => {
  //       // console.log("ServerApiMiddleware");
  //       // console.error(err);
  //       res.send(err);
  //     });
  // }
  //
  // //  console.log('URL: ' + req.url);

}


module.exports = FileUploadMiddleware;
