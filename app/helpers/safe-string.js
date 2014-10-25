import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value) {
  //var escaped = Handlebars.Utils.escapeExpression(value);
  return new Ember.Handlebars.SafeString(Ember.$.parseHTML(value)[0].data);
});