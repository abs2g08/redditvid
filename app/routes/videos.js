import Ember from 'ember';
import SVGLoader from 'vendor/svgloader';

export default Ember.Route.extend({

  beforeModel: function() {
    if(!this.modelFor('index')) {
      this.loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 0, speedOut : 500 } );
      this.loader.show();
    }
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
      _this.loader.hide({ delay: 1000 });
    });
  },

  afterModel: function() {
    this.loader.hide({ delay: 1000 });
  }
});