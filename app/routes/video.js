import Ember from 'ember';
import SVGLoader from '../mixins/svgloader';
import user from '../models/user';

export default Ember.Route.extend(SVGLoader, {
  text: null,

  init: function() {
    this.loaderOptions = { 
      speedIn : 0,
      speedOut : 0,
      delay : 500
    };
  },

  buildReplyTree: function(nextRawReplyData, lastReply) {

    //create promise for each level of tree
    var promise = new Ember.$.Deferred();

    //if we hit a dead end of the tree
    if(typeof nextRawReplyData === 'undefined' || nextRawReplyData === "") {
      return promise.resolve();
    } else {

      var _this = this;
      return Ember.$.when(nextRawReplyData.data.children.map(function(rawData) {
        var rawReply = rawData.data;

        //if we hit a dead end of the tree
        if (typeof rawReply.author === 'undefined' && typeof rawReply.text === 'undefined') {
          return promise.resolve();
        }

        var reply = {};
        reply.author = rawReply.author;
        reply.text = rawReply.body;
        reply.text_html = rawReply.body_html;
        reply.created_utc = rawReply.created_utc;
        reply.score = rawReply.score;

        lastReply.replies = lastReply.replies || [];
        lastReply.replies.push(reply);
        
        //NOTE: setTimeout is used to avoid potential stack overflow.
        return setTimeout((function() { return _this.buildReplyTree(rawReply.replies, reply); }), 0);
      }));
    }
  },

  fetchComments: function(options) {
    this.showMiniLoader();
    
    var _this = this;
    return Ember.$.getJSON('http://www.reddit.com/r/videos/comments/' + options.id + '.json').then(function(rawData) {
      var item = {};
      var video_data = rawData[0].data.children[0].data;

      item.id = options.id;
      item.media_embed = video_data.media_embed.content;
      item.title = video_data.title;

      var comment = {};
      return _this.buildReplyTree(rawData[1], comment).then(function() {
        item.comments = comment.replies;
        return item;
      });
    });
  },

  postComment: function() {
    var _this = this;
    return Ember.$.ajax({
      type: "POST",
      url: "/oath-reddit/api/comment",
      headers: {
        "Authorization": "bearer " + user.access_token,
      },
      dataType: 'json',
      data: { 
        api_type: 'json',
        //see http://www.reddit.com/dev/api#fullnames
        thing_id: 't3_' + this.controller.get('id'),
        text: this.controller.get('text')
      },
    }).then(function() {
      alert('Your comment has been posted');
      _this.controller.set('text', '');
    }).fail(function(data) {
      if(data.statusText === 'Unauthorized') {
        user.isLoggedIn = false;
        alert('Your session has expired');
        _this.controllerFor('oauth').login();
      }
    }).always(function() {
      _this.hideMiniLoader();
    });
  },

  canPostComment: function() {
    if(user.isLoggedIn) {
      if(this.modelFor('video').text !== '') {
        return true;
      } else {
        alert('You must enter some text before you post');
      }
    } else {
      alert('You must be logged in to comment');
    }
  },

  model: function(params) {
    var _this = this;
    return this.fetchComments({ id: params.id }).fail(function() {
      _this.loader.hide();
    });
  },

  renderComments: function() {
    var commentsController = this.controllerFor('comments');
    commentsController.set('model', this.controller.get('comments'));

    this.render('components/comments', {
      outlet: 'comments',
      into: 'video',
      controller: commentsController
    });
  },

  deactivate: function() {
    this.controller.set('showingComments', false);
  },

  actions: {
    showComments: function() {
      var _this = this;
      if(this.controller.get('showingComments')) {

        //frefresh comments from server
        this.fetchComments({
          id: this.controller.get('id'),
          context: this.controller 
        }).then(function() {
          _this.hideMiniLoader();
          _this.renderComments();
        });        
      } else {
        this.controller.set('showingComments', true);
        _this.renderComments();        
      }
    },
    postComment: function() {
      if(this.canPostComment()) {
        this.showMiniLoader();
        this.postComment();
      }
    }
  }
});