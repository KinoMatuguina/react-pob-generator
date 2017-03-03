'use strict';

const LogoutMiddleware = function(req, res) {

  req.session.destroy(function(err) {
    if (err) {
      console.log(err);

      const errorJSON = {
        statusCode: 500,
        error: {
          messages: ["Server error: " + err]
        }
      };

      res.status(500).send(errorJSON);
    } else {

      const succJSON = {
        statusCode: 200,
        success: {
          messages: ["Logout successful"]
        }
      };

      res.status(200).send(succJSON);
    }
  });

}


export default LogoutMiddleware;
