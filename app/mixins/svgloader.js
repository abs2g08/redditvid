import Ember from 'ember';
import SVGLoader from 'vendor/svgloader';

export default Ember.Mixin.create({
	loaderOptions: {},

	miniLoader: function(type) {
		this.loader = new SVGLoader( document.getElementById( 'loader' ), this.loaderOptions );
		this.loader[type]({miniLoader: true});
	},

	showMiniLoader: function() {
		this.miniLoader('show');
	},

	hideMiniLoader: function() {
		this.miniLoader('hide');	
	},

	beforeModel: function() {
		if(!this.modelFor(this.loaderOptions.modelName)) {
			this.loader = new SVGLoader( document.getElementById( 'loader' ), this.loaderOptions );
			this.loader.show();
	  }
	},

	afterModel: function() {
  	this.loader.hide();
	}
});