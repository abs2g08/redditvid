import Ember from 'ember';
import user from '../models/user';
import Poller from './poller';
import LocalStorage from '../utils/localstorage';

/*
	Similar to: https://github.com/simplabs/ember-simple-auth/blob/master/packages/ember-simple-auth/lib/simple-auth/mixins/application-route-mixin.js
*/

export default Ember.Mixin.create(Poller, {
  user: user,
  storage: new LocalStorage(),
  interval: 3300000,
  //interval: 10000,
  intervalInSeconds: function() {
    return (this.get('interval')/1000);
  }.property('interval'),
  
  model: function(params) {
    var _this = this;
		if(params.state && params.code && !user.isLoggedIn) {
			return _this.controllerFor('oauth').getAccessToken(params).then(function() {
				_this.set('storage.oauth', JSON.stringify({token: user.access_token, date: moment().unix()}));
	    });
		} else if(this.get('storage.oauth')) {
			var tokenObj = JSON.parse(this.get('storage.oauth'));
			if(tokenObj) {
				if((moment().unix() - moment.unix(tokenObj.date).unix()) > this.get('intervalInSeconds')) {
					_this.set('storage.oauth', null);
				} else {
					user.access_token = tokenObj.token;
					return this.controllerFor('oauth').getUserInfo();
				}
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