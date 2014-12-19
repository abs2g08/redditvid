import Ember from 'ember';
import SVGLoader from '../mixins/svgloader';

export default Ember.Route.extend(SVGLoader, {
  init: function() {
    this.loaderOptions = { 
      speedIn : 0,
      speedOut : 500,
      delay : 5000
    };
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
      alert('There was an error getting the videos');
      _this.loader.hide();
    });    
  },

  model: function() {
    return this.getVideos();
  },

  actions: {
    refreshData: function() {
      this.refresh();
    }
  }
});