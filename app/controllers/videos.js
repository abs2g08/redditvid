import User from '../models/user';

export default Ember.ArrayController.extend({
  queryParams: {
    state: "state",
    code: "code"
  },
  state: null,
  code: null,
  itemController: 'video-list-item',
});