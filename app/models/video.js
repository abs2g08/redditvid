import Ember from 'ember';

export default Ember.Object.extend({
	fetch: function(options) {
	    return Ember.$.getJSON('http://www.reddit.com/r/videos/comments/'+options.id+'.json').then(function(rawData) {
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

	    	if(options.context) {
	    		Ember.$.each(item, function(key, value) {
	    			options.context.set(key, value);
	    		});
	    	}
	    	return item;
	    });
	}
});