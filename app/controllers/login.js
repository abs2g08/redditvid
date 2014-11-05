import Ember from 'ember';

export default Ember.ObjectController.extend({
  // queryParams: {
  //   state: "state",
  //   code: "code"
  // },
  // state: null,
  // code: null,
  actions: {
  	login: function() {
      var _this = this;
      var url = "https://ssl.reddit.com/api/v1/authorize?client_id="+_this.get('client_id')+"&response_type="+_this.get('response_type')+"&state="+_this.get('init_state')+"&redirect_uri="+_this.get('redirect_uri')+"&duration="+_this.get('duration')+"&scope="+_this.get('scope');
      window.location.assign(url);
    }
  }
});