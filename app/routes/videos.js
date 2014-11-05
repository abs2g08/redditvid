import Ember from 'ember';
import SVGLoader from '../mixins/svgloader';
import User from '../models/user';

export default Ember.Route.extend(SVGLoader, {

  init: function() {
    this.loaderOptions = { 
      speedIn : 0,
      speedOut : 500,
      delay : 1000
    };
  },

  post: function(params) {
    //var url = 'https://ssl.reddit.com/api/v1/access_token';
    var url = '/ssl-reddit/api/v1/access_token';
    return $.ajax({
      type: "POST",
      url: url,
      headers: {
        "Authorization": "Basic " + btoa('NjCSqf0hIl2emQ' + ":" + ''),
      },
      dataType: 'json',
      data: { 
        grant_type: 'authorization_code', 
        code: params.code,
        redirect_uri: 'http://' + window.location.host,
        state: params.state 
      },
    }).then(function(data){
      User.access_token = data.access_token;
    }).fail(function(){
      alert('error trying to gain access token');
    });
  },

  model: function(params) {
    var _this = this;
    var url = 'http://www.reddit.com/r/videos.json';
    // var url = '/reddit-cors-proxy/r/videos.json';

    if(params.state && params.code) {
      this.post(params).then(function() {
        User.isLoggedIn = true;
      });
    }

    return Ember.$.getJSON(url).then(function(data) {
      return data.data.children.map(function(rawItem, index) {
        var item = {};
        item.title = rawItem.data.title;
        item.author = rawItem.data.author;
        item.score = rawItem.data.score;
        item.created_utc = rawItem.data.created_utc;
        item.id = rawItem.data.id;
        item.media_embed = rawItem.data.media_embed.content;
        return item;
      });
    }).fail(function(){
      _this.loader.hide();
    });
  },

  actions: {
    refreshData: function() {
      this.refresh();
    }
  }
});