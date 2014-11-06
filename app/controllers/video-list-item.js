import Ember from 'ember';
import User from '../models/user';

export default Ember.ObjectController.extend({
  dir: 0,

  postedAgo: function() {
  	var createdDate = moment.unix(this.get('created_utc'));
	  return createdDate.fromNow();
  }.property('created_utc'),

  upClass: function() {
  	return this.get('dir') === 1 ? "selected" : "";
  }.property('dir'),

  downClass: function() {
  	return this.get('dir') === 2 ? "selected" : "";
  }.property('dir'),

  canVote: function() {
  	if(User.isLoggedIn) {
  		if(this.get('dir') === 0) {
  			return true;
  		} else {
  			alert('you cannot vote on the same video twice');	
  		}
  	} else {
  		alert('you must login first before you can vote');
  	}
  	return false;
  },

  post: function(direction) {
  	if(this.canVote()) {
	  var _this = this;
	  return $.ajax({
      	type: "POST",
	      url: "/oath-reddit/api/vote",
      	headers: {
        	"Authorization": "bearer " + User.access_token,
      	},
      	dataType: 'json',
      	data: { dir: direction, id: this.get('id') },
      }).then(function(){
      	 _this.set('dir', direction);
      }).fail(function(){
      	 alert('error trying to vote');
      });
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