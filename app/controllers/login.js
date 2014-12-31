import Ember from 'ember';
import user from '../models/user';

export default Ember.ObjectController.extend({
	user: user,
	actions: {
		login: function() {
			this.controllerFor('oauth').login();
		},
		logout: function() {
			this.controllerFor('oauth').logout();
		},
	}
});