import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.$.getJSON('http://www.reddit.com/r/videos.json').then(function(data) {
      return data.data.children.map(function(rawItem, index){
        var item = {};
        item.title = rawItem.data.title;
        item.body = 'test';
        item.date = 'Tue Sep 02 2014 13:29:52 GMT+0100 (BST)';
        item.id = index;
        item.media_embed = rawItem.data.media_embed.content;
        return item;
      });
    });
  }
});