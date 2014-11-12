import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Main Integration Test', {
   setup: function() {
     App = startApp();
   },
   teardown: function() {
     //Ember.run(App, App.destroy);
	}
});

test("Videos are shown on load", function() {
	visit("/");
	andThen(function() {
		ok(find('.video').length > 0, "Passed!");
	});
});