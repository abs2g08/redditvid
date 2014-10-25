import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value, format) {
  return Ember.moment(value).format(format);
});