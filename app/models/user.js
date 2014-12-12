import Ember from 'ember';

export default Ember.Object.create({
	isLoggedIn: false,
	access_token: null,
	name: null,
	gold_creddits: null,
	over_18: null,
	comment_karma: null,

	clear: function() {
		this.isLoggedIn = false;
		this.access_token = null;
		this.name =  null;
		this.gold_creddits = null;
		this.over_18 = null;
		this.comment_karma = null;
	}
});