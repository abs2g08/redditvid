import Ember from 'ember';

export default Ember.Mixin.create({
	durationAgoStringifyer: function(date1, date2) {
		var fromNowDate = date1.fromNow();
		var fromNowArray = [{ "seconds" : fromNowDate.second() }, { "minutes" : fromNowDate.minute() }, { "hours" : fromNowDate.hours() }];
		var fromNowDate = Ember.$.each(fromNowArray, function(unit, value) {
			if(value > 0) return value + " " + unit + " ago";
		});
		return fromNowDate;
	}
});