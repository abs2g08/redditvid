import User from '../models/user';

export default Ember.ArrayController.extend({
  queryParams: {
    state: "state",
    code: "code"
  },
  state: null,
  code: null,

  // post: function(params) {
  //   //var url = 'https://ssl.reddit.com/api/v1/access_token';
  //   var url = '/ssl-reddit/api/v1/access_token';
  //   return $.ajax({
  //     type: "POST",
  //     url: url,
  //     headers: {
  //       "Authorization": "Basic " + btoa('NjCSqf0hIl2emQ' + ":" + ''),
  //     },
  //     dataType: 'json',
  //     data: { 
  //       grant_type: 'authorization_code', 
  //       code: params.code,
  //       redirect_uri: 'http://' + window.location.host,
  //       state: params.state 
  //     },
  //   }).then(function(data){
  //     User.access_token = data.access_token;
  //   }).fail(function(){
  //     alert('error trying to gain access token');
  //   });
  // },

  // setStateAndCode: function() {
  // 	var params = {
  // 		state: this.get('state'),
  // 		code: this.get('code')
  // 	};
  //   debugger;
  //   this.post(params).then(function() {
  //       User.isLoggedIn = true;
  //   });

  // }.property('state', 'code'),
  itemController: 'video-list-item',
});