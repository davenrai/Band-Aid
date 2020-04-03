/* Booking model */
'use strict';
const mongoose = require('mongoose');

// a Mongoose Schema for bookings
const BookingSchema = new mongoose.Schema({
	venuename: {
		type: String,
		required: true,
		minlength: 1
	},
	location: {
		type: String,
		required: true,
		minlength: 1
	},
	phone: {
		type: String,
		required: true,
		minlength: 1
	},
	description: {
		type: String,
		required: true,
		minlength: 1
	},
	applications: [String] // array of performer usernames
});


// make a model using the Booking schema
const Booking = mongoose.model('Booking', BookingSchema);
module.exports = { Booking };