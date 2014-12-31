import Ember from 'ember';
import SpeechRouter from 'vendor/speech-router';

export default Ember.Mixin.create({
	_speechRouter: null,
	_speechRouterOn: true,
	toggleSpeechRouter: function() {
		if(this._speechRouterOn) {
			this.speechRouter.stop();
		} else {
			this.speechRouter.start();			
		}
		this._speechRouterOn = !this._speechRouterOn;
		return this._speechRouterOn;
	},
	init: function() {
		var _this = this;
		var names = this.router.router.recognizer.names;
		var routes = { routes: {} };
		Ember.$.each(names, function(key) {
			routes.routes[("transition " + key)] = key;
			routes[key] = function() {
				_this.transitionTo(key);
			};
		});

		this.speechRouter = new SpeechRouter(routes);
		this.speechRouter.start();
		this._super();
	}
});