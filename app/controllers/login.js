import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
  	login: function() {
      this.controllerFor('oauth').login();
    },
    logout: function() {
      this.controllerFor('oauth').logout();
    },
  }
});