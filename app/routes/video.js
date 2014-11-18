import Ember from 'ember';
import SVGLoader from '../mixins/svgloader';
import User from '../models/user';

export default Ember.Route.extend(SVGLoader, {
  text: null,

  init: function() {
    this.loaderOptions = { 
      speedIn : 0,
      speedOut : 0,
      delay : 500
    };
  },

  fetch: function(options) {
    this.showMiniLoader();
    return Ember.$.getJSON('http://www.reddit.com/r/videos/comments/' + options.id + '.json').then(function(rawData) {
      var item = {};
      var video_data = rawData[0].data.children[0].data;

      item.id = options.id;
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

  post: function() {
    var _this = this;
    return Ember.$.ajax({
      type: "POST",
      url: "/oath-reddit/api/comment",
      headers: {
        "Authorization": "bearer " + User.access_token,
      },
      dataType: 'json',
      data: { 
        api_type: "json",
        //see http://www.reddit.com/dev/api#fullnames
        thing_id: 't3_' + this.controller.get('id'),
        text: this.controller.get('text')
      },
    }).then(function() {
      alert('your comment has been posted');
      _this.controller.set('text', '');
    }).fail(function(data) {
      if(data.statusText === "Unauthorized") {
        User.isLoggedIn = false;
        alert('your session has expired'); 
      }
    }).always(function() {
      _this.hideMiniLoader();
    });
  },

  canPostComment: function() {
    if(User.isLoggedIn) {
      if(this.modelFor('video').text !== '') {
        return true;
      } else {
        alert('you must enter some text before you post');
      }
    } else {
      alert('you must be logged in to comment');
    }
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

  deactivate: function() {
    this.controller.set('showingComments', false);
  },

  actions: {
    showComments: function() {
      this.controller.set('showingComments', true);
      var _this = this;
      this.fetch({
        id: this.controller.get('id'),
        context: this.controller 
      }).then(function() {
        _this.hideMiniLoader();
        _this.renderComments();
      });
    },
    postComment: function() {
      if(this.canPostComment()) {
        this.showMiniLoader();
        this.post();
      }
    }
  }
});