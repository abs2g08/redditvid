import Ember from 'ember';

export default Ember.ObjectController.extend({

  //used for OAuth, NOTE: not very nice, would like to make Oauth more pluggable
  queryParams: ["state", "code"],
  state: null,
  code: null,
  //

  on: true,

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
    }
  }
});