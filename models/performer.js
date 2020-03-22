/* Performer mongoose model */
const mongoose = require('mongoose')

const Performer = mongoose.model('Performer', {
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
    id: {
		type: Number,
		required: true,
		// default: 1
	}
})

module.exports = { Performer }