import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value) {
  try {
  	return moment.unix(value).fromNow();
  } catch(err) {
  	alert('error creating date');
  }
});