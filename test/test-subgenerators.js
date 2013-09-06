/*global describe:true, beforeEach:true, it:true */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('assert');
var fs = require('fs');

require('../lib/expected_controller_files');
require('../lib/expected_view_files');

describe('subgenerators', function () {

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, './temp'), function (err) {
      done();
    }.bind(this));
  });

  var filesDoNotExist = function(list_of_files){
    for (var i = 0; i < list_of_files.length; i++) {
      assert(!fs.existsSync(list_of_files[i]));
    }
  };

  it('router', function (done) {
    this.router = {};
    this.router = helpers.createGenerator('ember-jade-zurb-express:router', ['../../router']);

    filesDoNotExist([this.router.router_file]);

    this.router.controller_files = ['user_controller.js'];
    var router = this.router;
    this.router.run({}, function () {
      helpers.assertFiles( [ router.options.router_file ] );
      done();
    });
  });

  it('view', function (done) {
    this.view = {};
    this.view = helpers.createGenerator('ember-jade-zurb-express:view', ['../../view'], 'user');

    filesDoNotExist(FILES_GENERATED_BY_VIEW_SUBGEN);

    var view = this.view;
    this.view.run({}, function () {
      helpers.assertFiles( FILES_GENERATED_BY_VIEW_SUBGEN );
      helpers.assertFile('app/scripts/views/users_view.js', /UsersView/);
      helpers.assertFile('app/templates/users.hbs', /linkTo.*this/);
      helpers.assertFile('app/scripts/views/bound_text_field_view.js', /BoundTextFieldView = Ember.TextField.extend/);
      done();
    });
  });

  it('controller', function (done) {
    this.controller = {};
    this.controller = helpers.createGenerator('ember-jade-zurb-express:controller', ['../../controller','../../view','../../router'], 'user');

    filesDoNotExist(FILES_GENERATED_BY_CONTROLLER_SUBGEN);

    var controller = this.controller;
    this.controller.run({}, function () {
      helpers.assertFiles( FILES_GENERATED_BY_CONTROLLER_SUBGEN );
      helpers.assertFile('app/scripts/controllers/users_controller.js', /UsersController/);
      helpers.assertFile('app/scripts/routes/users_route.js', /UsersRoute/);
      done();
    });
  });
});
