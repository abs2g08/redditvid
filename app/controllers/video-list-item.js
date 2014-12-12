import Ember from 'ember';
import User from '../models/user';

export default Ember.ObjectController.extend({
  dir: 0,

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

  postVote: function(direction) {
  	if(this.canVote()) {
	  var _this = this;
    
	  return Ember.$.ajax({
      	type: "POST",
	      url: "/oath-reddit/api/vote",
      	headers: {
        	"Authorization": "bearer " + User.access_token,
      	},
      	dataType: 'json',
      	data: { 
          dir: direction,
          id: this.get('id') 
        },
      }).then(function(){
      	 _this.set('dir', direction);
      }).fail(function(data) {
         if(data.statusText === "Unauthorized") {
          User.isLoggedIn = false;
            alert('your session has expired'); 
         } else {
            alert('error trying to vote');
         }
      });
  	}
  },

  actions: {
  	voteUp: function() {
  	  this.postVote(1);
  	},
  	voteDown: function() {
	    this.postVote(-1);
  	}
  }
});