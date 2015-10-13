(function () {
  'use strict';

  class Utils {
    static stringToKeyValueMap(str, separator) {
      var map = {};

      (str || '').split(separator).forEach(function (cookie) {
        var pair = cookie.split('=');
        map[pair.shift().trim()] = decodeURIComponent(pair.join('='));
      });

      return map;
    }
  }

  module.exports = Utils;
})();
