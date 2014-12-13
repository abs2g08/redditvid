import Ember from 'ember';
import User from '../models/user';

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