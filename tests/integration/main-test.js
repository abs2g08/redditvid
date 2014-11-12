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

test("Video list is shown on load", function() {
	visit("/");
	andThen(function() {
		ok(find('.video').length > 0, "Passed!");
	});
});

// test("Test each video", function() {
// 	Ember.$.each(find('.video'), function() {
// 		visit("/video/" + $(this).data('id'));
// 		andThen(function() {
// 			ok(true, "Passed!");
// 		});
// 	});
// });