import Ember from 'ember';

export default Ember.Object.create({
	isLoggedIn: false,
	access_token: null,
	name: null,
	gold_creddits: null,
	over_18: null,
	comment_karma: null,
});