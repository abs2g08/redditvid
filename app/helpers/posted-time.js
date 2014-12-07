import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value) {
  try {
  return Ember.moment.unix(value).format("HH:MM:SS");
  } catch (err) {
  	alert('error parsing date');
  }
});