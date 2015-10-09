(function () {
  'use strict';

  var utils = require('./utils');

  class Cookies {
    static parse(req, cb) {
      req.cookies = utils.stringToKeyValueMap(req.headers.cookie, ';');
      cb();
    }

    static set(res, key, val) {
      res.setHeader("Set-Cookie", key + '=' + val + ';Expires=' + new Date(Date.now() + 1000 * 60 * 24));
    }

    static remove(res, key) {
      res.setHeader("Set-Cookie", [key + '=' + key + ';Expires=' + new Date(Date.now() - 1000 * 60 * 24)]);
    }
  }

  module.exports = Cookies;
})();
