(function () {
  'use strict';

  var utils = require('./utils');

  class Request {
    static parseBody (req, cb) {
      if (req.method == 'POST') {
        var data = '';
        req.on('data', function (chunk) {
          data += chunk;

          // Too much POST data, kill the connection!
          if (data.length > 1e6) {
            req.connection.destroy();
          }
        });
        req.on('end', function () {
          req.body = utils.stringToKeyValueMap(data, '&');
          cb();
        });
      } else {
        cb();
      }
    }
  }

  module.exports = Request;
})();
