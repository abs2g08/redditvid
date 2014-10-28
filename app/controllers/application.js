import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
  	  index: function() {
  	  	this.send('closeMenu');
  	  	this.transitionToRoute('index');
  	  },
  	  about: function() {
  	  	this.send('closeMenu');
  	  	this.transitionToRoute('about');
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
	  }
  }
});
