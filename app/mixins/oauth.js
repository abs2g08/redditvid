import Ember from 'ember';
import user from '../models/user';
import Poller from './poller';
import LocalStorage from '../utils/localstorage';

export default Ember.Mixin.create(Poller, {
	user: user,
	storage: new LocalStorage(),
	model: function(params) {
		var _this = this;

	    if(params.state && params.code && !user.isLoggedIn) {
	    	return _this.controllerFor('oauth').getAccessToken(params).then(function() {
	    		_this.set('storage.oauth', JSON.stringify({token: user.access_token, date: moment().unix()}));
	    	});
		} else if(this.get('storage.oauth')) {
			var tokenObj = JSON.parse(this.get('storage.oauth'));
			if((moment().unix() - moment.unix(tokenObj.date).unix()) > 1000) {
				_this.set('storage.oauth', null);
			} else {
				user.access_token = tokenObj.token;
				return this.controllerFor('oauth').getUserInfo();
			}
		}
	},

	afterModel: function(transition) {
		this._super(transition);
	    if(user.isLoggedIn) {
	      this.start();
	    }
	},

  	onPoll: function() {
    	// Implicit grant flow tokens are only valid for 1 hour. 
    	// before this happens, onPoll will trigger prompting use to login again
    	this.controllerFor('oauth').login();
  	}		
});