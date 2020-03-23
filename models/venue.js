/* Student mongoose model */
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    place: String,
    date: String
});

// Reservations will be embedded in the Restaurant model
const VenueSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		// default: 1
	},
	name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	Venue_type: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
    events: [EventSchema]
});

const Venue = mongoose.model('Venue', VenueSchema);

module.exports = { Venue }