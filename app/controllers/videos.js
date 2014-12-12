import Ember from 'ember';
// If this controller doesn't exist, 
// videos router would not pass 'state' or 'code' into 'function: model(params)'

export default Ember.ArrayController.extend({
  queryParams: ["state", "code"],
  user: null,
  state: null,
  code: null,
  itemController: 'video-list-item',
});