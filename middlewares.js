(function () {
  'use strict';

  var users = require('./db').UsersDB
    , templates = require('./templates');

  function isLoggedInByCookie(req) {
    return !!req.cookies.email;
  }

  function isUserInDB(req) {
    return !!users.get(req.cookies.email);
  }

  function removeEmailFromCookie(res) {
    res.clearCookie('email');
  }

  function ifLoggedIn(req, res, ifLoggedIn, ifLoggedOff) {
    if (isLoggedInByCookie(req)) {
      if (isUserInDB(req)) {
        ifLoggedIn();
      } else {
        removeEmailFromCookie(res);
      }
    } else {
      ifLoggedOff();
    }
  }

  module.exports = {
    shouldBeNotLoggedIn: function (req, res, next) {
      ifLoggedIn(req, res, function () {
        res.end(templates.alreadyLoggedIn);
      }, next);
    },
    shouldBeLoggedIn: function (req, res, next) {
      ifLoggedIn(req, res, next, function () {
        res.statusCode = 403;
        res.end(templates.shouldBeLoggedIn);
      });
    }
  }
})();
