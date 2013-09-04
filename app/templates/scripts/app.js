var <%= _.classify(appname) %> = window.<%= _.classify(appname) %> = Ember.Application.create();

EmberApp.IndexView = Ember.View.extend({
 didInsertElement: function() {
  this.$().foundation();
 }
})

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');
