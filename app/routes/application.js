import Ember from 'ember';
import OAuth from '../mixins/oauth';
import Speech from '../mixins/speech';

export default Ember.Route.extend(OAuth, Speech, {
	actions: {
		speech: function() {
			this.controller.set('on', this.toggleSpeechRouter());
	  }
	}
});