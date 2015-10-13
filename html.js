(function () {
  'use strict';

  class HTML {
    static createHtmlMenu (pages) {
      var menu = '<hr/><ul class="menu"><li><a href="/">Home</a></li>';
      pages.forEach(function (title) {
        menu += '<li><a href="/' + title.toLocaleLowerCase() + '">' + title + '</a></li>';
      });
      menu += '</ul><hr/>';
      return menu;
    }
    static htmlOneInputForm (action, title) {
      return '<form method="post" action="' + action + '">' +
        '<lable for="email">Email</lable>' +
        '<input id="email" type="email" name="email" placeholder="Email" required="required">' +
        '<button>' + title + '</button>' +
        '</form>';
    }
    static htmlOneButtonForm (action, title) {
      return '<form method="post" action="' + action + '"><button>' + title + '</button></form>';
    }

    static wrapContentToHTML(content, title) {
      return '<!DOCTYPE html>\n\
      <html>\n\
      <head>\n\
      <title>' + title + ' | Node.JS Simple Server</title>\n\
      <style>\n\
      ul.menu li {\n\
        display:inline;\n\
        margin-right: 5px;\n\
      }\n\
      </style>\n\
      </head>\n\
      <body>\n' +
      content +
      '</body>\n\
      </html>';
    }
  }

  module.exports = HTML;
})();
