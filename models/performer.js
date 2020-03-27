/* Performer mongoose model */
/* Vanilla */
const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    place: String,
    date: String
});

// Events will be embedded in the Performer model
const PerformerSchema = new mongoose.Schema({
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
	genre: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	bookings: [BookingSchema]
})

const Performer = mongoose.model('Performer', PerformerSchema);

module.exports = { Performer }