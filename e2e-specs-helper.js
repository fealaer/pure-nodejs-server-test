(function () {
  'use strict';

  function callback(cb) {
    return (cb || function () {});
  }

  function checkTitle(client, title, cb) {
    client.expect.element('h1').to.have.text.which.equal(title);
    callback(cb) ();
  }

  function shouldHasAccessTo(client, url, title, cb) {
    client
      .url('http://localhost:8080/' + url)
      .expect.element('body').to.be.present.before(1000);

    checkTitle(client, title, cb);
  }

  function shouldHasNoAccessTo(client, url, cb) {
    shouldHasAccessTo(client, url, 'You should be logged in to see this page!', cb);
  }

  function login(client, email, expectation, cb) {
    client
      .setValue('form input[type=email]', [email])
      .click('form button', function () {
        if (typeof expectation === 'function') {
          expectation();
        } else {
          client.expect.element('body').to.be.present.before(1000);
          if (expectation) {
            checkTitle(client, 'You have successfully logged in!', cb);
          } else {
            checkTitle(client, 'User with this email is not registered in our system!', cb);
          }
        }
      });
  }

  function register(client, email, expectation, cb) {
    client
      .setValue('form input[type=email]', [email])
      .click('form button', function () {
        if (typeof expectation === 'function') {
          expectation();
        } else {
          client.expect.element('body').to.be.present.before(1000);
          if (expectation) {
            checkTitle(client, 'You have successfully registered!', cb);
          } else {
            checkTitle(client, 'User with this email already registered!', cb);
          }
        }
      });
  }

  function logout(client, cb) {
    client
      .click('form button', function () {
        client.expect.element('body').to.be.present.before(1000);
        checkTitle(client, 'You have successfully logged out!', cb);
      });
  }

  function authenticate(client) {
    client.setCookie({name: 'email', value: 'iam@super.admin'});
  }

  function unauthenticate(client) {
    client.deleteCookie('email');
  }

  module.exports = {
    checkTitle: checkTitle,
    shouldHasAccessTo: shouldHasAccessTo,
    shouldHasNoAccessTo: shouldHasNoAccessTo,
    login: login,
    logout: logout,
    register: register,
    authenticate: authenticate,
    unauthenticate: unauthenticate
  };

})();
