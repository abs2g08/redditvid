import Ember from 'ember';

export default Ember.Object.extend({
	fetch: function(options) {
		var context;
		if(!context in options) {
			context = this;
		} else {
			context = options.context;
		}
	    return Ember.$.getJSON('http://www.reddit.com/r/videos/comments/'+options.id+'.json').then(function(rawData) {
	    	var video_data = rawData[0].data.children[0].data;
	    	context.set('media_embed', video_data.media_embed.content);
	    	context.set('title', video_data.title);
	    	context.set('comments', rawData[1].data.children.map(function(rawComment, index) {
	    		var comment = {};
	    		comment.text = rawComment.data.body;
	    		comment.author = rawComment.data.author;
	    		return comment;
	    	}));
	    });
	}
});