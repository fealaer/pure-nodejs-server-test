(function () {
  'use strict';

  var helpers = require('../helpers');

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
