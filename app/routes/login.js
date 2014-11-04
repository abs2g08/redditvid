import Ember from 'ember';
import SVGLoader from '../mixins/svgloader';
import User from '../models/user';

export default Ember.Route.extend(SVGLoader, {

  init: function() {
    this.loaderOptions = { 
      speedIn : 0,
      speedOut : 0,
      delay : 500
    };
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
      redirect_uri: 'http://0.0.0.0:4200/login',
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
    }
  },

  post: function(params) {
    return $.ajax({
      type: "POST",
      url: "https://ssl.reddit.com/api/v1/access_token",
      headers: {
        "Authorization": "Basic " + btoa('NjCSqf0hIl2emQ' + ":" + ''),
      },
      dataType: 'json',
      data: { grant_type: 'authorization_code', code: params.code, redirect_uri: 'http://0.0.0.0:4200/login', state: params.state },
    }).then(function(data){
      User.access_token = data.access_token;
    });
  },

  model: function(params) {
    debugger;
    if(params.state && params.code) {
      return this.post(params).then(function(){
        User.isLoggedIn = true;
      });
    } else {
      return this.authorizationModel();
    }
  }
});