(function () {
  'use strict';

  const PORT = 8080;

  var express = require('express')
    , app = express()
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , controllers = require('./controllers')
    , middlewares = require('./middlewares');

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(function (req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
  });

  app.get('/', controllers.GET.def);
  app.get('/public', controllers.GET.pub);
  app.get('/login', middlewares.shouldBeNotLoggedIn, controllers.GET.login);
  app.get('/registration', middlewares.shouldBeNotLoggedIn, controllers.GET.registration);
  app.get('/private', middlewares.shouldBeLoggedIn, controllers.GET.priv);
  app.get('/logout', middlewares.shouldBeLoggedIn, controllers.GET.logout);

  app.post('/login', middlewares.shouldBeNotLoggedIn, controllers.POST.login);
  app.post('/registration', middlewares.shouldBeNotLoggedIn, controllers.POST.registration);
  app.post('/logout', middlewares.shouldBeLoggedIn, controllers.POST.logout);

  app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:%s", PORT);
  });
})();
