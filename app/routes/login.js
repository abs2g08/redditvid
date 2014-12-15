import Ember from 'ember';
import SVGLoader from '../mixins/svgloader';

export default Ember.Route.extend(SVGLoader, {
  init: function() {
    this.loaderOptions = { 
      speedIn : 0,
      speedOut : 0,
      delay : 500
    };
  }
});