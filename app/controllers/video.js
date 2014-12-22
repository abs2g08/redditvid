import Ember from 'ember';

export default Ember.ObjectController.extend({
  showingComments: false,
  commentsBtnText: function() {
    if(this.get('showingComments')) {
      return 'refresh comments';
	} else {
	  return 'show comments';
	}
  }.property('showingComments')
});