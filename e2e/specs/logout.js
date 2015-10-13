(function () {
  'use strict';

  var helpers = require('../helpers');

  describe('Logout Page', function () {

    beforeEach(function (client, done) {
      helpers.authenticate(client);
      done();
    });

    it('should has a form with a button', function (client) {
      helpers.shouldHasAccessTo(client, 'logout', 'Logout');
      client.expect.element('form').to.be.present.before(100);
      client.expect.element('form button').to.be.present.before(100);
    });

    it('should successfully logout', function (client) {
      helpers.shouldHasAccessTo(client, 'logout', 'Logout');
      helpers.logout(client);
    });

    afterEach(function (client, done) {
      helpers.unauthenticate(client);
      done();
    });

  });

})();
