import User from '../models/user';

// If this controller doesn't exist, 
// videos router does not pass 'state' or 'code' into 'function: model(params)'

export default Ember.ArrayController.extend({
  queryParams: {
    state: "state",
    code: "code"
  },
  state: null,
  code: null,
  itemController: 'video-list-item',
});