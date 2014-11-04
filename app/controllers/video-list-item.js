import Ember from 'ember';
import User from '../models/user';

export default Ember.ObjectController.extend({
  dir: 0,

  postedAgo: function() {
  	var createdDate = moment.unix(this.get('created_utc'));
	return createdDate.fromNow();
  }.property('created_utc'),

  upClass: function() {
  	return this.get('dir') == 1 ? "selected" : "";
  }.property('dir'),

  downClass: function() {
  	return this.get('dir') == 2 ? "selected" : "";
  }.property('dir'),

  post: function(direction) {
  	if(User.isLoggedIn) {
	  var _this = this;
	  return $.ajax({
      	type: "POST",
	    url: "https://oauth.reddit.com/api/vote",
      	headers: {
        	"Authorization": "bearer " + User.access_token,
      	},
      	dataType: 'json',
      	data: { dir: direction, id: this.get('id') },
      }).then(function(){
      	 _this.set('dir', direction);
      });

  	} else {
  	  alert('you must login first before you can vote');
  	}
  },

  actions: {
  	voteUp: function() {
  	  this.post(1);
  	},
  	voteDown: function() {
	  this.post(-1);
  	}
  }
});