import Ember from 'ember';
import SVGLoader from '../mixins/svgloader';

export default Ember.Route.extend(SVGLoader, {

  init: function() {
    this.loaderOptions = { 
      speedIn : 0,
      speedOut : 500,
      delay : 1000
    };
  },

  model: function() {
    var _this = this;
    return Ember.$.getJSON('http://www.reddit.com/r/videos.json').then(function(data) {
      return data.data.children.map(function(rawItem, index) {
        var item = {};
        item.title = rawItem.data.title;
        item.author = rawItem.data.author;
        item.score = rawItem.data.score;
        item.created_utc = rawItem.data.created_utc;
        item.id = rawItem.data.id;
        item.media_embed = rawItem.data.media_embed.content;
        return item;
      });
    }).fail(function(){
      _this.loader.hide();
    });
  },

  actions: {
    refreshData: function() {
      this.refresh();
    }
  }
});