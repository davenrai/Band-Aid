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

// express-session for managing user sessions
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }));




/*** Session handling **************************************/
// Create a session cookie
app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000,
        httpOnly: true
    }
}));

// Our own express middleware to check for 
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/dashboard'); // redirect to dashboard if logged in.
    } else {
        next(); // next() moves on to the route.
    }    
};


// Middleware for authentication of resources
const authenticate = (req, res, next) => {
	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			if (!user) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized")
		})
	} else {
		res.status(401).send("Unauthorized")
	}
}




/*** Webpage routes below **********************************/

// static js directory
app.use("/js", express.static(path.join(__dirname, '/public/js')))

// route for root
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/dashboard.html'))
})

// // static js directory
// app.use("/js", express.static(__dirname + '/public/js'))

// static img directory
app.use("/img", express.static(__dirname + '/public/img'))



/** User routes below **/
// Set up a POST route to *create* a user of your web app (*not* a performer).
app.post('/users', (req, res) => {
	log(req.body)

	// Create a new user
	const user = new User({
		email: req.body.email,
		password: req.body.password
	})

	// Save the user
	user.save().then((user) => {
		res.send(user)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})


// sessionChecker will run before the route handler and check if we are
// logged in, ensuring that we go to the dashboard if that is the case.

// The various redirects will ensure a proper flow between login and dashboard
// pages so that users have a proper experience on the front-end.


// route for root: should redirect to login route
app.get('/', sessionChecker, (req, res) => {
	res.redirect('/login')
})


// A route to login and create a session
app.post("/users/login", sessionChecker, (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    log(email, password);
    // Use the static method on the User model to find a user
    // by their email and password
    User.findByEmailPassword(email, password)
        .then(user => {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.email = user.email;
			// res.send({ currentUser: user.email });
			res.redirect('/dashboard');
        })
        .catch(error => {
			// res.status(400).send()
			res.status(400).redirect('/login');
        });
});


// dashboard route will check if the user is logged in and server
// the dashboard page
app.get('/dashboard', (req, res) => {
	if (req.session.user) {
		res.sendFile(__dirname + '/public/dashboard.html')
	} else {
		res.redirect('/login')
	}
})

// ****** OR this one ??????????????????????????

// A route to check if a use is logged in on the session cookie
app.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ currentUser: req.session.email });
    } else {
        res.status(401).send();
    }
});


// A route to logout a user
app.get('/users/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})




/*********************************************************/
/*** API Routes below ************************************/

/** Performer resource routes **/

// a POST route to *create* a performer
app.post('/performers', authenticate, (req, res) => {
	// log(req.body)

	// Create a new performer using the Performer mongoose model
	const performer = new Performer({
		name: req.body.name,
		genre: req.body.genre,
		creator: req.user._id // creator id from the authenticate middleware
	})

	// Save performer to the database
	performer.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})


// a GET route to get all performers
app.get('/performers', authenticate, (req, res) => {
	Performer.find({
		creator: req.user._id // from authenticate middleware
	}).then((performers) => {
		res.send({ performers }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
})


/// a GET route to get a peformer by their id.
// id is treated as a wildcard parameter, which is why there is a colon : beside it.
// (in this case, the database id, but we will make our own id system for our project)
app.get('/performers/:id', authenticate, (req, res) => {
	/// req.params has the wildcard parameters in the url, in this case, id.
	// log(req.params.id)
	const id = req.params.id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;
	}

	// Otherwise, find by the id and creator
	Performer.findOne({_id: id, creator: req.user._id}).then((performer) => {
		if (!performer) {
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
app.delete('/performers/:id', authenticate, (req, res) => {
	const id = req.params.id

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}

	// Delete a performer by their id
	Performer.findOneAndDelete({_id: id, creator: req.user._id}).then((performer) => {
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
app.patch('/performers/:id', authenticate, (req, res) => {
	const id = req.params.id

	// get the updated name and genre only from the request body.
	const { name, genre } = req.body
	const body = { name, genre }

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

//---------------------------------------------------------------------------

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 
