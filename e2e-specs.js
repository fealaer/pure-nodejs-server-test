(function () {
  'use strict';

  var helpers = require('./e2e-specs-helper');

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


(function () {
  'use strict';

  var helpers = require('./e2e-specs-helper');

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

(function () {
  'use strict';

  var helpers = require('./e2e-specs-helper');

  describe('Public Pages', function () {

    it('should has access to the Home page by default', function (client) {
      helpers.shouldHasAccessTo(client, '', 'Home');
    });

    it('should has access to the Public Page', function (client) {
      helpers.shouldHasAccessTo(client, 'public', 'It a public page!');
    });

    it('should has access to the Registration Page', function (client) {
      helpers.shouldHasAccessTo(client, 'registration', 'Registration');
    });

    it('should has access to the Login Page', function (client) {
      helpers.shouldHasAccessTo(client, 'login', 'Login');
    });

  });

})();

(function () {
  'use strict';

  var helpers = require('./e2e-specs-helper');

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

(function () {
  'use strict';

  var helpers = require('./e2e-specs-helper');

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
