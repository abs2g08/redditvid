import Ember from 'ember';
import SVGLoader from '../mixins/svgloader';

export default Ember.Route.extend(SVGLoader, {

  init: function() {
    this.loaderOptions = { 
      speedIn : 0,
      speedOut : 0,
      delay : 500
    };
  },

  fetch: function(options) {
    this.showMiniLoader();
    return Ember.$.getJSON('http://www.reddit.com/r/videos/comments/'+options.id+'.json').then(function(rawData) {
      var item = {};
      var video_data = rawData[0].data.children[0].data;

      item.media_embed = video_data.media_embed.content;
      item.title = video_data.title;
      item.comments = rawData[1].data.children.map(function(rawComment) {
        var comment = {};
        comment.text = rawComment.data.body;
        comment.author = rawComment.data.author;
        return comment;
      });

      if(options.context) {
        Ember.$.each(item, function(key, value) {
          options.context.set(key, value);
        });
      }

      return item;
    });
  },

  model: function(params) {
    var _this = this;
    return this.fetch({ id: params.id }).fail(function() {
      _this.loader.hide();
    });
  },

  renderComments: function() {
    this.render('components/comments', {
      outlet: 'comments',
      into: 'video',
    });
  },

  actions: {
    showComments: function() {
      var _this = this;
      if(!this.modelFor('video').comments) {
        this.fetch({
          id: this.controller.get('id'),
          context: this.controller 
        }).then(function() {
          _this.hideMiniLoader();
          _this.renderComments();
        });
      } else {
        _this.renderComments();
      }
    }
  }
});