import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('about');	
	this.resource('videos', { path: '/' });
	this.resource('video', { path: '/video/:id' });
});

export default Router;
