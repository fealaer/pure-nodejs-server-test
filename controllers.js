(function () {
  'use strict';

  var Cookies = require('./cookies')
    , users = require('./db').UsersDB
    , templates = require('./templates');

  module.exports = {
    GET: {
      def: function (req, res) {
        res.end(templates.homePage);
      },
      pub: function (req, res) {
        res.end(templates.publicPage);
      },
      priv: function (req, res) {
        res.end(templates.privatePage);
      },
      registration: function (req, res) {
        res.end(templates.registerPage);
      },
      login: function (req, res) {
        res.end(templates.loginPage);
      },
      logout: function (req, res) {
        res.end(templates.logoutPage);
      }
    },
    POST: {
      registration: function (req, res) {
        if (users.add(req.body.email)) {
          Cookies.set(res, 'email', req.body.email);
          res.end(templates.registrationSuccess);
        } else {
          res.statusCode = 400;
          res.end(templates.registrationFail);
        }
      },
      login: function (req, res) {
        if (users.get(req.body.email)) {
          Cookies.set(res, 'email', req.body.email);
          res.end(templates.loginSuccess);
        } else {
          res.statusCode = 400;
          res.end(templates.loginFail);
        }
      },
      logout: function (req, res) {
        Cookies.remove(res, 'email');
        res.end(templates.logoutSuccess);
      }
    }
  };
})();
