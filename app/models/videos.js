import Ember from 'ember';

export default Ember.Object.extend({
	fetch: function(options) {
	    return Ember.$.getJSON('http://www.reddit.com/r/videos.json').then(function(data) {
	      return data.data.children.map(function(rawItem, index) {
	        var item = {};
	        item.title = rawItem.data.title;
	        item.author = rawItem.data.author;
	        item.score = rawItem.data.score;
	        item.created_utc = rawItem.data.created_utc;
	        item.id = rawItem.data.id;
	        item.media_embed = rawItem.data.media_embed.content;

	        //TO-DO: got to figure out the options.context version of this

	    	if(options.context) {
	    		Ember.$.each(item, function(key, value) {
	    			options.context.set(key, value);
	    		});
	    	}

	        return item;
	      });
	    });
	}
});