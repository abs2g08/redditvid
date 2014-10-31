import Ember from 'ember';
import SVGLoader from 'vendor/svgloader';
import VideoModel from '../models/video';

export default Ember.Route.extend({

  modelObj: VideoModel.create(),
  beforeModel: function() {
  	if(!this.modelFor('video')) {
	    this.loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 0, speedOut : 0 } );
	    this.loader.show();
  	}
  },

  model: function(params) {
    var _this = this;
    return this.get('modelObj').fetch({ id: params.id }).fail(function() {
      _this.loader.hide({ delay: 1000 });
    });
  },

  afterModel: function() {
    this.loader.hide({ delay: 1000 });
  },

  renderComments: function() {
    this.render('components/comments', {
      outlet: 'comments',
      into: 'video',
    });
  },

  actions: {
    showComments: function() {
      var _this = this;
      if(!this.modelFor('video').comments) {
        this.modelObj.fetch({ id: this.controller.get('id'), context: this.controller }).then(function() {
          _this.renderComments();
        });
      } else {
        _this.renderComments();
      }
    }
  }
});