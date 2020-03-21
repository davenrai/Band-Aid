/* server.js, with mongodb API and static directories */
'use strict';
const log = console.log
const path = require('path')

const express = require('express')
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')

// import the mongoose models
const { Performer } = require('./models/performer')
const { Venue } = require('./models/venue')

// to validate object IDs
const { ObjectID } = require('mongodb')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())


/*** Webpage routes below **********************************/

// static js directory
app.use("/js", express.static(path.join(__dirname, '/public/js')))

// route for root
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/dashboard.html'))
})

/*********************************************************/

/*** API Routes below ************************************/

/** Performer resource routes **/
// a POST route to *create* a performer
app.post('/performers', (req, res) => {
	// log(req.body)

	// Create a new performer using the Performer mongoose model
	const performer = new Performer({
		name: req.body.name,
		year: req.body.year
	})

	// Save performer to the database
	performer.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})

// a GET route to get all performers
app.get('/performers', (req, res) => {
	Performer.find().then((performers) => {
		res.send({ performers }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
})

/// a GET route to get a performer by their id.
// id is treated as a wildcard parameter, which is why there is a colon : beside it.
// (in this case, the database id, but you can make your own id system for your project)
app.get('/performers/:id', (req, res) => {
	/// req.params has the wildcard parameters in the url, in this case, id.
	// log(req.params.id)
	const id = req.params.id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// Otherwise, findById
	Performer.findById(id).then((performer) => {
		if (!peformer) {
			res.status(404).send()  // could not find this performer
		} else {
			/// sometimes we wrap returned object in another object:
			//res.send({performer})   
			res.send(performer)
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})

})

/// a DELETE route to remove a performer by their id.
app.delete('/performer/:id', (req, res) => {
	const id = req.params.id

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}

	// Delete a performer by their id
	Performer.findByIdAndRemove(id).then((performer) => {
		if (!performer) {
			res.status(404).send()
		} else {   
			res.send(performer)
		}
	}).catch((error) => {
		res.status(500).send() // server error, could not delete.
	})
})

// a PATCH route for changing properties of a resource.
// (alternatively, a PUT is used more often for replacing entire resources).
app.patch('/performers/:id', (req, res) => {
	const id = req.params.id

	// get the updated name and genre only from the request body.
	// const { name, genre } = req.body
	// const body = { name, genre }

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}

	// Update the perforer by their id.
	Performer.findByIdAndUpdate(id, {$set: body}, {new: true}).then((performer) => {
		if (!performer) {
			res.status(404).send()
		} else {   
			res.send(performer)
		}
	}).catch((error) => {
		res.status(400).send() // bad request for changing the performer.
	})

})


/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 

