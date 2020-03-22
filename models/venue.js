/* Venue mongoose model */
const mongoose = require('mongoose')

const Venue = mongoose.model('Venue', {
	name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	type: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
    },
    id: {
		type: Number,
		required: true,
		// default: 1
	}
})

module.exports = { Venue }