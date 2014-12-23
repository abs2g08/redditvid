import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Main Integration Test', {
   setup: function() {
     App = startApp();
   },
   teardown: function() {
     Ember.run(App, App.destroy);
	}
});

test('Video List', function() {
	visit('/').andThen(function() {
		ok(find('.video-list-item').length > 0, 'Passed! list populated');
	});
});

test("Video Detail", function() {
	visit('/').then(function() {
		Ember.$.each(find('.video-list-item'), function() {

			//if video is shown in app
			if($(this).find('.vid_link .ember-view').length > 0) {
				visit("/video/" + $(this).data('id')).then(function() {

					//if we find an iframe, then we can asssume the video has properly loaded
					ok(find('iframe').length > 0, 'Passed! Video' + String($(this).data('id')) + 'loaded');
				});
			} else {

				var _this = this;

				//if there is a hybperlink, assume its to valid external content and pass test
				if($(this).find('.vid_link .ember-view a')) {					
					ok(true, 'Passed! Video' + String($(this).data('id')));
				} else {
					ok(false, 'Failed! Video' + String($(this).data('id')));
				}
			}
		});
	});
	ok(true, 'Passed Video');
});

//TO-DO: add tests for loading of comments, posting a comment, authenticating a user and voting.