import Ember from 'ember';

export default Ember.ObjectController.extend({
  getComments: function() {
  	var createdDate = Ember.moment.unix(this.get('created_utc'));
	return createdDate.fromNow();
  }.property('comments'),
});