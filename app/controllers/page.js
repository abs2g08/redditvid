import Ember from 'ember';

export default Ember.ObjectController.extend({
  costMoney: function() {
  	return ('£' + this.get('cost'));
  }.property('costMoney'),

  actions: {

  }
});