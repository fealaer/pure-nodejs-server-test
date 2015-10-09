(function () {
  'use strict';

  class Router {
    constructor() {
      this.routes = {
        GET: {},
        POST: {}
      };
      this.def = function (req, res) {
        res.statusCode = 404;
        res.end('<h1>Resource: ' + req.method + ' ' + req.url + ' -- Not Found!</h1>');
      }
    }

    static handlers(args) {
      var handlers = [];
      for (var i = 1; i < args.length; i++) {
        handlers.push(args[i]);
      }
      return handlers;
    }

    get(path, handler) {
      this.routes.GET[path] = Router.handlers(arguments);
    }

    post(path, handler) {
      this.routes.POST[path] = Router.handlers(arguments);
    }

    getRoutes(method, path) {
      var routers;
      if (this.routes[method] && (routers = this.routes[method][path])) {
        return routers;
      } else {
        return [this.def];
      }
    }

    handleRoute(req, res) {
      var routes = this.getRoutes(req.method, req.url);
      var next = false, i = 0;
      do {
        next = false;
        routes[i](req, res, function () {
          next = true;
        });
        i++;
      } while (next && i < routes.length)
    }
  }

  module.exports = Router;
})();
