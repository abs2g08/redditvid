import Ember from 'ember';
import SVGLoader from '../mixins/svgloader';
import User from '../models/user';
import config from '../config/environment';

export default Ember.Route.extend(SVGLoader, {

  init: function() {
    this.loaderOptions = { 
      speedIn : 0,
      speedOut : 500,
      delay : 1000
    };
  },

  clearAuthUrl: function() {
      window.history.replaceState( {} , '', '/' );
  },

  resetController: function (controller, isExiting, transition) {
    //clear query params when leaving route, otherwise they hang around
    if (isExiting) {
      controller.set('state', null);
      controller.set('code', null);
    }
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
      User.access_token = data.access_token;
      return _this.getUserInfo();
    }).fail(function(){
      alert('error trying to gain access token');
      _this.loader.hide();
    });
  },

  getUserInfo: function() {
    var _this = this;
    
    return Ember.$.ajax({
      type: "GET",
      headers: {
        "Authorization": "bearer " + User.access_token,
      },
      dataType: 'json',
      url: '/oath-reddit/api/v1/me',
    }).then(function(data) {

      User.name = data.name;
      User.over_18 = data.over_18;
      User.isLoggedIn = true;
      User.comment_karma = data.comment_karma;
      
      _this.controllerFor('videos').set('user', User);
      _this.clearAuthUrl();

    }).fail(function() {
      alert('error getting user details');
    });
  },

  getVideos: function() {
    var _this = this;
    var url = 'http://www.reddit.com/r/videos.json';

    return Ember.$.getJSON(url).then(function(data) {
      return data.data.children.map(function(rawItem) {
        var item = {};
        item.title = rawItem.data.title;
        item.author = rawItem.data.author;
        item.score = rawItem.data.score;
        item.created_utc = rawItem.data.created_utc;
        item.id = rawItem.data.id;

        item.media_embed = rawItem.data.media_embed.content;
        item.url = rawItem.data.url;
        return item;
      });
    }).fail(function() {
      alert('there was an error getting the videos');
      _this.loader.hide();
    });    
  },

  model: function(params) {
    var _this = this;
    if(params.state && params.code && !User.isLoggedIn) {
      debugger;
      return this.getAccessToken(params).then(function() {
        return _this.getVideos();
      });
    } else {
      return _this.getVideos();
    }
  },

  actions: {
    refreshData: function() {
      this.refresh();
    }
  }
});