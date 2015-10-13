(function () {
  'use strict';

  var helpers = require('../helpers');

  describe('Login Page', function () {

    beforeEach(function (client, done) {
      helpers.unauthenticate(client);
      done();
    });

    it('should has a form with an input and a button', function (client) {
      helpers.shouldHasAccessTo(client, 'login', 'Login');
      client.expect.element('form').to.be.present.before(100);
      client.expect.element('form input[type=email]').to.be.present.before(100);
      client.expect.element('form button').to.be.present.before(100);
    });

    it('should successfully login with a correct email', function (client) {
      helpers.shouldHasAccessTo(client, 'login', 'Login');
      helpers.login(client, 'iam@super.admin', true);
    });

    it('should fail to login with an incorrect email', function (client) {
      helpers.shouldHasAccessTo(client, 'login', 'Login');
      helpers.login(client, 'bad@email.ll', false);
    });

    it('should fail to login with an empty email', function (client) {
      helpers.shouldHasAccessTo(client, 'login', 'Login');
      helpers.login(client, '', function () {
        helpers.checkTitle(client, 'Login');
      });
    });

  });

})();
