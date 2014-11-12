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

  model: function() {
    if(User.isLoggedIn) {
      return User;
    }
    return this.authorizationModel();
  }
});