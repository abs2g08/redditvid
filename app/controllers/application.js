import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
  	  videos: function() {
  	  	this.send('closeMenu');
  	  	this.transitionToRoute('videos');
  	  },
  	  about: function() {
  	  	this.send('closeMenu');
  	  	this.transitionToRoute('about');
  	  },
  	  login: function() {
  	  	this.send('closeMenu');
  	  	this.transitionToRoute('login');
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