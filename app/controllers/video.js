import Ember from 'ember';

export default Ember.ObjectController.extend({
  getComments: function() {
  	var createdDate = moment.unix(this.get('created_utc'));
	return createdDate.fromNow();
  }.property('comments'),

  // actions: {
  // 	showComments: function() {
  // 		var _this = this;
  // 		this.get('modelObj').fetch({ id: this.get('id'), context: this }).then(function() {
	 //  		_this.render('components/comments', {
	 //            outlet: 'comments',
	 //            into: 'video',
	 //        });
  // 		});
  // 	}
  // }
});