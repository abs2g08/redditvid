import Ember from 'ember';
import SVGLoader from '../mixins/svgloader';
import User from '../models/user';

export default Ember.Route.extend(SVGLoader, {
  init: function() {
    this.loaderOptions = { 
      speedIn : 0,
      speedOut : 500,
      delay : 1000
    };
  },

  resetController: function (controller, isExiting) {
    //clear query params when leaving route, otherwise they hang around
    if (isExiting) {
      controller.set('state', null);
      controller.set('code', null);
    }
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
      return _this.controllerFor('oauth').getAccessToken(params).then(function() {
        return _this.getVideos();
      }).fail(function() {
        _this.loader.hide();
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