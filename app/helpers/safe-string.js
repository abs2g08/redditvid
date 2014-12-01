import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value) {
  try {
  	return new Ember.Handlebars.SafeString(Ember.$.parseHTML(value)[0].data);
  } catch(err) {
  	debugger;
  	alert('error parsing video');
  }
});