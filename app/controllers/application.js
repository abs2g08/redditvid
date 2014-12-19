import Ember from 'ember';
import user from '../models/user';

export default Ember.ObjectController.extend({
  queryParams: ["state", "code"],
  state: null,
  code: null,   
  actions: {
  	  videos: function() {
  	  	this.send('closeMenu');
  	  	this.transitionToRoute('videos', {queryParams: {state: null, code: null}});
  	  },
  	  about: function() {
  	  	this.send('closeMenu');
  	  	this.transitionToRoute('about', {queryParams: {state: null, code: null}});
  	  },
  	  login: function() {
  	  	this.send('closeMenu');
  	  	this.transitionToRoute('login', {queryParams: {state: null, code: null}});
  	  },
	  closeMenu: function() {
	  	Ember.$('body').removeClass('open');
	  	Ember.$('.app-bar').removeClass('open');
	  	Ember.$('.navdrawer-container').removeClass('open');
	  	Ember.$('.navdrawer-container').addClass('opened');
	  },
	  toggleMenu: function () {
	  	Ember.$('body').toggleClass('open');
	  	Ember.$('.app-bar').toggleClass('open');
	  	Ember.$('.navdrawer-container').toggleClass('open');
	  	Ember.$('.navdrawer-container').addClass('opened');
	  },
  }
});