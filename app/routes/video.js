import Ember from 'ember';
import SVGLoader from 'vendor/svgloader';

export default Ember.Route.extend({

  renderTemplate: function() {
    this._super(this, arguments);
  	// this.render('components/comments', {
   //    outlet: 'comments',
   //    into: 'page',
   //  });    
  },

  beforeModel: function() {
  	if(!this.modelFor('video')) {
	    this.loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 0, speedOut : 0 } );
	    this.loader.show();
  	}
  },

  model: function(params) {
    var _this = this;
    return Ember.$.getJSON('http://www.reddit.com/r/videos/comments/'+params.id+'.json').then(function(rawData) {
    	var item = {};
    	var video_data = rawData[0].data.children[0].data;
    	item.media_embed = video_data.media_embed.content;
    	item.title = video_data.title;
    	item.comments = rawData[1].data.children.map(function(rawComment, index) {
    		var comment = {};
    		comment.text = rawComment.data.body;
    		comment.author = rawComment.data.author;
    		return comment;
    	});
    	return item;
    }).fail(function(){
      _this.loader.hide({ delay: 1000 });
    });
  },

  afterModel: function() {
      this.loader.hide({ delay: 1000 });
  },

  actions: {
  	showComments: function() {
  		this.render('components/comments', {
      		outlet: 'comments',
      		into: 'video',
    	});
  	}
  }
});