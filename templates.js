(function () {
  'use strict';

  var HTML = require('./html');

  var htmlMenu = HTML.createHtmlMenu(['Registration', 'Login', 'Logout', 'Public', 'Private']);

  var pages = {
    homePage: {content: '<h1>Home</h1>' + htmlMenu, title: 'Home'},
    publicPage: {content: '<h1>It a public page!</h1>' + htmlMenu, title: 'Public Page'},
    privatePage: {content: '<h1>It a private page!</h1>' + htmlMenu, title: 'Private Page'},
    registerPage: {content: '<h1>Registration</h1>' + htmlMenu + HTML.htmlOneInputForm('/registration', 'Register'), title: 'Registration'},
    loginPage: {content: '<h1>Login</h1>' + htmlMenu + HTML.htmlOneInputForm('/login', 'Login'), title: 'Login'},
    logoutPage: {content: '<h1>Logout</h1>' + htmlMenu + HTML.htmlOneButtonForm('/logout', 'Logout'), title: 'Logout'},
    registrationSuccess: {content: '<h1>You have successfully registered!</h1>' + htmlMenu, title: 'Registration Successful'},
    registrationFail: {content: '<h1>User with this email already registered!</h1>' + htmlMenu, title: 'Registration Failed'},
    loginSuccess: {content: '<h1>You have successfully logged in!</h1>' + htmlMenu, title: 'Login Successful'},
    loginFail: {content: '<h1>User with this email is not registered in our system!</h1>' + htmlMenu, title: 'Login Failed'},
    logoutSuccess: {content: '<h1>You have successfully logged out!</h1>' + htmlMenu, title: 'Logout Successful'},
    alreadyLoggedIn: {content: '<h1>You are already logged in!</h1>' + htmlMenu, title: 'Already Logged In'},
    shouldBeLoggedIn: {content: '<h1>You should be logged in to see this page!</h1>' + htmlMenu, title: 'Access Denied'}
  };

  var wrapAll = function (pages) {
    var wrappedTemplates = {};
    for (var key in pages) {
      if (pages.hasOwnProperty(key)) {
        var page = pages[key];
        wrappedTemplates[key] = HTML.wrapContentToHTML(page.content, page.title);
      }
    }
    return wrappedTemplates;
  };

  module.exports = wrapAll(pages);
})();
