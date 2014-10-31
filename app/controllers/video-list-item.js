import Ember from 'ember';
// import DateMixin from '../mixins/date';

export default Ember.ObjectController.extend({
  postedAgo: function() {
  	var createdDate = moment.unix(this.get('created_utc'));
	return createdDate.fromNow();
  }.property('created_utc'),
});