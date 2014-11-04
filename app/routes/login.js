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

  makeid: function() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i=0; i < 5; i++ ) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
  },

  model: function(params) {
    var msg = '';

    if(params.state) {
      msg = 'You are now logged in. This means you can up/down vote Reddit videos!';
      User.isLoggedIn = true;
    }
    
  	return {
      client_id: 'NjCSqf0hIl2emQ',
      init_state: this.makeid(),
      response_type: 'code',
      redirect_uri: 'http://0.0.0.0:4200/login',
      duration: 'temporary',
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
              'wikiread'],
        message: msg,
    }
  }
});