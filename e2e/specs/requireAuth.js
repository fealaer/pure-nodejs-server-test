(function () {
  'use strict';

  var helpers = require('../helpers');

  describe('Pages which require Authentication', function () {

    describe('Tell users why access denied', function () {
      it('should has no access to the Private Page', function (client) {
        helpers.shouldHasNoAccessTo(client, 'private');
      });

      it('should has no access to the Logout Page', function (client) {
        helpers.shouldHasNoAccessTo(client, 'logout');
      });
    });

    describe('Allow access when user Authenticated', function () {

      beforeEach(function (client, done) {
        helpers.authenticate(client);
        done();
      });

      it('should has access to the Private Page', function (client) {
        helpers.shouldHasAccessTo(client, 'private', 'It a private page!');
      });

      it('should has access to the Logout Page', function (client) {
        helpers.shouldHasAccessTo(client, 'logout', 'Logout');
      });

      afterEach(function (client, done) {
        helpers.unauthenticate(client);
        done();
      });

    });

  });

})();
