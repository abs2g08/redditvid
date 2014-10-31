import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value, options) {
  return moment.unix(value).format("HH:MM:SS");
});