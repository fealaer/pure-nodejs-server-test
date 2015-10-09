(function () {
  'use strict';

  class UsersDB {
    constructor(users) {
      this.users = users || [];
    }

    get(email) {
      var index = this.users.indexOf(email);
      if (~index) {
        return this.users[index];
      } else {
        return null;
      }
    }

    add(email) {
      if (~this.users.indexOf(email)) {
        return false;
      } else {
        this.users.push(email);
        return true;
      }
    }
  }

  module.exports.UsersDB = new UsersDB(['iam@super.admin']);
})();
