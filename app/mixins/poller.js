import Ember from 'ember';

export default Ember.Mixin.create({
  pollStarted: false,
  interval: 3300000,
  //interval: 10000,

  // Schedules the function `f` to be executed every `interval` time.
  schedule: function(f) {
    return Ember.run.later(this, function() {
      f.apply(this);
      this.set('timer', this.schedule(f));
    }, this.get('interval'));
  },

  // Stops the pollster
  stop: function() {
    Ember.run.cancel(this.get('timer'));
  },

  // Starts the pollster, i.e. executes the `onPoll` function every interval.
  start: function() {
  	if(!this.get('pollStarted')) {
    	this.set('timer', this.schedule(this.get('onPoll')));
    	this.set('pollStarted', true);
  	}
  },

  onPoll: function() {
    // will be overwritten by mixin
  }
});