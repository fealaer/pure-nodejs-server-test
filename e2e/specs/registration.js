(function () {
  'use strict';

  var helpers = require('../helpers');

  describe('Registration Page', function () {

    it('should has a form with an input and a button', function (client) {
      helpers.shouldHasAccessTo(client, 'registration', 'Registration');
      client.expect.element('form').to.be.present.before(100);
      client.expect.element('form input[type=email]').to.be.present.before(100);
      client.expect.element('form button').to.be.present.before(100);
    });

    it('should successfully register with a correct email', function (client) {
      helpers.shouldHasAccessTo(client, 'registration', 'Registration');
      var email = new Date().getTime() + 'new@super.admin';
      helpers.register(client, email, true);
    });

    it('should fail to register with an existing email', function (client) {
      helpers.shouldHasAccessTo(client, 'registration', 'Registration');
      helpers.register(client, 'iam@super.admin', false);
    });

    it('should fail to register with an empty email', function (client) {
      helpers.shouldHasAccessTo(client, 'registration', 'Registration');
      helpers.register(client, '', function () {
        helpers.checkTitle(client, 'Registration');
      });
    });

    it('should fail to register with an incorect email', function (client) {
      helpers.shouldHasAccessTo(client, 'registration', 'Registration');
      helpers.register(client, 'email@?', function () {
        helpers.checkTitle(client, 'Registration');
      });
    });

    afterEach(function (client, done) {
      helpers.unauthenticate(client);
      done();
    });

  });

})();
