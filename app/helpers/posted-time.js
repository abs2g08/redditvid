import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value) {
  return Ember.moment.unix(value).format("HH:MM:SS");
});