import Ember from 'ember';

export default Ember.Mixin.create({
  unknownProperty: function(key) {
    return localStorage[key];
  },

  setUnknownProperty: function(key, value) {
    localStorage[key] = value;
    this.notifyPropertyChange(key);
    return value;
  }
});