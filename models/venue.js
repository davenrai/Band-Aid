/* Venue mongoose model */
const mongoose = require('mongoose')

// Events will be embedded in the Venue model
// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const BookingSchema = new mongoose.Schema({
    place: String,
    date: String
});

const VenueSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	location: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	phone: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
    },
    description: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	bookings: [BookingSchema]
})

const Venue = mongoose.model('Venue', VenueSchema);

module.exports = { Venue }