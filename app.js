(function () {
  'use strict';

  const PORT = 8080;

  var http = require('http')
    , router = new (require('./router'))()
    , Request = require('./request')
    , Cookies = require('./cookies')
    , controllers = require('./controllers')
    , middlewares = require('./middlewares');

  router.get('/', controllers.GET.def);
  router.get('/public', controllers.GET.pub);
  router.get('/login', middlewares.shouldBeNotLoggedIn, controllers.GET.login);
  router.get('/registration', middlewares.shouldBeNotLoggedIn, controllers.GET.registration);
  router.get('/private', middlewares.shouldBeLoggedIn, controllers.GET.priv);
  router.get('/logout', middlewares.shouldBeLoggedIn, controllers.GET.logout);

  router.post('/login', middlewares.shouldBeNotLoggedIn, controllers.POST.login);
  router.post('/registration', middlewares.shouldBeNotLoggedIn, controllers.POST.registration);
  router.post('/logout', middlewares.shouldBeLoggedIn, controllers.POST.logout);

  function app(req, res) {
    console.log("%s %s", req.method, req.url);
    Request.parseBody(req, function () {
      Cookies.parse(req, function () {
        router.handleRoute(req, res);
      });
    });
  }

  http.createServer(app).listen(PORT, function () {
    console.log("Server listening on: http://localhost:%s", PORT);
  });
})();
