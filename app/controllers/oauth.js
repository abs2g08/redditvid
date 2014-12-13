import Ember from 'ember';
import config from '../config/environment';
import User from '../models/user';

export default Ember.ObjectController.extend({
  User: User,
  login: function() {
  	var options = this.authorizationModel();
    var url = "https://ssl.reddit.com/api/v1/authorize?client_id="+options.client_id+"&response_type="+options.response_type+"&state="+options.init_state+"&redirect_uri="+options.redirect_uri+"&duration="+options.duration+"&scope="+options.scope;
    window.location.assign(url);
  },

  logout: function() {
    this.User.clear();
	this.transitionToRoute('videos');
   },

  clearAuthUrl: function() {
    window.history.replaceState( {} , '', '/' );
  },

   getUserInfo: function() {
    var _this = this;

    return Ember.$.ajax({
      type: "GET",
      headers: {
        "Authorization": "bearer " + this.User.access_token,
      },
      dataType: 'json',
      url: '/oath-reddit/api/v1/me',
    }).then(function(data) {

      _this.User.name = data.name;
      _this.User.over_18 = data.over_18;
      _this.User.isLoggedIn = true;
      _this.User.comment_karma = data.comment_karma;
      
      _this.controllerFor('videos').set('user', _this.User);
      _this.clearAuthUrl();

    }).fail(function() {
      alert('error getting user details');
    });
   },

   makeid: function(len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i=0; i < len; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
   },

   authorizationModel: function() {
	  return {
		 client_id: 'NjCSqf0hIl2emQ',
		 init_state: this.makeid(5),
		 response_type: 'code',
		 duration: 'temporary',
		 redirect_uri: 'http://' + window.location.host,
		 scope: ['modposts',
			'identity',
			'edit',
			'flair',
			'history',
			'modconfig',
			'modflair',
			'modlog',
			'modposts', 
			'modwiki',
			'mysubreddits',
			'privatemessages',
			'read',
			'report', 
			'save',
			'submit',
			'subscribe',
			'vote',
			'wikiedit',
			'wikiread']
	 };
   },

   getAccessToken: function(params) {
   	var _this = this;
	var url = '/ssl-reddit/api/v1/access_token';

	return Ember.$.ajax({
	  type: "POST",
	  url: url,
	  headers: {
	    "Authorization": "Basic " + btoa(config.APP.REDDIT.client_id + ":" + ''),
	  },
	  dataType: 'json',
	  data: { 
	    grant_type: 'authorization_code', 
	    code: params.code,
	    redirect_uri: 'http://' + window.location.host,
	    state: params.state 
	  },
	}).then(function(data) {
	  _this.User.access_token = data.access_token;
	  return _this.getUserInfo();
	}).fail(function(){
	  alert('error trying to gain access token');
	});
   }
});