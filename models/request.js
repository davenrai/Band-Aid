/* Request model */
'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// a Mongoose Schema
const RequestSchema = new mongoose.Schema({
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
    }
});

// RequestSchema.pre('save', function(next) {
// 	const user = this; // binds this to User document instance
// 	// checks to ensure we don't hash password more than once
// 	next();
// })

// make a model using the Request schema
const Request = mongoose.model('Request', RequestSchema);
module.exports = {
    Request
};