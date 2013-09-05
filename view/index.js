'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fleck = require('fleck');

var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.pluralized_name = fleck.pluralize(this.name);
  this.slugified_name = this._.slugify(this.name);
};

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.files = function files() {
  this.copy('single.js', 'app/scripts/views/' + this.slugified_name + '_view.js');
  this.copy('single_edit.js', 'app/scripts/views/' + this.slugified_name + '_edit_view.js');
  this.copy('plural.js', 'app/scripts/views/' + this._.slugify(this.pluralized_name) + '_view.js');
  this.copy('single.jade', 'app/templates/' + this.slugified_name + '.jade');
  this.copy('single_edit.jade', 'app/templates/' + this.slugified_name + '_edit.jade');
  this.copy('plural.jade', 'app/templates/' + this._.slugify(this.pluralized_name) + '.jade');
  this.copy('bound_text_field_view.js', 'app/scripts/views/bound_text_field_view.js');
};
