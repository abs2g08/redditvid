import Ember from 'ember';
import user from '../models/user';
import Poller from './poller';

export default Ember.Mixin.create(Poller, {
	model: function(params) {
		debugger;
		var _this = this;
	    if(params.state && params.code && !user.isLoggedIn) {
	    	return _this.controllerFor('oauth').getAccessToken(params);
		}
	},

	afterModel: function(transition) {
		this._super(transition);
	    if(user.isLoggedIn) {
	      console.log('hello world');
	      this.start();
	    }
	},

  	onPoll: function() {
    	// Implicit grant flow tokens are only valid for 1 hour. 
    	// before this happens, onPoll will trigger prompting use to login again
    	debugger;
    	this.controllerFor('oauth').login();
  	}		
});