import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value) {
  return new Ember.Handlebars.SafeString(Ember.$.parseHTML(value)[0].data);
});