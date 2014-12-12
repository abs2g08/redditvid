import Ember from 'ember';
import User from '../models/user';

export default Ember.ObjectController.extend({
  actions: {
  	login: function() {
      var _this = this;
      var url = "https://ssl.reddit.com/api/v1/authorize?client_id="+_this.get('client_id')+"&response_type="+_this.get('response_type')+"&state="+_this.get('init_state')+"&redirect_uri="+_this.get('redirect_uri')+"&duration="+_this.get('duration')+"&scope="+_this.get('scope');
      window.location.assign(url);
    },
    logout: function() {
    	User.clear();
    	this.transitionToRoute('videos');
    }
  }
});